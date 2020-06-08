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
    }

    // Read from the current notes file and return the specific users notes
    async getUser(user){
        let results = await knex
            .select('*')
            .from("users")
            .where("id", user)
            .catch((err) => console.log(err))
        
        this.user = results

        return this.user
    }

    // Reads from the current notes file and appends the new note to the users list
    async addUser(note, id){
        await knex('users')
            .insert({display_name: note.display_name, first_name: note.first_name, last_name: note.last_name, email: note.email, password: note.password, description: note.description})
            .catch((err) => console.log(err))

        await this.getUser(id)

        return this.user
    }

    // Reads from the current notes file and indexes the note to be updated and replaces it.
    async updateUser(note, id){      
        await knex('users')
            .update({display_name: note.display_name, first_name: note.first_name, last_name: note.last_name, email: note.email, password: note.password, description: note.description})
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getUser(id)

        return this.user
    }
    
    // Reads from the current notes file and indexes the note to be updated and deletes it.
    async deleteUser(id){
        await knex('users')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = UserService;