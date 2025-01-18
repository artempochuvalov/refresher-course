import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';

import cls from './Articles.module.scss';

type ArticlesProps = {
    className?: string;
};

const Articles = (props: ArticlesProps) => {
    const { className } = props;

    const { t } = useTranslation('article');

    return (
        <div className={classNames(cls.Articles, {}, [className])}>
            {t('Страница постов')}
        </div>
    );
};

export default memo(Articles);
