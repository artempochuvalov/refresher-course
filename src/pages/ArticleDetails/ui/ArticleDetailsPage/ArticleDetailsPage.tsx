import { ArticleDetails } from 'entities/Article';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames';

import cls from './ArticleDetailsPage.module.scss';

type ArticleDetailsPageProps = {
    className?: string;
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;

    const { id } = useParams<{ id: string; }>();

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <ArticleDetails articleId={id} />
        </div>
    );
};

export default memo(ArticleDetailsPage);
