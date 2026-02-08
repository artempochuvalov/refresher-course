import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';

import cls from './TextAtom.module.scss';

export enum TextAtomTheme {
    Default = 'Default',
    Error = 'Error',
    Inverted = 'Inverted',
}

export enum TextAtomSize {
    S = 's',
    M = 'm',
    L = 'l',
}

export enum TextAtomAlign {
    Left = 'Left',
    Center = 'Center',
    Right = 'Right'
}

type TextAtomProps = {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextAtomTheme;
    size?: TextAtomSize;
    align?: TextAtomAlign;
    dataTestId?: string;
};

type TitleTag = 'h1' | 'h2' | 'h3';
const SizeToTitleTag: Record<TextAtomSize, TitleTag> = {
    s: 'h1',
    m: 'h2',
    l: 'h3',
};

export const TextAtom = memo((props: TextAtomProps) => {
    const {
        className,
        title,
        text,
        theme = TextAtomTheme.Default,
        size = TextAtomSize.M,
        align = TextAtomAlign.Left,
        dataTestId,
    } = props;

    const TitleTag = SizeToTitleTag[size];

    const additionalClasses = [
        className,
        cls[theme],
        cls[align],
        cls[size],
    ];

    return (
        <div className={classNames(cls.TextAtom, {}, additionalClasses)}>
            {title && (
                <TitleTag data-testid={`${dataTestId}.Title`} className={cls.title}>
                    {title}
                </TitleTag>
            )}
            {text && <p data-testid={`${dataTestId}.Paragraph`} className={cls.text}>{text}</p>}
        </div>
    );
});
