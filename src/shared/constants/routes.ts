export enum RouteNames {
    Main = 'Main',
    About = 'About',
    NotFound = 'NotFound',
    Profile = 'Profile',
    Articles = 'Articles',
    ArticleDetails = 'ArticleDetails',
}

export const RoutePaths: Record<RouteNames, string> = {
    [RouteNames.Main]: '/',
    [RouteNames.About]: '/about',
    [RouteNames.Profile]: '/profile/', // + :id
    [RouteNames.Articles]: '/articles',
    [RouteNames.ArticleDetails]: '/articles/', // + :id
    [RouteNames.NotFound]: '*',
};
