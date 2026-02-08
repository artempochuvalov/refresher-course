import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';

import { useNotificationsList } from '../../api/notificationsList';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;

    const { data: notifications, isLoading } = useNotificationsList(null, {
        pollingInterval: 5000,
    });

    if (isLoading) {
        return (
            <VStack
                fullWidth
                gap="8"
                className={classNames('', {}, [className])}
            >
                {Array.from({ length: 3 }).map((_, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Skeleton key={String(index)} width="100%" height="80px" border="16px" />
                ))}
            </VStack>
        );
    }

    return (
        <VStack
            fullWidth
            gap="8"
            className={classNames('', {}, [className])}
        >
            {notifications?.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                />
            ))}
        </VStack>
    );
});
