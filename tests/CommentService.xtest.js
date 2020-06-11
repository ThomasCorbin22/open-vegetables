const CommentService = require('../service/CommentService')

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

describe('CommentService testing with commentservice', () => {
    
    let new_comment = {
        "title": 'Time for a great comment',
        "body": 'We should support this post more',
        "user_id": 3,
        "blog_id": 1
      }
    
    let altered_comment = {
        "title": 'And great times were had by all',
        "body": '^ Such inspirational titles',
        "user_id": 1,
        "blog_id": 2
      }

    beforeEach(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])

        commentService = new CommentService()
    })

    afterAll(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])
    })

    test('commentService should call listComments in response to a GET request', () => {
        expect.assertions(5);
        
        let id = 1
        
        return commentService.listComments(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].title).toBe('Who wrote this trash!')
                expect(results[0].body).toBe('Better go back to studying english!')
                expect(results[0].user_id).toBe(1)
                expect(results[0].blog_id).toBe(1)
            })
    })

    test('commentService should call getComment in response to a GET request', () => {
        expect.assertions(5);

        let id = 2
        
        return commentService.getComment(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].title).toBe('Some great points!')
                expect(results[0].body).toBe('What genius wrote this!')
                expect(results[0].user_id).toBe(2)
                expect(results[0].blog_id).toBe(2)
            })
    })

    test('commentService should call addComment in response to a POST request', () => {
        expect.assertions(5);
        
        return commentService.addComment(new_comment)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].title).toBe(new_comment.title)
                expect(results[0].body).toBe(new_comment.body)
                expect(results[0].user_id).toBe(new_comment.user_id)
                expect(results[0].blog_id).toBe(new_comment.blog_id)
            })
    })

    test('commentService should call updateComment in response to a PUT request', () => {
        expect.assertions(5);

        let id = 2
        
        return commentService.updateComment(altered_comment, id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].title).toBe(altered_comment.title)
                expect(results[0].body).toBe(altered_comment.body)
                expect(results[0].user_id).toBe(altered_comment.user_id)
                expect(results[0].blog_id).toBe(altered_comment.blog_id)
            })
    })

    test('commentService should call deleteComment in response to a DELETE request', () => {
        expect.assertions(1);

        let id = 2
        
        return commentService.deleteComment(id)
            .then((result) => {
                expect(result).toBe(true)
            })
    })
})