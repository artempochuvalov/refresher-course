import type { Meta, StoryObj } from '@storybook/react';

import { Code } from './Code';

const meta = {
    title: 'UI/Code',
    component: Code,
    argTypes: {},
    args: {},
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        text: `
        import { memo } from 'react';
        import { classNames } from 'shared/lib/classNames';

        import cls from './Code.module.scss';

        type CodeProps = {
            className?: string;
            text: string;
        };

        export const Code = memo((props: CodeProps) => {
            const { className, text } = props;

            return (
                <code className={classNames(cls.Code, {}, [className])}>
                    {text}
                </code>
            );
        });
        `,
    },
};
