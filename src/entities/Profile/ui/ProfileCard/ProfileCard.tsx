import { Profile } from 'entities/Profile';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader';
import { TextAtom, TextAtomTheme } from 'shared/ui/TextAtom/TextAtom';

import cls from './ProfileCard.module.scss';

type ProfileCardProps = {
    className?: string;
    profileData?: Profile;
    isLoading?: boolean;
    error?: string;
};

export const ProfileCard = memo((props: ProfileCardProps) => {
    const {
        className,
        profileData,
        isLoading,
        error,
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

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <TextAtom title={t('Профиль пользователя')} />
                <Button className={cls.editButton} theme={ButtonTheme.Outline}>
                    {t('Редактировать')}
                </Button>
            </div>
            <div className={cls.data}>
                <Input
                    className={cls.input}
                    value={profileData?.first}
                    placeholder={t('Ваше имя')}
                />
                <Input
                    className={cls.input}
                    value={profileData?.lastname}
                    placeholder={t('Ваша фамилия')}
                />
            </div>
        </div>
    );
});
