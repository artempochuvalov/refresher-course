import { RouteProvider } from 'app/providers/routeConfig';
import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

const App = () => (
    <Suspense>
        <div className={classNames('app')}>
            <Navbar />
            <div className="content-page">
                <Sidebar />
                <RouteProvider />
            </div>
        </div>
    </Suspense>
);

export default App;
