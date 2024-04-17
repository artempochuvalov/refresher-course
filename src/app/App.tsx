import './styles/index.scss';

import { RouteProvider } from 'app/providers/routeConfig';
import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames';
import { useTheme } from 'shared/providers/theme';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

const App = () => {
    const { theme } = useTheme();

    return (
        <Suspense>
            <div className={classNames('app', {}, [theme])}>
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <RouteProvider />
                </div>
            </div>
        </Suspense>
    );
};

export default App;
