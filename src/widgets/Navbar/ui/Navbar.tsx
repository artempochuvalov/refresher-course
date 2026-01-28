import {
    getIfUserAdmin,
    getIfUserManager,
    getUserAuthData,
    userActions
} from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import {
    memo,
    useCallback,
    useMemo,
    useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RingBell } from 'shared/assets/icons';
import { RoutePaths } from 'shared/constants/routes';
import { classNames } from 'shared/lib/classNames';
import { AppLink } from 'shared/ui/AppLink';
import { Avatar } from 'shared/ui/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Dropdown, Popover } from 'shared/ui/Popups';
import { HStack } from 'shared/ui/Stack';
import { TextAtom, TextAtomTheme } from 'shared/ui/TextAtom/TextAtom';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [showAuthModal, setShowAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const isUserAdmin = useSelector(getIfUserAdmin);
    const isUserManger = useSelector(getIfUserManager);
    const isAdminPanelAvailable = useMemo(() => (
        isUserAdmin || isUserManger
    ), [isUserAdmin, isUserManger]);

    const onShowModal = useCallback(() => {
        setShowAuthModal(true);
    }, []);
    const onCloseModal = useCallback(() => {
        setShowAuthModal(false);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
        return (
            <HStack
                justify="between"
                align="center"
                fullWidth
                className={classNames(cls.navbar, {}, [className])}
            >
                <TextAtom theme={TextAtomTheme.Inverted} title={t('Article App')} />

                <HStack align="center" gap="16">
                    <AppLink to={RoutePaths.ArticleNew} className={cls.createNewArticleLink}>
                        <Button theme={ButtonTheme.Blank}>
                            {t('Создать новую статью', { ns: 'artilce' })}
                        </Button>
                    </AppLink>

                    <Popover
                        anchorPosition="bottom right"
                        trigger={(
                            <Button theme={ButtonTheme.Blank}>
                                <RingBell className={cls.ringBellIcon} />
                            </Button>
                        )}
                    >
                        {t('Уведомление')}
                    </Popover>

                    <Dropdown
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
                </HStack>
            </HStack>
        );
    }

    return (
        <HStack
            className={classNames(cls.navbar, {}, [className])}
            justify="between"
            align="center"
            fullWidth
        >
            <TextAtom theme={TextAtomTheme.Inverted} title={t('Article App')} />

            <Button
                className={cls.loginButton}
                theme={ButtonTheme.Blank}
                onClick={onShowModal}
            >
                {t('Войти')}
            </Button>

            <LoginModal
                isOpen={showAuthModal}
                onClose={onCloseModal}
            />
        </HStack>
    );
});
