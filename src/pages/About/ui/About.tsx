import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = memo(() => {
    const { t } = useTranslation();

    return (
        <div>
            {t('О сайте')}
        </div>
    );
});

export default AboutPage;
