import { memo, useCallback } from 'react';
import { Copy } from 'shared/assets/icons';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';

import cls from './Code.module.scss';

type CodeProps = {
    className?: string;
    text: string;
};

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const handleCopy = useCallback(() => {
        window.navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <code className={classNames(cls.Code, {}, [className])}>
            <Button
                theme={ButtonTheme.Blank}
                className={cls.copyButton}
                onClick={handleCopy}
            >
                <Copy className={cls.copyIcon} />
            </Button>
            {text}
        </code>
    );
});
