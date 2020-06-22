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

class LocationService {
    constructor() {
        this.area = []
        this.district = []
    }

    // Gets all the areas
    async listAreas() {
        this.area = await knex
            .select('*')
            .from("areas")
            .catch((err) => console.log(err))

        return this.area
    }

    // Get a specific area
    async getArea(id) {
        this.area = await knex
            .select('*')
            .from("areas")
            .where("id", id)
            .catch((err) => console.log(err))

        return this.area
    }

    // Adds a new area
    async addArea(area) {
        this.area = await knex('areas')
            .insert(area)
            .returning('*')
            .catch((err) => console.log(err))
            
        await this.getArea(id)

        return this.area
    }

    // Updates an area
    async updateArea(area, id) {
        await knex('areas')
            .update(area)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getArea(id)

        return this.area
    }

    // Deletes an area
    async deleteComment(id) {
        await knex('areas')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Deals with districts

    // Gets all districts
    async listAllDistricts(id){
        this.district = await knex
            .select('*')
            .from("districts")
            .catch((err) => console.log(err))

        return this.district
    }

    // Gets an area's districts
    async listDistricts(id){
        this.district = await knex
            .select('*')
            .from("districts")
            .where("area_id", id)
            .catch((err) => console.log(err))

        return this.district
    }

    // Gets a specific district
    async getDistrict(id){
        this.district = await knex
            .select('*')
            .from("districts")
            .where("id", id)
            .catch((err) => console.log(err))
        
        return this.district
    }



    // Adds new district
    async addDistrict(district){
        this.district = await knex('districts')
            .insert(district)
            .returning('*')
            .catch((err) => console.log(err))

        await this.getDistrict(id)

        return this.district
    }

    // Updates a district
    async updateDistrict(district, id){      
        await knex('districts')
            .update(district)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getDistrict(id)

        return this.district
    }
    
    // Deletes a district
    async deleteDistrict(id){
        await knex('districts')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }
}

module.exports = LocationService;