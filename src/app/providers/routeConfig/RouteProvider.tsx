import { Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'widgets/PageLoader';

import { routeConfig } from './routeConfig';

const RouteProvider = () => {
    const routes = useMemo(() => Object.values(routeConfig), [routeConfig]);

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

export default RouteProvider;
