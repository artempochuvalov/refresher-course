import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';
import {
    About,
    Articles,
    Main,
    Profile
} from '@/shared/assets/icons';
import { RoutePaths } from '@/shared/constants/routes';

import { SidebarItemType } from '../types';

export const getSidebarItems = createSelector(getUserAuthData, (userAuthData) => {
    const items: SidebarItemType[] = [
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
    ];

    if (userAuthData) {
        items.push(
            {
                path: RoutePaths.Profile + userAuthData.id,
                text: 'Профиль',
                Icon: Profile,
            },
            {
                path: RoutePaths.Articles,
                text: 'Статьи',
                Icon: Articles,
            }
        );
    }

    return items;
});
