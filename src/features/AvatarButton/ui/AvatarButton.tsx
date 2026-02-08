import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    getIfUserAdmin,
    getIfUserManager,
    getUserAuthData,
    userActions
} from '@/entities/User';
import { RoutePaths } from '@/shared/constants/routes';
import { classNames } from '@/shared/lib/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';

interface AvatarButtonProps {
    className?: string;
}

export const AvatarButton = memo((props: AvatarButtonProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const authData = useSelector(getUserAuthData);

    const isUserAdmin = useSelector(getIfUserAdmin);
    const isUserManger = useSelector(getIfUserManager);
    const isAdminPanelAvailable = useMemo(() => (
        isUserAdmin || isUserManger
    ), [isUserAdmin, isUserManger]);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (!authData) {
        return null;
    }

    return (
        <Dropdown
            className={classNames('', {}, [className])}
            trigger={(
                <Avatar src={authData.avatar!} size={32} />
            )}
            items={[
                {
                    content: t('Профиль'),
                    href: RoutePaths.Profile + authData.id,
                },
                ...(isAdminPanelAvailable ? [{
                    content: t('Админка'),
                    href: RoutePaths.AdminPanel,
                }] : []),
                {
                    content: t('Выйти'),
                    onClick: onLogout,
                },
            ]}
            anchorPosition="bottom right"
        />
    );
});
