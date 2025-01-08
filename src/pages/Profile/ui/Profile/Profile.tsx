import type { Country } from 'entities/Country';
import type { Currency } from 'entities/Currency';
import {
    fetchProfileData,
    getEditableProfileData,
    getProfileError,
    getProfileIsLoading,
    getProfileReadonly,
    getValidateProfileErrors,
    profileActions,
    ProfileCard,
    profileReducer,
    ValidateProfileError
} from 'entities/Profile';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { TextAtom, TextAtomTheme } from 'shared/ui/TextAtom/TextAtom';

import { ProfileHeader } from '../ProfileHeader/ProfileHeader';
import cls from './Profile.module.scss';

type ProfileProps = {
    className?: string;
};

const Profile = memo((props: ProfileProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();

    const editableProfileData = useSelector(getEditableProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateProfileErrors = useSelector(getValidateProfileErrors);

    const validationErrorsText: Record<ValidateProfileError, string> = {
        [ValidateProfileError.INCORRECT_AGE]: 'Некорректный возраст',
        [ValidateProfileError.INCORRECT_CITY]: 'Некорректный город',
        [ValidateProfileError.INCORRECT_PERSONAL_DATA]: 'Имя и фамилия обязательны',
        [ValidateProfileError.NO_DATA]: 'Нет данных',
        [ValidateProfileError.SERVER_ERROR]: 'Произошла ошибка на сервере',
    };

    useDynamicModuleLoader({
        reducers: {
            profile: profileReducer,
        },
    });

    useEffect(() => {
        if (__PROJECT__ === 'frontend') {
            dispatch(fetchProfileData());
        }
    }, [dispatch]);

    const onFirstnameChange = useCallback((first?: string) => {
        dispatch(profileActions.updateProfileData({ first: first ?? '' }));
    }, [dispatch]);
    const onLastnameChange = useCallback((lastname?: string) => {
        dispatch(profileActions.updateProfileData({ lastname: lastname ?? '' }));
    }, [dispatch]);
    const onAgeChange = useCallback((age?: string) => {
        dispatch(profileActions.updateProfileData({
            age: age ? Number(age) : undefined,
        }));
    }, [dispatch]);
    const onCityChange = useCallback((city?: string) => {
        dispatch(profileActions.updateProfileData({ city: city ?? '' }));
    }, [dispatch]);
    const onAvatarChange = useCallback((avatar?: string) => {
        dispatch(profileActions.updateProfileData({ avatar: avatar ?? '' }));
    }, [dispatch]);
    const onCurrencyChange = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfileData({ currency: currency ?? '' }));
    }, [dispatch]);
    const onCountryChange = useCallback((country: Country) => {
        dispatch(profileActions.updateProfileData({ country: country ?? '' }));
    }, [dispatch]);

    return (
        <div className={classNames('', {}, [className])}>
            <ProfileHeader />

            {validateProfileErrors?.length && (
                <div className={cls.validationErrors}>
                    {validateProfileErrors.map((error) => (
                        <TextAtom
                            key={error}
                            theme={TextAtomTheme.Error}
                            text={t(validationErrorsText[error])}
                        />
                    ))}
                </div>
            )}

            <div className={cls.profileCardWrapper}>
                <ProfileCard
                    profileData={editableProfileData}
                    readonly={readonly}
                    isLoading={isLoading}
                    error={error}
                    onFirstnameChange={onFirstnameChange}
                    onLastnameChange={onLastnameChange}
                    onAgeChange={onAgeChange}
                    onCityChange={onCityChange}
                    onAvatarChange={onAvatarChange}
                    onCurrencyChange={onCurrencyChange}
                    onCountryChange={onCountryChange}
                />
            </div>
        </div>
    );
});

export default Profile;
