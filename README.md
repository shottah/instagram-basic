# Instagram Basic Display API Package

This package was developed for use of Instagram's Basic Display API, the follow up to their v1 RESTful API. This package covers usage of the Basic Display API, and not the extended Instagram Graph API.

## Installing this package

The package is not published as of this commit, but should become available by using

```
npm install instagram-basic
```
or
```
npm install @matabeitt/instagram-basic
```

## Building this Package

```
npm run build
```

# About This Package

## InstagramAuth

This object instantiates the data required to authenticate an Instagram User for the API to be called. This is achieved by using the singleton constructor:

```js
const instagram = InstagramAuth.getInstance({
    clientID: String,
    clientSecret: String,
    redirectUri: String,
    accessToken?: String,
    scope: Array<String>
})
```

### Singleton Pattern

The `InstagramAuth` object is a singleton object. This is to ensure that across your node application, you maintain the same instance of your Instagram client calls. This also avoids having to pass the class through many functions.

### Authenticating a User

If you are trying to authenticate your own test user and already possess the Long Lived Access Token, you can authenticate the user by supplying it to the `InstagramAuth.getInstance(...)` function. Optionally, you can use the below function to authenticate the user retroactively.

```js
instagram.authenticate(access_token);
```

If you are trying to authenticate a user via your application, you need to follow the steps to request User Authentication Code and User Long Lived Access Token from the `Auth` endpoint of your server.

```ts
const url: String = instagram.constructAuthenticationUrl();
```

This will construct a `URL` for your user to be redirected to when requesting to connect to instagram. After completing this step, they will be redirected to your server's `Auth` endpoint, where you can extrapolate the Authentication Code from the `response`. *See example below using ExpressJS.*

```js
app.get('/auth', (response, request) => {
    const authentication_code = request.query.code;
    const access_code_url = instagram.constructAccessTokenUrl(authentication_code);
})
```

You can use this `access_code_url` in order to get the Long Lived Access Token.

```js
app.get('/auth', (response, request) => {
    const access_token = request.query.access_token;
    instagram.authenticate(access_token);
})
```

At this point, your `InstagramAuth` object has an authenticated user attached to it and you can begin making requests to the **Instagram Basic Display API**.