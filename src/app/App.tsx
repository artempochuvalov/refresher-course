import './styles/index.scss';

import { RouteProvider } from 'app/providers/routeConfig';
import { useTheme } from 'shared/providers/theme';
import { classNames } from 'shared/lib/classNames';
import { Navbar } from 'widgets/Navbar';

const App = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar />
            <button onClick={toggleTheme}>Toggle</button>
            <RouteProvider />
        </div>
    );
};

export default App;
