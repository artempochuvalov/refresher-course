import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import { HStack, VStack } from 'shared/ui/Stack';
import { TextAtom, TextAtomTheme } from 'shared/ui/TextAtom/TextAtom';

import cls from './AddCommentForm.module.scss';

export type AddCommentFormProps = {
    onSendComment: (value: string) => Promise<void>;
    error?: string;
    className?: string;
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const {
        onSendComment,
        error,
        className,
    } = props;

    const { t } = useTranslation();

    const [value, setValue] = useState('');

    const onChange = useCallback((newValue: string) => {
        setValue(newValue);
    }, []);

    const onClickSend = useCallback(async () => {
        await onSendComment(value);
        if (!error) {
            setValue('');
        }
    }, [onSendComment, value, error]);

    return (
        <VStack className={classNames(cls.AddCommentForm, {}, [className])} fullWidth gap="8">
            <HStack fullWidth justify="between" align="center">
                <Input
                    value={value}
                    onChange={onChange}
                    placeholder={t('Введите текст комментария')}
                />
                <Button theme={ButtonTheme.Outline} onClick={onClickSend}>
                    {t('Отправить')}
                </Button>
            </HStack>
            {error && (
                <TextAtom
                    text={t('Ошибка отправки комментария')}
                    theme={TextAtomTheme.Error}
                />
            )}
        </VStack>
    );
});

export default AddCommentForm;
