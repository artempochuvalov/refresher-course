import { FC, SVGProps } from 'react';

export type SidebarItemType = {
    path: string;
    text: string;
    Icon: FC<SVGProps<SVGElement>>;
};
