@extends('layouts.admin')
@include('partials/admin.settings.nav', ['activeTab' => 'access'])

@section('title')
    Access Settings
@endsection

@section('content-header')
    <h1>Access Settings<small>Control authentication and client-visible pages.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Access</li>
    </ol>
@endsection

@section('content')
    @yield('settings::nav')
    <div class="row">
        <div class="col-xs-12">
            <form action="{{ route('admin.settings.access.update') }}" method="POST">
                <div class="box">
                    <div class="box-header with-border"><h3 class="box-title">Authentication</h3></div>
                    <div class="box-body">
                        @foreach(['auth:login_enabled' => ['Login', $loginEnabled, 'Allow existing users to sign in.'], 'auth:signup_enabled' => ['Signup', $signupEnabled, 'Allow visitors to create new accounts.']] as $key => [$label, $enabled, $description])
                            <div class="form-group">
                                <label>{{ $label }}</label>
                                <input type="hidden" name="{{ $key }}" value="false">
                                <div><label><input type="checkbox" name="{{ $key }}" value="true" @checked($enabled)> Enabled</label></div>
                                <p class="text-muted"><small>{{ $description }}</small></p>
                            </div>
                        @endforeach
                    </div>
                </div>
                <div class="box">
                    <div class="box-header with-border"><h3 class="box-title">Client Pages</h3></div>
                    <div class="box-body">
                        <p class="text-muted">Disabled pages are hidden from navigation and unavailable by direct URL for non-admin users. Admins retain access.</p>
                        <div class="row">
                            @foreach($pages as $key => $label)
                                <div class="form-group col-md-4">
                                    <input type="hidden" name="page:{{ $key }}" value="false">
                                    <label><input type="checkbox" name="page:{{ $key }}" value="true" @checked($enabledPages[$key])> {{ $label }}</label>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    <div class="box-footer">
                        {!! csrf_field() !!}
                        <button type="submit" name="_method" value="PATCH" class="btn btn-sm btn-primary pull-right">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection
