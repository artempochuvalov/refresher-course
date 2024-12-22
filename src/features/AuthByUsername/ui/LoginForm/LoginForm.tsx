import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';

import cls from './LoginForm.module.scss';

type LoginFormProps = {
    className?: string;
};

export const LoginForm: FC<LoginFormProps> = (props) => {
    const { className } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input
                className={cls.input}
                autoFocus
                type="text"
                placeholder={t('Логин')}
            />
            <Input
                className={cls.input}
                type="text"
                placeholder={t('Пароль')}
            />

            <Button className={cls.loginButton}>
                {t('Войти')}
            </Button>
        </div>
    );
};
