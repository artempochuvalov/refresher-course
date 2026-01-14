import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { HStack } from 'shared/ui/Stack';
import { TextAtom } from 'shared/ui/TextAtom/TextAtom';

import { getProfileReadonly } from '../../model/selectors/editableProfileCardSelectors';
import { updateProfile } from '../../model/services/updateProfile/updateProfile';
import { profileActions } from '../../model/slices/profileSlice';

interface EditableProfileCardHeaderProps {
    isEditable: boolean;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
    const { isEditable } = props;

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

    const actionButtons = useMemo(() => (
        readonly ? (
            <HStack>
                <Button
                    theme={ButtonTheme.Outline}
                    onClick={onEditClick}
                >
                    {t('Редактировать')}
                </Button>
            </HStack>
        ) : (
            <HStack gap="8">
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
            </HStack>
        )
    ), [onCancelClick, onEditClick, onSave, readonly, t]);

    return (
        <HStack align="center" justify="between" fullWidth>
            <TextAtom title={t('Профиль пользователя')} />
            {isEditable && actionButtons}
        </HStack>
    );
});
