const GoogleStrategy = require('passport-google').Strategy;

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
    passport.use('google', new GoogleStrategy({
        consumerKey: process.env.GOOGLE_ID,
        consumerSecret: process.env.GOOGLE_SECRET,
        callbackURL: "https://terrarie.net/app-00/auth/google/callback",
        profileFields: ['id', 'email', 'name', 'gender', 'displayName', 'profileUrl']
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile);

        let userResult = await knex('users').where({ facebookID: profile.id });
        if (userResult == 0) {
            let user = {
                googleId: profile.id,
                email: profile.displayName,
                displayName: profile.name.givenName,
                googleToken: accessToken
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