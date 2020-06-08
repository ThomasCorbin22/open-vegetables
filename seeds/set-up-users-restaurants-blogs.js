
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('blogs').del()
    .then(function () {
      return knex('restaurants').del()
    })
    .then(function () {
      return knex('users').del()
    })
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          "first_name": 'Thomas',
          "last_name": 'Corbin',
          "email": 'thomas@thomas.com',
          "password": 'password',
          "description": 'Something about Tom'
        },
        {
          "first_name": 'Alex',
          "last_name": 'Wong',
          "email": 'alex@alex.com',
          "password": 'password',
          "description": 'Something about Alex'
        },
        {
          "first_name": 'Edwin',
          "last_name": 'Chan',
          "email": 'edwin@edwin.com',
          "password": 'password',
          "description": 'Something about Edwin'
        }
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert([
        {
          "name": 'Our awesome restaurant',
          "address": 'Xccelerate',
          "description": 'All the best food',
          "telephone_number": '911',
          "social_media_URL": 'www.facebook.com',
          "main_picture_URL": 'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "website_URL": 'www.awesome.com',
          "latitude": 22.3,
          "longitude": 114.2,
          "opening_time": '09:00',
          "closing_time": '21:00'
        }
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('blogs').insert([
        {
          "title": 'Some cool post',
          "body": 'Image theres a great article written here',
        }
      ]);
    });
};
