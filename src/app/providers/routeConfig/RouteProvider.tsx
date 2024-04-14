import { Suspense, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from './routeConfig';

const RouteProvider = () => {
    const routes = useMemo(() => {
        return Object.values(routeConfig);
    }, [routeConfig]);

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