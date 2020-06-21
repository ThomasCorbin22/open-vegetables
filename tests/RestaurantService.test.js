// jest test --runInBand --detectOpenHandles

const RestaurantService = require('../service/RestaurantService')

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

let restaurantService

describe('RestaurantService testing with restaurantservice', () => {
    
    let new_restaurant = {
        "name": 'Restaurant 101',
        "street_address": 'My place',
        "district_id": 2,
        "description": 'Home cooked food',
        "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.bYCGq485SZLPBgm-0oj_qAAAAA%26pid%3DApi&f=1',
        "price": 3,
        "telephone_number": '444',
        "social_media_URL": 'www.terrarie.com',
        "main_picture_URL": 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        "website_URL": 'www.place.com',
        "latitude": 19.3,
        "longitude": 105.2,
        "monday": '09:30-22:00'
    }
    
    let altered_restaurant = {
        "name": 'Our cool restaurant: V2',
        "street_address": 'GreenLand',
        "district_id": 3,
        "description": 'Nicer food',
        "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.6iu2HE0CMnwIpGvu66bMaAHaFj%26pid%3DApi&f=1',
        "price": 2,
        "telephone_number": '999',
        "social_media_URL": 'www.google.com',
        "main_picture_URL": 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        "website_URL": 'www.cool.com',
        "latitude": 23.0,
        "longitude": 113.6,
        "monday": '09:30-21:50',
    }
    
    let new_picture = {
        "picture_URL": 'https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        "restaurant_id": 4
    }
    
    let altered_picture = {
        "picture_URL": 'https://images.pexels.com/photos/34650/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        "restaurant_id": 2
    }
    
    let new_category = {
        "category": 'Spicy',
        "restaurant_id": 1
      }
    
    let altered_category = {
        "category": 'Sushi',
        "restaurant_id": 2
      }

    beforeEach(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])

        restaurantService = new RestaurantService()
    })

    afterAll(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])
    })

    test('restaurantService should call searchRestaurants properly', () => {
        expect.assertions(4);

        let query = {
            name: 'Our awesome restaurant'
        }
        
        return restaurantService.searchRestaurants(query)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].name).toBe('Our awesome restaurant')
                expect(results[0].street_address).toBe('Xccelerate')
                expect(results[0].description).toBe('All the best food')
            })
    })

    test('restaurantService should call listRestaurants', () => {
        expect.assertions(12);
        
        return restaurantService.listRestaurants()
            .then((results) => {
                expect(results.length).toBe(7)
                expect(results[0].name).toBe('Our awesome restaurant')
                expect(results[0].pictures).toEqual([
                    'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                  ])
                expect(results[0].categories).toEqual([ 'Korean' ])
                expect(results[0].rating).toEqual(1.5)
                expect(results[1].name).toBe('Our cool restaurant')
                expect(results[1].pictures).toEqual([
                    'https://images.pexels.com/photos/34650/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                  ])
                expect(results[1].categories).toEqual([ 'Japanese' ])
                expect(results[1].rating).toEqual(2.5)
                expect(results[2].name).toBe('Our niche restaurant')
                expect(results[3].name).toBe('Our luxurious restaurant')
                expect(results[4].name).toBe('Our old restaurant')
            })
    })

    test('restaurantService should call getRestaurant', () => {
        expect.assertions(7);

        let id = 2
        
        return restaurantService.getRestaurant(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].name).toBe('Our cool restaurant')
                expect(results[0].street_address).toBe('GreenLand')
                expect(results[0].description).toBe('Nicer food')
                expect(results[0].pictures).toEqual([
                    'https://images.pexels.com/photos/34650/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                  ])
                expect(results[0].rating).toEqual(2.5)
                expect(results[0].categories).toEqual([ 'Japanese' ])
            })
    })

    test('restaurantService should call addRestaurant', () => {
        expect.assertions(4);
        
        return restaurantService.addRestaurant(new_restaurant)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].name).toBe(new_restaurant.name)
                expect(results[0].street_address).toBe(new_restaurant.street_address)
                expect(results[0].description).toBe(new_restaurant.description)
            })
    })

    test('restaurantService should call updateRestaurant', () => {
        expect.assertions(4);

        let id = 2
        
        return restaurantService.updateRestaurant(altered_restaurant, id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].name).toBe(altered_restaurant.name)
                expect(results[0].street_address).toBe(altered_restaurant.street_address)
                expect(results[0].description).toBe(altered_restaurant.description)
            })
    })

    test('restaurantService should call deleteRestaurant', () => {
        expect.assertions(2);

        let id = 2
        
        return restaurantService.deleteRestaurant(id)
            .then((result) => {
                expect(result).toBe(true)

                return restaurantService.listRestaurants()
                    .then((list) => {
                        expect(list.length).toBe(6)
                    })
            })
    })

    test('restaurantService should call listPictures', () => {
        expect.assertions(3);
        
        return restaurantService.listPictures(1)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].picture_URL).toBe('https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
                expect(results[0].restaurant_id).toBe(1)
            })
    })

    test('restaurantService should call getPicture', () => {
        expect.assertions(3);

        let id = 2
        
        return restaurantService.getPicture(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].picture_URL).toBe('https://images.pexels.com/photos/34650/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500')
                expect(results[0].restaurant_id).toBe(2)
            })
    })

    test('restaurantService should call postPicture', () => {
        expect.assertions(3);
        
        return restaurantService.addPicture(new_picture)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].picture_URL).toBe(new_picture.picture_URL)
                expect(results[0].restaurant_id).toBe(new_picture.restaurant_id)
            })
    })

    test('restaurantService should call putPicture', () => {
        expect.assertions(3);

        let id = 2
        
        return restaurantService.updatePicture(altered_picture, id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].picture_URL).toBe(altered_picture.picture_URL)
                expect(results[0].restaurant_id).toBe(altered_picture.restaurant_id)
            })
    })
    
    test('restaurantService should call deletePicture', () => {
        expect.assertions(2);

        let id = 2
        
        return restaurantService.deletePicture(id)
            .then((result) => {
                expect(result).toBe(true)

                return restaurantService.getPicture(id)
                    .then((list) => {
                        expect(list.length).toBe(0)
                    })
            })
    })

    test('restaurantService should call listCategories', () => {
        expect.assertions(3);
        
        return restaurantService.listCategories(1)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].category).toBe('Korean')
                expect(results[0].restaurant_id).toBe(1)
            })
    })

    test('restaurantService should call getCategory', () => {
        expect.assertions(3);

        let id = 2
        
        return restaurantService.getCategory(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].category).toBe('Japanese')
                expect(results[0].restaurant_id).toBe(2)
            })
    })

    test('restaurantService should call postCategory', () => {
        expect.assertions(3);
        
        return restaurantService.addCategory(new_category)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].category).toBe(new_category.category)
                expect(results[0].restaurant_id).toBe(new_category.restaurant_id)
            })
    })

    test('restaurantService should call putCategory', () => {
        expect.assertions(3);

        let id = 2
        
        return restaurantService.updateCategory(altered_category, id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].category).toBe(altered_category.category)
                expect(results[0].restaurant_id).toBe(altered_category.restaurant_id)
            })
    })
    
    test('restaurantService should call deleteCategory', () => {
        expect.assertions(2);

        let id = 2
        
        return restaurantService.deleteCategory(id)
            .then((result) => {
                expect(result).toBe(true)

                return restaurantService.getCategory(id)
                    .then((list) => {
                        expect(list.length).toBe(0)
                    })
            })
    })
})