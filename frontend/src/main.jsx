import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';
import store from './store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<Provider store={store}>
		<BrowserRouter>
			<GoogleOAuthProvider clientId="269087393855-9sssc8nbia4gtdg0c8hsfru6eog7ls6b.apps.googleusercontent.com">
				<CookiesProvider defaultSetOptions={{ path: '/' }}>
					<App />
				</CookiesProvider>
			</GoogleOAuthProvider>
		</BrowserRouter>
	</Provider>
	// {/* </React.StrictMode> */}
);
