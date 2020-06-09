
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user_access').del()
    .then(function () {
      return knex('comments').del()
    })
    .then(function () {
      return knex('review_pictures').del()
    })
    .then(function () {
      return knex('reviews').del()
    })
    .then(function () {
      return knex('blog_pictures').del()
    })
    .then(function () {
      return knex('blog_favourites').del()
    })
    .then(function () {
      return knex('blog_categories').del()
    })
    .then(function () {
      return knex('blogs').del()
    })
    .then(function () {
      return knex('restaurant_pictures').del()
    })
    .then(function () {
      return knex('restaurant_favourites').del()
    })
    .then(function () {
      return knex('restaurant_categories').del()
    })
    .then(function () {
      return knex('restaurants').del()
    })
    .then(function () {
      return knex('users').del()
    })
};
