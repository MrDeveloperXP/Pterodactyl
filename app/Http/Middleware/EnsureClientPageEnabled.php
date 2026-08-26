<?php

namespace Pterodactyl\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Pterodactyl\Support\PanelAccess;
use Pterodactyl\Contracts\Repository\SettingsRepositoryInterface;

class EnsureClientPageEnabled
{
    public function __construct(private SettingsRepositoryInterface $settings)
    {
    }

    public function handle(Request $request, Closure $next): mixed
    {
        if (!$request->user() || $request->user()->root_admin || !$request->isMethod('GET')) {
            return $next($request);
        }

        $path = '/' . trim($request->path(), '/');
        $page = match (true) {
            $path === '/' => 'dashboard',
            $path === '/servers' => 'servers',
            $path === '/store' => 'store',
            $path === '/account' => 'account',
            Str::startsWith($path, '/account/api') => 'account_api',
            Str::startsWith($path, '/account/ssh') => 'account_ssh',
            Str::startsWith($path, '/account/activity') => 'account_activity',
            Str::startsWith($path, '/account/wallet') => 'account_wallet',
            Str::startsWith($path, '/server/') && Str::contains($path, '/files') => 'server_files',
            Str::startsWith($path, '/server/') && Str::contains($path, '/databases') => 'server_databases',
            Str::startsWith($path, '/server/') && Str::contains($path, '/schedules') => 'server_schedules',
            Str::startsWith($path, '/server/') && Str::contains($path, '/users') => 'server_users',
            Str::startsWith($path, '/server/') && Str::contains($path, '/backups') => 'server_backups',
            Str::startsWith($path, '/server/') && Str::contains($path, '/network') => 'server_network',
            Str::startsWith($path, '/server/') && Str::contains($path, '/startup') => 'server_startup',
            Str::startsWith($path, '/server/') && Str::contains($path, '/settings') => 'server_settings',
            Str::startsWith($path, '/server/') && Str::contains($path, '/activity') => 'server_activity',
            Str::startsWith($path, '/server/') => 'server_console',
            default => null,
        };

        if ($page && !PanelAccess::isEnabled($this->settings, $page)) {
            abort(404);
        }

        return $next($request);
    }
}
