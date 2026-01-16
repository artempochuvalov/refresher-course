import { UserRole } from 'entities/User';
import { AboutPage } from 'pages/About';
import { AdminPanel } from 'pages/AdminPanel';
import { ArticleDetailsPage } from 'pages/ArticleDetails';
import { ArticleEditPage } from 'pages/ArticleEdit';
import { ArticleNewPage } from 'pages/ArticleNew';
import { ArticlesPage } from 'pages/Articles';
import { ForbiddenPage } from 'pages/Forbidden';
import { MainPage } from 'pages/Main';
import { NotFoundPage } from 'pages/NotFound';
import { ProfilePage } from 'pages/Profile';
import { RouteProps } from 'react-router-dom';
import { RouteNames, RoutePaths } from 'shared/constants/routes';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    requiredRoles?: UserRole[];
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
        path: `${RoutePaths.Profile}:id`,
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
    [RouteNames.ArticleEdit]: {
        path: RoutePaths.ArticleEdit,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [RouteNames.ArticleNew]: {
        path: RoutePaths.ArticleNew,
        element: <ArticleNewPage />,
        authOnly: true,
    },
    [RouteNames.AdminPanel]: {
        path: RoutePaths.AdminPanel,
        element: <AdminPanel />,
        authOnly: true,
        requiredRoles: [UserRole.Manager, UserRole.Admin],
    },
    [RouteNames.Forbidden]: {
        path: RouteNames.Forbidden,
        element: <ForbiddenPage />,
        authOnly: true,
    },
};
