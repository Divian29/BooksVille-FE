import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <React.StrictMode>
            <GoogleOAuthProvider clientId="453748611011-irgunp6oo51ssfb5sqms1evoleedb47q.apps.googleusercontent.com">
                <App/>
            </GoogleOAuthProvider>
        </React.StrictMode>
    </BrowserRouter>,
)
