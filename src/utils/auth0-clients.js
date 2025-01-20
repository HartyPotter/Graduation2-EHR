import {AuthenticationClient, ManagementClient, UsersManager } from 'auth0';
import { auth0_domain, auth0_domain2, auth0_audience, client_id, client_secret } from '../config/config.js';

export const userManager = new UsersManager({
  baseUrl: auth0_domain,
})

export const auth0Management = new ManagementClient({
    domain: auth0_domain,
    clientId: client_id,
    clientSecret: client_secret,
    scope: 'create:users read:users update:users delete:users',
  });
  

export const auth0Authentication = new AuthenticationClient({
    domain: auth0_domain,
    clientId: client_id,
    clientSecret: client_secret,
});