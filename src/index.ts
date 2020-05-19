import InstagramAuth from './authentication';
import InstagramBasicService from './services';
import dotenv from 'dotenv';

dotenv.config();

const ig = InstagramAuth.getInstance({
    AppID: process.env.IG_APP_ID || "",
    ClientSecret: process.env.IG_CLIENT_SECRET || "",
    RedirectURI: process.env.IG_REDIRECT_URI || "",
    AccessToken: process.env.IG_ACCESS_TOKEN,
    Scope: ['user_profile', 'user_media'],
});

const service = new InstagramBasicService(ig);
const images = service.getMedia('complextt');
images.then(res => console.log(res.data)).catch(err => console.log(err.response.status))