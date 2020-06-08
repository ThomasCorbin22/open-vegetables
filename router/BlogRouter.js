const express = require('express');

class BlogRouter {
    constructor(blogService, path) {
        this.blogService = blogService
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
        return this.blogService.getRestaurant(req.auth.user)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    post(req, res) {
        console.log(req)

        let blog = {
            "title": req.body.title,
            "body": req.body.body,
            "user_ID": req.body.user_ID
        }

        return this.blogService.addRestaurant(blog, req.auth.user)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    put(req, res) {
        console.log(req)

        let blog = {
            "title": req.body.title,
            "body": req.body.body,
            "user_ID": req.body.user_ID
        }

        return this.blogService.alterRestaurant(blog, req.body.index, req.auth.user)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    delete(req, res) {
        return this.blogService.deleteRestaurant(req.body.index, req.auth.user)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

function isLoggedIn(req) {
    if (req.isAuthenticated()) {
        return true
    }
}

module.exports = BlogRouter