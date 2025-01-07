import {
    fetchProfileData,
    getEditableProfileData,
    getProfileError,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    ProfileCard,
    profileReducer
} from 'entities/Profile';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';

import { ProfileHeader } from '../ProfileHeader/ProfileHeader';
import cls from './Profile.module.scss';

type ProfileProps = {
    className?: string;
};

const Profile = memo((props: ProfileProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();

    const editableProfileData = useSelector(getEditableProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);

    useDynamicModuleLoader({
        reducers: {
            profile: profileReducer,
        },
    });

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    const onFirstnameChange = useCallback((first?: string) => {
        dispatch(profileActions.updateProfileData({ first: first ?? '' }));
    }, [dispatch]);
    const onLastnameChange = useCallback((lastname?: string) => {
        dispatch(profileActions.updateProfileData({ lastname: lastname ?? '' }));
    }, [dispatch]);
    const onAgeChange = useCallback((age?: string) => {
        dispatch(profileActions.updateProfileData({
            age: age ? Number(age) : undefined,
        }));
    }, [dispatch]);
    const onCityChange = useCallback((city?: string) => {
        dispatch(profileActions.updateProfileData({ city: city ?? '' }));
    }, [dispatch]);
    const onAvatarChange = useCallback((avatar?: string) => {
        dispatch(profileActions.updateProfileData({ avatar: avatar ?? '' }));
    }, [dispatch]);

    return (
        <div className={classNames('', {}, [className])}>
            <ProfileHeader />
            <div className={cls.ProfileCardWrapper}>
                <ProfileCard
                    profileData={editableProfileData}
                    readonly={readonly}
                    isLoading={isLoading}
                    error={error}
                    onFirstnameChange={onFirstnameChange}
                    onLastnameChange={onLastnameChange}
                    onAgeChange={onAgeChange}
                    onCityChange={onCityChange}
                    onAvatarChange={onAvatarChange}
                />
            </div>
        </div>
    );
});

export default Profile;
