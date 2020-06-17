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

class ReviewService {
    constructor() {
        this.review = []
        this.pictures = []
    }

    // Add pictures to a review
    async compilePictures(results){
        this.review = []
            
        for (let item of results){
            let pictures = await this.listPictures(item.id)

            let review_pictures = []

            for (let picture of pictures){
                review_pictures.push(picture.picture_URL)
            }

            item["pictures"] = review_pictures
            item["date_created"] = getDate(item["date_created"])
            item["date_modified"] = getDate(item["date_modified"])

            this.review.push(item)
        }
    }

    // Lists all the reviews for a restaurant
    async listReviews(id) {
        let results = await knex
            .select('*')
            .from("reviews")
            .where("restaurant_id", id)
            .catch((err) => console.log(err))

        await this.compilePictures(results)

        return this.review
    }

    // Deals with individual reviews

    // Gets a specific review
    async getReview(id) {
        let results = await knex
            .select('*')
            .from("reviews")
            .where("id", id)
            .catch((err) => console.log(err))

        await this.compilePictures(results)

        return this.review
    }

    // Posts a review
    async addReview(review) {
        await knex('reviews')
            .insert(review)
            .catch((err) => console.log(err))

        let results = await knex
            .select('id')
            .from("reviews")
            .where("title", review.title)
            .catch((err) => console.log(err))
            
        await this.getReview(results[0].id)

        return this.review
    }

    // Updates a review
    async updateReview(review, id) {
        await knex('reviews')
            .update(review)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getReview(id)

        return this.review
    }

    // Deletes a review
    async deleteReview(id) {
        await knex('review_pictures')
            .del()
            .where('review_id', id)
            .catch((err) => console.log(err))

        await knex('reviews')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Deals with review pictures

    // Gets a reviews pictures
    async listPictures(id) {
        let results = await knex
            .select('*')
            .from("review_pictures")
            .where("review_id", id)
            .catch((err) => console.log(err))

        this.pictures = results

        return this.pictures
    }

    // Gets a specific picture
    async getPicture(id) {
        let results = await knex
            .select('*')
            .from("review_pictures")
            .where("id", id)
            .catch((err) => console.log(err))

        this.pictures = results

        return this.pictures
    }

    // Posts a picture
    async addPicture(picture) {
        await knex('review_pictures')
            .insert(picture)
            .catch((err) => console.log(err))

        let results = await knex
            .select('id')
            .from("review_pictures")
            .where("picture_URL", picture.picture_URL)
            .andWhere("review_id", picture.review_id)
            .catch((err) => console.log(err))
            
        await this.getPicture(results[0].id)

        return this.pictures
    }

    // Updates a picture
    async updatePicture(picture, id) {
        await knex('review_pictures')
            .update(picture)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getPicture(id)

        return this.pictures
    }

    // Deletes a picture
    async deletePicture(id) {
        await knex('review_pictures')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = ReviewService;