// Update with your config settings.
require('dotenv').config();
const updateDate = require('../modules/getDate.js');
const bcrypt = require('../passport/bcrypt.js');

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD
    }
});

class UserService {
    constructor() {
        this.user = []
        this.access = []
        this.blogs = []
        this.restaurants = []
    }

    // Search all the users
    async searchUsers(query) {
        let results = await knex
            .select('*')
            .from("users")
            .modify(function (queryBuilder) {
                for (let key in query) {
                    if (typeof query[key] === 'string') {
                        queryBuilder.where(key, 'ilike', "%" + query[key] + "%")
                    }
                    else {
                        queryBuilder.where(key, query[key])
                    }
                }
            })
            .catch((err) => console.log(err))

        this.user = results

        return this.user
    }

    // Checks security question
    async checkSecurity(email, answer) {
        let results = await knex
            .select('*')
            .from("users")
            .where("email", email)
            .catch((err) => console.log(err))

        if (results[0].security_answer == answer) return { id: results[0].id, email: results[0].email, answer }
        else return false
    }

    // Updates lost password
    async lostPassword(id, answer, password) {
        let results = await knex
            .select('*')
            .from("users")
            .where("id", id)
            .catch((err) => console.log(err))

        if (results[0].security_answer == answer) {
            let hash = await bcrypt.hashPassword(password)

            await knex('users')
                .update({password: hash})
                .where('id', id)
                .catch((err) => console.log(err))

            await this.getUser(id)

            return this.user
        }
        else return false
    }

    // Updates to new password
    async updatePassword(id, original_password, new_password) {
        let results = await knex
            .select('*')
            .from("users")
            .where("id", id)
            .catch((err) => console.log(err))

        let comparison = await bcrypt.checkPassword(original_password, results[0].password);

        if (comparison) {
            await this.getUser(id)

            let hash = await bcrypt.hashPassword(new_password)

            await knex('users')
                .update({password: hash})
                .where('id', id)
                .catch((err) => console.log(err))

            await this.getUser(id)

            return this.user
        }
        else return false
    }

    // Add access, restaurants and blogs to a restaurant
    async compileAccessRestBlogs(results) {
        this.user = []

        for (let item of results) {
            let restaurants = await this.listRestaurants(item.id)
            let restaurant_access = await this.listRestaurantAccess(item.id)
            let blogs = await this.listBlogs(item.id)

            let user_restaurants = []
            let user_restaurant_access = []
            let user_blogs = []

            for (let restaurant of restaurants) {
                let results = await knex
                    .select('*')
                    .from("restaurants")
                    .where('id', restaurant.restaurant_id)
                    .catch((err) => console.log(err))

                user_restaurants.push(results[0])
            }

            for (let access of restaurant_access) {
                let results = await knex
                    .select('*')
                    .from("restaurants")
                    .where('id', access.restaurant_id)
                    .catch((err) => console.log(err))

                user_restaurant_access.push(results[0])
            }

            for (let blog of blogs) {
                let results = await knex
                    .select('*')
                    .from("blogs")
                    .where('id', blog.blog_id)
                    .catch((err) => console.log(err))

                user_blogs.push(results[0])
            }

            let user_blog_access = await knex
                .select('*')
                .from("blogs")
                .where('user_id', item.id)
                .catch((err) => console.log(err))

            item["restaurants"] = user_restaurants
            item["restaurant_access"] = user_restaurant_access
            item["blogs"] = user_blogs
            item["blog_access"] = user_blog_access
            item["date_created"] = updateDate(item["date_created"])
            item["date_modified"] = updateDate(item["date_modified"])

            delete item["password"]
            delete item["security_question"]
            delete item["security_answer"]

            this.user.push(item)
        }
    }

    // Gets all the users
    async listUsers() {
        let results = await knex
            .select('*')
            .from("users")
            .catch((err) => console.log(err))

        await this.compileAccessRestBlogs(results)

        return this.user
    }

    // Deals with individual users

    // Gets a specific user
    async getUser(id) {
        let results = await knex
            .select('*')
            .from("users")
            .where("id", id)
            .catch((err) => console.log(err))

        await this.compileAccessRestBlogs(results)

        return this.user
    }

    // Adds a new user
    async addUser(user) {
        let results = await knex('users')
            .insert(user)
            .returning('*')
            .catch((err) => console.log(err))

        await this.getUser(results[0].id)

        return this.user
    }

    // Updates a user
    async updateUser(user, id) {
        await this.getUser(id)

        user.password = this.user.password
        user.security_question = this.user.security_question
        user.security_answer = this.user.security_answer

        await knex('users')
            .update(user)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getUser(id)

        return this.user
    }

