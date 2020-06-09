// Update with your config settings.
require('dotenv').config();

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD
    }
});

class BlogService {
    constructor() {
        this.blogList = []
        this.blog = []
        this.pictures = []
        this.categories = []
    }

    // Lists all of the current blogs
    async listBlogs() {
        let results = await knex
            .select('*')
            .from("blogs")
            .catch((err) => console.log(err))

        this.blogList = results

        return this.blogList
    }

    // Individual Blog Posts

    // Gets a specific blog
    async getBlog(id) {
        let results = await knex
            .select('*')
            .from("blogs")
            .where("id", id)
            .catch((err) => console.log(err))

        this.blog = results

        return this.blog
    }

    // Adds a specific blog post
    async addBlog(post) {
        await knex('blogs')
            .insert(post)
            .catch((err) => console.log(err))

        let id = await knex
            .select('id')
            .from("blogs")
            .where("title", post.title)
            .catch((err) => console.log(err))
            
        await this.getBlog(id)

        return this.blog
    }

    // Updates a blog post
    async updateBlog(post, id) {
        await knex('blogs')
            .update(post)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getBlog(id)

        return this.blog
    }

    // Deletes a blog post
    async deleteBlog(id) {
        await knex('blogs')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Blog Pictures

    // Gets the pictures from a specific blog post
    async getPicture(id) {
        let results = await knex
            .select('*')
            .from("blog_pictures")
            .where("id", id)
            .catch((err) => console.log(err))

        this.pictures = results

        return this.pictures
    }

    // Adds a blog picture
    async addPicture(image) {
        await knex('blog_pictures')
            .insert(image)
            .catch((err) => console.log(err))
            
        await this.getPicture(blog_ID)

        return this.pictures
    }

    // Updates a blog picture
    async updatePicture(image, id) {
        await knex('blog_pictures')
            .update(image)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getPicture(blog_ID)

        return this.pictures
    }

    // Deletes a blog picture
    async deletePicture(id) {
        await knex('blog_pictures')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Blog Categories

    // Gets the categories from a specific blog post
    async getCategory(id) {
        let results = await knex
            .select('*')
            .from("blog_categories")
            .where("id", id)
            .catch((err) => console.log(err))

        this.categories = results

        return this.categories
    }

    // Adds a blog category
    async addCategory(category) {
        await knex('blog_categories')
            .insert(category)
            .catch((err) => console.log(err))
            
        await this.getCategory(blog_ID)

        return this.categories
    }

    // Updates a blog category
    async updateCategory(category, id) {
        await knex('blog_categories')
            .update(category)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getCategory(blog_ID)

        return this.categories
    }

    // Deletes a blog category
    async deleteCategory(id) {
        await knex('blog_categories')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = BlogService;