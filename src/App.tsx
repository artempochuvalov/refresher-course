import { Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { MainPageLazy } from './pages/Main/Main.lazy';
import { AboutPageLazy } from './pages/About/About.lazy';
import { Suspense } from 'react';
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';

const App = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>Toggle</button>
            <Suspense>
                <Routes>
                    <Route path={'/'} element={<MainPageLazy />} />
                    <Route path={'/about'} element={<AboutPageLazy />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
