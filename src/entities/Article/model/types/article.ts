import { User } from 'entities/User';

export enum ArticleType {
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS',
}

export enum ArticleBlockType {
    TEXT = 'TEXT',
    CODE = 'CODE',
    IMAGE = 'IMAGE',
}

export type ArticleBlockBase = {
    id: string;
    type: ArticleBlockType;
}

export type ArticleTextBlock = ArticleBlockBase & {
    type: ArticleBlockType.TEXT;
    title: string;
    paragraphs: string[];
};

export type ArticleImageBlock = ArticleBlockBase & {
    type: ArticleBlockType.IMAGE;
    src: string;
    title: string;
};

export type ArticleCodeBlock = ArticleBlockBase & {
    type: ArticleBlockType.CODE;
    code: string;
};

export type ArticleBlock =
    | ArticleTextBlock
    | ArticleImageBlock
    | ArticleCodeBlock;

export type Article = {
    id: string;
    user: User;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
};
