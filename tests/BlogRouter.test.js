const BlogRouter = require('../router/BlogRouter')

// Require router services
const UserService = require('../service/UserService');
const BlogService = require('../service/BlogService');
const CommentService = require('../service/CommentService');

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

let commentService
let userService
let blogService

let blogRouter

let request
let response

describe('BlogRouter testing with blogservice', () => {
    
    let new_note = {
        "title": 'Time to shine',
        "body": 'This is a placeholder blog post. Please select another.',
        "user_id": 2
    }
    
    let altered_note = {
        "title": 'The world is stuffed',
        "body": 'This is a placeholder blog post. Please select another.',
        "user_id": 1
    }
    
    let new_picture = {
        "picture_URL": 'https://images.pexels.com/photos/3886285/pexels-photo-3886285.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        "blog_id": 2
    }
    
    let altered_picture = {
        "picture_URL": 'https://images.pexels.com/photos/4115131/pexels-photo-4115131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        "blog_id": 3
    }
    
    let new_category = {
        "category": 'Speculation',
        "blog_id": 2
      }
    
    let altered_category = {
        "category": 'News',
        "blog_id": 2
      }

    beforeAll(async () => {
        response = {
            send : jest.fn().mockResolvedValue(true),
            render : jest.fn().mockResolvedValue(true),
        }

        blogService = {
            searchBlogs : jest.fn().mockResolvedValue(true),
            listBlogs : jest.fn().mockResolvedValue(true),
            getBlog : jest.fn().mockResolvedValue(true),
            addBlog : jest.fn().mockResolvedValue(true),
            updateBlog : jest.fn().mockResolvedValue(true),
            deleteBlog : jest.fn().mockResolvedValue(true),

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

        blogRouter = new BlogRouter(blogService)
    })

    test('blogRouter should call searchBlogs in response to a GET request', () => {
        expect.assertions(2);

        request = {
            query: {
                title: 'Some cool post'
            }
        }
        
        return blogRouter.searchBlogs(request, response)
            .then(() => {
                expect(blogService.searchBlogs).toHaveBeenCalledWith(request.query)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call listBlogs in response to a GET request', () => {
        expect.assertions(2);
        
        return blogRouter.listBlogs(request, response)
            .then(() => {
                expect(blogService.listBlogs).toHaveBeenCalled()
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call getBlog in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }
        
        return blogRouter.getBlog(request, response)
            .then(() => {
                expect(blogService.getBlog).toHaveBeenCalledWith(request.params.id)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call addBlog in response to a POST request', () => {
        expect.assertions(2);

        request = {
            body: new_note
        }
        
        return blogRouter.postBlog(request, response)
            .then(() => {
                expect(blogService.addBlog).toHaveBeenCalledWith(new_note)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call putBlog in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: altered_note
        }
        
        return blogRouter.putBlog(request, response)
            .then(() => {
                expect(blogService.updateBlog).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call deleteBlog in response to a DELETE request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
        }
        
        return blogRouter.deleteBlog(request, response)
            .then(() => {
                expect(blogService.deleteBlog).toHaveBeenCalledWith(1);
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call listPictures in response to a GET request', () => {
        expect.assertions(2);
        
        request = {
            params: {
                id: 1
            }
        }

        return blogRouter.listPictures(request, response)
            .then(() => {
                expect(blogService.listPictures).toHaveBeenCalledWith(1)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call getPicture in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }
        
        return blogRouter.getPicture(request, response)
            .then(() => {
                expect(blogService.getPicture).toHaveBeenCalledWith(request.params.id)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call postPicture in response to a POST request', () => {
        expect.assertions(2);

        request = {
            body: new_picture
        }
        
        return blogRouter.postPicture(request, response)
            .then(() => {
                expect(blogService.addPicture).toHaveBeenCalledWith(new_picture)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call putPicture in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: altered_picture
        }
        
        return blogRouter.putPicture(request, response)
            .then(() => {
                expect(blogService.updatePicture).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalled()
            })
    })
    
    test('blogRouter should call deletePicture in response to a DELETE request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
        }
        
        return blogRouter.deletePicture(request, response)
            .then(() => {
                expect(blogService.deletePicture).toHaveBeenCalledWith(1);
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call listCategories in response to a GET request', () => {
        expect.assertions(2);
        
        request = {
            params: {
                id: 1
            }
        }
        
        return blogRouter.listCategories(request, response)
            .then(() => {
                expect(blogService.listCategories).toHaveBeenCalledWith(1)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call getCategory in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }
        
        return blogRouter.getCategory(request, response)
            .then(() => {
                expect(blogService.getCategory).toHaveBeenCalledWith(request.params.id)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call postCategory in response to a POST request', () => {
        expect.assertions(2);

        request = {
            body: new_category
        }
        
        return blogRouter.postCategory(request, response)
            .then(() => {
                expect(blogService.addCategory).toHaveBeenCalledWith(new_category)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call putCategory in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: altered_category
        }
        
        return blogRouter.putCategory(request, response)
            .then(() => {
                expect(blogService.updateCategory).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalled()
            })
    })
    
    test('blogRouter should call deleteCategory in response to a DELETE request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
        }
        
        return blogRouter.deleteCategory(request, response)
            .then(() => {
                expect(blogService.deleteCategory).toHaveBeenCalledWith(1);
                expect(response.send).toHaveBeenCalled()
            })
    })
    
    test('blogRouter should call displaySingle in response to a GET request', () => {
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
        blogService = new BlogService()
        commentService = new CommentService()

        const listBlogsCalled = jest.spyOn(userService, 'listBlogs')
        const getBlogCalled = jest.spyOn(blogService, 'getBlog')
        const getUserCalled = jest.spyOn(userService, 'getUser')
        const listCommentsCalled = jest.spyOn(commentService, 'listComments')

        blogRouter = new BlogRouter(blogService, commentService, userService)

        return blogRouter.displaySingle(request, response)
            .then(() => {
                expect(userService.listBlogs).toHaveBeenCalledWith(request.params.id);
                expect(listBlogsCalled).toHaveBeenCalled()
                expect(getBlogCalled).toHaveBeenCalled()
                expect(listCommentsCalled).toHaveBeenCalled()
                expect(getUserCalled).toHaveBeenCalled()
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('blogRouter should call displayAll in response to a GET request', () => {
        expect.assertions(3);

        request = {
            params: {
                id: 1,
                filter: 'alpha',
                direction: 'descending'
            },
            user: {
                id: 1
            },
            isAuthenticated: jest.fn().mockResolvedValue(true),
            query: {
                page: 1
            }
        }

        userService = new UserService()
        blogService = new BlogService()

        const searchBlogsCalled = jest.spyOn(blogService, 'searchBlogs')
        const getUserCalled = jest.spyOn(userService, 'getUser')

        blogRouter = new BlogRouter(blogService, commentService, userService)

        return blogRouter.displayAll(request, response)
            .then(() => {
                expect(searchBlogsCalled).toHaveBeenCalled()
                expect(getUserCalled).toHaveBeenCalled()
                expect(response.send).toHaveBeenCalled()
            })
    })
})