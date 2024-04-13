import './styles/index.scss';

import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';

import { MainPage } from 'pages/Main';
import { AboutPage } from 'pages/About';

import { useTheme } from 'shared/providers/theme';
import { classNames } from 'shared/lib/classNames';

const App = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>Toggle</button>
            <Suspense>
                <Routes>
                    <Route path={'/'} element={<MainPage />} />
                    <Route path={'/about'} element={<AboutPage />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
