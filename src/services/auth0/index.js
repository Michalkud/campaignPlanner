import auth0 from 'auth0-js';
import { domain, clientId, audience, redirect } from '../../config';

    export default class Auth {
      auth0 = new auth0.WebAuth({
        domain: domain,
        clientID: clientId,
        redirectUri: redirect,
        audience: audience,
        responseType: 'token id_token',
        scope: 'openid profile email'
      });
      handleAuthentication(cb) {
        this.auth0.parseHash({ hash: window.location.hash }, (err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.auth0.client.userInfo(authResult.accessToken, (err2, profile) => {
              this.storeAuth0Cred(authResult, profile);
              cb(false, { ...authResult, ...profile });
            });
          } else if (err) {
            cb(true, err);
          }
        });
      }
      storeAuth0Cred(authResult, profile) {

        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('auth_access_token', authResult.accessToken);
        localStorage.setItem('auth_id_token', authResult.idToken);
        localStorage.setItem('auth_expires_at', expiresAt);
        localStorage.setItem('auth_profile', JSON.stringify(profile));
      }
      storeGraphCoolCred(authResult) {
        localStorage.setItem('auth_gcool_token', authResult.token);
        localStorage.setItem('auth_gcool_id', authResult.id);
      }
      login() {
        this.auth0.authorize();
      }
      logout(history) {
        // Clear access token and ID token from local storage
        localStorage.removeItem('auth_access_token');
        localStorage.removeItem('auth_id_token');
        localStorage.removeItem('auth_expires_at');
        localStorage.removeItem('auth_profile');
        localStorage.removeItem('auth_gcool_token');
        localStorage.removeItem('auth_gcool_id');
        // navigate to the home route
        history.replace('/');
      }
      isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('auth_expires_at'));
        return new Date().getTime() < expiresAt;
      }
      getProfile() {
        return JSON.parse(localStorage.getItem('auth_profile'));
      }
    }
