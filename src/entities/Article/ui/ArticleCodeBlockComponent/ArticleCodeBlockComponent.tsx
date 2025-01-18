import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';

import cls from './ArticleCodeBlockComponent.module.scss';

type ArticleCodeBlockComponentProps = {
    className?: string;
};

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
    const { className } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
            {t('code block')}
        </div>
    );
});
