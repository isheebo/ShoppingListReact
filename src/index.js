import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const App = () => (
    <div>
        <Provider store={store}>
            <Routes />
        </Provider>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
