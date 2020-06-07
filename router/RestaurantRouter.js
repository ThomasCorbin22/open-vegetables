const express = require('express');
let router = express.Router()

class RestaurantRouter {
    constructor(noteService) {
        this.noteService = noteService
        this.router = router
    }

    route() {
        this.router.get('/', this.get.bind(this));
        this.router.post('/', this.post.bind(this));
        this.router.put('/', this.put.bind(this));
        this.router.delete('/', this.delete.bind(this));
        return this.router
    }

    get(req, res) {
        console.log(req)
        res.send('Restaurant Router: GET')
    }

    post(req, res) {
        console.log(req)
        res.send('Restaurant Router: POST')
    }

    put(req, res) {
        console.log(req)
        res.send('Restaurant Router: PUT')
    }

    delete(req, res) {
        console.log(req)
        res.send('Restaurant Router: DELETE')
    }
}

module.exports = RestaurantRouter