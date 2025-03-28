import { AboutPage } from 'pages/About';
import { ArticleDetailsPage } from 'pages/ArticleDetails';
import { ArticlesPage } from 'pages/Articles';
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
        path: `${RoutePaths.Profile}:id?`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [RouteNames.Articles]: {
        path: RoutePaths.Articles,
        element: <ArticlesPage />,
        authOnly: true,
    },
    [RouteNames.ArticleDetails]: {
        path: `${RoutePaths.ArticleDetails}:id`,
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
};
