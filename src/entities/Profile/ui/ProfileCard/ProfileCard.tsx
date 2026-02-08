import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { type Country, CountrySelect } from '@/entities/Country';
import { type Currency, CurrencySelect } from '@/entities/Currency';
import { classNames, type ClassNamesMods } from '@/shared/lib/classNames';
import { Avatar } from '@/shared/ui/Avatar/';
import { Input } from '@/shared/ui/Input/Input';
import { Loader } from '@/shared/ui/Loader';
import { HStack, VStack } from '@/shared/ui/Stack';
import { TextAtom, TextAtomAlign, TextAtomTheme } from '@/shared/ui/TextAtom/TextAtom';

import { Profile } from '../../model/types';
import cls from './ProfileCard.module.scss';

type ProfileCardProps = {
    className?: string;
    profileData?: Profile;
    isLoading?: boolean;
    readonly?: boolean;
    error?: string;
    dataTestId?: string;
    onFirstnameChange?: (firstname?: string) => void;
    onLastnameChange?: (lastname?: string) => void;
    onAgeChange?: (age?: string) => void;
    onCityChange?: (city?: string) => void;
    onAvatarChange?: (lastname?: string) => void;
    onCurrencyChange?: (currency: Currency) => void;
    onCountryChange?: (country: Country) => void;
};

export const ProfileCard = memo((props: ProfileCardProps) => {
    const {
        className,
        profileData,
        isLoading,
        error,
        readonly,
        dataTestId,
        onFirstnameChange,
        onLastnameChange,
        onAgeChange,
        onCityChange,
        onAvatarChange,
        onCurrencyChange,
        onCountryChange,
    } = props;

    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <HStack className={cls.ProfileCard} justify="center" align="center" fullWidth>
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack className={cls.ProfileCard} justify="center" align="center" fullWidth>
                <TextAtom
                    theme={TextAtomTheme.Error}
                    align={TextAtomAlign.Center}
                    title={t('Произозошла ошибка загрузки профиля')}
                    text={t('Попробуйте загрузить страницу ещё раз')}
                />
            </HStack>
        );
    }

    const avatarSource = (
        __PROJECT__ === 'storybook' ? 'https://www.some.picture' : profileData?.avatar
    );

    const mods: ClassNamesMods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack className={classNames(cls.ProfileCard, mods, [className])} fullWidth>
            {profileData?.avatar && (
                <HStack justify="center" className={cls.avatarWrapper}>
                    <Avatar
                        src={profileData.avatar}
                        alt={t('Изображение профиля')}
                    />
                </HStack>
            )}

            <VStack gap="8">
                <Input
                    value={profileData?.first}
                    placeholder={t('Ваше имя')}
                    readonly={readonly}
                    onChange={onFirstnameChange}
                    data-testid={`${dataTestId}.FirstNameInput`}
                />
                <Input
                    value={profileData?.lastname}
                    placeholder={t('Ваша фамилия')}
                    readonly={readonly}
                    onChange={onLastnameChange}
                    data-testid={`${dataTestId}.LastNameInput`}
                />
                <Input
                    value={String(profileData?.age)}
                    numeric
                    placeholder={t('Возраст')}
                    readonly={readonly}
                    onChange={onAgeChange}
                    data-testid={`${dataTestId}.AgeInput`}
                />
                <Input
                    value={profileData?.city}
                    placeholder={t('Город')}
                    readonly={readonly}
                    onChange={onCityChange}
                    data-testid={`${dataTestId}.CityInput`}
                />
                <Input
                    value={avatarSource}
                    placeholder={t('Ссылка на изображение профиля')}
                    readonly={readonly}
                    onChange={onAvatarChange}
                    data-testid={`${dataTestId}.AvatarInput`}
                />
                <CurrencySelect
                    value={profileData?.currency}
                    readonly={readonly}
                    anchorPosition="top left"
                    onChange={onCurrencyChange}
                />
                <CountrySelect
                    value={profileData?.country}
                    readonly={readonly}
                    anchorPosition="top left"
                    onChange={onCountryChange}
                />
            </VStack>
        </VStack>
    );
});
