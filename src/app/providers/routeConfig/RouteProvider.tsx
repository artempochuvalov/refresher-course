import { getUserAuthData } from 'entities/User';
import { memo, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'widgets/PageLoader';

import { routeConfig } from './routeConfig';

const RouteProvider = () => {
    const isAuth = useSelector(getUserAuthData);

    const routes = useMemo(() => Object
        .values(routeConfig)
        .filter((route) => isAuth || !route.authOnly), [isAuth]);

    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <Suspense fallback={<PageLoader />}>
                            <div className="page-wrapper">
                                {element}
                            </div>
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    );
};

export default memo(RouteProvider);
