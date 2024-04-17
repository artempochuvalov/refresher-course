import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';

import cls from './NotFound.module.scss';

type NotFoundProps = {
    className?: string;
};

export const NotFound: FC<NotFoundProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation('not_found');

    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </div>
    );
};
