import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {TodoProvider} from './components/TodoContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodoProvider>
    <App/>
    </TodoProvider>
  </React.StrictMode>
);
reportWebVitals();
