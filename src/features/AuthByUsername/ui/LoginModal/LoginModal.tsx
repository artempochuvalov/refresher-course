import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames';
import { Modal } from 'shared/ui/Modal/Modal';

import { LoginForm } from '../LoginForm/LoginForm';

type LoginModalProps = {
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
};

export const LoginModal: FC<LoginModalProps> = (props) => {
    const {
        className,
        isOpen,
        onClose,
    } = props;

    return (
        <Modal
            lazy
            isOpen={isOpen}
            onClose={onClose}
            className={classNames('', {}, [className])}
        >
            <LoginForm />
        </Modal>
    );
};