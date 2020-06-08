const express = require('express');

const router = express.Router()

class AuthRouter {
    constructor(authService, path) {
        this.authService = authService
        this.router = express.Router()
    }

    route() {
        this.router.get("/facebook", passport.authenticate('facebook', { scope: ["email", "user_gender", "user_link"] }));
        this.router.get("/facebook/callback", passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '/' }))

        this.router.post('/login', passport.authenticate('local-login', { successRedirect: '/',
        failureRedirect: '/' }))
        router.post('/signup', passport.authenticate('local-signup', { successRedirect: '/',
        failureRedirect: '/' }))

        this.router.get('/logout', this.logout.bind(this));
        this.router.get('/login', this.login.bind(this));

        return this.router
    }

    logout(req, res) {
        req.logout();
        console.log('Logged out')
        res.redirect("/");
    }

    login(req, res) {
        if (isLoggedIn(req) === true){
            console.log('Logged in')
            res.send(req.user.display_name);
        }
        else{
            console.log('Not logged in')
            res.send('Not Logged In');
        }
    }
}

module.exports = AuthRouter