import React, { lazy } from 'react';
import ServerConsole from '@/components/server/console/ServerConsoleContainer';
import DatabasesContainer from '@/components/server/databases/DatabasesContainer';
import ScheduleContainer from '@/components/server/schedules/ScheduleContainer';
import UsersContainer from '@/components/server/users/UsersContainer';
import BackupContainer from '@/components/server/backups/BackupContainer';
import NetworkContainer from '@/components/server/network/NetworkContainer';
import StartupContainer from '@/components/server/startup/StartupContainer';
import FileManagerContainer from '@/components/server/files/FileManagerContainer';
import SettingsContainer from '@/components/server/settings/SettingsContainer';
import AccountOverviewContainer from '@/components/dashboard/AccountOverviewContainer';
import AccountApiContainer from '@/components/dashboard/AccountApiContainer';
import AccountSSHContainer from '@/components/dashboard/ssh/AccountSSHContainer';
import ActivityLogContainer from '@/components/dashboard/activity/ActivityLogContainer';
import WalletContainer from '@/components/dashboard/wallet/WalletContainer';
import ServerActivityLogContainer from '@/components/server/ServerActivityLogContainer';

// Each of the router files is already code split out appropriately — so
// all of the items above will only be loaded in when that router is loaded.
//
// These specific lazy loaded routes are to avoid loading in heavy screens
// for the server dashboard when they're only needed for specific instances.
const FileEditContainer = lazy(() => import('@/components/server/files/FileEditContainer'));
const ScheduleEditContainer = lazy(() => import('@/components/server/schedules/ScheduleEditContainer'));

interface RouteDefinition {
    path: string;
    // If undefined is passed this route is still rendered into the router itself
    // but no navigation link is displayed in the sub-navigation menu.
    name: string | undefined;
    component: React.ComponentType;
    exact?: boolean;
    accessKey?: string;
}

interface ServerRouteDefinition extends RouteDefinition {
    permission: string | string[] | null;
    accessKey?: string;
}

interface Routes {
    // All of the routes available under "/account"
    account: RouteDefinition[];
    // All of the routes available under "/server/:id"
    server: ServerRouteDefinition[];
}

export default {
    account: [
        {
            path: '/',
            name: 'Account',
            accessKey: 'account',
            component: AccountOverviewContainer,
            exact: true,
        },
        {
            path: '/api',
            name: 'API Credentials',
            accessKey: 'account_api',
            component: AccountApiContainer,
        },
        {
            path: '/ssh',
            name: 'SSH Keys',
            accessKey: 'account_ssh',
            component: AccountSSHContainer,
        },
        {
            path: '/activity',
            name: 'Activity',
            accessKey: 'account_activity',
            component: ActivityLogContainer,
        },
        {
            path: '/wallet',
            name: 'Wallet',
            accessKey: 'account_wallet',
            component: WalletContainer,
        },
    ],
    server: [
        {
            path: '/',
            permission: null,
            name: 'Console',
            accessKey: 'server_console',
            component: ServerConsole,
            exact: true,
        },
        {
            path: '/files',
            permission: 'file.*',
            name: 'Files',
            accessKey: 'server_files',
            component: FileManagerContainer,
        },
        {
            path: '/files/:action(edit|new)',
            accessKey: 'server_files',
            permission: 'file.*',
            name: undefined,
            component: FileEditContainer,
        },
        {
            path: '/databases',
            permission: 'database.*',
            name: 'Databases',
            accessKey: 'server_databases',
            component: DatabasesContainer,
        },
        {
            path: '/schedules',
            permission: 'schedule.*',
            name: 'Schedules',
            accessKey: 'server_schedules',
            component: ScheduleContainer,
        },
        {
            path: '/schedules/:id',
            accessKey: 'server_schedules',
            permission: 'schedule.*',
            name: undefined,
            component: ScheduleEditContainer,
        },
        {
            path: '/users',
            permission: 'user.*',
            name: 'Users',
            accessKey: 'server_users',
            component: UsersContainer,
        },
        {
            path: '/backups',
            permission: 'backup.*',
            name: 'Backups',
            accessKey: 'server_backups',
            component: BackupContainer,
        },
        {
            path: '/network',
            permission: 'allocation.*',
            name: 'Network',
            accessKey: 'server_network',
            component: NetworkContainer,
        },
        {
            path: '/startup',
            permission: 'startup.*',
            name: 'Startup',
            accessKey: 'server_startup',
            component: StartupContainer,
        },
        {
            path: '/settings',
            permission: ['settings.*', 'file.sftp'],
            name: 'Settings',
            accessKey: 'server_settings',
            component: SettingsContainer,
        },
        {
            path: '/activity',
            permission: 'activity.*',
            name: 'Activity',
            accessKey: 'server_activity',
            component: ServerActivityLogContainer,
        },
    ],
} as Routes;
