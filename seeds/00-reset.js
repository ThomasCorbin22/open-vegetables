
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('likes_dislikes').del()
    .then(function () {
      return knex.raw('ALTER SEQUENCE likes_dislikes_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('user_access').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE user_access_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('comments').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE comments_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('review_pictures').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE review_pictures_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('reviews').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE reviews_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('blog_pictures').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE blog_pictures_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('blog_favourites').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE blog_favourites_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('blog_categories').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE blog_categories_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('blogs').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE blogs_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('restaurant_pictures').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE restaurant_pictures_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('restaurant_favourites').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE restaurant_favourites_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('restaurant_categories').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE restaurant_categories_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('restaurants').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE restaurants_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('users').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('districts').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE districts_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('areas').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE areas_id_seq RESTART WITH 1')
    })
};
