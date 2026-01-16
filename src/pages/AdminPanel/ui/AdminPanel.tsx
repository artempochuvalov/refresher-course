import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';

const AdminPanel = memo(() => {
    const { t } = useTranslation();

    return (
        <Page>
            {t('Админка')}
        </Page>
    );
});

export default AdminPanel;
