/* eslint-disable max-len */
import { ArticlesList } from 'entities/Article';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames';

import cls from './Articles.module.scss';

type ArticlesProps = {
    className?: string;
};

const Articles = (props: ArticlesProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.Articles, {}, [className])}>
            <ArticlesList articles={[]} />
        </div>
    );
};

export default memo(Articles);
