const passport = require('passport')

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    require('./facebook-strategy.js')(passport);
    require('./google-strategy.js')(passport);
    require('./local-strategy.js')(passport);
}