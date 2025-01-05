import { AboutPage } from 'pages/About';
import { MainPage } from 'pages/Main';
import { NotFoundPage } from 'pages/NotFound';
import { ProfilePage } from 'pages/Profile';
import { RouteProps } from 'react-router-dom';
import { RouteNames } from 'shared/constants/routeNames';

export const RoutePaths: Record<RouteNames, string> = {
    [RouteNames.Main]: '/',
    [RouteNames.About]: '/about',
    [RouteNames.Profile]: '/profile',
    [RouteNames.NotFound]: '*',
};

export const routeConfig: Record<RouteNames, RouteProps> = {
    [RouteNames.Main]: {
        path: RoutePaths.Main,
        element: <MainPage />,
    },
    [RouteNames.About]: {
        path: RoutePaths.About,
        element: <AboutPage />,
    },
    [RouteNames.NotFound]: {
        path: RoutePaths.NotFound,
        element: <NotFoundPage />,
    },
    [RouteNames.Profile]: {
        path: RoutePaths.Profile,
        element: <ProfilePage />,
    },
};
