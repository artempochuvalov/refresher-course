import type { Meta, StoryObj } from '@storybook/react';

import { ArticleBlockType } from '../../model/types/article';
import { ArticleTextBlockComponent } from './ArticleTextBlockComponent';

const meta = {
    title: 'entities/articleDetails/ArticleTextBlockComponent',
    component: ArticleTextBlockComponent,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ArticleTextBlockComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        block: {
            id: '1',
            type: ArticleBlockType.TEXT,
            title: 'Заголовок',
            paragraphs: [
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                In eros metus, aliquet a nisi at, rutrum aliquam lectus. Integer 
                ornare dictum libero, a auctor dui bibendum eget. Nullam imperdiet ipsum
                quis lacus posuere sodales. Cras non malesuada sapien. Phasellus consectetur
                luctus sem, gravida elementum leo tempor ut. Nullam nec suscipit nulla, vitae
                porta neque. Pellentesque habitant morbi tristique senectus et netus et malesuada
                fames ac turpis egestas. Maecenas varius lorem vitae leo placerat placerat. Sed eu
                molestie est, vitae efficitur justo. Nulla fermentum metus lorem, in sagittis
                lorem pharetra at.`,
            ],
        },
    },
};
