const express = require('express');

class ReviewRouter {
    constructor(reviewService) {
        this.reviewService = reviewService
        this.router = express.Router()
    }

    route() {        
        // Deals with individual reviews
        this.router.get('/list/:id', this.listReviews.bind(this));
        this.router.get('/:id', this.getReview.bind(this));
        this.router.post('/', this.postReview.bind(this));
        this.router.put('/:id', this.putReview.bind(this));
        this.router.delete('/:id', this.deleteReview.bind(this));

        // Deals with review pictures
        this.router.get('/picture/list/:id', this.listPictures.bind(this));
        this.router.get('/picture/:id', this.getPicture.bind(this));
        this.router.post('/picture/', this.postPicture.bind(this));
        this.router.put('/picture/:id', this.putPicture.bind(this));
        this.router.delete('/picture/:id', this.deletePicture.bind(this));
        
        return this.router
    }

    // Lists all the reviews for a restaurant
    listReviews(req, res) {
        let restaurant_id = req.params.id

        return this.reviewService.listReviews(restaurant_id)
            .then((review) => {
                res.send(review)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deals with individual reviews

    // Gets a single review
    getReview(req, res) {
        let id = req.params.id

        return this.reviewService.getReview(id)
            .then((review) => {
                res.send(review)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Posts a review
    postReview(req, res) {
        let review = {
            title: req.body.title,
            body: req.body.body,
            rating: req.body.rating,
            user_id: req.body.user_id,
            restaurant_id: req.body.restaurant_id,
        }

        return this.reviewService.addReview(review)
            .then((review) => {
                res.send(review)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates a review
    putReview(req, res) {
        let id = req.params.id

        console.log(req.params)

        let review = {
            title: req.body.title,
            body: req.body.body,
            rating: req.body.rating,
            modified: req.body.modified,
            user_id: req.body.user_id,
            restaurant_id: req.body.restaurant_id,
            date_modified: new Date()
        }

        return this.reviewService.updateReview(review, id)
            .then((review) => {
                res.send(review)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deletes a review
    deleteReview(req, res) {
        let id = req.params.id

        return this.reviewService.deleteReview(id)
            .then((review) => {
                res.send(review)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deals with review pictures

    // Gets all the pictures for review
    listPictures(req, res) {
        let review_id = req.params.id

        return this.reviewService.listPictures(review_id)
            .then((picture) => {
                res.send(picture)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Gets all the pictures for review
    getPicture(req, res) {
        let id = req.params.id

        return this.reviewService.getPicture(id)
            .then((picture) => {
                res.send(picture)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Posts a review picture
    postPicture(req, res) {
        let picture = {
            picture_URL: req.body.picture_URL,
            review_id: req.body.review_id
        }

        return this.reviewService.addPicture(picture)
            .then((pictures) => {
                res.send(pictures)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates a review picture
    putPicture(req, res) {
        let id = req.params.id

        let picture = {
            picture_URL: req.body.picture_URL,
            review_id: req.body.review_id
        }

        return this.reviewService.updatePicture(picture, id)
            .then((picture) => {
                res.send(picture)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deletes a review picture
    deletePicture(req, res) {
        let id = req.params.id

        return this.reviewService.deletePicture(id)
            .then((picture) => {
                res.send(picture)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = ReviewRouter