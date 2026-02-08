import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { EditableProfileCard } from '@/features/EditableProfileCard';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

const Profile = memo(() => {
    const { id } = useParams();

    return (
        <Page>
            <VStack fullWidth gap="32">
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
});

export default Profile;
