const express = require('express');
const filterResults = require('../modules/filterResults.js');
const getPagination = require('../modules/getPagination.js');
const getOpeningHours = require('../modules/getOpeningHours.js');
const getPrice = require('../modules/getPrice.js');

class RestaurantRouter {
    constructor(restaurantService, reviewService, userService, locationService) {
        this.restaurantService = restaurantService
        this.reviewService = reviewService
        this.userService = userService
        this.locationService = locationService
        this.router = express.Router()
    }

    route() {
        // Deals with individual restaurants
        this.router.get('/list', this.listRestaurants.bind(this));
        this.router.get('/search', this.searchRestaurants.bind(this));
        this.router.get('/individual/:id', this.getRestaurant.bind(this));
        this.router.post('/individual/', this.postRestaurant.bind(this));
        this.router.put('/individual/:id', this.putRestaurant.bind(this));
        this.router.delete('/individual/:id', this.deleteRestaurant.bind(this));

        // Deals with restaurant pictures
        this.router.get('/picture/list/:id', this.listPictures.bind(this));
        this.router.get('/picture/:id', this.getPicture.bind(this));
        this.router.post('/picture/', this.postPicture.bind(this));
        this.router.put('/picture/:id', this.putPicture.bind(this));
        this.router.delete('/picture/:id', this.deletePicture.bind(this));

        // Deals with restaurant categories
        this.router.get('/category/list/all', this.listAllCategories.bind(this));
        this.router.get('/category/list/:id', this.listCategories.bind(this));
        this.router.get('/category/:id', this.getCategory.bind(this));
        this.router.post('/category/', this.postCategory.bind(this));
        this.router.put('/category/:id', this.putCategory.bind(this));
        this.router.delete('/category/:id', this.deleteCategory.bind(this));

        // Deals with page routes
        this.router.get('/details/:id', this.displaySingle.bind(this));
        this.router.get('/:area/:filter/:direction', this.displayAll.bind(this));

        return this.router
    }

