import { fireEvent, screen } from '@testing-library/react';
import {
    renderWithTranslation
} from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('Sidebar render', () => {
        renderWithTranslation(<Sidebar />);

        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('Sidebar toggle', () => {
        renderWithTranslation(<Sidebar />);

        const sidebar = screen.getByTestId('sidebar');
        const toggleBtn = screen.getByTestId('sidebar-btn');

        expect(sidebar).not.toHaveClass('collapsed');

        fireEvent.click(toggleBtn);

        expect(sidebar).toHaveClass('collapsed');
    });
});
