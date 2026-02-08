import { FC, memo } from 'react';

import { ArticleListView } from '@/entities/Article';
import { GridView, ListView } from '@/shared/assets/icons';
import { classNames } from '@/shared/lib/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';

import cls from './ArticleViewSwitcher.module.scss';

type ArticleViewSwitcherProps = {
    className?: string;
    view: ArticleListView;
    onChangeView: (view: ArticleListView) => void;
};

const viewElements: ({ view: ArticleListView, icon: FC; })[] = [
    {
        view: 'grid',
        icon: GridView,
    },
    {
        view: 'list',
        icon: ListView,
    },
];

export const ArticleViewSwitcher = memo((props: ArticleViewSwitcherProps) => {
    const { className, view, onChangeView } = props;

    return (
        <div className={classNames(cls.ArticleViewSwitcher, {}, [className])}>
            {viewElements.map((viewElement) => (
                <Button
                    theme={ButtonTheme.Blank}
                    className={classNames(cls.viewType, {
                        [cls.selected]: viewElement.view === view,
                    })}
                    key={viewElement.view}
                    onClick={() => onChangeView(viewElement.view)}
                >
                    <viewElement.icon />
                </Button>
            ))}
        </div>
    );
});
