import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Page } from 'widgets/Page';

import cls from './NotFound.module.scss';

type NotFoundProps = {
    className?: string;
};

export const NotFound = memo((props: NotFoundProps) => {
    const { className } = props;
    const { t } = useTranslation('not_found');

    return (
        <Page className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </Page>
    );
});
