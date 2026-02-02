import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageLoader } from '@/widgets/PageLoader';

import { ProtectedRoute } from './ProtectedRoute';
import { AppRoutesProps, routeConfig } from './routeConfig';

const RouteProvider = () => {
    const renderRoutesWithProtection = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={(
                    route.authOnly
                        ? (
                            <ProtectedRoute
                                authOnly={route.authOnly}
                                requiredRoles={route.requiredRoles}
                            >
                                {element}
                            </ProtectedRoute>
                        )
                        : element
                )}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderRoutesWithProtection)}
        </Routes>
    );
};

export default memo(RouteProvider);
