import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';

import cls from './ArticleDetails.module.scss';

type ArticleDetailsProps = {
    className?: string;
};

const ArticleDetails = (props: ArticleDetailsProps) => {
    const { className } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticleDetails, {}, [className])}>
            {t('Страница поста')}
        </div>
    );
};

export default memo(ArticleDetails);
