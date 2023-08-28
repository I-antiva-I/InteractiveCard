import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// CSS
import "./css/styles_main.css"
import "./css/styles_variables.css"

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
