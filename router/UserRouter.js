const express = require('express');

class UserRouter {
    constructor(userService) {
        this.userService = userService
        this.router = express.Router()
    }

    route() {
        // Gets all users
        this.router.get('/', this.listUsers.bind(this));

        // Deals with individual users
        this.router.get('/:id', this.getUser.bind(this));
        this.router.post('/', this.postUser.bind(this));
        this.router.put('/:id', this.putUser.bind(this));
        this.router.delete('/:id', this.deleteUser.bind(this));

        // Deals with user access
        this.router.get('/:id', this.getAccess.bind(this));
        this.router.post('/', this.postAccess.bind(this));
        this.router.put('/:id', this.putAccess.bind(this));
        this.router.delete('/:id', this.deleteAccess.bind(this));

        // Deals with user favourite restaurants
        this.router.get('/:id', this.getFavRest.bind(this));
        this.router.post('/', this.postFavRest.bind(this));
        this.router.put('/:id', this.putFavRest.bind(this));
        this.router.delete('/:id', this.deleteFavRest.bind(this));

        // Deals with user favourite blog posts
        this.router.get('/:id', this.getFavBlog.bind(this));
        this.router.post('/', this.postFavBlog.bind(this));
        this.router.put('/:id', this.putFavBlog.bind(this));
        this.router.delete('/:id', this.deleteFavBlog.bind(this));

        return this.router
    }

    // Gets all the users
    listUsers(req, res) {
        return this.userService.listUsers()
            .then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deals with individual users

    // Gets a user
    getUser(req, res) {
        let id = req.params.id

        return this.userService.getUser(id)
            .then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Adds a user
    postUser(req, res) {
        let user = {
            display_name: req.body.display_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            description: req.body.description
        }

        return this.userService.addUser(user)
            .then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates a user
    putUser(req, res) {
        let id = req.params.id

        let user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            description: req.body.description,
            date_modified: new Date()
        }

        return this.userService.updateUser(user, id)
            .then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deletes a user
    deleteUser(req, res) {
        let id = req.params.id

        return this.userService.deleteUser(id)
            .then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deals with user access

    // Gets a user's access
    getAccess(req, res) {
        let user_id = req.params.id

        return this.userService.getAccess(user_id)
            .then((access) => {
                res.send(access)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Adds user access
    postAccess(req, res) {
        let access = {
            user_id: req.body.user_id,
            restaurant_id: req.body.restaurant_id
        }

        return this.userService.addAccess(access)
            .then((access) => {
                res.send(access)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates a user's access
    putAccess(req, res) {
        let id = req.params.id

        let access = {
            user_id: req.body.user_id,
            restaurant_id: req.body.restaurant_id
        }

        return this.userService.updateAccess(access, id)
            .then((access) => {
                res.send(access)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deletes a user's access
    deleteAccess(req, res) {
        let id = req.params.id

        return this.userService.deleteAccess(id)
            .then((access) => {
                res.send(access)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deals with user favourite restaurants

    // Gets a user's favourite restaurants
    getFavRest(req, res) {
        let user_id = req.params.id

        return this.userService.getFavRest(user_id)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Adds a new favourite restaurant
    postFavRest(req, res) {
        let restaurant = {
            user_id: req.body.user_id,
            restaurant_id: req.body.restaurant_id
        }

        return this.userService.addFavRest(restaurant)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates a favourite restaurant
    putFavRest(req, res) {
        let id = req.params.id

        let restaurant = {
            user_id: req.body.user_id,
            restaurant_id: req.body.restaurant_id
        }

        return this.userService.updateFavRest(restaurant, id)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deletes a favourite restaurant
    deleteFavRest(req, res) {
        let id = req.params.id

        return this.userService.deleteFavRest(id)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deals with user favourite blog posts

    // Gets a user's favourite blog posts
    getFavBlog(req, res) {
        let user_id = req.params.id

        return this.userService.getFavBlog(user_id)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Adds a new favourite blog post
    postFavBlog(req, res) {
        let blog = {
            user_id: req.body.user_id,
            blog_id: req.body.blog_id
        }

        return this.userService.addFavBlog(blog)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates a favourite blog post
    putFavBlog(req, res) {
        let id = req.params.id

        let blog = {
            user_id: req.body.user_id,
            blog_id: req.body.blog_id
        }

        return this.userService.updateFavBlog(blog, id)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deletes a favourite blog post
    deleteFavBlog(req, res) {
        let id = req.params.id

        return this.userService.deleteFavBlog(id)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = UserRouter