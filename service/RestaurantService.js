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
    }

    // Read from the current notes file and return the specific users notes
    async getRestaurant(id) {
        let results = await knex
            .select('*')
            .from("restaurants")
            .where("id", id)
            .catch((err) => console.log(err))

        this.restaurant = results

        return this.restaurant
    }

    // Reads from the current notes file and appends the new note to the users list
    async addRestaurant(restaurant, id) {
        await knex('restaurants')
            .insert({
                name: restaurant.name,
                address: restaurant.address,
                description: restaurant.description,
                telephone_number: restaurant.telephone_number,
                social_media_URL: restaurant.social_media_URL,
                main_picture_URL: restaurant.main_picture_URL,
                website_URL: restaurant.website_URL,
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
                opening_time: restaurant.opening_time,
                closing_time: restaurant.closing_time
            })
            .catch((err) => console.log(err))

        await this.getRestaurant(id)

        return this.blog
    }

    // Reads from the current notes file and indexes the note to be updated and replaces it.
    async updateRestaurant(restaurant, id) {
        await knex('restaurants')
            .update({
                name: restaurant.name,
                address: restaurant.address,
                description: restaurant.description,
                telephone_number: restaurant.telephone_number,
                social_media_URL: restaurant.social_media_URL,
                main_picture_URL: restaurant.main_picture_URL,
                website_URL: restaurant.website_URL,
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
                opening_time: restaurant.opening_time,
                closing_time: restaurant.closing_time
            })
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getRestaurant(id)

        return this.blog
    }

    // Reads from the current notes file and indexes the note to be updated and deletes it.
    async deleteRestaurant(id) {
        await knex('restaurants')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = RestaurantService;