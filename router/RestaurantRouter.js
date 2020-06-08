const express = require('express');

class RestaurantRouter {
    constructor(restaurantService, path) {
        this.restaurantService = restaurantService
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
        return this.restaurantService.getRestaurant(req.auth.user)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    post(req, res) {
        console.log(req)

        let restaurant = {
            "name": req.body.name,
            "address": req.body.address,
            "description": req.body.description,
            "telephone_number": req.body.telephone_number,
            "social_media_URL": req.body.social_media_URL,
            "main_picture_URL": req.body.main_picture_URL,
            "website_URL": req.body.website_URL,
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
            "opening_time": req.body.opening_time,
            "closing_time": req.body.closing_time
        }

        return this.restaurantService.addRestaurant(restaurant, req.auth.user)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    put(req, res) {
        console.log(req)

        let restaurant = {
            "name": req.body.name,
            "address": req.body.address,
            "description": req.body.description,
            "telephone_number": req.body.telephone_number,
            "social_media_URL": req.body.social_media_URL,
            "main_picture_URL": req.body.main_picture_URL,
            "website_URL": req.body.website_URL,
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
            "opening_time": req.body.opening_time,
            "closing_time": req.body.closing_time
        }

        return this.restaurantService.alterRestaurant(restaurant, req.body.index, req.auth.user)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    delete(req, res) {
        return this.restaurantService.deleteRestaurant(req.body.index, req.auth.user)
            .then((restaurant) => {
                res.send(restaurant)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = RestaurantRouter