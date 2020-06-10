
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('restaurants').insert([
    {
      "id": 1,
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
    },
    {
      "id": 2,
      "name": 'Our cool restaurant',
      "address": 'GreenLand',
      "description": 'Nicer food',
      "telephone_number": '999',
      "social_media_URL": 'www.google.com',
      "main_picture_URL": 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      "website_URL": 'www.cool.com',
      "latitude": 23.0,
      "longitude": 113.6,
      "opening_time": '09:30',
      "closing_time": '21:50'
    },
    {
      "id": 3,
      "name": 'Our niche restaurant',
      "address": 'Iceland',
      "description": 'Cooler food',
      "telephone_number": '111',
      "social_media_URL": 'www.twitter.com',
      "main_picture_URL": 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      "website_URL": 'www.wicked.com',
      "latitude": 23.2,
      "longitude": 113.3,
      "opening_time": '08:30',
      "closing_time": '22:50'
    },
    {
      "id": 4,
      "name": 'Our luxurious restaurant',
      "address": 'LuxuryLand',
      "description": 'Luxurious food',
      "telephone_number": '222',
      "social_media_URL": 'www.instagram.com',
      "main_picture_URL": 'https://images.pexels.com/photos/370984/pexels-photo-370984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      "website_URL": 'www.dude.com',
      "latitude": 21.2,
      "longitude": 115.3,
      "opening_time": '09:15',
      "closing_time": '22:15'
    },
    {
      "id": 5,
      "name": 'Our old restaurant',
      "address": 'Oldland',
      "description": 'Older food',
      "telephone_number": '333',
      "social_media_URL": 'www.linkedIn.com',
      "main_picture_URL": 'https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      "website_URL": 'www.sweet.com',
      "latitude": 20.2,
      "longitude": 118.3,
      "opening_time": '08:00',
      "closing_time": '22:30'
    }
  ])
    .then(function () {
      // Inserts seed entries
      return knex('restaurant_categories').insert([
        {
          "id": 1,
          "category": 'Korean',
          "restaurant_id": 1
        },
        {
          "id": 2,
          "category": 'Japanese',
          "restaurant_id": 2
        },
        {
          "id": 3,
          "category": 'Indian',
          "restaurant_id": 3
        }
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('restaurant_favourites').insert([
        {
          "id": 1,
          "user_id": 1,
          "restaurant_id": 1
        },
        {
          "id": 2,
          "user_id": 2,
          "restaurant_id": 2
        },
        {
          "id": 3,
          "user_id": 3,
          "restaurant_id": 3
        }
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('restaurant_pictures').insert([
        {
          "id": 1,
          "picture_URL": 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "restaurant_id": 1
        },
        {
          "id": 2,
          "picture_URL": 'https://images.pexels.com/photos/34650/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "restaurant_id": 2
        },
        {
          "id": 3,
          "picture_URL": 'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "restaurant_id": 3
        }
      ]);
    })
};