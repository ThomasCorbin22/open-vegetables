const RestaurantRouter = require('../router/RestaurantRouter')

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
let restaurantRouter

let request
let response

describe('RestaurantRouter testing with restaurantservice', () => {
    
    let new_restaurant = {
        "name": 'Restaurant 101',
        "address": 'My place',
        "description": 'Home cooked food',
        "telephone_number": '444',
        "social_media_URL": 'www.terrarie.com',
        "main_picture_URL": 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        "website_URL": 'www.place.com',
        "latitude": 19.3,
        "longitude": 105.2,
        "opening_time": '09:30',
        "closing_time": '22:00'
    }
    
    let altered_restaurant = {
        "name": 'Our cool restaurant: V2',
        "address": 'GreenLand',
        "description": 'Nicer food',
        "telephone_number": '999',
        "social_media_URL": 'www.google.com',
        "main_picture_URL": 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        "website_URL": 'www.cool.com',
        "latitude": 23.0,
        "longitude": 113.6,
        "opening_time": '09:30',
        "closing_time": '21:50'
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

    beforeAll(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])

        response = {
            send : jest.fn().mockResolvedValue(true),
        }

        restaurantService = {
            searchRestaurants : jest.fn().mockResolvedValue(true),
            listRestaurants : jest.fn().mockResolvedValue(true),
            getRestaurant : jest.fn().mockResolvedValue(true),
            addRestaurant : jest.fn().mockResolvedValue(true),
            updateRestaurant : jest.fn().mockResolvedValue(true),
            deleteRestaurant : jest.fn().mockResolvedValue(true),

            listPictures : jest.fn().mockResolvedValue(true),
            getPicture : jest.fn().mockResolvedValue(true),
            addPicture : jest.fn().mockResolvedValue(true),
            updatePicture : jest.fn().mockResolvedValue(true),
            deletePicture : jest.fn().mockResolvedValue(true),

            listCategories : jest.fn().mockResolvedValue(true),
            getCategory : jest.fn().mockResolvedValue(true),
            addCategory : jest.fn().mockResolvedValue(true),
            updateCategory : jest.fn().mockResolvedValue(true),
            deleteCategory : jest.fn().mockResolvedValue(true)
        }

        restaurantRouter = new RestaurantRouter(restaurantService)
    })

    afterAll(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])
    })

    test('restaurantRouter should call searchRestaurants in response to a GET request', () => {
        expect.assertions(2);

        request = {
            query: {
                name: 'Our awesome restaurant'
            }
        }
        
        return restaurantRouter.searchRestaurants(request, response)
            .then(() => {
                expect(restaurantService.searchRestaurants).toHaveBeenCalledWith(request.query)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('restaurantRouter should call listRestaurants in response to a GET request', () => {
        expect.assertions(2);
        
        return restaurantRouter.listRestaurants(request, response)
            .then(() => {
                expect(restaurantService.listRestaurants).toHaveBeenCalled()
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('restaurantRouter should call getRestaurant in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }
        
        return restaurantRouter.getRestaurant(request, response)
            .then(() => {
                expect(restaurantService.getRestaurant).toHaveBeenCalledWith(request.params.id)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('restaurantRouter should call addRestaurant in response to a POST request', () => {
        expect.assertions(2);

        request = {
            body: new_restaurant
        }
        
        return restaurantRouter.postRestaurant(request, response)
            .then(() => {
                expect(restaurantService.addRestaurant).toHaveBeenCalledWith(new_restaurant)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('restaurantRouter should call putRestaurant in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: altered_restaurant
        }
        
        return restaurantRouter.putRestaurant(request, response)
            .then(() => {
                expect(restaurantService.updateRestaurant).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('restaurantRouter should call deleteRestaurant in response to a DELETE request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
        }
        
        return restaurantRouter.deleteRestaurant(request, response)
            .then(() => {
                expect(restaurantService.deleteRestaurant).toHaveBeenCalledWith(1);
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('restaurantRouter should call listPictures in response to a GET request', () => {
        expect.assertions(2);
        
        request = {
            params: {
                id: 1
            }
        }

        return restaurantRouter.listPictures(request, response)
            .then(() => {
                expect(restaurantService.listPictures).toHaveBeenCalledWith(1)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('restaurantRouter should call getPicture in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }
        
        return restaurantRouter.getPicture(request, response)
            .then(() => {
                expect(restaurantService.getPicture).toHaveBeenCalledWith(request.params.id)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('restaurantRouter should call postPicture in response to a POST request', () => {
        expect.assertions(2);

        request = {
            body: new_picture
        }
        
        return restaurantRouter.postPicture(request, response)
            .then(() => {
                expect(restaurantService.addPicture).toHaveBeenCalledWith(new_picture)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('restaurantRouter should call putPicture in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: altered_picture
        }
        
        return restaurantRouter.putPicture(request, response)
            .then(() => {
                expect(restaurantService.updatePicture).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalled()
            })
    })
    
    test('restaurantRouter should call deletePicture in response to a DELETE request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
        }
        
        return restaurantRouter.deletePicture(request, response)
            .then(() => {
                expect(restaurantService.deletePicture).toHaveBeenCalledWith(1);
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('restaurantRouter should call listCategories in response to a GET request', () => {
        expect.assertions(2);
        
        request = {
            params: {
                id: 1
            }
        }
        
        return restaurantRouter.listCategories(request, response)
            .then(() => {
                expect(restaurantService.listCategories).toHaveBeenCalledWith(1)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('restaurantRouter should call getCategory in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }
        
        return restaurantRouter.getCategory(request, response)
            .then(() => {
                expect(restaurantService.getCategory).toHaveBeenCalledWith(request.params.id)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('restaurantRouter should call postCategory in response to a POST request', () => {
        expect.assertions(2);

        request = {
            body: new_category
        }
        
        return restaurantRouter.postCategory(request, response)
            .then(() => {
                expect(restaurantService.addCategory).toHaveBeenCalledWith(new_category)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('restaurantRouter should call putCategory in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: altered_category
        }
        
        return restaurantRouter.putCategory(request, response)
            .then(() => {
                expect(restaurantService.updateCategory).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalled()
            })
    })
    
    test('restaurantRouter should call deleteCategory in response to a DELETE request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
        }
        
        return restaurantRouter.deleteCategory(request, response)
            .then(() => {
                expect(restaurantService.deleteCategory).toHaveBeenCalledWith(1);
                expect(response.send).toHaveBeenCalled()
            })
    })
})