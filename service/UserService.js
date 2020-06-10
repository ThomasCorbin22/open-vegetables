// Update with your config settings.
require('dotenv').config();

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database:   process.env.DATABASE_NAME,
        user:       process.env.DATABASE_USERNAME,
        password:   process.env.DATABASE_PASSWORD
    }
});

class UserService{
    constructor(){
        this.user = []
        this.access = []
        this.blogs = []
        this.restaurants = []
    }

    // Search all the users
    async searchUsers(query){
        let results = await knex
            .select('*')
            .from("users")
            .modify(function(queryBuilder) {
                for (let key in query){
                    queryBuilder.where(key, query[key])
                }
            })
            .catch((err) => console.log(err))

        this.user = results

        return this.user
    }

    // Gets all the users
    async listUsers(){
        let results = await knex
            .select('*')
            .from("users")
            .catch((err) => console.log(err))
        
        this.user = results

        return this.user
    }

    // Deals with individual users

    // Gets a specific user
    async getUser(id){
        let results = await knex
            .select('*')
            .from("users")
            .where("id", id)
            .catch((err) => console.log(err))
        
        this.user = results

        return this.user
    }

    // Adds a new user
    async addUser(user){
        await knex('users')
            .insert(user)
            .catch((err) => console.log(err))

        let results = await knex
            .select('id')
            .from("users")
            .where("email", user.email)
            .catch((err) => console.log(err))

        await this.getUser(results[0].id)

        return this.user
    }

    // Updates a user
    async updateUser(user, id){      
        await knex('users')
            .update(user)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getUser(id)

        return this.user
    }
    
    // Deletes a user
    async deleteUser(id){
        await knex('blogs')
            .del()
            .where('user_id', id)
            .catch((err) => console.log(err))

        await knex('reviews')
            .del()
            .where('user_id', id)
            .catch((err) => console.log(err))

        await knex('comments')
            .del()
            .where('user_id', id)
            .catch((err) => console.log(err))

        await knex('blog_favourites')
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
    async listAccess(id){
        let results = await knex
            .select('*')
            .from("user_access")
            .where("user_id", id)
            .catch((err) => console.log(err))
        
        this.access = results

        return this.access
    }

    // Gets a specific access
    async getAccess(id){
        let results = await knex
            .select('*')
            .from("user_access")
            .where("id", id)
            .catch((err) => console.log(err))
        
        this.access = results

        return this.access
    }

    // Adds new access to a user
    async addAccess(access){
        await knex('user_access')
            .insert(access)
            .catch((err) => console.log(err))

        await this.listAccess(access.user_id)

        return this.access
    }

    // Updates a user's access
    async updateAccess(access, id){      
        await knex('user_access')
            .update(access)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.listAccess(access.user_id)

        return this.access
    }
    
    // Deletes a user's access
    async deleteAccess(id){
        await knex('user_access')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Deals with user's favourite restaurants

    // Gets a specific user's favourite restaurants
    async listRestaurant(id){
        let results = await knex
            .select('*')
            .from("restaurant_favourites")
            .where("user_id", id)
            .catch((err) => console.log(err))
        
        this.restaurants = results

        return this.restaurants
    }

    // Gets a specific favourited restaurant
    async getRestaurant(id){
        let results = await knex
            .select('*')
            .from("restaurant_favourites")
            .where("id", id)
            .catch((err) => console.log(err))
        
        this.restaurants = results

        return this.restaurants
    }

    // Adds new favourite restaurant to a user
    async addRestaurant(restaurant){
        await knex('restaurant_favourites')
            .insert(restaurant)
            .catch((err) => console.log(err))

        await this.listRestaurant(restaurant.user_id)

        return this.restaurants
    }

    // Updates a user's favourite restaurant
    async updateRestaurant(restaurant, id){      
        await knex('restaurant_favourites')
            .update(restaurant)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.listRestaurant(restaurant.user_id)

        return this.restaurants
    }
    
    // Deletes a user's favourite restaurant
    async deleteRestaurant(id){
        await knex('restaurant_favourites')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Deals with user's favourite blog posts

    // Gets a specific user's favourite blog posts
    async listBlog(id){
        let results = await knex
            .select('*')
            .from("blog_favourites")
            .where("user_id", id)
            .catch((err) => console.log(err))
        
        this.blogs = results

        return this.blogs
    }

    // Gets a specific favourited blog post
    async getBlog(id){
        let results = await knex
            .select('*')
            .from("blog_favourites")
            .where("id", id)
            .catch((err) => console.log(err))
        
        this.blogs = results

        return this.blogs
    }

    // Adds new favourite blog post to a user
    async addBlog(blog){
        await knex('blog_favourites')
            .insert(blog)
            .catch((err) => console.log(err))

        await this.listBlog(blog.user_id)

        return this.blogs
    }

    // Updates a user's favourite blog posts
    async updateBlog(blog, id){      
        await knex('blog_favourites')
            .update(blog)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.listBlog(blog.user_id)

        return this.blogs
    }
    
    // Deletes a user's favourite blog posts
    async deleteBlog(id){
        await knex('restaurant_favourites')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = UserService;