    // Lists all restaurants
    searchRestaurants(req, res) {
        let query = req.query
        let range

        if (req.query.range) {
            range = query['range']
            delete query['range'];
        }

        return this.restaurantService.searchRestaurants(query, range)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Lists all restaurants
    listRestaurants(req, res) {
        return this.restaurantService.listRestaurants()
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deals with individual restaurants

    // Gets an individual restaurant
    getRestaurant(req, res) {
        let id = req.params.id

        return this.restaurantService.getRestaurant(id)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Posts a new restaurant
    postRestaurant(req, res) {
        let restaurant = {
            name: req.body.name,
            street_address: req.body.street_address,
            district_id: req.body.district_id,
            description: req.body.description,
            logo: req.body.logo,
            price: req.body.price,
            telephone_number: req.body.telephone_number,
            social_media_URL: req.body.social_media_URL,
            main_picture_URL: req.body.main_picture_URL,
            website_URL: req.body.website_URL,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            main_category: req.body.main_category,
            monday: req.body.monday,
            tuesday: req.body.tuesday,
            wednesday: req.body.wednesday,
            thursday: req.body.thursday,
            friday: req.body.friday,
            saturday: req.body.saturday,
            sunday: req.body.sunday,
            modified: req.body.modified,
        }

        return this.restaurantService.addRestaurant(restaurant)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates a restaurant
    putRestaurant(req, res) {
        let id = req.params.id

        let restaurant = {
            name: req.body.name,
            street_address: req.body.street_address,
            district_id: req.body.district_id,
            description: req.body.description,
            logo: req.body.logo,
            price: req.body.price,
            telephone_number: req.body.telephone_number,
            social_media_URL: req.body.social_media_URL,
            main_picture_URL: req.body.main_picture_URL,
            website_URL: req.body.website_URL,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            main_category: req.body.main_category,
            monday: req.body.monday,
            tuesday: req.body.tuesday,
            wednesday: req.body.wednesday,
            thursday: req.body.thursday,
            friday: req.body.friday,
            saturday: req.body.saturday,
            sunday: req.body.sunday,
            modified: true,
            date_modified: new Date()
        }

        return this.restaurantService.updateRestaurant(restaurant, id)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deletes a restaurant
    deleteRestaurant(req, res) {
        let id = req.params.id

        return this.restaurantService.deleteRestaurant(id)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deals with restaurant pictures

    // Gets a restaurants pictures
    listPictures(req, res) {
        let restaurant_id = req.params.id

        return this.restaurantService.listPictures(restaurant_id)
            .then((pictures) => {
                res.send(pictures)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Gets a picture
    getPicture(req, res) {
        let id = req.params.id

        return this.restaurantService.getPicture(id)
            .then((pictures) => {
                res.send(pictures)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Posts a new picture
    postPicture(req, res) {
        let picture = {
            picture_URL: req.body.picture_URL,
            restaurant_id: req.body.restaurant_id,
        }

        return this.restaurantService.addPicture(picture)
            .then((picture) => {
                res.send(picture)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates a picture
    putPicture(req, res) {
        let id = req.params.id

        let picture = {
            picture_URL: req.body.picture_URL,
            restaurant_id: req.body.restaurant_id,
        }

        return this.restaurantService.updatePicture(picture, id)
            .then((picture) => {
                res.send(picture)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deletes a picture
    deletePicture(req, res) {
        let id = req.params.id

        return this.restaurantService.deletePicture(id)
            .then((picture) => {
                res.send(picture)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deals with restaurant categories

    // Gets a restaurants categories
    listAllCategories(req, res) {
        return this.restaurantService.listAllCategories()
            .then((categories) => {
                res.send(categories)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Gets a restaurants categories
    listCategories(req, res) {
        let restaurant_id = req.params.id

        return this.restaurantService.listCategories(restaurant_id)
            .then((categories) => {
                res.send(categories)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Gets a restaurants categories
    getCategory(req, res) {
        let id = req.params.id

        return this.restaurantService.getCategory(id)
            .then((categories) => {
                res.send(categories)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Posts a new category
    postCategory(req, res) {
        let category = {
            category: req.body.category,
            restaurant_id: req.body.restaurant_id,
        }

        return this.restaurantService.addCategory(category)
            .then((category) => {
                res.send(category)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates a category
    putCategory(req, res) {
        let id = req.params.id

        let category = {
            category: req.body.category,
            restaurant_id: req.body.restaurant_id,
        }

        return this.restaurantService.updateCategory(category, id)
            .then((category) => {
                res.send(category)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deletes a category
    deleteCategory(req, res) {
        let id = req.params.id

        return this.restaurantService.deleteCategory(id)
            .then((category) => {
                res.send(category)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Displays all restaurants, subject to filters and queries
    async displayAll(req, res) {
        let query = req.query
        let page
        let category
        let user_id

        // Delete any page queries before passing to search restaurants
        if (query.page) {
            page = query.page
            delete query['page'];
        }
        if (req.params.area != 'all') query['area'] = req.params.area

        // If categories exist, save them in a separate variable
        if (query.categories) {
            category = query.categories
            delete query.categories
        }
        else if (query.categories == '') delete query.categories

        // Search the restaurants according to the query
        let results = await this.restaurantService.searchRestaurants(query)

        // Filter the results based on the url filter
        results = filterResults('restaurant', req.params.filter, req.params.direction, results)

        // Check for category match
        if (category) {
            results = results.filter((result) => result.categories.includes(category))
        }

        // Add pagination
        let pages = getPagination('restaurant', req.params.filter, Number(page) || 1, results.length || 1)

        // Add specified parameters to reflect in the html / hrefs
        pages['area'] = req.params.area
        pages['filter'] = req.params.filter
        if (req.params.direction) {
            if (req.params.direction == 'descending') pages['direction'] = true
            if (req.params.direction == 'ascending') pages['direction'] = false
        }

        // Check for user
        if (req.user) user_id = req.user.id

        // Get just the specified results for that page
        let index = (pages.current.value - 1) * 10
        results = results.slice(index, index + 10)

        // Change restaurant information to be legible
        for (let result of results) {
            result.opening_hours = getOpeningHours(result)
            result.price = getPrice(result.price)
            if (result.rating == 0) result.rating = 'Not yet rated'
            if (result.main_picture_URL == 'Not available') delete result.main_picture_URL
        }

        res.render('restaurant', {
            title: 'restaurants-' + req.params.area + '-' + req.params.filter,
            restaurants: results,
            pages,
            user_id
        })
    }

    // Displays single restaurant
    async displaySingle(req, res) {
        let user_id
        let favourites

        // Check for user
        if (req.user) user_id = req.user.id

        // Get users favourite restaurants
        if (user_id) {
            favourites = await this.userService.listRestaurants(user_id)
        }

        // Get the restaurant
        let restaurant = await this.restaurantService.getRestaurant(req.params.id)
        restaurant = restaurant[0]

        // Set up restaurant information
        restaurant.opening_hours = getOpeningHours(restaurant)
        restaurant.price = getPrice(restaurant.price)
        if (restaurant.rating == 0) restaurant.rating = 'Not yet rated'

        // Delete unwanted information
        if (restaurant.main_picture_URL == 'Not available') delete restaurant.main_picture_URL
        if (restaurant.logo == 'Not available') delete restaurant.logo
        if (restaurant.website_URL == 'Not available') delete restaurant.website_URL
        if (restaurant.social_media_URL == 'Not available') delete restaurant.social_media_URL

        // Check for empty pictures
        for (let picture of restaurant.pictures){
            if (picture = 'Not available') restaurant.pictures = []
        }

        // Get the reviews for a restaurant
        let reviews = await this.reviewService.listReviews(restaurant.id)
        let user
        for (let review of reviews) {
            user = await this.userService.getUser(review.user_id)
            review.userName = user[0].display_name
            review.userImage = user[0].profile_picture_URL
        }
        
        // Check if the restaurant is a favourite of the user
        if (favourites) {
            for (let item of favourites) {
                if (user_id == item.user_id && restaurant.id == item.restaurant_id) {
                    restaurant.favourite = item.id
                }
            }
        }

        res.render(`restaurant_details_reviews`, {
            title: `restaurant-details/${restaurant.name}`,
            restaurant,
            reviews,
            user_id
        })
    }
}

module.exports = RestaurantRouter