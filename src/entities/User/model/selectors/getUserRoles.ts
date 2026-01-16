import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

import { UserRole } from '../types';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles ?? [];

export const getIfUserAdmin = createSelector(
    getUserRoles,
    (roles) => roles.includes(UserRole.Admin)
);
export const getIfUserManager = createSelector(
    getUserRoles,
    (roles) => roles.includes(UserRole.Manager)
);
