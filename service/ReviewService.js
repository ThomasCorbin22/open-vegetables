const updateDate = require('../modules/getDate.js');

class ReviewService {
    constructor(knex) {
        this.review = []
        this.pictures = []
        this.knex = knex;
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
            item["date_created"] = updateDate(item["date_created"])
            item["date_modified"] = updateDate(item["date_modified"])

            this.review.push(item)
        }
    }

    // Lists all the reviews for a user
    async listUserReviews(id) {
        let results = await this.knex
            .select('*')
            .from("reviews")
            .where("user_id", id)
            .catch((err) => console.log(err))

        await this.compilePictures(results)

        return this.review
    }

    // Lists all the reviews for a restaurant
    async listReviews(id) {
        let results = await this.knex
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
        let results = await this.knex
            .select('*')
            .from("reviews")
            .where("id", id)
            .catch((err) => console.log(err))

        await this.compilePictures(results)

        return this.review
    }

    // Posts a review
    async addReview(review) {
        let results = await this.knex('reviews')
            .insert(review)
            .returning('*')
            .catch((err) => console.log(err))
            
        await this.getReview(results[0].id)

        return this.review
    }

    // Updates a review
    async updateReview(review, id) {
        await this.knex('reviews')
            .update(review)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getReview(id)

        return this.review
    }

    // Deletes a review
    async deleteReview(id) {
        await this.knex('review_pictures')
            .del()
            .where('review_id', id)
            .catch((err) => console.log(err))

        await this.knex('reviews')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Deals with review pictures

    // Gets a reviews pictures
    async listPictures(id) {
        let results = await this.knex
            .select('*')
            .from("review_pictures")
            .where("review_id", id)
            .catch((err) => console.log(err))

        this.pictures = results

        return this.pictures
    }

    // Gets a specific picture
    async getPicture(id) {
        let results = await this.knex
            .select('*')
            .from("review_pictures")
            .where("id", id)
            .catch((err) => console.log(err))

        this.pictures = results

        return this.pictures
    }

    // Posts a picture
    async addPicture(picture) {
        let results = await this.knex('review_pictures')
            .insert(picture)
            .returning('*')
            .catch((err) => console.log(err))
            
        await this.getPicture(results[0].id)

        return this.pictures
    }

    // Updates a picture
    async updatePicture(picture, id) {
        await this.knex('review_pictures')
            .update(picture)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getPicture(id)

        return this.pictures
    }

    // Deletes a picture
    async deletePicture(id) {
        await this.knex('review_pictures')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = ReviewService;