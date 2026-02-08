import { memo, Suspense, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '@/entities/User';
import { RoutePaths } from '@/shared/constants/routes';
import { classNames } from '@/shared/lib/classNames';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal/Modal';

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

    const navigate = useNavigate();

    const onSuccess = useCallback((user: User) => {
        navigate(`${RoutePaths.Profile}${user.id}`);
        onClose?.();
    }, [navigate, onClose]);

    return (
        <Modal
            lazy
            isOpen={isOpen}
            onClose={onClose}
            className={classNames('', {}, [className])}
        >
            <Suspense fallback={<Loader />}>
                <LoginForm onSuccess={onSuccess} />
            </Suspense>
        </Modal>
    );
});
