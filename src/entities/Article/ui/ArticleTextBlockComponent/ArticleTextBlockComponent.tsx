import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { TextAtom } from '@/shared/ui/TextAtom/TextAtom';

import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';

type ArticleTextBlockComponentProps = {
    className?: string;
    block: ArticleTextBlock;
};

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
            <TextAtom title={block.title} className={cls.ArticleTitle} />
            {block.paragraphs.map((paragraph) => (
                <TextAtom
                    className={cls.ArticleParagraph}
                    key={paragraph}
                    text={paragraph}
                />
            ))}
        </div>
    );
});
