import { type Country, CountrySelect } from 'entities/Country';
import { type Currency, CurrencySelect } from 'entities/Currency';
import { Profile } from 'entities/Profile';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, type ClassNamesMods } from 'shared/lib/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader';
import { TextAtom, TextAtomTheme } from 'shared/ui/TextAtom/TextAtom';

import cls from './ProfileCard.module.scss';

type ProfileCardProps = {
    className?: string;
    profileData?: Profile;
    isLoading?: boolean;
    readonly?: boolean;
    error?: string;
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
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <TextAtom
                    theme={TextAtomTheme.Error}
                    title={t('Произозошла ошибка загрузки профиля')}
                    text={t('Попробуйте загрузить страницу ещё раз')}
                />
            </div>
        );
    }

    const mods: ClassNamesMods = {
        [cls.editing]: !readonly,
    };

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.data}>
                {profileData?.avatar && (
                    <div className={cls.avatarWrapper}>
                        <Avatar
                            src={profileData.avatar}
                            alt={t('Изображение профиля')}
                        />
                    </div>
                )}

                <Input
                    className={cls.input}
                    value={profileData?.first}
                    placeholder={t('Ваше имя')}
                    readonly={readonly}
                    onChange={onFirstnameChange}
                />
                <Input
                    className={cls.input}
                    value={profileData?.lastname}
                    placeholder={t('Ваша фамилия')}
                    readonly={readonly}
                    onChange={onLastnameChange}
                />
                <Input
                    className={cls.input}
                    value={String(profileData?.age)}
                    numeric
                    placeholder={t('Возраст')}
                    readonly={readonly}
                    onChange={onAgeChange}
                />
                <Input
                    className={cls.input}
                    value={profileData?.city}
                    placeholder={t('Город')}
                    readonly={readonly}
                    onChange={onCityChange}
                />
                <Input
                    className={cls.input}
                    value={profileData?.avatar}
                    placeholder={t('Ссылка на изображение профиля')}
                    readonly={readonly}
                    onChange={onAvatarChange}
                />
                <CurrencySelect
                    className={cls.input}
                    value={profileData?.currency}
                    readonly={readonly}
                    onChange={onCurrencyChange}
                />
                <CountrySelect
                    className={cls.input}
                    value={profileData?.country}
                    readonly={readonly}
                    onChange={onCountryChange}
                />
            </div>
        </div>
    );
});
