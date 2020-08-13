import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Home',
        icon: 'home-outline',
        link: '/pages/landing',
        home: true,
    },
    {
        title: 'Customer 360',
        icon: 'people-outline',
        link: '/pages/customer',
    },
    {
        title: 'Service A/C 360',
        icon: 'bulb-outline',
        link: '/pages/srv-account',
    },
    {
        title: 'Tariff Management',
        icon: 'keypad-outline',
        link: '/pages/tariff-details',
    },
    {
        title: 'Asset Management',
        icon: 'cube-outline',
        link: '/pages/asset-details',
    },
    {
        title: 'Debt Management',
        icon: 'briefcase-outline',
        link: '/pages/debt-details',
    },
    {
        title: 'Cash Postings',
        icon: 'credit-card-outline',
        link: '/pages/cash-details',
    },
    {
        title: 'Bulk Import',
        icon: 'cloud-upload-outline',
        link: '/pages/bulk-import',
    },
    {
        title: 'Reports Management',
        icon: 'folder-add-outline',
        link: '/pages/reports-management',
    },
];
