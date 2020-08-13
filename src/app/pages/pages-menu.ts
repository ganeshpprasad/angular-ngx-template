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
        icon: 'hash-outline',
        link: '/pages/srv-account',
    },
    {
        title: 'Asset Management',
        icon: 'cube-outline',
        link: '/pages/asset-details',
    },
    {
        title: 'Tariff Management',
        icon: 'keypad-outline',
        link: '/pages/tariff',
    },
];
