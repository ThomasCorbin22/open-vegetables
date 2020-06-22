const express = require('express');
const getDate = require('../modules/getDate.js');

class UserRouter {
    constructor(userService, blogService, locationService, restaurantService, reviewService) {
        this.userService = userService
        this.blogService = blogService
        this.locationService = locationService
        this.restaurantService = restaurantService
        this.reviewService = reviewService
        this.router = express.Router()
    }

    route() {        
        // Deals with individual users
        this.router.get('/list', this.listUsers.bind(this));
        this.router.get('/search', this.searchUsers.bind(this));
        this.router.get('/individual/:id', this.getUser.bind(this));
        this.router.post('/individual/', this.postUser.bind(this));
        this.router.put('/individual/:id', this.putUser.bind(this));
        this.router.delete('/individual/:id', this.deleteUser.bind(this));

        // Deals with user access
        this.router.get('/access/list/:id', this.listAccess.bind(this));
        this.router.get('/access/:id', this.getAccess.bind(this));
        this.router.post('/access/', this.postAccess.bind(this));
        this.router.put('/access/:id', this.putAccess.bind(this));
        this.router.delete('/access/:id', this.deleteAccess.bind(this));

        // Deals with user favourite restaurants
        this.router.get('/favourite/restaurant/list/:id', this.listRestaurants.bind(this));
        this.router.get('/favourite/restaurant/:id', this.getRestaurant.bind(this));
        this.router.post('/favourite/restaurant/', this.postRestaurant.bind(this));
        this.router.put('/favourite/restaurant/:id', this.putRestaurant.bind(this));
        this.router.delete('/favourite/restaurant/:id', this.deleteRestaurant.bind(this));

        // Deals with user favourite blog posts
        this.router.get('/favourite/blog/list/:id', this.listBlogs.bind(this));
        this.router.get('/favourite/blog/:id', this.getBlog.bind(this));
        this.router.post('/favourite/blog/', this.postBlog.bind(this));
        this.router.put('/favourite/blog/:id', this.putBlog.bind(this));
        this.router.delete('/favourite/blog/:id', this.deleteBlog.bind(this));

        // Deals with user favourite blog posts
        this.router.get('/info/:id', this.displayInfo.bind(this));
        this.router.get('/reviews/:id', this.displayReviews.bind(this));
        this.router.get('/blogs/:id', this.displayBlogs.bind(this));
        this.router.get('/restaurants/:id', this.displayRestaurants.bind(this));

        // Deals with passwords
        this.router.put('/security', this.checkSecurity.bind(this));
        this.router.put('/lost', this.lostPassword.bind(this));
        this.router.put('/password/:id', this.updatePassword.bind(this));

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
            description: req.body.description,
            security_question: req.body.security_question,
            security_answer: req.body.security_answer,
            profile_picture_URL: req.body.profile_picture_URL
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
            display_name: req.body.display_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            description: req.body.description,
            date_modified: new Date(),
            profile_picture_URL: req.body.profile_picture_URL
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
    listRestaurants(req, res) {
        let user_id = req.params.id

        return this.userService.listRestaurants(user_id)
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
    listBlogs(req, res) {
        let user_id = req.params.id

        return this.userService.listBlogs(user_id)
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

    // Display's user information
    async displayInfo(req, res) {
        let user = await this.userService.getUser(req.params.id)
        let restaurants = await this.userService.listRestaurants(req.params.id)
        let blogs = await this.userService.listBlogs(req.params.id)

        let restaurant_list = []
        let blog_list = []

        for (let item of restaurants){
            let restaurant = await this.restaurantService.getRestaurant(item.restaurant_id)
            restaurant_list.push(restaurant[0])
        }

        for (let item of blogs){
            let blog = await this.blogService.getBlog(item.blog_id)
            let publisher = await this.userService.getUser(blog[0].user_id)
            
            blog[0].publisher = publisher[0].display_name
            blog_list.push(blog[0])
        }

        res.render('user_information', { 
            title: 'userInformation', 
            user: user[0], 
            restaurants: restaurant_list,
            blogs: blog_list
        })
    }

    // Display's user reviews
    async displayReviews(req, res) {
        let user = await this.userService.getUser(req.params.id)

        let reviews = await this.reviewService.getReview(req.params.id)
        for (let review of reviews) {
            let restaurant = await this.restaurantService.getRestaurant(review.restaurant_id)
            review.restaurant = restaurant[0]
        }
        res.render('user_reviews', { title: 'userReviews', reviews: reviews, user: user[0] })
    }

    // Display's user blogs
    async displayBlogs(req, res) {
        let user = await this.userService.getUser(req.params.id)
        let userOwnBlogs = user[0].blog_access
        console.log(userOwnBlogs)
        let blogImg
        let blogCate
        for (let blog of userOwnBlogs) {
            blogImg = await this.blogService.listPictures(blog.id)
            blogCate = await this.blogService.listCategories(blog.id)
            blog.blogImg = blogImg
            blog.blogCate = blogCate
            blog.date_created = getDate(blog.date_created)
            blog.date_modified = getDate(blog.date_modified)
        }
        console.log(blogImg)
        console.log(userOwnBlogs)
    
        res.render('user_blogs', { title: 'userBlogs', blogs: userOwnBlogs, user: user[0] })
    }

    // Display's user favourite restaurants
    async displayRestaurants(req, res) {
        let user = await this.userService.getUser(req.params.id)
        let ownRestas = user[0].restaurant_access
        for(let resta of ownRestas){
            let district = await this.locationService.getDistrict(resta.district_id)
            let restaPic = await this.restaurantService.listPictures(resta.id)
            let restaCate = await this.restaurantService.listCategories(resta.id)
            resta.district = district[0].district
            resta.restaPic = restaPic[0].picture_URL
            resta.restaCate = []
            for (let item of restaCate){
                resta.restaCate.push(item.category)
            }
            
            console.log(resta.restaCate)
        }
        console.log(ownRestas)
        res.render('user_restaurants', { title: 'userRestaurants', ownRestas: ownRestas, user: user[0] })
    }

    // Checks the security question
    checkSecurity(req, res) {
        let email = req.body.email
        let answer = req.body.answer

        return this.userService.checkSecurity(email, answer)
            .then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates lost password
    lostPassword(req, res) {
        let id = req.body.id
        let answer = req.body.answer
        let password = req.body.password

        return this.userService.lostPassword(id, answer, password)
            .then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates  password
    updatePassword(req, res) {
        let id = req.params.id
        let original_password = req.body.original_password
        let new_password = req.body.new_password

        return this.userService.updatePassword(id, original_password, new_password)
            .then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }


}

module.exports = UserRouter