const express = require('express');

class UserRouter {
    constructor(userService) {
        this.userService = userService
        this.router = express.Router()
    }

    route() {        
        // Deals with individual users
        this.router.get('/', this.listUsers.bind(this));
        this.router.get('/search', this.searchUsers.bind(this));
        this.router.get('/:id', this.getUser.bind(this));
        this.router.post('/', this.postUser.bind(this));
        this.router.put('/:id', this.putUser.bind(this));
        this.router.delete('/:id', this.deleteUser.bind(this));

        // Deals with user access
        this.router.get('/access/list/:id', this.listAccess.bind(this));
        this.router.get('/access/:id', this.getAccess.bind(this));
        this.router.post('/access/', this.postAccess.bind(this));
        this.router.put('/access/:id', this.putAccess.bind(this));
        this.router.delete('/access/:id', this.deleteAccess.bind(this));

        // Deals with user favourite restaurants
        this.router.get('/restaurant/list/:id', this.listRestaurant.bind(this));
        this.router.get('/restaurant/:id', this.getRestaurant.bind(this));
        this.router.post('/restaurant/', this.postRestaurant.bind(this));
        this.router.put('/restaurant/:id', this.putRestaurant.bind(this));
        this.router.delete('/restaurant/:id', this.deleteRestaurant.bind(this));

        // Deals with user favourite blog posts
        this.router.get('/blog/list/:id', this.listBlog.bind(this));
        this.router.get('/blog/:id', this.getBlog.bind(this));
        this.router.post('/blog/', this.postBlog.bind(this));
        this.router.put('/blog/:id', this.putBlog.bind(this));
        this.router.delete('/blog/:id', this.deleteBlog.bind(this));

        return this.router
    }

    // Searches all the users
    searchUsers(req, res) {
        return this.userService.searchUsers(req.query)
            .then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
            })
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
    listAccess(req, res) {
        let user_id = req.params.id

        return this.userService.listAccess(user_id)
            .then((access) => {
                res.send(access)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Gets an access
    getAccess(req, res) {
        let id = req.params.id

        return this.userService.getAccess(id)
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
    listRestaurant(req, res) {
        let user_id = req.params.id

        return this.userService.listRestaurant(user_id)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Gets a favourite restaurant
    getRestaurant(req, res) {
        let id = req.params.id

        return this.userService.getRestaurant(id)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Adds a new favourite restaurant
    postRestaurant(req, res) {
        let restaurant = {
            user_id: req.body.user_id,
            restaurant_id: req.body.restaurant_id
        }

        return this.userService.addRestaurant(restaurant)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates a favourite restaurant
    putRestaurant(req, res) {
        let id = req.params.id

        let restaurant = {
            user_id: req.body.user_id,
            restaurant_id: req.body.restaurant_id
        }

        return this.userService.updateRestaurant(restaurant, id)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deletes a favourite restaurant
    deleteRestaurant(req, res) {
        let id = req.params.id

        return this.userService.deleteRestaurant(id)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deals with user favourite blog posts

    // Gets a user's favourite blog posts
    listBlog(req, res) {
        let user_id = req.params.id

        return this.userService.listBlog(user_id)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Gets a favourite blog posts
    getBlog(req, res) {
        let id = req.params.id

        return this.userService.getBlog(id)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Adds a new favourite blog post
    postBlog(req, res) {
        let blog = {
            user_id: req.body.user_id,
            blog_id: req.body.blog_id
        }

        return this.userService.addBlog(blog)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates a favourite blog post
    putBlog(req, res) {
        let id = req.params.id

        let blog = {
            user_id: req.body.user_id,
            blog_id: req.body.blog_id
        }

        return this.userService.updateBlog(blog, id)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deletes a favourite blog post
    deleteBlog(req, res) {
        let id = req.params.id

        return this.userService.deleteBlog(id)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = UserRouter