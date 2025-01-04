import {
    type FC,
    memo,
    useCallback
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { useDynamicModuleLoader } from 'shared/lib/components';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import { TextAtom, TextAtomTheme } from 'shared/ui/TextAtom/TextAtom';

import { getLogginError } from '../../model/selectors/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUserName';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export type LoginFormProps = {
    className?: string;
};

const LoginForm: FC<LoginFormProps> = memo((props: LoginFormProps) => {
    const { className } = props;

    const { t } = useTranslation();
    const dispatch = useDispatch();

    useDynamicModuleLoader({
        reducers: {
            loginForm: loginReducer,
        },
    });

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLogginError);
    const isLoading = useSelector(getLoginIsLoading);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);
    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);
    const onLoginClick = useCallback(async () => {
        dispatch(loginByUsername({ username, password }));
    }, [username, password, dispatch]);

    return (
        <form className={classNames(cls.LoginForm, {}, [className])}>
            <TextAtom title={t('Форма авторизации')} />
            {error && <TextAtom text={error} theme={TextAtomTheme.Error} />}

            <Input
                className={cls.input}
                autoFocus
                type="text"
                placeholder={t('Логин')}
                value={username}
                onChange={onChangeUsername}
            />
            <Input
                className={cls.input}
                type="text"
                placeholder={t('Пароль')}
                value={password}
                onChange={onChangePassword}
            />

            <Button
                type="submit"
                theme={ButtonTheme.Outline}
                className={cls.loginButton}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('Войти')}
            </Button>
        </form>
    );
});

export default LoginForm;
