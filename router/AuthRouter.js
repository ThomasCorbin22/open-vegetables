const express = require('express');
const passport = require('passport');

class AuthRouter {
    constructor() {
        this.router = express.Router()
    }

    route() {
        this.router.get("/facebook", passport.authenticate('facebook', { scope: ["email", "user_gender", "user_link"] }));
        this.router.get("/facebook/callback", passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '/' }))

        this.router.get("/google", passport.authenticate('google', { scope: ["email", "profile"] }));
        this.router.get("/google/callback", passport.authenticate('google', { successRedirect: '/',
        failureRedirect: '/' }))

        this.router.post('/login', passport.authenticate('local-login', { successRedirect: '/',
        failureRedirect: '/error' }))
        this.router.post('/signup', passport.authenticate('local-signup', { successRedirect: '/',
        failureRedirect: '/error' }))

        this.router.get('/logout', this.logout.bind(this));
        this.router.get('/login', this.login.bind(this));

        return this.router
    }

    isLoggedIn(req) {
        if (req.isAuthenticated()) {
            return true
        }
    }

    logout(req, res) {
        req.logout();
        console.log('Logged out')
        res.redirect("/");
    }

    login(req, res) {
        if (this.isLoggedIn(req) === true){
            console.log('Logged in')
            res.send({id: req.user.id});
        }
        else{
            console.log('Not logged in')
            res.send('Not Logged In');
        }
    }
}

module.exports = AuthRouter