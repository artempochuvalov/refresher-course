import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { Button } from '@/shared/ui/Button';

import cls from './PageError.module.scss';

type PageErrorProps = {
    className?: string;
};

export const PageError = memo((props: PageErrorProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const reloadPage = useCallback(() => {
        window.location.reload();
    }, []);

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <p>{t('Произошла ошибка')}</p>
            <Button onClick={reloadPage}>
                {t('Обновить страницу')}
            </Button>
        </div>
    );
});
