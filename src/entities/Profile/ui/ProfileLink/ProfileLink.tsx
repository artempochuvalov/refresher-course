import { ReactNode } from 'react';

import { RoutePaths } from '@/shared/constants/routes';
import { classNames } from '@/shared/lib/classNames';
import { AppLink } from '@/shared/ui/AppLink';

type ProfileLinkProps = {
    children: ReactNode;
    id: string;
    className?: string;
};

export const ProfileLink = (props: ProfileLinkProps) => {
    const { id, children, className } = props;

    const route = `${RoutePaths.Profile}${id}`;

    return (
        <AppLink
            to={route}
            className={classNames('', {}, [className])}
        >
            {children}
        </AppLink>
    );
};
