import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames';
import {
    TextAtom,
    TextAtomAlign,
    TextAtomSize,
    TextAtomTheme
} from 'shared/ui/TextAtom/TextAtom';

import cls from './ArticleDetailsPage.module.scss';

type ArticleDetailsPageProps = {
    className?: string;
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;

    const { t } = useTranslation('article');

    const { id } = useParams<{ id: string; }>();

    if (!id) {
        return (
            <div className={cls.noData}>
                <TextAtom
                    align={TextAtomAlign.Center}
                    theme={TextAtomTheme.Error}
                    title={t('Невалидный идентификатор статьи')}
                />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <ArticleDetails articleId={id} />

            <div className={cls.commentsBlock}>
                <TextAtom size={TextAtomSize.L} title={t('Комментарии')} />

                <CommentList className={cls.comments} comments={[]} />
            </div>
        </div>
    );
};

export default memo(ArticleDetailsPage);
