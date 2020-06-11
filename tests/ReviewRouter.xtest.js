const ReviewRouter = require('../router/ReviewRouter')

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
let reviewRouter

let request
let response

describe('ReviewRouter testing with reviewservice', () => {
    
    let new_review = {
        "title": 'I wouldnt come back here if my life depended on it',
        "body": 'The food looks like what comes out of my backside',
        "rating": 2,
        "user_id": 1,
        "restaurant_id": 2
    }
    
    let altered_review = {
        "title": 'Best food in Hong Kong',
        "body": 'A must visit for anyone coming to HK',
        "rating": 5,
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

    beforeAll(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])

        response = {
            send : jest.fn().mockResolvedValue(true),
        }

        reviewService = {
            listReviews : jest.fn().mockResolvedValue(true),
            getReview : jest.fn().mockResolvedValue(true),
            addReview : jest.fn().mockResolvedValue(true),
            updateReview : jest.fn().mockResolvedValue(true),
            deleteReview : jest.fn().mockResolvedValue(true),

            listPictures : jest.fn().mockResolvedValue(true),
            getPicture : jest.fn().mockResolvedValue(true),
            addPicture : jest.fn().mockResolvedValue(true),
            updatePicture : jest.fn().mockResolvedValue(true),
            deletePicture : jest.fn().mockResolvedValue(true),
        }

        reviewRouter = new ReviewRouter(reviewService)
    })

    afterAll(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])
    })

    test('reviewRouter should call listReviews in response to a GET request', () => {
        expect.assertions(2);
        
        request = {
            params: {
                id: 1
            }
        }

        return reviewRouter.listReviews(request, response)
            .then(() => {
                expect(reviewService.listReviews).toHaveBeenCalledWith(1)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('reviewRouter should call getReview in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }
        
        return reviewRouter.getReview(request, response)
            .then(() => {
                expect(reviewService.getReview).toHaveBeenCalledWith(request.params.id)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('reviewRouter should call addReview in response to a POST request', () => {
        expect.assertions(2);

        request = {
            body: new_review
        }
        
        return reviewRouter.postReview(request, response)
            .then(() => {
                expect(reviewService.addReview).toHaveBeenCalledWith(new_review)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('reviewRouter should call putReview in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: altered_review
        }
        
        return reviewRouter.putReview(request, response)
            .then(() => {
                expect(reviewService.updateReview).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('reviewRouter should call deleteReview in response to a DELETE request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
        }
        
        return reviewRouter.deleteReview(request, response)
            .then(() => {
                expect(reviewService.deleteReview).toHaveBeenCalledWith(1);
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('reviewRouter should call listPictures in response to a GET request', () => {
        expect.assertions(2);
        
        request = {
            params: {
                id: 1
            }
        }

        return reviewRouter.listPictures(request, response)
            .then(() => {
                expect(reviewService.listPictures).toHaveBeenCalledWith(1)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('reviewRouter should call getPicture in response to a GET request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            }
        }
        
        return reviewRouter.getPicture(request, response)
            .then(() => {
                expect(reviewService.getPicture).toHaveBeenCalledWith(request.params.id)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('reviewRouter should call postPicture in response to a POST request', () => {
        expect.assertions(2);

        request = {
            body: new_picture
        }
        
        return reviewRouter.postPicture(request, response)
            .then(() => {
                expect(reviewService.addPicture).toHaveBeenCalledWith(new_picture)
                expect(response.send).toHaveBeenCalled()
            })
    })

    test('reviewRouter should call putPicture in response to a PUT request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
            body: altered_picture
        }
        
        return reviewRouter.putPicture(request, response)
            .then(() => {
                expect(reviewService.updatePicture).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalled()
            })
    })
    
    test('reviewRouter should call deletePicture in response to a DELETE request', () => {
        expect.assertions(2);

        request = {
            params: {
                id: 1
            },
        }
        
        return reviewRouter.deletePicture(request, response)
            .then(() => {
                expect(reviewService.deletePicture).toHaveBeenCalledWith(1);
                expect(response.send).toHaveBeenCalled()
            })
    })
})