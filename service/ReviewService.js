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

class ReviewService {
    constructor() {
        this.review = []
        this.reviewList = []
        this.pictures = []
    }

    // Lists all the reviews for a restaurant
    async listReviews(id) {
        let results = await knex
            .select('*')
            .from("reviews")
            .where("restaurant_id", id)
            .catch((err) => console.log(err))

        this.reviewList = results

        return this.reviewList
    }

    // Deals with individual reviews

    // Gets a specific review
    async getReview(id) {
        let results = await knex
            .select('*')
            .from("reviews")
            .where("id", id)
            .catch((err) => console.log(err))

        this.review = results

        return this.review
    }

    // Posts a review
    async addReview(review) {
        await knex('reviews')
            .insert(review)
            .catch((err) => console.log(err))

        let id = await knex
            .select('id')
            .from("reviews")
            .where("title", review.title)
            .catch((err) => console.log(err))
            
        await this.getReview(id)

        return this.review
    }

    // Updates a review
    async updateReview(review, id) {
        await knex('reviews')
            .update(review)
            .where('id', id)
            .andWhere('user_ID', user)
            .catch((err) => console.log(err))

        await this.getReview(id)

        return this.review
    }

    // Deletes a review
    async deleteReview(id) {
        await knex('reviews')
            .del()
            .where('id', id)
            .andWhere('user_ID', user)
            .catch((err) => console.log(err))

        return true
    }

    // Deals with review pictures

    // Gets a specific review
    async getPicture(id) {
        let results = await knex
            .select('*')
            .from("review_pictures")
            .where("restaurant_id", id)
            .catch((err) => console.log(err))

        this.pictures = results

        return this.pictures
    }

    // Posts a review
    async addPicture(picture) {
        await knex('review_pictures')
            .insert(picture)
            .catch((err) => console.log(err))

        let id = await knex
            .select('id')
            .from("review_pictures")
            .where("picture_URL", picture.picture_URL)
            .andWhere("review_id", picture.review_id)
            .catch((err) => console.log(err))
            
        await this.getPicture(id)

        return this.pictures
    }

    // Updates a review
    async updatePicture(picture, id) {
        await knex('review_pictures')
            .update(picture)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getPicture(id)

        return this.pictures
    }

    // Deletes a review
    async deletePicture(id) {
        await knex('review_pictures')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = ReviewService;