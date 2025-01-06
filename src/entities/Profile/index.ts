export { getProfileData } from './model/selectors/getProfileData/getProfileData';
export { getProfileError } from './model/selectors/getProfileError/getProfileError';
export { getProfileIsLoading } from './model/selectors/getProfileIsLoading/getProfileIsLoading';
export { fetchProfileData } from './model/services/fetchProfileData';
export { profileActions, profileReducer } from './model/slice/profileSlice';
export type { Profile, ProfileSchema } from './model/types';
export { ProfileCard } from './ui/ProfileCard/ProfileCard';
