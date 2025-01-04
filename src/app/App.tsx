import { RouteProvider } from 'app/providers/routeConfig';
import { userActions } from 'entities/User';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
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
};

export default App;
