<h1>
<a href="http://sailsjs.org"><img alt="Sails.js logo" src="http://balderdashy.github.io/sails/images/logo.png" title="Sails.js"/></a><br><br>sails-hook-simple-auth
</h1>

[![npm version](https://badge.fury.io/js/sails-hook-simple-auth.svg)](https://badge.fury.io/js/sails-hook-simple-auth)
[![Dependencies](https://david-dm.org/sg-medien/sails-hook-simple-auth.svg)](https://david-dm.org/sg-medien/sails-hook-simple-auth)

*Needs at least Sails version 0.12.0 to work.*

[Passport](http://passportjs.org/)-based User Authentication system for Sails.js applications.

## 1. Install
```sh
$ npm install sails-auth --save
```
This will install `sails-auth` as a Sails Hook. The Hook uses
[marlinspike](https://github.com/tjwebb/marlinspike) to inject the relevant
Controllers, Policies, etc into your Sails application.

## 2. Configure

#### `config/passport.js`

By default, the `local` and `basic` strategies are enabled. See
[config/passport.js](https://github.com/langateam/sails-auth/blob/master/config/passport.js)
for examples of how to add and configure additional authentication strategies.

#### `config/auth.js`

```js
  bcrypt: {
    /**
     * Specifiy number of salt rounds to perform on password. Values >10 are
     * slow.
     */
    rounds: 8
  }
```

## 3. Authenticate!

Create users as you normally would (`POST` to `/user`). Authenticate using the endpoint of the provider you've chosen.

#### Local
Authenticate with the local strategy via a `POST` to `/auth/local` with params
`identifier` (email) and `password`). This will also create a session. See [passport.local](https://github.com/jaredhanson/passport-local) for more.

#### HTTP Basic and Digest
See [passport.http](https://github.com/jaredhanson/passport-http).

#### Additional Passport Strategies
- [passport.google](https://github.com/jaredhanson/passport-google-oauth)
- [passport.twitter](http://passportjs.org/guide/twitter/)
- [passport.github](https://github.com/jaredhanson/passport-github)
- [passport.facebook](http://passportjs.org/guide/facebook/)
- et al

#### `/user/me`
Returns `User` for this authenticated session.

## Permissions
For comprehensive user account control with role-based permissioning, object ownership, and row-level security, see [**sails-permissions**](https://github.com/langateam/sails-permissions), which uses this project as a dependency.

## License

[MIT License](https://mit-license.org/)

![image_squidhome@2x.png](http://sailsjs.org/images/bkgd_squiddy.png)