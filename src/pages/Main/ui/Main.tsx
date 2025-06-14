import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <Page>
            {t('Главная страница')}
        </Page>
    );
});

export default MainPage;
