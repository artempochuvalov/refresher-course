import './styles/index.scss';

import { RouteProvider } from 'app/providers/routeConfig';
import { useTheme } from 'shared/providers/theme';
import { classNames } from 'shared/lib/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense } from 'react';

const App = () => {
    const { theme } = useTheme();

    return (
        <Suspense>
            <div className={classNames('app', {}, [theme])}>
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <div className="page-wrapper">
                        <RouteProvider />
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default App;
