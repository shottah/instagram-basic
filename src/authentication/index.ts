import { API_URL } from '../config';

export type AuthOptions = {
    AppID: string,
    ClientSecret: string,
    RedirectURI: string,
    AccessToken: string | undefined,
    Scope: Array<String>,
}

export default class InstagramAuth {
    private static _instance: InstagramAuth;
    private static _options: AuthOptions;

    public get AccessToken () { return InstagramAuth._options.AccessToken };
    
    private constructor (options:AuthOptions) {
        InstagramAuth._options = options;
    }

    public static getInstance = (options: AuthOptions): InstagramAuth => {
        if (InstagramAuth._instance) return InstagramAuth._instance;
        else return InstagramAuth._instance = new InstagramAuth(options);
    }

    /**
     * Constructs the URL Required to get the User's
     * Authorization Code.
     * 
     * @returns authorisation_url [String]
     */
    private constructAuthorisationUrl = (): String => {
        return (
            API_URL + 
            'oauth/authorize' +
            '?client_id=' + InstagramAuth._options.AppID +
            '&redirect_uri=' + InstagramAuth._options.RedirectURI +
            '&scope=' + InstagramAuth._options.Scope.join(',') + 
            '&response_type=code' 
        );
    }

    private getAuthorisationCode = (): {authorisation_code: String} => {
        return {authorisation_code: ''};
    }

    private getAccessToken = (authorisation_code: String): {access_token: String} => {
        return {access_token: ''};
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
