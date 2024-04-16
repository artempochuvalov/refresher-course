import { Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routeConfig } from './routeConfig';

const RouteProvider = () => {
    const routes = useMemo(() => Object.values(routeConfig), [routeConfig]);

    return (
        <Suspense>
            <Routes>
                {routes.map((route) => (
                    <Route path={route.path} element={route.element} />
                ))}
            </Routes>
        </Suspense>
    );
};

export default RouteProvider;