    // Deletes a user
    async deleteUser(id) {
        await knex('likes_dislikes')
            .del()
            .where('user_id', id)
            .catch((err) => console.log(err))

        let blogs = await knex
            .select('id')
            .from("blogs")
            .where("user_id", id)
            .catch((err) => console.log(err))

        // Delete everything to do with any blogs the user has written
        for (let item of blogs) {
            await knex('blog_pictures')
                .del()
                .where('blog_id', item.id)
                .catch((err) => console.log(err))

            await knex('blog_categories')
                .del()
                .where('blog_id', item.id)
                .catch((err) => console.log(err))

            let results = await knex('comments')
                .select('*')
                .where('blog_id', id)
                .catch((err) => console.log(err))

            for (let result of results) {
                await knex('likes_dislikes')
                    .del()
                    .where('comment_id', result.id)
                    .catch((err) => console.log(err))
            }

            await knex('comments')
                .del()
                .where('blog_id', item.id)
                .catch((err) => console.log(err))
        }

        let reviews = await knex
            .select('id')
            .from("reviews")
            .where("user_id", id)
            .catch((err) => console.log(err))

        // Delete everything to do with any reviews the user has written
        for (let item of reviews) {
            await knex('review_pictures')
                .del()
                .where('review_id', item.id)
                .catch((err) => console.log(err))
        }

        await knex('comments')
            .del()
            .where('user_id', id)
            .catch((err) => console.log(err))

        await knex('blog_favourites')
            .del()
            .where('user_id', id)
            .catch((err) => console.log(err))

        await knex('blogs')
            .del()
            .where('user_id', id)
            .catch((err) => console.log(err))

        await knex('reviews')
            .del()
            .where('user_id', id)
            .catch((err) => console.log(err))

        await knex('restaurant_favourites')
            .del()
            .where('user_id', id)
            .catch((err) => console.log(err))

        await knex('user_access')
            .del()
            .where('user_id', id)
            .catch((err) => console.log(err))

        await knex('users')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Deals with user access

    // Gets a specific user's access
    async listRestaurantAccess(id) {
        let results = await knex
            .select('*')
            .from("user_access")
            .where("user_id", id)
            .catch((err) => console.log(err))

        this.access = results

        return this.access
    }

    // Gets a specific access
    async getAccess(id) {
        let results = await knex
            .select('*')
            .from("user_access")
            .where("id", id)
            .catch((err) => console.log(err))

        this.access = results

        return this.access
    }

    // Adds new access to a user
    async addAccess(access) {
        let results = await knex('user_access')
            .insert(access)
            .returning('*')
            .catch((err) => console.log(err))

        await this.getAccess(results[0].id)

        return this.access
    }

    // Updates a user's access
    async updateAccess(access, id) {
        await knex('user_access')
            .update(access)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getAccess(access.user_id)

        return this.access
    }

    // Deletes a user's access
    async deleteAccess(id) {
        await knex('user_access')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Deals with user's favourite restaurants

    // Gets a specific user's favourite restaurants
    async listRestaurants(id) {
        let results = await knex
            .select('*')
            .from("restaurant_favourites")
            .where("user_id", id)
            .catch((err) => console.log(err))

        this.restaurants = results

        return this.restaurants
    }

    // Gets a specific favourited restaurant
    async getRestaurant(id) {
        let results = await knex
            .select('*')
            .from("restaurant_favourites")
            .where("id", id)
            .catch((err) => console.log(err))

        this.restaurants = results

        return this.restaurants
    }

    // Adds new favourite restaurant to a user
    async addRestaurant(restaurant) {
        let results = await knex('restaurant_favourites')
            .insert(restaurant)
            .returning('*')
            .catch((err) => console.log(err))

        await this.getRestaurant(results[0].id)

        return this.restaurants
    }

    // Updates a user's favourite restaurant
    async updateRestaurant(restaurant, id) {
        await knex('restaurant_favourites')
            .update(restaurant)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getRestaurant(id)

        return this.restaurants
    }

    // Deletes a user's favourite restaurant
    async deleteRestaurant(id) {
        await knex('restaurant_favourites')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Deals with user's favourite blog posts

    // Gets a specific user's favourite blog posts
    async listBlogs(id) {
        let results = await knex
            .select('*')
            .from("blog_favourites")
            .where("user_id", id)
            .catch((err) => console.log(err))

        this.blogs = results

        return this.blogs
    }

    // Gets a specific favourited blog post
    async getBlog(id) {
        let results = await knex
            .select('*')
            .from("blog_favourites")
            .where("id", id)
            .catch((err) => console.log(err))

        this.blogs = results

        return this.blogs
    }

    // Adds new favourite blog post to a user
    async addBlog(blog) {
        let results = await knex('blog_favourites')
            .insert(blog)
            .returning('*')
            .catch((err) => console.log(err))

        await this.getBlog(results[0].id)

        return this.blogs
    }

    // Updates a user's favourite blog posts
    async updateBlog(blog, id) {
        await knex('blog_favourites')
            .update(blog)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getBlog(id)

        return this.blogs
    }

    // Deletes a user's favourite blog posts
    async deleteBlog(id) {
        await knex('blog_favourites')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = UserService;