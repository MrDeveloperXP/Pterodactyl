<?php

namespace Pterodactyl\Http\Controllers\Admin\Settings;

use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Prologue\Alerts\AlertsMessageBag;
use Pterodactyl\Http\Controllers\Controller;
use Pterodactyl\Http\Requests\Admin\Settings\AccessSettingsFormRequest;
use Pterodactyl\Contracts\Repository\SettingsRepositoryInterface;
use Pterodactyl\Support\PanelAccess;

class AccessController extends Controller
{
    public function __construct(
        private SettingsRepositoryInterface $settings,
        private AlertsMessageBag $alert,
    ) {
    }

    public function index(): View
    {
        return view('admin.settings.access', [
            'pages' => PanelAccess::PAGES,
            'enabledPages' => PanelAccess::all($this->settings),
            'loginEnabled' => PanelAccess::isEnabled($this->settings, 'login'),
            'signupEnabled' => PanelAccess::isEnabled($this->settings, 'signup'),
        ]);
    }

    public function update(AccessSettingsFormRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $this->settings->set(PanelAccess::settingKey('login'), $data['auth:login_enabled']);
        $this->settings->set(PanelAccess::settingKey('signup'), $data['auth:signup_enabled']);

        foreach (PanelAccess::PAGES as $key => $label) {
            $this->settings->set(PanelAccess::settingKey($key), $data['page:' . $key]);
        }

        $this->alert->success('Access settings have been updated successfully.')->flash();

        return redirect()->route('admin.settings.access');
    }
}
