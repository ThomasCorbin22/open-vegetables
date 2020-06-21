const express = require('express');
const filterResults = require('../modules/filterResults.js');
const getPagination = require('../modules/getPagination.js');
const getDate = require('../modules/getDate.js');

class BlogRouter {
    constructor(blogService, commentService, userService) {
        this.blogService = blogService
        this.commentService = commentService
        this.userService = userService
        this.router = express.Router()
    }

    route() {

        // Manipulate  blogs
        this.router.get('/list', this.listBlogs.bind(this));
        this.router.get('/search', this.searchBlogs.bind(this));
        this.router.get('/individual/:id', this.getBlog.bind(this));
        this.router.post('/individual/', this.postBlog.bind(this));
        this.router.put('/individual/:id', this.putBlog.bind(this));
        this.router.delete('/individual/:id', this.deleteBlog.bind(this));

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

        // Deals with page routes
        this.router.get('/details/:id', this.displaySingle.bind(this));
        this.router.get('/:filter/:direction', this.displayAll.bind(this));

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
            main_picture_URL: req.body.main_picture_URL,
            user_id: req.body.user_id,
            modified: req.body.modified
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
            main_picture_URL: req.body.main_picture_URL,
            user_id: req.body.user_id,
            modified: req.body.modified,
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

    // Get a category
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

    // Displays all blogs, subject to filters and queries
    async displayAll(req, res) {
        let query = req.query
        let page

        // Delete any page queries before passing to search blogs
        if (query.page){
            page = query.page
            delete query['page'];
        }
    
        // Search the blogs according to the query
        let results = await this.blogService.searchBlogs(req.query)
        
        // Filter the results based on the url filter
        results = filterResults('blog', req.params.filter, req.params.direction, results)
        
        // Add pagination
        let pages = getPagination('blog', Number(page) || 1, results.length || 1)

        // Add specified parameters to reflect in the html / hrefs
        pages['filter'] = req.params.filter
        pages['direction'] = req.params.direction

        // Allow users to switch the direction of the filters
        if (pages['direction'] === 'ascending') pages['opposite_direction'] = 'descending'
        else if (pages['direction'] === 'descending') pages['opposite_direction'] = 'ascending'

        // Get just the specified results for that page
        let index = (pages.current.value - 1) * 10
        results = results.slice(index, index + 10)

        // Change blog dates to be legible
        for (let result of results){
            result.date_modified = getDate(result.date_modified)
            result.date_created = getDate(result.date_created)
        }
    
        res.render('blog', {
            title: 'blogs-' + req.params.filter,
            blogs: results,
            pages
        })
    }

    // Displays single blog
    async displaySingle(req, res) {
        let blogs = await this.blogService.listBlogs();
        for (let blog of blogs) {
            if (blog.id == req.params.id) {
                blog.date_created = getDate(blog.date_created)
                blog.date_modified = getDate(blog.date_modified)
                let publisher = await this.userService.getUser(blog.user_id)
                let commentsBlog = await this.commentService.getComment(blog.id)
                for (let comment of commentsBlog) {
                    let commentUser = await this.userService.getUser(comment.user_id)
                    comment.userName = commentUser[0].first_name
                    comment.userImage = commentUser[0].profile_picture_URL
                }
                blog.comments = commentsBlog
                blog.userName = publisher[0].first_name
                blog.userImage = publisher[0].profile_picture_URL
                res.render('blog_details', { title: `blog-details/${blog.title}`, blog: blog, comments: blog.comments })
            }
        }
    }
}

module.exports = BlogRouter