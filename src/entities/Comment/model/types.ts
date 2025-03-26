import { User } from 'entities/User';

export type Comment = {
    id: string;
    text: string;
    user: User;
};
