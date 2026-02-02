import {
    memo,
    useCallback,
    useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    getUserAuthData
} from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarButton } from '@/features/AvatarButton';
import { NotificationButton } from '@/features/NotificationButton';
import { RoutePaths } from '@/shared/constants/routes';
import { classNames } from '@/shared/lib/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { TextAtom, TextAtomTheme } from '@/shared/ui/TextAtom/TextAtom';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const [showAuthModal, setShowAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onShowModal = useCallback(() => {
        setShowAuthModal(true);
    }, []);
    const onCloseModal = useCallback(() => {
        setShowAuthModal(false);
    }, []);

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

                    <NotificationButton />
                    <AvatarButton />
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
