import InstagramAuth from "../authentication";
import axios from 'axios';
import {API_URL} from '../config';

type UserField = 'account_type' | 'id' | 'media_count' | 'username' | 'media';
type MediaField = 'id' | 'caption' | 'media_url' | 'permalink' | 'thumbnail_url' | 'timestamp' | 'username';

export default class InstagramBasicService {
    private auth: InstagramAuth;

    public constructor (auth: InstagramAuth) {
        this.auth = auth;
    }

    /**
     * Gets data from the User node supplied, populated with 
     * data according to the MediaField(s) supplied.
     * @param user 
     * @param fields
     */
    public getMedia = (user: String, fields? : Array<MediaField>): any => {
        if (!this.auth.isAuthorised()) return [];

        fields = fields || ['id', 'caption'];
        
        axios.get(API_URL  + 'me/media', 
            {
                params: {
                    fields: fields.join(','),
                    access_token: this.auth.AccessToken,
                },
                transformRequest: [o => JSON.parse(o)]
            }
        ).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    
        return ['images'];
    }

    public getUser (fields? : Array<UserField>): any {
        if (!this.auth.isAuthorised()) return [];
    }
}