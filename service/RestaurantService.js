
class RestaurantService {
    constructor(knex) {
        this.restaurant = []
        this.pictures = []
        this.categories = []
        this.knex = knex;
    }

    // Searches all the restaurants
    async searchRestaurants(query, range) {
        let results = await this.knex
            .select('*', 'restaurants.id')
            .from("restaurants")
            .join('districts', 'restaurants.district_id', '=', 'districts.id')
            .join('areas', 'districts.area_id', '=', 'areas.id')
            .modify(function (queryBuilder) {
                for (let key in query) {
                    if (key === 'latitude' || key === 'longitude') {
                        queryBuilder.where(key, '<', parseFloat(query[key]) + range / 110.574)
                        queryBuilder.andWhere(key, '>', parseFloat(query[key]) - range / (111.320 * Math.cos(20.3 / Math.PI / 180)))
                    }
                    else if (typeof query[key] === 'string') {
                        queryBuilder.where(key, 'ilike', "%" + query[key] + "%")
                    }
                    else {
                        queryBuilder.where(key, query[key])
                    }
                }
            })
            .catch((err) => console.log(err))

        await this.compilePicturesCategoriesRating(results)

        return this.restaurant
    }

    // Add pictures and categories to a restaurant
    async compilePicturesCategoriesRating(results) {
        this.restaurant = []

        for (let item of results) {
            let pictures = await this.listPictures(item.id)
            let categories = await this.listCategories(item.id)

            let restaurant_pictures = []
            let category_pictures = []

            for (let picture of pictures) {
                restaurant_pictures.push(picture.picture_URL)
            }

            for (let category of categories) {
                category_pictures.push(category.category)
            }

            item["pictures"] = restaurant_pictures
            item["categories"] = category_pictures
            item["rating"] = await this.getRating(item.id)

            this.restaurant.push(item)
        }
    }

    // Lists all the restaurants
    async listRestaurants() {
        let results = await this.knex
            .select('*')
            .from("restaurants")
            .catch((err) => console.log(err))

        await this.compilePicturesCategoriesRating(results)

        return this.restaurant
    }

    // Individual restaurants

    // Gets a specific restaurant
    async getRestaurant(id) {
        let results = await this.knex
            .select('*', 'restaurants.id')
            .from("restaurants")
            .join('districts', 'restaurants.district_id', '=', 'districts.id')
            .join('areas', 'districts.area_id', '=', 'areas.id')
            .where("restaurants.id", id)
            .catch((err) => console.log(err))
        
        await this.compilePicturesCategoriesRating(results)

        return this.restaurant
    }

    // Adds a restaurant
    async addRestaurant(restaurant) {
        let results = await this.knex('restaurants')
            .insert(restaurant)
            .returning('*')
            .catch((err) => console.log(err))

        await this.getRestaurant(results[0].id)

        return this.restaurant
    }

    // Updates a restaurant
    async updateRestaurant(restaurant, id) {
        await this.knex('restaurants')
            .update(restaurant)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getRestaurant(id)

        return this.restaurant
    }

    // Deletes a restaurant
    async deleteRestaurant(id) {
        let results = await this.knex
            .select('id')
            .from("reviews")
            .where('restaurant_id', id)
            .catch((err) => console.log(err))

        for (let result of results) {
            await this.knex('review_pictures')
                .del()
                .where('review_id', result.id)
                .catch((err) => console.log(err))
        }

        await this.knex('reviews')
            .del()
            .where('restaurant_id', id)
            .catch((err) => console.log(err))

        await this.knex('user_access')
            .del()
            .where('restaurant_id', id)
            .catch((err) => console.log(err))

        await this.knex('restaurant_pictures')
            .del()
            .where('restaurant_id', id)
            .catch((err) => console.log(err))

        await this.knex('restaurant_favourites')
            .del()
            .where('restaurant_id', id)
            .catch((err) => console.log(err))

        await this.knex('restaurant_categories')
            .del()
            .where('restaurant_id', id)
            .catch((err) => console.log(err))

        await this.knex('restaurants')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Restaurant pictures

    // Gets the pictures from a restaurant
    async listPictures(id) {
        let results = await this.knex
            .select('*')
            .from("restaurant_pictures")
            .where("restaurant_id", id)
            .catch((err) => console.log(err))

        this.pictures = results

        return this.pictures
    }

    // Gets a specific pictures
    async getPicture(id) {
        let results = await this.knex
            .select('*')
            .from("restaurant_pictures")
            .where("id", id)
            .catch((err) => console.log(err))

        this.pictures = results

        return this.pictures
    }

    // Adds a picture
    async addPicture(picture) {
        let results = await this.knex('restaurant_pictures')
            .insert(picture)
            .returning('*')
            .catch((err) => console.log(err))

        await this.getPicture(results[0].id)

        return this.pictures
    }

    // Updates a picture
    async updatePicture(picture, id) {
        await this.knex('restaurant_pictures')
            .update(picture)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getPicture(id)

        return this.pictures
    }

    // Deletes a picture
    async deletePicture(id) {
        await this.knex('restaurant_pictures')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Restaurant categories

    // Gets all categories
    async listAllCategories() {
        let results = await this.knex
            .select('*')
            .from("restaurant_categories")
            .catch((err) => console.log(err))

        this.categories = results

        return this.categories
    }

    // Gets a specific restaurant's categories
    async listCategories(id) {
        let results = await this.knex
            .select('*')
            .from("restaurant_categories")
            .where("restaurant_id", id)
            .catch((err) => console.log(err))

        this.categories = results

        return this.categories
    }

    // Gets a specific categories
    async getCategory(id) {
        let results = await this.knex
            .select('*')
            .from("restaurant_categories")
            .where("id", id)
            .catch((err) => console.log(err))

        this.categories = results

        return this.categories
    }

    // Adds a category
    async addCategory(category) {
        let results = await this.knex('restaurant_categories')
            .insert(category)
            .returning('*')
            .catch((err) => console.log(err))

        await this.getCategory(results[0].id)

        return this.categories
    }

    // Updates a restaurant
    async updateCategory(category, id) {
        await this.knex('restaurant_categories')
            .update(category)
            .where('id', id)
            .catch((err) => console.log(err))

        await this.getCategory(id)

        return this.categories
    }

    // Deletes a restaurant
    async deleteCategory(id) {
        await this.knex('restaurant_categories')
            .del()
            .where('id', id)
            .catch((err) => console.log(err))

        return true
    }

    // Restaurant rating

    // Gets a specific restaurant's rating
    async getRating(id) {
        let results = await this.knex
            .select('rating')
            .from("reviews")
            .where("restaurant_id", id)
            .catch((err) => console.log(err))

        let total_rating = 0
        let count = 0

        if (results.length > 0) {
            for (let item of results) {
                total_rating += item.rating
                count++
            }

            this.rating = parseFloat((total_rating / count).toFixed(2))
        }
        else {
            this.rating = 'Not yet rated'
        }

        return this.rating
    }
}

module.exports = RestaurantService;