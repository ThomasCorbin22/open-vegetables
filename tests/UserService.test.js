// jest test --runInBand --detectOpenHandles

const UserService = require('../service/UserService')

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

let userService

describe('UserService testing with userservice', () => {
    
    let new_user = {
        "first_name": 'Hollie',
        "last_name": 'Collins',
        "email": 'hollie@hollie.com',
        "password": 'password',
        "description": 'It’s not the mountain we conquer, but ourselves',
        'profile_picture_URL': 'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.0-9/95344172_10156915557110064_2596378485723234304_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=zHORTMnUlQoAX87U_z5&_nc_ht=scontent-hkg4-1.xx&oh=61a760d68323bb7eeb87778b8eef8b11&oe=5F05DF32'
    }
    
    let altered_user = {
        "first_name": 'Alex',
        "last_name": 'Wong',
        "email": 'alex@alex.com',
        "password": 'password',
        "description": 'Something has changed about Alex',
        'profile_picture_URL': 'https://avatars0.githubusercontent.com/u/40209618?s=460&u=2a86e8fa0d42014551e1f81ff24a1720185d66da&v=4'
    }
    
    let new_restaurant = {
        "user_id": 1,
        "restaurant_id": 2
      }
    
    let altered_restaurant = {
        "user_id": 3,
        "restaurant_id": 2
      }
    
    let new_blog = {
        "user_id": 1,
        "blog_id": 2
      }
    
    let altered_blog = {
        "user_id": 3,
        "blog_id": 2
      }
    
    let new_access = {
        "user_id": 1,
        "restaurant_id": 2
      }
    
    let altered_access = {
        "user_id": 3,
        "restaurant_id": 2
      }

    beforeEach(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])

        userService = new UserService()
    })

    afterAll(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])
    })

    test('userService should call searchUsers', () => {
        expect.assertions(4);

        let query = {
            first_name: 'Thomas',
            last_name: 'Corbin'
        }
        
        return userService.searchUsers(query)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].first_name).toBe('Thomas')
                expect(results[0].last_name).toBe('Corbin')
                expect(results[0].email).toBe('thomas@thomas.com')
            })
    })

    test('userService should call listUsers', () => {
        expect.assertions(7);
        
        return userService.listUsers()
            .then((results) => {
                expect(results.length).toBe(3)
                expect(results[0].first_name).toBe('Thomas')
                expect(results[0].restaurant_access[0].name).toEqual('Our awesome restaurant')
                expect(results[0].restaurants[0].name).toEqual('Our awesome restaurant')
                expect(results[0].blogs[0].title).toEqual('Some cool post')
                expect(results[1].first_name).toBe('Alex')
                expect(results[2].first_name).toBe('Edwin')
            })
    })

    test('userService should call getUser', () => {
        expect.assertions(8);

        let id = 2
        
        return userService.getUser(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].first_name).toBe('Alex')
                expect(results[0].last_name).toBe('Wong')
                expect(results[0].email).toBe('alex@alex.com')
                expect(results[0].restaurant_access[0].name).toEqual('Our cool restaurant')
                expect(results[0].restaurants[0].name).toEqual('Our cool restaurant')
                expect(results[0].blogs[0].title).toEqual('Another post')
                expect(results[0].blog_access[0].title).toEqual('Another post')
            })
    })

    test('userService should call addUser', () => {
        expect.assertions(4);
        
        return userService.addUser(new_user)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].first_name).toBe(new_user.first_name)
                expect(results[0].last_name).toBe(new_user.last_name)
                expect(results[0].email).toBe(new_user.email)
            })
    })

    test('userService should call updateUser', () => {
        expect.assertions(4);

        let id = 2
        
        return userService.updateUser(altered_user, id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].first_name).toBe(altered_user.first_name)
                expect(results[0].last_name).toBe(altered_user.last_name)
                expect(results[0].email).toBe(altered_user.email)
            })
    })

    test('userService should call deleteUser', () => {
        expect.assertions(2);

        let id = 2
        
        return userService.deleteUser(id)
            .then((result) => {
                expect(result).toBe(true)

                return userService.listUsers()
                    .then((list) => {
                        expect(list.length).toBe(2)
                    })
            })
    })

    test('userService should call listRestaurants', () => {
        expect.assertions(3);

        let id = 1
        
        return userService.listRestaurants(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].user_id).toBe(1)
                expect(results[0].restaurant_id).toBe(1)
            })
    })

    test('userService should call getRestaurant', () => {
        expect.assertions(3);

        let id = 2
        
        return userService.getRestaurant(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].user_id).toBe(2)
                expect(results[0].restaurant_id).toBe(2)
            })
    })

    test('userService should call postRestaurant', () => {
        expect.assertions(3);
        
        return userService.addRestaurant(new_restaurant)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].user_id).toBe(new_restaurant.user_id)
                expect(results[0].restaurant_id).toBe(new_restaurant.restaurant_id)
            })
    })

    test('userService should call putRestaurant', () => {
        expect.assertions(3);

        let id = 2
        
        return userService.updateRestaurant(altered_restaurant, id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].user_id).toBe(altered_restaurant.user_id)
                expect(results[0].restaurant_id).toBe(altered_restaurant.restaurant_id)
            })
    })
    
    test('userService should call deleteRestaurant', () => {
        expect.assertions(2);

        let id = 2
        
        return userService.deleteRestaurant(id)
            .then((result) => {
                expect(result).toBe(true)

                return userService.getRestaurant(id)
                    .then((list) => {
                        expect(list.length).toBe(0)
                    })
            })
    })

    test('userService should call listBlogs', () => {
        expect.assertions(3);

        let id = 1
        
        return userService.listBlogs(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].user_id).toBe(1)
                expect(results[0].blog_id).toBe(1)
            })
    })

    test('userService should call getBlog', () => {
        expect.assertions(3);

        let id = 2
        
        return userService.getBlog(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].user_id).toBe(2)
                expect(results[0].blog_id).toBe(2)
            })
    })

    test('userService should call postBlog', () => {
        expect.assertions(3);
        
        return userService.addBlog(new_blog)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].user_id).toBe(new_blog.user_id)
                expect(results[0].blog_id).toBe(new_blog.blog_id)
            })
    })

    test('userService should call putBlog', () => {
        expect.assertions(3);

        let id = 2
        
        return userService.updateBlog(altered_blog, id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].user_id).toBe(altered_blog.user_id)
                expect(results[0].blog_id).toBe(altered_blog.blog_id)
            })
    })
    
    test('userService should call deleteBlog', () => {
        expect.assertions(2);

        let id = 2
        
        return userService.deleteBlog(id)
            .then((result) => {
                expect(result).toBe(true)

                return userService.getBlog(id)
                    .then((list) => {
                        expect(list.length).toBe(0)
                    })
            })
    })

    test('userService should call listRestaurantAccess', () => {
        expect.assertions(3);

        let id = 1
        
        return userService.listRestaurantAccess(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].user_id).toBe(1)
                expect(results[0].restaurant_id).toBe(1)
            })
    })

    test('userService should call getAccess', () => {
        expect.assertions(3);

        let id = 2
        
        return userService.getAccess(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].user_id).toBe(2)
                expect(results[0].restaurant_id).toBe(2)
            })
    })

    test('userService should call postAccess', () => {
        expect.assertions(3);
        
        return userService.addAccess(new_access)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].user_id).toBe(new_access.user_id)
                expect(results[0].restaurant_id).toBe(new_access.restaurant_id)
            })
    })

    test('userService should call putAccess', () => {
        expect.assertions(3);

        let id = 2
        
        return userService.updateAccess(altered_access, id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].user_id).toBe(altered_access.user_id)
                expect(results[0].blog_id).toBe(altered_access.blog_id)
            })
    })
    
    test('userService should call deleteAccess', () => {
        expect.assertions(2);

        let id = 2
        
        return userService.deleteAccess(id)
            .then((result) => {
                expect(result).toBe(true)

                return userService.getAccess(id)
                    .then((list) => {
                        expect(list.length).toBe(0)
                    })
            })
    })
})