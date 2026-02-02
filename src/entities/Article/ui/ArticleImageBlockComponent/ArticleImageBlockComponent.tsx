import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { TextAtom } from '@/shared/ui/TextAtom/TextAtom';

import { ArticleImageBlock } from '../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';

type ArticleImageBlockComponentProps = {
    className?: string;
    block: ArticleImageBlock;
};

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
            <img className={cls.image} src={block.src} alt={block.title} />
            <TextAtom className={cls.imageTitle} text={block.title} />
        </div>
    );
});
