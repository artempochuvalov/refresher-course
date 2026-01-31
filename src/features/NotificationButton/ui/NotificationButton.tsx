import { NotificationList } from 'entities/Notification';
import {
    memo,
    useCallback,
    useMemo,
    useState
} from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { RingBell } from 'shared/assets/icons';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { Popover } from 'shared/ui/Popups';

import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;

    const [isDrawOpen, setIsDrawOpen] = useState(false);

    const openDrawer = useCallback(() => {
        setIsDrawOpen(true);
    }, [setIsDrawOpen]);

    const closeDrawer = useCallback(() => {
        setIsDrawOpen(false);
    }, [setIsDrawOpen]);

    const trigger = useMemo(() => (
        <Button theme={ButtonTheme.Blank} onClick={openDrawer}>
            <RingBell className={cls.ringBellIcon} />
        </Button>
    ), [openDrawer]);

    return (
        <>
            <BrowserView>
                <Popover
                    className={classNames('', {}, [className])}
                    anchorPosition="bottom right"
                    trigger={trigger}
                >
                    <NotificationList className={cls.notificationsList} />
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isDrawOpen} onClose={closeDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </>
    );
});
