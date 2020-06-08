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

class BlogService {
    constructor() {
        this.blog = []
    }

    // Read from the current notes file and return the specific users notes
    async getBlog(id) {
        let results = await knex
            .select('*')
            .from("blogs")
            .where("id", id)
            .catch((err) => console.log(err))

        this.blog = results

        return this.blog
    }

    // Reads from the current notes file and appends the new note to the users list
    async addBlog(post, id) {
        await knex('blogs')
            .insert({ title: post.display_name, body: post.first_name, user_ID: post.user_ID })
            .catch((err) => console.log(err))

        await this.getBlog(id)

        return this.blog
    }

    // Reads from the current notes file and indexes the note to be updated and replaces it.
    async updateBlog(post, id) {
        await knex('blogs')
            .update({ title: post.display_name, body: post.first_name, user_ID: post.user_ID })
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getBlog(id)

        return this.blog
    }

    // Reads from the current notes file and indexes the note to be updated and deletes it.
    async deleteBlog(id) {
        await knex('blogs')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = BlogService;