import { AboutPage } from 'pages/About';
import { MainPage } from 'pages/Main';
import { NotFoundPage } from 'pages/NotFound';
import { ProfilePage } from 'pages/Profile';
import { RouteProps } from 'react-router-dom';
import { RouteNames, RoutePaths } from 'shared/constants/routes';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export const routeConfig: Record<RouteNames, AppRoutesProps> = {
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
        authOnly: true,
    },
};
