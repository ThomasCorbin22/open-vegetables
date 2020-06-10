const CommentRouter = require('../router/CommentRouter')

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
let commentRouter

let request
let response

describe('CommentRouter testing with blogservice', () => {
    
    let new_comment = {
        "title": 'Time for a great comment',
        "body": 'We should support this post more',
        "user_id": 3,
        "blog_id": 1
      }
    
    let altered_comment = {
        "title": 'The world is stuffed',
        "body": 'We should be okay through',
        "user_id": 1
    }
    
    beforeAll(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])

        response = {
            send : jest.fn().mockResolvedValue(true),
        }

        commentService = {
            searchComments : jest.fn().mockResolvedValue(true),
            listComments : jest.fn().mockResolvedValue(true),
            getComment : jest.fn().mockResolvedValue(true),
            addComment : jest.fn().mockResolvedValue(true),
            updateComment : jest.fn().mockResolvedValue(true),
            deleteComment : jest.fn().mockResolvedValue(true),
        }

        commentRouter = new CommentRouter(commentService)
    })

    afterAll(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])
    })

    test('commentRouter should call listComments in response to a GET request', () => {
        expect.assertions(2);
        
        request = {
            params: {
                id: 1
            }
        }
        
        return commentRouter.listComments(request, response)
            .then(() => {
                expect(commentService.listComments).toHaveBeenCalledWith(1)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('commentRouter should call getComment in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }
        
        return commentRouter.getComment(request, response)
            .then(() => {
                expect(commentService.getComment).toHaveBeenCalledWith(request.params.id)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('commentRouter should call addComment in response to a POST request', () => {
        expect.assertions(2);

        request = {
            body: new_comment
        }
        
        return commentRouter.postComment(request, response)
            .then(() => {
                expect(commentService.addComment).toHaveBeenCalledWith(new_comment)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('commentRouter should call putComment in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: altered_comment
        }
        
        return commentRouter.putComment(request, response)
            .then(() => {
                expect(commentService.updateComment).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('commentRouter should call deleteComment in response to a DELETE request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
        }
        
        return commentRouter.deleteComment(request, response)
            .then(() => {
                expect(commentService.deleteComment).toHaveBeenCalledWith(1);
                expect(response.send).toHaveBeenCalled()
            })
    })
})