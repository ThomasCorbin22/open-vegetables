
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('restaurants').insert([
    {
      "name": 'Our awesome restaurant',
      "street_address": 'Xccelerate',
      "district_id": 4,
      "description": 'All the best food',
      "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FPKzzZ-WXvcYoVGVJza76AHaEK%26pid%3DApi&f=1',
      "price": 1,
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
      "name": 'Our cool restaurant',
      "street_address": 'GreenLand',
      "district_id": 1,
      "description": 'Nicer food',
      "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.5SvUKNDoIf7U1Yq2mI1EyAHaHa%26pid%3DApi&f=1',
      "price": 2,
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
      "name": 'Our niche restaurant',
      "street_address": 'Iceland',
      "district_id": 1,
      "description": 'Cooler food',
      "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TuFp-npFivX67UlkFh0BaAHaIf%26pid%3DApi&f=1',
      "price": 1,
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
      "name": 'Our luxurious restaurant',
      "street_address": 'LuxuryLand',
      "district_id": 2,
      "description": 'Luxurious food',
      "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.8qClpZE7Bej9BOj6C1_AyAHaHa%26pid%3DApi&f=1',
      "price": 3,
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
      "name": 'Our old restaurant',
      "street_address": 'Oldland',
      "district_id": 3,
      "description": 'Older food',
      "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Couc7NISL9ZGU5s9CBryDQHaEo%26pid%3DApi&f=1',
      "price": 3,
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
          "category": 'Korean',
          "restaurant_id": 1
        },
        {
          "category": 'Japanese',
          "restaurant_id": 2
        },
        {
          "category": 'Indian',
          "restaurant_id": 3
        }
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('restaurant_favourites').insert([
        {
          "user_id": 1,
          "restaurant_id": 1
        },
        {
          "user_id": 2,
          "restaurant_id": 2
        },
        {
          "user_id": 3,
          "restaurant_id": 3
        }
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('restaurant_pictures').insert([
        {
          "picture_URL": 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "restaurant_id": 1
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/34650/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "restaurant_id": 2
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "restaurant_id": 3
        }
      ]);
    })
};
