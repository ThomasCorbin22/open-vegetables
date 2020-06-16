// jest test --runInBand --detectOpenHandles

const ReviewService = require('../service/ReviewService')

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

let reviewService

describe('ReviewService testing with reviewservice', () => {
    
    let new_review = {
        "title": 'I wouldnt come back here if my life depended on it',
        "body": 'The food looks like what comes out of my backside',
        "rating": 2.0,
        "user_id": 1,
        "restaurant_id": 2
    }
    
    let altered_review = {
        "title": 'Best food in Hong Kong',
        "body": 'A must visit for anyone coming to HK',
        "rating": 5.0,
        "user_id": 2,
        "restaurant_id": 1
    }
    
    let new_picture = {
        "picture_URL": 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        "review_id": 2
    }
    
    let altered_picture = {
        "picture_URL": 'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        "review_id": 1
    }

    beforeEach(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])

        reviewService = new ReviewService()
    })
    
    afterAll(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])
    })

    test('reviewService should call listReviews', () => {
        expect.assertions(7);

        let id = 1
        
        return reviewService.listReviews(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].title).toBe('This sucked!')
                expect(results[0].body).toBe('Worse place Ive been in my life!')
                expect(results[0].rating).toBe(1.5)
                expect(results[0].user_id).toBe(1)
                expect(results[0].restaurant_id).toBe(1)
                expect(results[0].pictures).toEqual([
                    'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                  ])
            })
    })

    test('reviewService should call getReview', () => {
        expect.assertions(7);

        let id = 2
        
        return reviewService.getReview(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].title).toBe('This was worse!')
                expect(results[0].body).toBe('Never coming back!')
                expect(results[0].rating).toBe(2.5)
                expect(results[0].user_id).toBe(2)
                expect(results[0].restaurant_id).toBe(2)
                expect(results[0].pictures).toEqual([
                    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                  ])
            })
    })

    test('reviewService should call addReview', () => {
        expect.assertions(6);
        
        return reviewService.addReview(new_review)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].title).toBe(new_review.title)
                expect(results[0].body).toBe(new_review.body)
                expect(results[0].rating).toBe(new_review.rating)
                expect(results[0].user_id).toBe(new_review.user_id)
                expect(results[0].restaurant_id).toBe(new_review.restaurant_id)
            })
    })

    test('reviewService should call updateReview', () => {
        expect.assertions(6);

        let id = 2
        
        return reviewService.updateReview(altered_review, id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].title).toBe(altered_review.title)
                expect(results[0].body).toBe(altered_review.body)
                expect(results[0].rating).toBe(altered_review.rating)
                expect(results[0].user_id).toBe(altered_review.user_id)
                expect(results[0].restaurant_id).toBe(altered_review.restaurant_id)
            })
    })

    test('reviewService should call deleteReview', () => {
        expect.assertions(2);

        let id = 2
        
        return reviewService.deleteReview(id)
            .then((result) => {
                expect(result).toBe(true)

                return reviewService.getReview(id)
                    .then((list) => {
                        expect(list.length).toBe(0)
                    })
            })
    })

    test('reviewService should call listPictures', () => {
        expect.assertions(3);
        
        return reviewService.listPictures(1)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].picture_URL).toBe('https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
                expect(results[0].review_id).toBe(1)
            })
    })

    test('reviewService should call getPicture', () => {
        expect.assertions(3);

        let id = 2
        
        return reviewService.getPicture(id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].picture_URL).toBe('https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
                expect(results[0].review_id).toBe(2)
            })
    })

    test('reviewService should call postPicture', () => {
        expect.assertions(3);
        
        return reviewService.addPicture(new_picture)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].picture_URL).toBe(new_picture.picture_URL)
                expect(results[0].review_id).toBe(new_picture.review_id)
            })
    })

    test('reviewService should call putPicture', () => {
        expect.assertions(3);

        let id = 2
        
        return reviewService.updatePicture(altered_picture, id)
            .then((results) => {
                expect(results.length).toBe(1)
                expect(results[0].picture_URL).toBe(altered_picture.picture_URL)
                expect(results[0].review_id).toBe(altered_picture.review_id)
            })
    })
    
    test('reviewService should call deletePicture', () => {
        expect.assertions(2);

        let id = 2
        
        return reviewService.deletePicture(id)
            .then((result) => {
                expect(result).toBe(true)

                return reviewService.getPicture(id)
                    .then((list) => {
                        expect(list.length).toBe(0)
                    })
            })
    })
})