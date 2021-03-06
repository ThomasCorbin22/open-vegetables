const UserRouter = require('../router/UserRouter')

// Require router services
const UserService = require('../service/UserService');
const RestaurantService = require('../service/RestaurantService');
const BlogService = require('../service/BlogService');
const ReviewService = require('../service/ReviewService');
const LocationService = require('../service/LocationService');

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
let reviewService
let restaurantService
let blogService
let locationService

let userRouter

let request
let response

describe('UserRouter testing with userservice', () => {

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

    let new_access = {
        "user_id": 1,
        "restaurant_id": 2
    }

    let altered_access = {
        "user_id": 2,
        "restaurant_id": 1
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

    beforeAll(async () => {
        response = {
            send: jest.fn().mockResolvedValue(true),
            render: jest.fn().mockResolvedValue(true),
        }

        userService = {
            checkSecurity: jest.fn().mockResolvedValue(true),
            lostPassword: jest.fn().mockResolvedValue(true),
            changePassword: jest.fn().mockResolvedValue(true),

            searchUsers: jest.fn().mockResolvedValue(true),
            listUsers: jest.fn().mockResolvedValue(true),
            getUser: jest.fn().mockResolvedValue(true),
            addUser: jest.fn().mockResolvedValue(true),
            updateUser: jest.fn().mockResolvedValue(true),
            deleteUser: jest.fn().mockResolvedValue(true),

            listAccess: jest.fn().mockResolvedValue(true),
            getAccess: jest.fn().mockResolvedValue(true),
            addAccess: jest.fn().mockResolvedValue(true),
            updateAccess: jest.fn().mockResolvedValue(true),
            deleteAccess: jest.fn().mockResolvedValue(true),

            listRestaurants: jest.fn().mockResolvedValue(true),
            getRestaurant: jest.fn().mockResolvedValue(true),
            addRestaurant: jest.fn().mockResolvedValue(true),
            updateRestaurant: jest.fn().mockResolvedValue(true),
            deleteRestaurant: jest.fn().mockResolvedValue(true),

            listBlogs: jest.fn().mockResolvedValue(true),
            getBlog: jest.fn().mockResolvedValue(true),
            addBlog: jest.fn().mockResolvedValue(true),
            updateBlog: jest.fn().mockResolvedValue(true),
            deleteBlog: jest.fn().mockResolvedValue(true),
        }

        userRouter = new UserRouter(userService, blogService, locationService, restaurantService, reviewService)
    })

    test('userRouter should call searchUsers in response to a GET request', () => {
        expect.assertions(2);

        request = {
            query: {
                name: 'Our awesome user'
            }
        }

        return userRouter.searchUsers(request, response)
            .then(() => {
                expect(userService.searchUsers).toHaveBeenCalledWith(request.query)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call listUsers in response to a GET request', () => {
        expect.assertions(2);

        return userRouter.listUsers(request, response)
            .then(() => {
                expect(userService.listUsers).toHaveBeenCalled()
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call getUser in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }

        return userRouter.getUser(request, response)
            .then(() => {
                expect(userService.getUser).toHaveBeenCalledWith(request.params.id)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call addUser in response to a POST request', () => {
        expect.assertions(2);

        request = {
            body: new_user
        }

        return userRouter.postUser(request, response)
            .then(() => {
                expect(userService.addUser).toHaveBeenCalledWith(new_user)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call putUser in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: altered_user
        }

        return userRouter.putUser(request, response)
            .then(() => {
                expect(userService.updateUser).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call deleteUser in response to a DELETE request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
        }

        return userRouter.deleteUser(request, response)
            .then(() => {
                expect(userService.deleteUser).toHaveBeenCalledWith(1);
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call listAccess in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }

        return userRouter.listAccess(request, response)
            .then(() => {
                expect(userService.listAccess).toHaveBeenCalledWith(1)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call getAccess in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }

        return userRouter.getAccess(request, response)
            .then(() => {
                expect(userService.getAccess).toHaveBeenCalledWith(request.params.id)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call postAccess in response to a POST request', () => {
        expect.assertions(2);

        request = {
            body: new_access
        }

        return userRouter.postAccess(request, response)
            .then(() => {
                expect(userService.addAccess).toHaveBeenCalledWith(new_access)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call putAccess in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: altered_access
        }

        return userRouter.putAccess(request, response)
            .then(() => {
                expect(userService.updateAccess).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call deleteAccess in response to a DELETE request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
        }

        return userRouter.deleteAccess(request, response)
            .then(() => {
                expect(userService.deleteAccess).toHaveBeenCalledWith(1);
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call listRestaurants in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }

        return userRouter.listRestaurants(request, response)
            .then(() => {
                expect(userService.listRestaurants).toHaveBeenCalledWith(1)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call getRestaurant in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }

        return userRouter.getRestaurant(request, response)
            .then(() => {
                expect(userService.getRestaurant).toHaveBeenCalledWith(request.params.id)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call postRestaurant in response to a POST request', () => {
        expect.assertions(2);

        request = {
            body: new_restaurant
        }

        return userRouter.postRestaurant(request, response)
            .then(() => {
                expect(userService.addRestaurant).toHaveBeenCalledWith(new_restaurant)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call putRestaurant in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: altered_restaurant
        }

        return userRouter.putRestaurant(request, response)
            .then(() => {
                expect(userService.updateRestaurant).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call deleteRestaurant in response to a DELETE request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
        }

        return userRouter.deleteRestaurant(request, response)
            .then(() => {
                expect(userService.deleteRestaurant).toHaveBeenCalledWith(1);
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call listBlogs in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }

        return userRouter.listBlogs(request, response)
            .then(() => {
                expect(userService.listBlogs).toHaveBeenCalledWith(1)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call getBlog in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }

        return userRouter.getBlog(request, response)
            .then(() => {
                expect(userService.getBlog).toHaveBeenCalledWith(request.params.id)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call postBlog in response to a POST request', () => {
        expect.assertions(2);

        request = {
            body: new_blog
        }

        return userRouter.postBlog(request, response)
            .then(() => {
                expect(userService.addBlog).toHaveBeenCalledWith(new_blog)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call putBlog in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: altered_blog
        }

        return userRouter.putBlog(request, response)
            .then(() => {
                expect(userService.updateBlog).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call displayInfo in response to a GET request', () => {
        expect.assertions(7);

        request = {
            params: {
                id: 1
            },
            user: {
                id: 1
            },
            isAuthenticated: jest.fn().mockResolvedValue(true)
        }

        userService = new UserService()
        blogService = new BlogService()
        restaurantService = new RestaurantService()

        const getUserCalled = jest.spyOn(userService, 'getUser')
        const listRestaurantsCalled = jest.spyOn(userService, 'listRestaurants')
        const listBlogsCalled = jest.spyOn(userService, 'listBlogs')
        const getRestaurantCalled = jest.spyOn(restaurantService, 'getRestaurant')
        const getBlogCalled = jest.spyOn(blogService, 'getBlog')

        userRouter = new UserRouter(userService, blogService, locationService, restaurantService, reviewService)

        return userRouter.displayInfo(request, response)
            .then(() => {
                expect(userService.getUser).toHaveBeenCalledWith(request.params.id);
                expect(getUserCalled).toHaveBeenCalled()
                expect(listRestaurantsCalled).toHaveBeenCalled()
                expect(listBlogsCalled).toHaveBeenCalled()
                expect(getRestaurantCalled).toHaveBeenCalled()
                expect(getBlogCalled).toHaveBeenCalled()
                expect(response.send).toHaveBeenCalled()
            })
    })

    // Last minute testing renders these tests WIP
    test('userRouter should call displayReviews in response to a GET request', () => {
        expect.assertions(5);

        request = {
            params: {
                id: 1
            },
            user: {
                id: 1
            },
            isAuthenticated: jest.fn().mockResolvedValue(true)
        }

        userService = new UserService()
        restaurantService = new RestaurantService()
        reviewService = new ReviewService()

        const getUserCalled = jest.spyOn(userService, 'getUser')
        const getReviewCalled = jest.spyOn(reviewService, 'getReview')
        const getRestaurantCalled = jest.spyOn(restaurantService, 'getRestaurant')

        userRouter = new UserRouter(userService, blogService, locationService, restaurantService, reviewService)

        return userRouter.displayReviews(request, response)
            .then(() => {
                expect(userService.getUser).toHaveBeenCalledWith(request.params.id);
                expect(getUserCalled).toHaveBeenCalled()
                expect(getReviewCalled).toHaveBeenCalled()
                expect(getRestaurantCalled).toHaveBeenCalled()
                expect(response.send).toHaveBeenCalled()
            })
    })

    // Last minute testing renders these tests WIP
    test('userRouter should call displayBlogs in response to a GET request', () => {
        expect.assertions(5);

        request = {
            params: {
                id: 1
            },
            user: {
                id: 1
            },
            isAuthenticated: jest.fn().mockResolvedValue(true)
        }

        userService = new UserService()
        blogService = new BlogService()

        const getUserCalled = jest.spyOn(userService, 'getUser')
        const listPicturesCalled = jest.spyOn(blogService, 'listPictures')
        const listCategoriesCalled = jest.spyOn(blogService, 'listCategories')

        userRouter = new UserRouter(userService, blogService, locationService, restaurantService, reviewService)

        return userRouter.displayBlogs(request, response)
            .then(() => {
                expect(userService.getUser).toHaveBeenCalledWith(request.params.id);
                expect(getUserCalled).toHaveBeenCalled()
                expect(listPicturesCalled).toHaveBeenCalled()
                expect(listCategoriesCalled).toHaveBeenCalled()
                expect(response.send).toHaveBeenCalled()
            })
    })

    // Last minute testing renders these tests WIP
    test('userRouter should call displayRestaurants in response to a GET request', () => {
        expect.assertions(6);

        request = {
            params: {
                id: 1
            },
            user: {
                id: 1
            },
            isAuthenticated: jest.fn().mockResolvedValue(true)
        }

        userService = new UserService()
        locationService = new LocationService()
        restaurantService = new RestaurantService()

        const getUserCalled = jest.spyOn(userService, 'getUser')
        const getDistrictCalled = jest.spyOn(locationService, 'getDistrict')
        const listPicturesCalled = jest.spyOn(restaurantService, 'listPictures')
        const listCategoriesCalled = jest.spyOn(restaurantService, 'listCategories')

        userRouter = new UserRouter(userService, blogService, locationService, restaurantService, reviewService)

        return userRouter.displayRestaurants(request, response)
            .then(() => {
                expect(userService.getUser).toHaveBeenCalledWith(request.params.id);
                expect(getUserCalled).toHaveBeenCalled()
                expect(getDistrictCalled).toHaveBeenCalled()
                expect(listPicturesCalled).toHaveBeenCalled()
                expect(listCategoriesCalled).toHaveBeenCalled()
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call checkSecurity in response to a GET request', () => {
        expect.assertions(2);

        request = {
            body: {
                email: 'thomas@thomas.com',
                answer: '3'
            },
        }

        // Bug fixing, for some reason I need to re-declare userService / userRouter here for the test to work
        userService = {
            checkSecurity: jest.fn().mockResolvedValue(true),
        }
        userRouter = new UserRouter(userService)

        return userRouter.checkSecurity(request, response)
            .then(() => {
                expect(userService.checkSecurity).toHaveBeenCalledWith(request.body.email, request.body.answer);
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call lostPassword in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            body: {
                id: 1,
                answer: '3',
                email: 'password123',
            },
        }

        // Bug fixing, for some reason I need to re-declare userService / userRouter here for the test to work
        userService = {
            lostPassword: jest.fn().mockResolvedValue(true),
        }
        userRouter = new UserRouter(userService)

        return userRouter.lostPassword(request, response)
            .then(() => {
                expect(userService.lostPassword).toHaveBeenCalledWith(request.body.id, request.body.answer, request.body.password);
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call updatePassword in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: {
                original_password: 'password',
                new_password: 'password123',
            },
            isAuthenticated: jest.fn().mockResolvedValue(true)
        }

        // Bug fixing, for some reason I need to re-declare userService / userRouter here for the test to work
        userService = {
            updatePassword: jest.fn().mockResolvedValue(true),
        }
        userRouter = new UserRouter(userService)

        return userRouter.updatePassword(request, response)
            .then(() => {
                expect(userService.updatePassword).toHaveBeenCalledWith(request.params.id, request.body.original_password, request.body.new_password);
                expect(response.send).toHaveBeenCalled()
            })
    })
})