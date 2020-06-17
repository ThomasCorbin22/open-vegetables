const FacebookStrategy = require('passport-facebook').Strategy;

require('dotenv').config();

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database:   process.env.DATABASE_NAME,
        user:       process.env.DATABASE_USERNAME,
        password:   process.env.DATABASE_PASSWORD
    }
});

module.exports = (passport) => {
    passport.use('facebook', new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'email', 'name', 'gender', 'displayName', 'picture.type(large)', 'profileUrl']
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile);

        let userResult = await knex('users').where({ facebook_ID: profile.id });
        if (userResult == 0) {
            let user = {
                facebook_ID: profile.id,
                email: profile.emails[0].value,
                display_name: profile.displayName,
                facebook_token: accessToken,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                profile_picture_URL: profile.photos[0].value
            }
            let query = await knex('users').insert(user).returning('id');
            user.id = query[0];
            done(null, user);
        } else {
            done(null, userResult[0])
        }
    }
    ));
}