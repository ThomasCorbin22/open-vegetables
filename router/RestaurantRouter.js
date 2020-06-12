const express = require('express');

class RestaurantRouter {
    constructor(restaurantService) {
        this.restaurantService = restaurantService
        this.router = express.Router()
    }

    route() {        
        // Deals with individual restaurants
        this.router.get('/', this.listRestaurants.bind(this));
        this.router.get('/search', this.searchRestaurants.bind(this));
        this.router.get('/:id', this.getRestaurant.bind(this));
        this.router.post('/', this.postRestaurant.bind(this));
        this.router.put('/:id', this.putRestaurant.bind(this));
        this.router.delete('/:id', this.deleteRestaurant.bind(this));

        // Deals with restaurant pictures
        this.router.get('/picture/list/:id', this.listPictures.bind(this));
        this.router.get('/picture/:id', this.getPicture.bind(this));
        this.router.post('/picture/', this.postPicture.bind(this));
        this.router.put('/picture/:id', this.putPicture.bind(this));
        this.router.delete('/picture/:id', this.deletePicture.bind(this));

        // Deals with restaurant categories
        this.router.get('/category/list/:id', this.listCategories.bind(this));
        this.router.get('/category/:id', this.getCategory.bind(this));
        this.router.post('/category/', this.postCategory.bind(this));
        this.router.put('/category/:id', this.putCategory.bind(this));
        this.router.delete('/category/:id', this.deleteCategory.bind(this));

        return this.router
    }

    // Lists all restaurants
    searchRestaurants(req, res) {
        return this.restaurantService.searchRestaurants(req.query)
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
            price_range: req.body.price_range,
            telephone_number: req.body.telephone_number,
            social_media_URL: req.body.social_media_URL,
            main_picture_URL: req.body.main_picture_URL,
            website_URL: req.body.website_URL,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            opening_time: req.body.opening_time,
            closing_time: req.body.closing_time,
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
            logo: req.body.logo,
            description: req.body.description,
            price_range: req.body.price_range,
            telephone_number: req.body.telephone_number,
            social_media_URL: req.body.social_media_URL,
            main_picture_URL: req.body.main_picture_URL,
            website_URL: req.body.website_URL,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            opening_time: req.body.opening_time,
            closing_time: req.body.closing_time,
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
}

module.exports = RestaurantRouter