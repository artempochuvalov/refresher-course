import { memo, Suspense } from 'react';
import { classNames } from 'shared/lib/classNames';
import { Loader } from 'shared/ui/Loader';
import { Modal } from 'shared/ui/Modal/Modal';

import { LoginFormLazy as LoginForm } from '../LoginForm/LoginForm.lazy';

type LoginModalProps = {
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
};

export const LoginModal = memo((props: LoginModalProps) => {
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
            <Suspense fallback={<Loader />}>
                <LoginForm onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
});
