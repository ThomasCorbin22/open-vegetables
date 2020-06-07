const express = require('express');
let router = express.Router()

class BlogRouter {
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
        res.send('Blog Router: GET')
    }

    post(req, res) {
        console.log(req)
        res.send('Blog Router: POST')
    }

    put(req, res) {
        console.log(req)
        res.send('Blog Router: PUT')
    }

    delete(req, res) {
        console.log(req)
        res.send('Blog Router: DELETE')
    }
}

module.exports = BlogRouter