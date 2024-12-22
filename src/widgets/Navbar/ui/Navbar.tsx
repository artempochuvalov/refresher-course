import { LoginModal } from 'features/AuthByUsername';
import { type FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';

import cls from './Navbar.module.scss';

type NavbarProps = {
    className?: string;
};

export const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
    const { className } = props;

    const { t } = useTranslation();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setShowAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setShowAuthModal(true);
    }, []);

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
};
