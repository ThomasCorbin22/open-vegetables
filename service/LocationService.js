class LocationService {
    constructor(knex) {
        this.area = []
        this.district = []
        this.knex = knex;
    }

    // Gets all the areas
    async listAreas() {
        this.area = await this.knex
            .select('*')
            .from("areas")
            .catch((err) => console.log(err))

        return this.area
    }

    // Get a specific area
    async getArea(id) {
        this.area = await this.knex
            .select('*')
            .from("areas")
            .where("id", id)
            .catch((err) => console.log(err))

        return this.area
    }

    // Adds a new area
    async addArea(area) {
        this.area = await this.knex('areas')
            .insert(area)
            .returning('*')
            .catch((err) => console.log(err))

        await this.getArea(id)

        return this.area
    }

    // Updates an area
    async updateArea(area, id) {
        await this.knex('areas')
            .update(area)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getArea(id)

        return this.area
    }

    // Deletes an area
    async deleteComment(id) {
        await this.knex('areas')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Deals with districts

    // Gets all districts
    async listAllDistricts() {
        this.district = await this.knex
            .select('*')
            .from("districts")
            .catch((err) => console.log(err))

        return this.district
    }

    // Gets an area's districts
    async listDistricts(id) {
        this.district = await this.knex
            .select('*')
            .from("districts")
            .where("area_id", id)
            .catch((err) => console.log(err))

        return this.district
    }

    // Gets a specific district
    async getDistrict(id) {
        this.district = await this.knex
            .select('*')
            .from("districts")
            .where("id", id)
            .catch((err) => console.log(err))

        return this.district
    }



    // Adds new district
    async addDistrict(district) {
        this.district = await this.knex('districts')
            .insert(district)
            .returning('*')
            .catch((err) => console.log(err))

        await this.getDistrict(id)

        return this.district
    }

    // Updates a district
    async updateDistrict(district, id) {
        await this.knex('districts')
            .update(district)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getDistrict(id)

        return this.district
    }

    // Deletes a district
    async deleteDistrict(id) {
        await this.knex('districts')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    async getDistrictsLatLng() {
        let locations = []

        let areas = await this.knex('areas')
            .select('id', 'area')

        for (let area of areas) {
            let area_list = []

            let districts = await this.knex('districts')
                .select('id', 'district')
                .where('area_id', area.id)

            for (let district of districts) {
                if (district.district !== 'Not available') {
                    let restaurants = await this.knex('restaurants')
                        .select('name', 'longitude', 'latitude')
                        .where('district_id', district.id)

                    let latitude = restaurants.reduce((acc, cur) => acc + cur.latitude, 0) / (restaurants.length)
                    let longitude = restaurants.reduce((acc, cur) => acc + cur.longitude, 0) / (restaurants.length)

                    area_list.push([district.district, latitude, longitude])
                }
            }

            area_list.sort((a, b) => a[0].localeCompare(b[0]));

            locations.push([area.area, area_list])
        }

        return locations
    }
}

module.exports = LocationService;