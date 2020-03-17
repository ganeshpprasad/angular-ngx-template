import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    // https://akveo.github.io/eva-icons/#/?type=outline
    // Icon names from above link for ref.

    {
        title: 'Asset Details',
        group: true,
    },
    {
        title: 'Site-Details',
        icon: 'keypad-outline',
        link: '/pages/dashboard',
    },
    {
        title: 'Main-Cable-Details',
        icon: 'keypad-outline',
        link: '/pages/dashboard',
    },
    {
        title: 'MPAN-Details',
        icon: 'keypad-outline',
        link: '/pages/dashboard',
    },
    {
        title: 'Event-Details',
        icon: 'keypad-outline',
        link: '/pages/dashboard',
    },
    {
        title: 'Import',
        group: true,
    },
    {
        title: 'Bulk Import',
        icon: 'browser-outline',
        link: '/pages/time-profile',
    },
    {
        title: 'Edit MPAN',
        icon: 'browser-outline',
        link: '/pages/time-profile',
    },
    {
        title: 'Admin',
        group: true,
    },
    {
        title: 'Admin',
        icon: 'settings-2-outline',
        link: '/pages/time-profile',
    },
    //

    // {
    //     title: 'Dashboard',
    //     icon: 'keypad-outline',
    //     link: '/pages/dashboard',
    // },
    // {
    //     title: 'Asset Details',
    //     icon: 'browser-outline',
    //     link: '/pages/hh-profile',
    // },
    // {
    //     title: 'Import',
    //     icon: 'browser-outline',
    //     link: '/pages/time-profile',
    // },
    // {
    //     title: 'FEATURES',
    //     group: true,
    // },
    {
        title: 'Charts',
        icon: 'pie-chart-outline',
        children: [
            {
                title: 'Echarts',
                link: '/pages/charts/echarts',
            },
            {
                title: 'Charts.js',
                link: '/pages/charts/chartjs',
            },
            {
                title: 'D3',
                link: '/pages/charts/d3',
            },
        ],
    },
    // {
    //     title: 'Miscellaneous',
    //     icon: 'shuffle-2-outline',
    //     children: [
    //         {
    //             title: '404',
    //             link: '/pages/miscellaneous/404',
    //         },
    //     ],
    // },
    // {
    //     title: 'Auth',
    //     icon: 'lock-outline',
    //     children: [
    //         {
    //             title: 'Login',
    //             link: '/auth/login',
    //         },
    //         {
    //             title: 'Register',
    //             link: '/auth/register',
    //         },
    //         {
    //             title: 'Request Password',
    //             link: '/auth/request-password',
    //         },
    //         {
    //             title: 'Reset Password',
    //             link: '/auth/reset-password',
    //         },
    //     ],
    // },
];
