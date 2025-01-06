import { getProfileData } from 'entities/Profile';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import { TextAtom } from 'shared/ui/TextAtom/TextAtom';

import cls from './ProfileCard.module.scss';

type ProfileCardProps = {
    className?: string;
};

export const ProfileCard = memo((props: ProfileCardProps) => {
    const { className } = props;

    const { t } = useTranslation('profile');

    const profileData = useSelector(getProfileData);

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
