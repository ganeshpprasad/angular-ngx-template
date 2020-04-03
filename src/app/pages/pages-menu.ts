import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Dashboard',
        icon: 'globe-2-outline',
        link: '/pages/dashboard',
        home: true,
    },
    {
        title: 'Asset Details',
        group: true,
    },
    {
        title: 'Asset Details',
        icon: 'cube-outline',
        link: '/pages/asset-details',
    },
    {
        title: 'MPAN Details',
        icon: 'keypad-outline',
        link: '/pages/mpan-details',
    },
    {
        title: 'Event Logs',
        icon: 'pantone-outline',
        link: '/pages/event-details',
    },
    {
        title: 'Import',
        group: true,
    },
    {
        title: 'Bulk Import',
        icon: 'browser-outline',
        link: '/pages/bulk-import',
    },
    {
        title: 'Edit MPAN',
        icon: 'browser-outline',
        link: '/pages/mpan-details/3007428567721',
    },
    {
        title: 'Admin',
        group: true,
    },
    {
        title: 'Admin',
        icon: 'settings-2-outline',
        link: '/pages/admin-dashboard',
    },
    //
];
