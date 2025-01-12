export enum RouteNames {
    Main = 'Main',
    About = 'About',
    NotFound = 'NotFound',
    Profile = 'Profile',
}

export const RoutePaths: Record<RouteNames, string> = {
    [RouteNames.Main]: '/',
    [RouteNames.About]: '/about',
    [RouteNames.Profile]: '/profile',
    [RouteNames.NotFound]: '*',
};
