// Update with your config settings.
require('dotenv').config();
const updateDate = require('../modules/getDate.js');

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
    }

    // Add likes, dislikes to a restaurant
    async compileLikesDislikes(results){
        this.comment = []
            
        for (let item of results){
            let likesDislikes = await this.listLikes(item.id)

            item["likes"] = likesDislikes[0]
            item["dislikes"] = likesDislikes[1]
            item["date_created"] = updateDate(item["date_created"])
            item["date_modified"] = updateDate(item["date_modified"])

            this.comment.push(item)
        }
    }

    // Gets all the comments from a blog post
    async listComments(id) {
        let results = await knex
            .select('*')
            .from("comments")
            .where("blog_id", id)
            .catch((err) => console.log(err))

        await this.compileLikesDislikes(results)

        return this.comment
    }

    // Get a specific comment
    async getComment(id) {
        let results = await knex
            .select('*')
            .from("comments")
            .where("id", id)
            .catch((err) => console.log(err))

        await this.compileLikesDislikes(results)

        return this.comment
    }

    // Adds a new comment
    async addComment(comment) {
        await knex('comments')
            .insert(comment)
            .catch((err) => console.log(err))

        let results = await knex
            .select('id')
            .from("comments")
            .where("title", comment.title)
            .andWhere("body", comment.body)
            .catch((err) => console.log(err))
            
        await this.getComment(results[0].id)

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
        await knex('likes_dislikes')
            .del()
            .where('comment_id', id)
            .catch((err) => console.log(err))

        await knex('comments')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Deals with likes / dislikes

    // Gets a comments number of likes
    async listLikes(id){
        let likes = await knex
            .select('*')
            .from("likes_dislikes")
            .where("like", true)
            .andWhere('comment_id', id)
            .catch((err) => console.log(err))

        let dislikes = await knex
            .select('*')
            .from("likes_dislikes")
            .where("like", false)
            .andWhere('comment_id', id)
            .catch((err) => console.log(err))
        
        this.like = [likes.length, dislikes.length]

        return this.like
    }

    // Checks if a user has liked the comments on a blog
    async getUserLike(user_id, comment_id){
        console.log(user_id)
        console.log(comment_id)

        let results = await knex
            .select('*')
            .from("likes_dislikes")
            .where("user_id", user_id)
            .where("comment_id", comment_id)
            .catch((err) => console.log(err))

        console.log(results)
        
        this.like = results

        return this.like
    }

    // Gets a specific like
    async getLike(id){
        let results = await knex
            .select('*')
            .from("likes_dislikes")
            .where("id", id)
            .catch((err) => console.log(err))
        
        this.like = results

        return this.like
    }

    // Adds new like
    async addLike(like){
        await knex('likes_dislikes')
            .insert(like)
            .catch((err) => console.log(err))

        let results = await knex
            .select('id')
            .from("likes_dislikes")
            .where("user_id", like.user_id)
            .andWhere("comment_id", like.comment_id)
            .catch((err) => console.log(err))

        await this.getLike(results[0].id)

        return this.like
    }

    // Updates a like
    async updateLike(like, id){      
        await knex('likes_dislikes')
            .update(like)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getLike(id)

        return this.like
    }
    
    // Deletes a like
    async deleteLike(id){
        await knex('likes_dislikes')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = CommentService;