const express = require('express');

class CommentRouter {
    constructor(commentService) {
        this.commentService = commentService
        this.router = express.Router()
    }

    route() {        
        // Deals with individual comments
        this.router.get('/list/:id', this.listComments.bind(this));
        this.router.get('/:id', this.getComment.bind(this));
        this.router.post('/', this.postComment.bind(this));
        this.router.put('/:id', this.putComment.bind(this));
        this.router.delete('/:id', this.deleteComment.bind(this));
        return this.router
    }

    // List out all the comments for a blog post
    listComments(req, res) {
        let blog_id = req.params.id

        return this.commentService.listComments(blog_id)
            .then((comment) => {
                res.send(comment)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Get a specific comment
    getComment(req, res) {
        let id = req.params.id

        return this.commentService.getComment(id)
            .then((comment) => {
                res.send(comment)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Post a comment
    postComment(req, res) {
        let comment = {
            title: req.body.title,
            body: req.body.body,
            user_id: req.body.user_id,
            blog_id: req.body.blog_id,
        }

        return this.commentService.addComment(comment)
            .then((comment) => {
                res.send(comment)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Update a comment
    putComment(req, res) {
        let id = req.params.id

        let comment = {
            title: req.body.title,
            body: req.body.body,
            user_id: req.body.user_id,
            blog_id: req.body.blog_id,
            date_modified: new Date()
        }

        return this.commentService.updateComment(comment, id)
            .then((comment) => {
                res.send(comment)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Delete a comment
    deleteComment(req, res) {
        let id = req.params.id

        return this.commentService.deleteComment(id)
            .then((comment) => {
                res.send(comment)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = CommentRouter