import { type FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Modal } from 'shared/ui/Modal/Modal';

import cls from './Navbar.module.scss';

type NavbarProps = {
    className?: string;
};

export const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
    const { className } = props;

    const { t } = useTranslation();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const toggleModal = useCallback(() => {
        setShowAuthModal((prev) => !prev);
    }, [setShowAuthModal]);

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <Button
                className={cls.authButton}
                theme={ButtonTheme.Blank}
                onClick={toggleModal}
            >
                {t('Войти')}
            </Button>

            <Modal isOpen={showAuthModal} onClose={toggleModal}>
                1322332
            </Modal>
        </div>
    );
};
