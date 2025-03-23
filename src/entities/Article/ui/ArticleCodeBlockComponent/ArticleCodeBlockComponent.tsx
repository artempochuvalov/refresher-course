import { ArticleCodeBlock } from 'entities/Article/model/types/article';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames';
import { Code } from 'shared/ui/Code/Code';

import cls from './ArticleCodeBlockComponent.module.scss';

type ArticleCodeBlockComponentProps = {
    className?: string;
    block: ArticleCodeBlock;
};

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
            <Code text={block.code} />
        </div>
    );
});
