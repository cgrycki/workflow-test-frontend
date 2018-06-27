import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Load our environment variables.
require('dotenv').config()

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
