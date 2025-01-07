import { getProfileReadonly, profileActions, updateProfile } from 'entities/Profile';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { TextAtom } from 'shared/ui/TextAtom/TextAtom';

import cls from './ProfileHeader.module.scss';

type ProfileHeaderProps = {
    className?: string;
};

export const ProfileHeader = memo((props: ProfileHeaderProps) => {
    const { className } = props;

    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();

    const readonly = useSelector(getProfileReadonly);

    const onEditClick = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelClick = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfile());
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProfileHeader, {}, [className])}>
            <TextAtom title={t('Профиль пользователя')} />
            {readonly ? (
                <div className={cls.ProfileHeaderControls}>
                    <Button
                        theme={ButtonTheme.Outline}
                        onClick={onEditClick}
                    >
                        {t('Редактировать')}
                    </Button>
                </div>
            ) : (
                <div className={cls.ProfileHeaderControls}>
                    <Button
                        theme={ButtonTheme.OutlineRed}
                        onClick={onCancelClick}
                    >
                        {t('Отменить')}
                    </Button>
                    <Button
                        theme={ButtonTheme.Outline}
                        onClick={onSave}
                    >
                        {t('Сохранить')}
                    </Button>
                </div>
            )}
        </div>
    );
});
