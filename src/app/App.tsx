import { RouteProvider } from 'app/providers/routeConfig';
import { Suspense } from 'react';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

const App = () => (
    <Suspense>
        <div className="app">
            <Navbar />
            <div className="content-page">
                <Sidebar />
                <RouteProvider />
            </div>
        </div>
    </Suspense>
);

export default App;
