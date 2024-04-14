import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames';
import cls from './LanguageSwitcher.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';

enum Lang {
    'English' = 'en',
    'Russian' = 'ru'
}

type LanguageSwitcherProps = {
    className?: string;
};

export const LanguageSwitcher: FC<LanguageSwitcherProps> = (props) => {
    const { className } = props;

    const { t, i18n } = useTranslation();

    function toggleLanguage() {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    }

    return (
        <Button
            theme={ButtonTheme.Blank}
            onClick={toggleLanguage}
            className={classNames(cls.LanguageSwitcher, {}, [className])}
        >
            {t('Язык')}
        </Button>
    );
};
