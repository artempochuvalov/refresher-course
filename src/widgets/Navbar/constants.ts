import type { TFunction } from 'i18next';

type NavbarLinkConfig = {
    title: (t: TFunction) => string;
    to: string;
};

export const navbarLinks: NavbarLinkConfig[] = [
    {
        title: (t => t('Главная страница')),
        to: '/',
        
    },
    {
        title: (t => t('О сайте')),
        to: '/about'
    }
];

