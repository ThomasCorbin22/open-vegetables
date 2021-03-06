const updateDate = require('../modules/getDate.js');

class CommentService {
    constructor(knex) {
        this.comment = []
        this.knex = knex;
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
        let results = await this.knex
            .select('*')
            .from("comments")
            .where("blog_id", id)
            .catch((err) => console.log(err))

        await this.compileLikesDislikes(results)

        return this.comment
    }

    // Get a specific comment
    async getComment(id) {
        let results = await this.knex
            .select('*')
            .from("comments")
            .where("id", id)
            .catch((err) => console.log(err))

        await this.compileLikesDislikes(results)

        return this.comment
    }

    // Adds a new comment
    async addComment(comment) {
        let results = await this.knex('comments')
            .insert(comment)
            .returning('*')
            .catch((err) => console.log(err))
            
        await this.getComment(results[0].id)

        return this.comment
    }

    // Updates a comment
    async updateComment(comment, id) {
        await this.knex('comments')
            .update(comment)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getComment(id)

        return this.comment
    }

    // Deletes a comment
    async deleteComment(id) {
        await this.knex('likes_dislikes')
            .del()
            .where('comment_id', id)
            .catch((err) => console.log(err))

        await this.knex('comments')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Deals with likes / dislikes

    // Gets a comments number of likes
    async listLikes(id){
        let likes = await this.knex
            .select('*')
            .from("likes_dislikes")
            .where("like", true)
            .andWhere('comment_id', id)
            .catch((err) => console.log(err))

        let dislikes = await this.knex
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

        let results = await this.knex
            .select('*')
            .from("likes_dislikes")
            .where("user_id", user_id)
            .where("comment_id", comment_id)
            .catch((err) => console.log(err))
        
        this.like = results

        return this.like
    }

    // Gets a specific like
    async getLike(id){
        let results = await this.knex
            .select('*')
            .from("likes_dislikes")
            .where("id", id)
            .catch((err) => console.log(err))
        
        this.like = results

        return this.like
    }

    // Adds new like
    async addLike(like){
        let results = await this.knex('likes_dislikes')
            .insert(like)
            .returning('*')
            .catch((err) => console.log(err))

        await this.getLike(results[0].id)

        return this.like
    }

    // Updates a like
    async updateLike(like, id){      
        await this.knex('likes_dislikes')
            .update(like)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getLike(id)

        return this.like
    }
    
    // Deletes a like
    async deleteLike(id){
        await this.knex('likes_dislikes')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = CommentService;