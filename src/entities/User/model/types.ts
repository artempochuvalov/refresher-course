import type { UserRole } from './constants';

export type User = {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
};

export type UserSchema = {
    authData?: User;
    _initted: boolean;
};
