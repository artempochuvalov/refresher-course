import { HTMLAttributeAnchorTarget, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ViewEye } from '@/shared/assets/icons';
import { RoutePaths } from '@/shared/constants/routes';
import { classNames } from '@/shared/lib/classNames';
import { useHover } from '@/shared/lib/hooks/useHover';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card/Card';
import { TextAtom, TextAtomSize } from '@/shared/ui/TextAtom/TextAtom';

import { ArticleBlockType } from '../../model/constants';
import {
    Article,
    ArticleListView,
    ArticleTextBlock
} from '../../model/types/article';
import cls from './ArticleCard.module.scss';

type ArticleCardProps = {
    article: Article;
    view: ArticleListView;
    className?: string;
    target?: HTMLAttributeAnchorTarget;
};

export const ArticleCard = memo((props: ArticleCardProps) => {
    const {
        article,
        view,
        className,
        target,
    } = props;

    const { t } = useTranslation();
    const [isHovered, bindHover] = useHover();

    const categories = useMemo(() => (
        <TextAtom className={cls.categories} text={article.type.join(', ')} />
    ), [article]);

    if (view === 'grid') {
        return (
            <AppLink
                to={`${RoutePaths.ArticleDetails}${article.id}`}
                className={classNames(cls.ArticleCard, {}, [className, cls[view]])}
                target={target}
            >
                <Card {...bindHover}>
                    <div className={cls.preview}>
                        <img className={cls.image} src={article.img} alt={article.title} />
                        {isHovered && (
                            <TextAtom className={cls.createdAt} text={article.createdAt} />
                        )}
                    </div>

                    <div className={cls.meta}>
                        {categories}

                        <div className={cls.views}>
                            <TextAtom text={String(article.views)} />
                            <ViewEye className={cls.icon} />
                        </div>
                    </div>

                    <TextAtom className={cls.title} text={article.title} />
                </Card>
            </AppLink>
        );
    }

    const articleSummary = article.blocks.find((block) => (
        block.type === ArticleBlockType.TEXT && block.paragraphs.length
    )) as ArticleTextBlock | undefined;

    return (
        <Card className={classNames(cls.ArticleCard, {}, [className, cls[view]])}>
            <div className={cls.header}>
                <div className={cls.userInfo}>
                    {article.user.avatar && <Avatar size={32} src={article.user.avatar} />}
                    <TextAtom text={article.user.username} />
                </div>

                <TextAtom text={article.createdAt} />
            </div>

            <TextAtom className={cls.title} title={article.title} size={TextAtomSize.L} />

            {categories}

            <img className={cls.image} src={article.img} alt={article.title} />

            {articleSummary && (
                <TextAtom className={cls.summary} text={articleSummary.paragraphs[0]} />
            )}

            <div className={cls.footer}>
                <AppLink
                    to={`${RoutePaths.ArticleDetails}${article.id}`}
                    target={target}
                >
                    <Button theme={ButtonTheme.Outline}>
                        {`${t('Читать далее')}...`}
                    </Button>
                </AppLink>

                <div className={cls.views}>
                    <TextAtom text={String(article.views)} />
                    <ViewEye className={cls.icon} />
                </div>
            </div>
        </Card>
    );
});
