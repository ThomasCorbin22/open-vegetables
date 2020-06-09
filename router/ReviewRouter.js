const express = require('express');

class ReviewRouter {
    constructor(reviewService) {
        this.reviewService = reviewService
        this.router = express.Router()
    }

    route() {
        // Lists out all reviews
        this.router.get('/', this.listReviews.bind(this));

        // Deals with individual reviews
        this.router.get('/:id', this.getReview.bind(this));
        this.router.post('/', this.postReview.bind(this));
        this.router.put('/:id', this.putReview.bind(this));
        this.router.delete('/:id', this.deleteReview.bind(this));

        // Deals with review pictures
        this.router.get('/picture/:id', this.getPicture.bind(this));
        this.router.post('/picture/', this.postPicture.bind(this));
        this.router.put('/picture/:id', this.putPicture.bind(this));
        this.router.delete('/picture/:id', this.deletePicture.bind(this));
        
        return this.router
    }

    // Lists all the reviews for a restaurant
    listReviews(req, res) {
        let id = req.params.id

        return this.reviewService.listReviews(id)
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
            user_id: req.body.user_id,
            restaurant_id: req.body.restaurant_id,
            date_modified: new Date()
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

        let review = {
            title: req.body.title,
            body: req.body.body,
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

    // Posts a review
    postPicture(req, res) {
        let picture = {
            picture_URL: req.body.picture_URL,
            restaurant_id: req.body.restaurant_id
        }

        return this.reviewService.addPicture(picture)
            .then((pictures) => {
                res.send(pictures)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates a review
    putPicture(req, res) {
        let id = req.params.id

        let picture = {
            picture_URL: req.body.picture_URL,
            restaurant_id: req.body.restaurant_id
        }

        return this.reviewService.updatePicture(picture, id)
            .then((picture) => {
                res.send(picture)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deletes a review
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