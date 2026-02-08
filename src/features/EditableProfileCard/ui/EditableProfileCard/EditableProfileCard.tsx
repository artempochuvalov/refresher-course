import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileCard } from '@/entities/Profile';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { VStack } from '@/shared/ui/Stack';
import { TextAtom, TextAtomTheme } from '@/shared/ui/TextAtom/TextAtom';

import { ValidationProfileError } from '../../model/constants';
import {
    getEditableProfileData,
    getProfileError,
    getProfileIsLoading,
    getProfileReadonly,
    getValidationProfileErrors
} from '../../model/selectors/editableProfileCardSelectors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slices/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
    id?: string;
    className?: string;
}

const validationErrorsText: Record<ValidationProfileError, string> = {
    [ValidationProfileError.INCORRECT_AGE]: 'Некорректный возраст',
    [ValidationProfileError.INCORRECT_CITY]: 'Некорректный город',
    [ValidationProfileError.INCORRECT_PERSONAL_DATA]: 'Имя и фамилия обязательны',
    [ValidationProfileError.NO_DATA]: 'Нет данных',
    [ValidationProfileError.SERVER_ERROR]: 'Произошла ошибка на сервере',
};

const reducers = {
    profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { id, className } = props;
    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();

    const editableProfileData = useSelector(getEditableProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validationProfileErrors = useSelector(getValidationProfileErrors);

    const user = useSelector(getUserAuthData);
    const isCurrentUserProfile = useMemo(
        () => user?.id === editableProfileData?.id,
        [user, editableProfileData]
    );

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

    useDynamicModuleLoader({
        reducers,
    });

    useInitialEffect(() => {
        if (!id) {
            return;
        }

        dispatch(fetchProfileData(id));
    });

    if (!id) {
        return (
            <TextAtom
                text={t('Статья не найдена')}
                className={classNames('', {}, [className])}
            />
        );
    }

    return (
        <VStack fullWidth gap="32" className={classNames('', {}, [className])}>
            <EditableProfileCardHeader isEditable={isCurrentUserProfile} />

            {validationProfileErrors?.length && (
                <>
                    {validationProfileErrors.map((error) => (
                        <TextAtom
                            key={error}
                            theme={TextAtomTheme.Error}
                            text={t(validationErrorsText[error])}
                            dataTestId="EditableProfileCard.Error"
                        />
                    ))}
                </>
            )}

            <ProfileCard
                profileData={editableProfileData}
                readonly={readonly}
                isLoading={isLoading}
                error={error}
                dataTestId="EditableProfileCard"
                onFirstnameChange={onFirstnameChange}
                onLastnameChange={onLastnameChange}
                onAgeChange={onAgeChange}
                onCityChange={onCityChange}
                onAvatarChange={onAvatarChange}
                onCurrencyChange={onCurrencyChange}
                onCountryChange={onCountryChange}
            />
        </VStack>
    );
});
