import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// need to change BrowserRouter to HashRouter for gh-pages
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
