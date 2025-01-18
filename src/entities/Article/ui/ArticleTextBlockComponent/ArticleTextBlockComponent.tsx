import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';

import cls from './ArticleTextBlockComponent.module.scss';

type ArticleTextBlockComponentProps = {
    className?: string;
};

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { className } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
            {t('text block')}
        </div>
    );
});
