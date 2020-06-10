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

class RestaurantService {
    constructor() {
        this.restaurant = []
        this.pictures = []
        this.categories = []
    }

    // Searches all the restaurants
    async searchRestaurants(query) {
        let results = await knex
            .select('*')
            .from("restaurants")
            .modify(function(queryBuilder) {
                for (let key in query){
                    queryBuilder.where(key, query[key])
                }
            })
            .catch((err) => console.log(err))

        this.restaurant = results

        return this.restaurant
    }

    // Lists all the restaurants
    async listRestaurants() {
        let results = await knex
            .select('*')
            .from("restaurants")
            .catch((err) => console.log(err))

        this.restaurant = results

        return this.restaurant
    }

    // Individual restaurants

    // Gets a specific restaurant
    async getRestaurant(id) {
        let results = await knex
            .select('*')
            .from("restaurants")
            .where("id", id)
            .catch((err) => console.log(err))

        this.restaurant = results

        return this.restaurant
    }

    // Adds a restaurant
    async addRestaurant(restaurant) {
        await knex('restaurants')
            .insert(restaurant)
            .catch((err) => console.log(err))

        let results = await knex
            .select('id')
            .from("restaurants")
            .where("name", restaurant.name)
            .catch((err) => console.log(err))

        await this.getRestaurant(results[0].id)

        return this.restaurant
    }

    // Updates a restaurant
    async updateRestaurant(restaurant, id) {
        await knex('restaurants')
            .update(restaurant)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getRestaurant(id)

        return this.restaurant
    }

    // Deletes a restaurant
    async deleteRestaurant(id) {
        let results = await knex
            .select('id')
            .from("reviews")
            .where('restaurant_id', id)
            .catch((err) => console.log(err))

        for (let result of results){
            await knex('review_pictures')
                .del()
                .where('review_id', result.id)
                .catch((err) => console.log(err))
        }

        await knex('reviews')
            .del()
            .where('restaurant_id', id)
            .catch((err) => console.log(err))

        await knex('user_access')
            .del()
            .where('restaurant_id', id)
            .catch((err) => console.log(err))

        await knex('restaurant_pictures')
            .del()
            .where('restaurant_id', id)
            .catch((err) => console.log(err))

        await knex('restaurant_favourites')
            .del()
            .where('restaurant_id', id)
            .catch((err) => console.log(err))

        await knex('restaurant_categories')
            .del()
            .where('restaurant_id', id)
            .catch((err) => console.log(err))

        await knex('restaurants')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Restaurant pictures

    // Gets the pictures from a restaurant
    async listPictures(id) {
        let results = await knex
            .select('*')
            .from("restaurant_pictures")
            .where("restaurant_id", id)
            .catch((err) => console.log(err))

        this.pictures = results

        return this.pictures
    }

    // Gets a specific pictures
    async getPicture(id) {
        let results = await knex
            .select('*')
            .from("restaurant_pictures")
            .where("id", id)
            .catch((err) => console.log(err))

        this.pictures = results

        return this.pictures
    }

    // Adds a picture
    async addPicture(picture) {
        await knex('restaurant_pictures')
            .insert(picture)
            .catch((err) => console.log(err))

        let results = await knex
            .select('id')
            .from("restaurant_categories")
            .where("restaurant_id", picture.restaurant_id)
            .andWhere("picture_URL", picture.picture_URL)
            .catch((err) => console.log(err))

        await this.getPicture(results[0].id)

        return this.pictures
    }

    // Updates a picture
    async updatePicture(picture, id) {
        await knex('restaurant_pictures')
            .update(picture)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getPicture(id)

        return this.pictures
    }

    // Deletes a picture
    async deletePicture(id) {
        await knex('restaurant_pictures')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Restaurant categories

    // Gets a specific restaurant's categories
    async getCategory(id) {
        let results = await knex
            .select('*')
            .from("restaurant_categories")
            .where("restaurant_id", id)
            .catch((err) => console.log(err))

        this.categories = results

        return this.categories
    }

    // Gets a specific categories
    async getCategory(id) {
        let results = await knex
            .select('*')
            .from("restaurant_categories")
            .where("id", id)
            .catch((err) => console.log(err))

        this.categories = results

        return this.categories
    }

    // Adds a category
    async addCategory(category) {
        await knex('restaurant_categories')
            .insert(category)
            .catch((err) => console.log(err))

        let results = await knex
            .select('id')
            .from("restaurant_categories")
            .where("restaurant_id", category.restaurant_id)
            .andWhere("category", category.category)
            .catch((err) => console.log(err))

        await this.getCategory(results[0].id)

        return this.categories
    }

    // Updates a restaurant
    async updateCategory(category, id) {
        await knex('restaurant_categories')
            .update(category)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getCategory(id)

        return this.categories
    }

    // Deletes a restaurant
    async deleteCategory(id) {
        await knex('restaurant_categories')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = RestaurantService;