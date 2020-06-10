const express = require('express');

class BlogRouter {
    constructor(blogService) {
        this.blogService = blogService
        this.router = express.Router()
    }

    route() {
        
        // Manipulate  blogs
        this.router.get('/', this.listBlogs.bind(this));
        this.router.get('/search', this.searchBlogs.bind(this));
        this.router.get('/:id', this.getBlog.bind(this));
        this.router.post('/', this.postBlog.bind(this));
        this.router.put('/:id', this.putBlog.bind(this));
        this.router.delete('/:id', this.deleteBlog.bind(this));

        // Manipulate blog pictures
        this.router.get('/picture/list/:id', this.listPictures.bind(this));
        this.router.get('/picture/:id', this.getPicture.bind(this));
        this.router.post('/picture/', this.postPicture.bind(this));
        this.router.put('/picture/:id', this.putPicture.bind(this));
        this.router.delete('/picture/:id', this.deletePicture.bind(this));

        // Manipulate blog categories
        this.router.get('/category/list/:id', this.listCategories.bind(this));
        this.router.get('/category/:id', this.getCategory.bind(this));
        this.router.post('/category/', this.postCategory.bind(this));
        this.router.put('/category/:id', this.putCategory.bind(this));
        this.router.delete('/category/:id', this.deleteCategory.bind(this));

        return this.router
    }

    // Search all blogs
    searchBlogs(req, res) {
        return this.blogService.searchBlogs(req.query)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // List all blogs
    listBlogs(req, res) {
        return this.blogService.listBlogs()
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Individual blog posts

    // Get individual blog
    getBlog(req, res) {
        let id = req.params.id

        return this.blogService.getBlog(id)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Post an individual blog
    postBlog(req, res) {
        let post = {
            title: req.body.title,
            body: req.body.body,
            user_id: req.body.user_id
        }

        return this.blogService.addBlog(post)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Update an individual blog
    putBlog(req, res) {
        let id = req.params.id

        let post = {
            title: req.body.title,
            body: req.body.body,
            user_id: req.body.user_id,
            date_modified: new Date()
        }

        return this.blogService.updateBlog(post, id)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Delete an individual blog
    deleteBlog(req, res) {
        let id = req.params.id

        return this.blogService.deleteBlog(id)
            .then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Blog Pictures

    // Get blog pictures
    listPictures(req, res) {
        let blog_id = req.params.id

        return this.blogService.listPictures(blog_id)
            .then((pictures) => {
                res.send(pictures)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Get picture
    getPicture(req, res) {
        let id = req.params.id

        return this.blogService.getPicture(id)
            .then((pictures) => {
                res.send(pictures)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Post a new picture
    postPicture(req, res) {
        let picture = {
            picture_URL: req.body.picture_URL,
            blog_id: req.body.blog_id
        }

        return this.blogService.addPicture(picture)
            .then((picture) => {
                res.send(picture)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Update an existing picture
    putPicture(req, res) {
        let id = req.params.id

        let picture = {
            picture_URL: req.body.picture_URL,
            blog_id: req.body.blog_id
        }

        return this.blogService.updatePicture(picture, id)
            .then((picture) => {
                res.send(picture)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Delete a picture
    deletePicture(req, res) {
        let id = req.params.id

        return this.blogService.deletePicture(id)
            .then((picture) => {
                res.send(picture)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Blog Categories

    // Get blog categories
    listCategories(req, res) {
        let blog_id = req.params.id

        return this.blogService.listCategories(blog_id)
            .then((categories) => {
                res.send(categories)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Get category
    getCategory(req, res) {
        let id = req.params.id

        return this.blogService.getCategory(id)
            .then((categories) => {
                res.send(categories)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Post a new category
    postCategory(req, res) {
        let category = {
            category: req.body.category,
            blog_id: req.body.blog_id
        }

        return this.blogService.addCategory(category)
            .then((category) => {
                res.send(category)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Update an existing category
    putCategory(req, res) {
        let id = req.params.id

        let category = {
            category: req.body.category,
            blog_id: req.body.blog_id
        }

        return this.blogService.updateCategory(category, id)
            .then((category) => {
                res.send(category)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Delete a category
    deleteCategory(req, res) {
        let id = req.params.id

        return this.blogService.deleteCategory(id)
            .then((category) => {
                res.send(category)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = BlogRouter