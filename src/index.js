import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const App = () => <p>Hello World</p>;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
