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

class CommentService {
    constructor() {
        this.comment = []
        this.commentsList = []
    }

    // Gets all the comments from a blog post
    async listComments(id) {
        let results = await knex
            .select('*')
            .from("comments")
            .where("blog_id", id)
            .catch((err) => console.log(err))

        this.commentsList = results

        return this.commentsList
    }

    // Get a specific comment
    async getComment(id) {
        let results = await knex
            .select('*')
            .from("comments")
            .where("id", id)
            .catch((err) => console.log(err))

        this.comment = results

        return this.comment
    }

    // Adds a new comment
    async addComment(comment) {
        await knex('comments')
            .insert(comment)
            .catch((err) => console.log(err))

        let id = await knex
            .select('id')
            .from("comments")
            .where("title", comment.title)
            .catch((err) => console.log(err))
            
        await this.getComment(id)

        return this.comment
    }

    // Updates a comment
    async updateComment(comment, id) {
        await knex('comments')
            .update(comment)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getComment(id)

        return this.comment
    }

    // Deletes a comment
    async deleteComment(id) {
        await knex('comments')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = CommentService;