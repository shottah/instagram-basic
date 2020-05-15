export type AuthOptions = {
    AppID: string,
    ClientSecret: string,
    RedirectURI: string,
    AccessToken: string,
    Scope: Array<String>,
}

export default class InstagramAuth {
    private static _instance: InstagramAuth;
    private static _options: AuthOptions;

    public get instance (): InstagramAuth {return InstagramAuth._instance};
    public get options (): AuthOptions {return InstagramAuth._options};
    
    private constructor (options:AuthOptions) {
        InstagramAuth._options = options;
    }

    public static getInstance = (options: AuthOptions): InstagramAuth => {
        if (InstagramAuth._instance) return InstagramAuth._instance;
        else return InstagramAuth._instance = new InstagramAuth(options);
    }    
};
