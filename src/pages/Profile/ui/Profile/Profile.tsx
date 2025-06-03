import type { Country } from 'entities/Country';
import type { Currency } from 'entities/Currency';
import {
    fetchProfileData,
    getEditableProfileData,
    getProfileError,
    getProfileIsLoading,
    getProfileReadonly,
    getValidationProfileErrors,
    profileActions,
    ProfileCard,
    profileReducer,
    ValidationProfileError
} from 'entities/Profile';
import { getUserAuthData } from 'entities/User';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Page } from 'shared/ui/Page/Page';
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

    const { id } = useParams();

    const user = useSelector(getUserAuthData);

    const editableProfileData = useSelector(getEditableProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validationProfileErrors = useSelector(getValidationProfileErrors);

    const isCurrentUserProfile = useMemo(
        () => user?.id === editableProfileData?.id,
        [user, editableProfileData]
    );

    const validationErrorsText: Record<ValidationProfileError, string> = {
        [ValidationProfileError.INCORRECT_AGE]: 'Некорректный возраст',
        [ValidationProfileError.INCORRECT_CITY]: 'Некорректный город',
        [ValidationProfileError.INCORRECT_PERSONAL_DATA]: 'Имя и фамилия обязательны',
        [ValidationProfileError.NO_DATA]: 'Нет данных',
        [ValidationProfileError.SERVER_ERROR]: 'Произошла ошибка на сервере',
    };

    useDynamicModuleLoader({
        reducers: {
            profile: profileReducer,
        },
    });

    useInitialEffect(() => {
        if (!id) {
            return;
        }

        dispatch(fetchProfileData(id));
    });

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
        <Page className={classNames('', {}, [className])}>
            <ProfileHeader isEditable={isCurrentUserProfile} />

            {validationProfileErrors?.length && (
                <div className={cls.validationErrors}>
                    {validationProfileErrors.map((error) => (
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
        </Page>
    );
});

export default Profile;
