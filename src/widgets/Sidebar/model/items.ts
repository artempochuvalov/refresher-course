import { RoutePaths } from 'app/providers/routeConfig/routeConfig';
import type { FC, SVGProps } from 'react';
import { About, Main, Profile } from 'shared/assets/icons';

export type SidebarItemType = {
    path: string;
    text: string;
    Icon: FC<SVGProps<SVGElement>>;
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
    },
];
