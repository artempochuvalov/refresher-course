import { Profile } from '@/entities/Profile';

import type { ValidationProfileError } from './constants';

export type ProfileSchema = {
    profile?: Profile;
    editableProfile?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validationProfileErrors?: ValidationProfileError[];
};
