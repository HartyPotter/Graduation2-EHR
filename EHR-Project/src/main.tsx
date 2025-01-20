import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './components/UserContext'; // Import the UserProvider

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="ehr-ai.eu.auth0.com"
        clientId="whl6KpiGwgaKVuR1ABy9MBjwuif2NVx7"
        authorizationParams={{
          redirect_uri: window.location.origin + '/callback',
          audience: 'https://gateway-ehr-api.com'
        }}
        cacheLocation="memory" // Use memory storage for tokens
        useRefreshTokens={true} // Enable refresh tokens for seamless token renewal
      >
        <UserProvider>
          <App />
        </UserProvider>
      </Auth0Provider>
    </BrowserRouter>
  // </React.StrictMode>
);