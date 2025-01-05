import { profileReducer } from 'entities/Profile';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';

type ProfileProps = {
    className?: string;
};

const Profile = memo((props: ProfileProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    useDynamicModuleLoader({
        reducers: {
            profile: profileReducer,
        },
    });

    return (
        <div className={classNames('', {}, [className])}>
            {t('Профиль')}
        </div>
    );
});

export default Profile;
