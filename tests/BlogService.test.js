// jest test --runInBand --detectOpenHandles

const BlogService = require('../service/BlogService')

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

let blogService

describe('BlogService testing with blogservice', () => {
    
    let new_post = {
        "title": 'Time to shine',
        "body": 'These are some low effort examples right here',
        "user_id": 2
    }
    
    let altered_post = {
        "title": 'The world is stuffed',
        "body": 'We should be okay through',
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

    beforeEach(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])

        blogService = new BlogService()
    })

    afterAll(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])
    })
    
    test('blogService should call searchBlogs in response to a GET request', () => {
        expect.assertions(4);

        let query = {
            title: 'Some cool post'
        }
        
        return blogService.searchBlogs(query)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].title).toBe('Some cool post')
                expect(results[0].body).toBe('Image theres a great article written here')
                expect(results[0].user_id).toBe(1)
            })
    })

    test('blogService should call listBlogs in response to a GET request', () => {
        expect.assertions(6);
        
        return blogService.listBlogs()
            .then((results) => {
                console.log(results)
                expect(results.length).toBe(3)
                expect(results[0].title).toBe('Some cool post')
                expect(results[0].pictures).toEqual([
                    'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                  ])
                expect(results[0].categories).toEqual([ 'Sustainability' ])
                expect(results[1].title).toBe('Another post')
                expect(results[2].title).toBe('Yet one more')
            })
    })

    test('blogService should call getBlog in response to a GET request', () => {
        expect.assertions(6);

        let id = 2
        
        return blogService.getBlog(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].title).toBe('Another post')
                expect(results[0].body).toBe('We could win a pulitzer for this')
                expect(results[0].user_id).toBe(2)
                expect(results[0].pictures).toEqual([
                    'https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                  ])
                expect(results[0].categories).toEqual([ 'News' ])
            })
    })

    test('blogService should call addBlog in response to a POST request', () => {
        expect.assertions(4);
        
        return blogService.addBlog(new_post)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].title).toBe(new_post.title)
                expect(results[0].body).toBe(new_post.body)
                expect(results[0].user_id).toBe(new_post.user_id)
            })
    })

    test('blogService should call updateBlog in response to a PUT request', () => {
        expect.assertions(4);

        let id = 2
        
        return blogService.updateBlog(altered_post, id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].title).toBe(altered_post.title)
                expect(results[0].body).toBe(altered_post.body)
                expect(results[0].user_id).toBe(altered_post.user_id)
            })
    })

    test('blogService should call deleteBlog in response to a DELETE request', () => {
        expect.assertions(2);

        let id = 2
        
        return blogService.deleteBlog(id)
            .then((result) => {
                expect(result).toBe(true)

                return blogService.listBlogs()
                    .then((list) => {
                        expect(list.length).toBe(2)
                    })
            })
    })

    test('blogService should call listPictures in response to a GET request', () => {
        expect.assertions(3);

        let id = 1
        
        return blogService.listPictures(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].picture_URL).toBe('https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
                expect(results[0].blog_id).toBe(1)
            })
    })

    test('blogService should call getPicture in response to a GET request', () => {
        expect.assertions(3);

        let id = 2
        
        return blogService.getPicture(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].picture_URL).toBe('https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
                expect(results[0].blog_id).toBe(2)
            })
    })

    test('blogService should call postPicture in response to a POST request', () => {
        expect.assertions(3);
        
        return blogService.addPicture(new_picture)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].picture_URL).toBe(new_picture.picture_URL)
                expect(results[0].blog_id).toBe(new_picture.blog_id)
            })
    })

    test('blogService should call putPicture in response to a PUT request', () => {
        expect.assertions(3);

        let id = 2
        
        return blogService.updatePicture(altered_picture, id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].picture_URL).toBe(altered_picture.picture_URL)
                expect(results[0].blog_id).toBe(altered_picture.blog_id)
            })
    })
    
    test('blogService should call deletePicture in response to a DELETE request', () => {
        expect.assertions(2);

        let id = 2
        
        return blogService.deletePicture(id)
            .then((result) => {
                expect(result).toBe(true)

                return blogService.getPicture(id)
                    .then((list) => {
                        expect(list.length).toBe(0)
                    })
            })
    })

    test('blogService should call listCategories in response to a GET request', () => {
        expect.assertions(3);
        
        let id = 1
        
        return blogService.listCategories(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].category).toBe('Sustainability')
                expect(results[0].blog_id).toBe(1)
            })
    })

    test('blogService should call getCategory in response to a GET request', () => {
        expect.assertions(3);

        let id = 2
        
        return blogService.getCategory(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].category).toBe('News')
                expect(results[0].blog_id).toBe(2)
            })
    })

    test('blogService should call postCategory in response to a POST request', () => {
        expect.assertions(3);
        
        return blogService.addCategory(new_category)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].category).toBe(new_category.category)
                expect(results[0].blog_id).toBe(new_category.blog_id)
            })
    })

    test('blogService should call putCategory in response to a PUT request', () => {
        expect.assertions(3);

        let id = 2
        
        return blogService.updateCategory(altered_category, id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].category).toBe(altered_category.category)
                expect(results[0].blog_id).toBe(altered_category.blog_id)
            })
    })
    
    test('blogService should call deleteCategory in response to a DELETE request', () => {
        expect.assertions(2);

        let id = 2
        
        return blogService.deleteCategory(id)
            .then((result) => {
                expect(result).toBe(true)

                return blogService.getCategory(id)
                    .then((list) => {
                        expect(list.length).toBe(0)
                    })
            })
    })
})