<?php

namespace Pterodactyl\Http\Requests\Admin\Settings;

use Pterodactyl\Http\Requests\Admin\AdminFormRequest;
use Pterodactyl\Support\PanelAccess;

class AccessSettingsFormRequest extends AdminFormRequest
{
    public function rules(): array
    {
        $rules = [
            'auth:login_enabled' => 'required|in:true,false',
            'auth:signup_enabled' => 'required|in:true,false',
        ];

        foreach (PanelAccess::PAGES as $key => $label) {
            $rules['page:' . $key] = 'required|in:true,false';
        }

        return $rules;
    }
}
