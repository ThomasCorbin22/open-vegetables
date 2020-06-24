const knex_function = require('../modules/knexTesting.js');

describe('Extracting data from databases', () => {
    afterAll(async () => {
        knex_function.destroy()
    })

    it('Extracting from areas table', (done) => {
        knex_function.getData('areas').then((data) => {
            expect(data.length).not.toBe(undefined);
            done();
        });
    });
    it('Extracting from blog_categories table', (done) => {
        knex_function.getData('blog_categories').then((data) => {
            expect(data).not.toBe(undefined);
            done();
        });
    });
    it('Extracting from blog_favourites table', (done) => {
        knex_function.getData('blog_favourites').then((data) => {
            expect(data).not.toBe(undefined);
            done();
        });
    });
    it('Extracting from blog_pictures table', (done) => {
        knex_function.getData('blog_pictures').then((data) => {
            expect(data).not.toBe(undefined);
            done();
        });
    });
    it('Extracting from blogs table', (done) => {
        knex_function.getData('blogs').then((data) => {
            expect(data).not.toBe(undefined);
            done();
        });
    });
    it('Extracting from comments table', (done) => {
        knex_function.getData('comments').then((data) => {
            expect(data).not.toBe(undefined);
            done()
        });
    });
    it('Extracting from districts table', (done) => {
        knex_function.getData('districts').then((data) => {
            expect(data).not.toBe(undefined);
            done();
        });
    });
    it('Extracting from likes_dislikes table', (done) => {
        knex_function.getData('likes_dislikes').then((data) => {
            expect(data).not.toBe(undefined);
            done();
        });
    });
    it('Extracting from restaurant_categories table', (done) => {
        knex_function.getData('restaurant_categories').then((data) => {
            expect(data).not.toBe(undefined);
            done();
        });
    });
    it('Extracting from restaurant_favourites table', (done) => {
        knex_function.getData('restaurant_favourites').then((data) => {
            expect(data).not.toBe(undefined);
            done();
        });
    });
    it('Extracting from restaurants table', (done) => {
        knex_function.getData('restaurants').then((data) => {
            expect(data).not.toBe(undefined);
            done()
        });
    });
    it('Extracting from review_pictures table', (done) => {
        knex_function.getData('review_pictures').then((data) => {
            expect(data).not.toBe(undefined);
            done()
        });
    });
    it('Extracting from reviews table', (done) => {
        knex_function.getData('reviews').then((data) => {
            expect(data).not.toBe(undefined);
            done()
        });
    });
    it('Extracting from user_access table', (done) => {
        knex_function.getData('user_access').then((data) => {
            expect(data).not.toBe(undefined);
            done()
        });
    });
    it('Extracting from users table', (done) => {
        knex_function.getData('users').then((data) => {
            expect(data).not.toBe(undefined);
            done()
        });
    });
});