import { getUserAuthData } from 'entities/User';
import type { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RoutePaths } from 'shared/constants/routes';

type ProtectedRouteProps = {
    children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const authData = useSelector(getUserAuthData);

    if (!authData) {
        return <Navigate to={RoutePaths.Main} replace />;
    }

    return children;
};
