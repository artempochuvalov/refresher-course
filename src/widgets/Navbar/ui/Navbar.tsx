import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import {
    memo,
    useCallback,
    useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePaths } from 'shared/constants/routes';
import { classNames } from 'shared/lib/classNames';
import { AppLink } from 'shared/ui/AppLink';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { TextAtom, TextAtomTheme } from 'shared/ui/TextAtom/TextAtom';

import cls from './Navbar.module.scss';

type NavbarProps = {
    className?: string;
};

export const Navbar = memo((props: NavbarProps) => {
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
                <TextAtom theme={TextAtomTheme.Inverted} title={t('Article App')} />

                <AppLink to={RoutePaths.ArticleNew} className={cls.createNewArticleLink}>
                    <Button theme={ButtonTheme.Blank}>
                        {t('Создать новую статью', { ns: 'artilce' })}
                    </Button>
                </AppLink>

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
        </div>
    );
});
