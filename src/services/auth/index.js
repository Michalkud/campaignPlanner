import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './config';
class Auth {

  tokenRenewalTimeout

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      audience: AUTH_CONFIG.audience,
      responseType: 'token id_token',
      scope: 'openid',
      auth: {
        sso: true, 
      }
    });

    this.scheduleRenewal();
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.error(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }


  /**
   * Start timer for renew token
   */
  startRenewTimer(expiresIn) {
    this.renewTimer = setTimeout(() => { 
      this.renew(); 
    }, parseInt(expiresIn, 0));
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    // Set the time that the access token will expire at
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the admin route

    this.scheduleRenewal();

    history.replace('/');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    clearTimeout(this.tokenRenewalTimeout);
    // navigate to the admin route
    history.replace('/');
  }

  isAuthenticated() {
    /**
     * Check whether token exists
     */
    const token = localStorage.getItem('access_token');
    if (!token) {
      return false;
    }

    /**
     * Check it's expiration time
     */
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));

    if (!expiresAt) {
      return false;
    }
    
    return new Date().getTime() < expiresAt;
  }

  scheduleRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  }

  renewToken() {
    this.auth0.checkSession({
      audience: AUTH_CONFIG.audience,
      scope:'openid'
    }, (err, result) => {
        if (err) {
          alert('Error occurred. Open app new window' + JSON.stringify(err));
        } else {
          this.setSession(result);
        }
      }
    );
  }
}

const auth = new Auth(history);
export default auth;
