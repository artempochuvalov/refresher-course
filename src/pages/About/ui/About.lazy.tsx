import { lazy } from 'react';

export const AboutLazyPage = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
    setTimeout(() => resolve(import('./About')), 1500);
}));
