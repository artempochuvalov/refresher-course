import { memo } from 'react';
import { classNames } from 'shared/lib/classNames';
import { AppLink } from 'shared/ui/AppLink';
import { Card } from 'shared/ui/Card/Card';
import { TextAtom } from 'shared/ui/TextAtom/TextAtom';

import type { Notification } from '../../model/types';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    notification: Notification
    className?: string;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { notification, className } = props;

    const content = (
        <Card className={classNames(cls.NotificationItem, {}, [className])}>
            <TextAtom
                title={notification.title}
                text={notification.description}
            />
        </Card>
    );

    if (notification.href) {
        return (
            <AppLink className={cls.link} to={notification.href} target="_blank">
                {content}
            </AppLink>
        );
    }

    return content;
});
