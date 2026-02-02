import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';

type ArticleEditProps = {
    className?: string;
};

const ArticleEdit = memo((props: ArticleEditProps) => {
    const { className } = props;

    const { t } = useTranslation('article');

    return (
        <Page className={classNames('', {}, [className])}>
            {t('Редактирование статьи')}
        </Page>
    );
});

export default ArticleEdit;
