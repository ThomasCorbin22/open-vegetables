const UserRouter = require('../router/UserRouter')

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
            send : jest.fn().mockResolvedValue(true),
        }

        userService = {
            searchUsers : jest.fn().mockResolvedValue(true),
            listUsers : jest.fn().mockResolvedValue(true),
            getUser : jest.fn().mockResolvedValue(true),
            addUser : jest.fn().mockResolvedValue(true),
            updateUser : jest.fn().mockResolvedValue(true),
            deleteUser : jest.fn().mockResolvedValue(true),

            listAccess : jest.fn().mockResolvedValue(true),
            getAccess : jest.fn().mockResolvedValue(true),
            addAccess : jest.fn().mockResolvedValue(true),
            updateAccess : jest.fn().mockResolvedValue(true),
            deleteAccess : jest.fn().mockResolvedValue(true),

            listRestaurants : jest.fn().mockResolvedValue(true),
            getRestaurant : jest.fn().mockResolvedValue(true),
            addRestaurant : jest.fn().mockResolvedValue(true),
            updateRestaurant : jest.fn().mockResolvedValue(true),
            deleteRestaurant : jest.fn().mockResolvedValue(true),

            listBlogs : jest.fn().mockResolvedValue(true),
            getBlog : jest.fn().mockResolvedValue(true),
            addBlog : jest.fn().mockResolvedValue(true),
            updateBlog : jest.fn().mockResolvedValue(true),
            deleteBlog : jest.fn().mockResolvedValue(true)
        }

        userRouter = new UserRouter(userService)
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
    
    test('userRouter should call deleteBlog in response to a DELETE request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
        }
        
        return userRouter.deleteBlog(request, response)
            .then(() => {
                expect(userService.deleteBlog).toHaveBeenCalledWith(1);
                expect(response.send).toHaveBeenCalled()
            })
    })
})