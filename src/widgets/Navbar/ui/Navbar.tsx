import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import {
    type FC,
    memo,
    useCallback,
    useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';

import cls from './Navbar.module.scss';

type NavbarProps = {
    className?: string;
};

export const Navbar: FC<NavbarProps> = memo((props: NavbarProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [showAuthModal, setShowAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

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
            <div className={classNames(cls.navbar, {}, [className])}>
                <Button
                    className={cls.logoutButton}
                    theme={ButtonTheme.Blank}
                    onClick={onLogout}
                >
                    {t('Выйти')}
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
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
        </div>
    );
});
