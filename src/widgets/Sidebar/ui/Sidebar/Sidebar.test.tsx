import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('Sidebar render', () => {
        componentRender(<Sidebar />);

        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('Sidebar toggle', () => {
        componentRender(<Sidebar />);

        const sidebar = screen.getByTestId('sidebar');
        const toggleBtn = screen.getByTestId('sidebar-btn');

        expect(sidebar).not.toHaveClass('collapsed');

        fireEvent.click(toggleBtn);

        expect(sidebar).toHaveClass('collapsed');
    });
});
