import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import { TextAtom, TextAtomTheme } from 'shared/ui/TextAtom/TextAtom';

import cls from './AddCommentForm.module.scss';

export type AddCommentFormProps = {
    onSend: (value: string) => Promise<void>;
    error?: string;
    className?: string;
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const {
        onSend,
        error,
        className,
    } = props;

    const { t } = useTranslation();

    const [value, setValue] = useState('');

    const onChange = useCallback((newValue: string) => {
        setValue(newValue);
    }, []);

    const onClickSend = useCallback(async () => {
        await onSend(value);
        if (!error) {
            setValue('');
        }
    }, [onSend, value, error]);

    return (
        <div className={classNames(cls.AddCommentForm, {}, [className])}>
            <div className={cls.contentWrapper}>
                <Input
                    value={value}
                    onChange={onChange}
                    placeholder={t('Введите текст комментария')}
                />
                <Button theme={ButtonTheme.Outline} onClick={onClickSend}>
                    {t('Отправить')}
                </Button>
            </div>
            {error && (
                <TextAtom
                    className={cls.error}
                    text={t('Ошибка отправки комментария')}
                    theme={TextAtomTheme.Error}
                />
            )}
        </div>
    );
});

export default AddCommentForm;
