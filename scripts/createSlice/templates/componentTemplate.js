/* eslint-disable max-len */
const firstLetterCapitalized = require('../firstLetterCapitalized');

module.exports = (sliceName) => `import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';

import cls from './${firstLetterCapitalized(sliceName)}.module.scss';

interface ${firstLetterCapitalized(sliceName)}Props {
    className?: string;
}

export const ${firstLetterCapitalized(sliceName)} = memo((props: ${firstLetterCapitalized(sliceName)}Props) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.${firstLetterCapitalized(sliceName)}, {}, [className])}>
            {t('content')}
        </div>
    );
});
`;
