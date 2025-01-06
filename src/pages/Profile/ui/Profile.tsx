import {
    fetchProfileData,
    getProfileData,
    getProfileIsLoading,
    ProfileCard,
    profileReducer
} from 'entities/Profile';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';

type ProfileProps = {
    className?: string;
};

const Profile = memo((props: ProfileProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();

    const profileData = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);

    useDynamicModuleLoader({
        reducers: {
            profile: profileReducer,
        },
    });

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <div className={classNames('', {}, [className])}>
            <ProfileCard
                profileData={profileData}
                isLoading={isLoading}
            />
        </div>
    );
});

export default Profile;
