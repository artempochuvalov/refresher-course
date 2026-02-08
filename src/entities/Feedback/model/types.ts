export type StarsType = 1 | 2 | 3 | 4 | 5;

export type Feedback = {
    id: string;
    stars: StarsType;
    feedback?: string;
    userId: string;
};
