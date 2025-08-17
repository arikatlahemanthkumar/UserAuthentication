import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import AuthProvider from './components/AuthProvider';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <AuthProvider> {/* Global authentication state provider */}
    <App />
  </AuthProvider>
  </BrowserRouter>
);

