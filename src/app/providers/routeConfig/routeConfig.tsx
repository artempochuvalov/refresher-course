import { AboutPage } from 'pages/About';
import { MainPage } from 'pages/Main';
import { RouteProps } from 'react-router-dom';
import { RouteNames } from 'shared/constants/routeNames';

export const routeConfig: Record<RouteNames, RouteProps> = {
    [RouteNames.Main]: {
        path: '/',
        element: <MainPage />,
    },
    [RouteNames.About]: {
        path: '/about',
        element: <AboutPage />,
    },
};
