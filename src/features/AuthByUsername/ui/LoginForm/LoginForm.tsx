import {
    type FC,
    memo,
    useCallback
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import { TextAtom, TextAtomTheme } from 'shared/ui/TextAtom/TextAtom';

import { getLogginError } from '../../model/selectors/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export type LoginFormProps = {
    className?: string;
    onSuccess: () => void;
};

const LoginForm: FC<LoginFormProps> = memo((props: LoginFormProps) => {
    const { className, onSuccess } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

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
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [username, password, dispatch, onSuccess]);

    return (
        <form className={classNames(cls.LoginForm, {}, [className])}>
            <TextAtom title={t('Форма авторизации')} />
            {error && (
                <TextAtom
                    text={t('Вы ввели неверный логин или пароль')}
                    theme={TextAtomTheme.Error}
                />
            )}

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
