import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/configureStore';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

/**
 * For using Redux in React, the <Provider /> component wraps the entire
 *  application and passes the store down to all children.
 */

const App = () => (
    // provide the store that we will use for our application
    <div>
        <Provider store={store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
