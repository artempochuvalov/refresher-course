import { NotificationList } from 'entities/Notification';
import { memo } from 'react';
import { RingBell } from 'shared/assets/icons';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Popover } from 'shared/ui/Popups';

import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;

    return (
        <Popover
            className={classNames('', {}, [className])}
            anchorPosition="bottom right"
            trigger={(
                <Button theme={ButtonTheme.Blank}>
                    <RingBell className={cls.ringBellIcon} />
                </Button>
            )}
        >
            <NotificationList className={cls.notificationsList} />
        </Popover>
    );
});
