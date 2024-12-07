import { render, screen } from '@testing-library/react';

import { Button, ButtonTheme } from './Button';

describe('Button', () => {
    test('Button contains text passed', () => {
        const buttonText = 'TEST';
        render(<Button>{buttonText}</Button>);

        expect(screen.getByText(buttonText)).toBeInTheDocument();
    });

    test('Button contains theme passed', () => {
        render(<Button theme={ButtonTheme.Blank}>TEST</Button>);

        expect(screen.getByRole('button')).toHaveClass('blank');
    });
});
