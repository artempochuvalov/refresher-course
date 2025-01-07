import type { FC, SVGProps } from 'react';
import { About, Main, Profile } from 'shared/assets/icons';
import { RoutePaths } from 'shared/constants/routes';

export type SidebarItemType = {
    path: string;
    text: string;
    Icon: FC<SVGProps<SVGElement>>;
    authOnly?: boolean;
};

export const SidebarItemList: SidebarItemType[] = [
    {
        path: RoutePaths.Main,
        text: 'Главная страница',
        Icon: Main,
    },
    {
        path: RoutePaths.About,
        text: 'О сайте',
        Icon: About,
    },
    {
        path: RoutePaths.Profile,
        text: 'Профиль',
        Icon: Profile,
        authOnly: true,
    },
];
