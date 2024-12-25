import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';

export type StateSchema = {
    user: UserSchema;
    loginForm?: LoginSchema;
};
