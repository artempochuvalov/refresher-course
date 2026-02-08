import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RouteProvider } from '@/app/providers/RouterConfig';
import { getUserSliceInitted, userActions } from '@/entities/User';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

const App = () => {
    const dispatch = useDispatch();

    const initted = useSelector(getUserSliceInitted);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <Suspense>
            <div className="app">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {initted && <RouteProvider />}
                </div>
            </div>
        </Suspense>
    );
};

export default App;
