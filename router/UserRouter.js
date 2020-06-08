const express = require('express');

class UserRouter {
    constructor(userService, path) {
        this.userService = userService
        this.router = express.Router()
    }

    route() {
        this.router.get('/', this.get.bind(this));
        this.router.post('/', this.post.bind(this));
        this.router.put('/', this.put.bind(this));
        this.router.delete('/', this.delete.bind(this));
        return this.router
    }

    get(req, res) {
        return this.userService.getUser(req.auth.user)
            .then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    post(req, res) {
        console.log(req)

        let user = {
            "display_name": req.body.display_name,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "password": req.body.password,
            "description": req.body.description
        }

        return this.userService.addUser(user, req.auth.user)
            .then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    put(req, res) {
        console.log(req)

        let user = {
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "password": req.body.password,
            "description": req.body.description
        }

        return this.userService.alterUser(user, req.auth.user)
            .then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    delete(req, res) {
        return this.userService.deleteUser(req.auth.user)
            .then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = UserRouter