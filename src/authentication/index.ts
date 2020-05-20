import { API_URL } from '../config';

export type AuthOptions = {
    ClientID: String,
    ClientSecret: String,
    RedirectUri?: String,
    AccessToken?: String,
    Scope: Array<String>,
}

export default class InstagramAuth {
    private static _instance: InstagramAuth;
    private static _options: AuthOptions;

    public get AccessToken () { return InstagramAuth._options.AccessToken };
    
    private constructor (options:AuthOptions) {
        InstagramAuth._options = options;
    }

    /**
     * This function returns the Singleton instance of 
     * an InstagramAuth Object. This ensures that the 
     * object is the same across all moments when 
     * the software is executing.
     */
    public static getInstance = (options: AuthOptions): InstagramAuth => {
        if (InstagramAuth._instance) return InstagramAuth._instance;
        else return InstagramAuth._instance = new InstagramAuth(options);
    }

    /**
     * Constructs the URL Required to get the User's
     * Authorization Code.
     */
    private constructAuthorisationUrl = (): String => {
        return (
            API_URL + 
            'oauth/authorize' +
            '?client_id=' + InstagramAuth._options.ClientID +
            '&redirect_uri=' + InstagramAuth._options.RedirectUri +
            '&scope=' + InstagramAuth._options.Scope.join(',') + 
            '&response_type=code'
        );
    }

    /**
     * Constructs the URL Required to get the User's 
     * Long Lived Access Token.
     */
    private constructAccessTokenUrl = (authorisation_code: String): String => {
        return (
            API_URL +
            'oauth/access_token' +
            '?client_id=' + InstagramAuth._options.ClientID +
            '&client_secret=' + InstagramAuth._options.ClientSecret +
            '&grant_type=authorization_code' +
            '&redirect_url=' + InstagramAuth._options.RedirectUri +
            '&code=' + authorisation_code
        );
    }

    /**
     * Sets the authorisation token received from the 
     * Instagram Authorisation callback URL.
     */
    public authorise = (access_token: String): void => {
        InstagramAuth._options.AccessToken = access_token;
    }

    /**
     * Checks whether the Access Token on the authorisation 
     * instance is valid by sending a request to the 
     * Instagram API URL.
     */
    public isAuthorised = (): Boolean => {
        return InstagramAuth._options.AccessToken ? true : false;
    }
};
