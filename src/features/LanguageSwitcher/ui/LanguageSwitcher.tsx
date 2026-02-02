import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';

enum Lang {
    En = 'en',
    Ru = 'ru'
}

type LanguageSwitcherProps = {
    className?: string;
    short?: boolean;
};

export const LanguageSwitcher = memo((props: LanguageSwitcherProps) => {
    const { className, short } = props;

    const { t, i18n } = useTranslation();

    const toggleLanguage = useCallback(() => {
        i18n.changeLanguage(i18n.language === Lang.Ru ? Lang.En : Lang.Ru);
    }, [i18n]);

    return (
        <Button
            theme={ButtonTheme.Blank}
            onClick={toggleLanguage}
            className={classNames('', {}, [className])}
        >
            {t(short ? 'Короткий язык' : 'Язык')}
        </Button>
    );
});
