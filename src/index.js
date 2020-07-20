import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import './index.scss';
import './App.scss';
import App from './components/App';
import 'font-awesome/css/font-awesome.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
