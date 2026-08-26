<?php

namespace Pterodactyl\Support;

use Pterodactyl\Contracts\Repository\SettingsRepositoryInterface;

class PanelAccess
{
    public const PAGES = [
        'dashboard' => 'Dashboard',
        'servers' => 'My Servers',
        'store' => 'Available Servers',
        'account' => 'Account overview',
        'account_api' => 'API Credentials',
        'account_ssh' => 'SSH Keys',
        'account_activity' => 'Account Activity',
        'account_wallet' => 'Wallet',
        'server_console' => 'Server Console',
        'server_files' => 'Server Files',
        'server_databases' => 'Server Databases',
        'server_schedules' => 'Server Schedules',
        'server_users' => 'Server Users',
        'server_backups' => 'Server Backups',
        'server_network' => 'Server Network',
        'server_startup' => 'Server Startup',
        'server_settings' => 'Server Settings',
        'server_activity' => 'Server Activity',
    ];

    public static function settingKey(string $key): string
    {
        return 'settings::pterodactyl:client_pages:' . $key;
    }

    public static function isEnabled(SettingsRepositoryInterface $settings, string $key): bool
    {
        return filter_var($settings->get(self::settingKey($key), 'true'), FILTER_VALIDATE_BOOLEAN);
    }

    /** @return array<string, bool> */
    public static function all(SettingsRepositoryInterface $settings): array
    {
        $pages = [];
        foreach (self::PAGES as $key => $label) {
            $pages[$key] = self::isEnabled($settings, $key);
        }

        return $pages;
    }
}
