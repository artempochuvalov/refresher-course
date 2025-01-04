import { type FC, lazy } from 'react';

import type { LoginFormProps } from './LoginForm';

export const LoginFormLazy = lazy<FC<LoginFormProps>>(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
    setTimeout(() => resolve(import('./LoginForm')), 1500);
}));
