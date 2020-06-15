// Update with your config settings.
require('dotenv').config();
const getDate = require('../modules/getDate.js');

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
        this.blog = []
        this.pictures = []
        this.categories = []
    }

    // Search all of the current blogs
    async searchBlogs(query) {
        let results = await knex
            .select('*')
            .from("blogs")
            .modify(function(queryBuilder) {
                for (let key in query){
                    queryBuilder.where(key, query[key])
                }
            })
            .catch((err) => console.log(err))

        this.blog = results

        return this.blog
    }

    // Add pictures and categories to a blog
    async compilePicturesCategories(results){
        this.blog = []
            
        for (let item of results){
            let pictures = await this.listPictures(item.id)
            let categories = await this.listCategories(item.id)

            let blog_pictures = []
            let category_pictures = []

            for (let picture of pictures){
                blog_pictures.push(picture.picture_URL)
            }

            for (let category of categories){
                category_pictures.push(category.category)
            }

            item["pictures"] = blog_pictures
            item["categories"] = category_pictures
            item["date_created"] = getDate(item["date_created"])
            item["date_modified"] = getDate(item["date_modified"])

            this.blog.push(item)
        }
    }

    // Lists all of the current blogs
    async listBlogs() {
        let results = await knex
            .select('*')
            .from("blogs")
            .catch((err) => console.log(err))

        await this.compilePicturesCategories(results)

        return this.blog
    }

    // Individual Blog Posts

    // Gets a specific blog
    async getBlog(id) {
        let results = await knex
            .select('*')
            .from("blogs")
            .where("id", id)
            .catch((err) => console.log(err))

        await this.compilePicturesCategories(results)

        return this.blog
    }

    // Adds a specific blog post
    async addBlog(post) {
        await knex('blogs')
            .insert(post)
            .catch((err) => console.log(err))

        let results = await knex
            .select('id')
            .from("blogs")
            .where("title", post.title)
            .catch((err) => console.log(err))

        await this.getBlog(results[0].id)

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
        await knex('comments')
            .del()
            .where('blog_id', id)
            .catch((err) => console.log(err))

        await knex('blog_pictures')
            .del()
            .where('blog_id', id)
            .catch((err) => console.log(err))

        await knex('blog_favourites')
            .del()
            .where('blog_id', id)
            .catch((err) => console.log(err))

        await knex('blog_categories')
            .del()
            .where('blog_id', id)
            .catch((err) => console.log(err))

        await knex('blogs')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Blog Pictures

    // Gets the pictures from a blog post
    async listPictures(id) {
        let results = await knex
            .select('*')
            .from("blog_pictures")
            .where("blog_id", id)
            .catch((err) => console.log(err))

        this.pictures = results

        return this.pictures
    }

    // Gets a picture
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

        let results = await knex
            .select('id')
            .from("blog_pictures")
            .where("picture_URL", image.picture_URL)
            .andWhere("blog_id", image.blog_id)
            .catch((err) => console.log(err))
            
        await this.getPicture(results[0].id)

        return this.pictures
    }

    // Updates a blog picture
    async updatePicture(image, id) {
        await knex('blog_pictures')
            .update(image)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getPicture(id)

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

    // Gets the categories for a particular blog post
    async listCategories(id) {
        let results = await knex
            .select('*')
            .from("blog_categories")
            .where("blog_id", id)
            .catch((err) => console.log(err))

        this.categories = results

        return this.categories
    }

    // Gets a blog category
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
            
        let results = await knex
            .select('id')
            .from("blog_categories")
            .where("category", category.category)
            .andWhere("blog_id", category.blog_id)
            .catch((err) => console.log(err))
            
        await this.getCategory(results[0].id)

        return this.categories
    }

    // Updates a blog category
    async updateCategory(category, id) {
        await knex('blog_categories')
            .update(category)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getCategory(id)

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