import InstagramAuth from "../authentication";
import axios from 'axios';
import {API_URL} from '../config';

type UserField = 'account_type' | 'id' | 'media_count' | 'username' | 'media';
type MediaField = 'id' | 'caption' | 'media_url' | 'permalink' | 'thumbnail_url' | 'timestamp' | 'username';
type InstagramResponse = {
    status: Number,
    statusText: String,
    data?: Array<Object>,
    error?: String
}
export default class InstagramBasicService {
    private auth: InstagramAuth;

    public constructor (auth: InstagramAuth) {
        this.auth = auth;
    }

    /**
     * Gets data from the User node supplied, populated with 
     * data according to the MediaField(s) supplied.
     * @param user [Optional]
     * @param fields [Optional]
     */
    public getMedia = async (user: String, fields: Array<MediaField> = ['id', 'caption']): Promise<InstagramResponse | any> => {
        if (!this.auth.isAuthorised()) return new Error("Instagram API Access Token is invalid or missing.");

        let response = await axios.get(API_URL  + 'me/media', 
            {
                params: {
                    fields: fields.join(','),
                    access_token: '000fea',
                },
                transformResponse: [o => JSON.parse(o)]
            }
        );

        const result: InstagramResponse = {
            status: response.status,
            statusText: response.statusText,
            data: response.data,
        };

        return result;
    }

    public getUser (fields? : Array<UserField>): any {
        if (!this.auth.isAuthorised()) return [];
    }
}