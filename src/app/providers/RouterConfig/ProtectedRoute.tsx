import { getUserAuthData, getUserRoles, UserRole } from 'entities/User';
import { type FC, type ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePaths } from 'shared/constants/routes';

interface ProtectedRouteProps {
    children: ReactNode;
    authOnly?: boolean;
    requiredRoles?: UserRole[];
}

export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
    const {
        authOnly,
        requiredRoles,
        children,
    } = props;

    const location = useLocation();

    const authData = useSelector(getUserAuthData);
    const userRoles = useSelector(getUserRoles);

    const hasRequiredRoles = useMemo(() => {
        if (!requiredRoles) {
            return true;
        }

        return requiredRoles.some((role) => (
            Boolean(userRoles.includes(role))
        ));
    }, [userRoles, requiredRoles]);

    if (!authData && authOnly) {
        return <Navigate to={RoutePaths.Main} state={{ from: location }} replace />;
    }

    if (!authData || !hasRequiredRoles) {
        return <Navigate to={RoutePaths.Forbidden} state={{ from: location }} replace />;
    }

    return children;
};
