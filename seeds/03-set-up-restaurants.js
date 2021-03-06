
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('restaurants').insert([
    {
      "name": 'Our awesome restaurant',
      "street_address": 'Xccelerate',
      "district_id": 4,
      "description": 'This is a placeholder restaurant. Please select another.',
      "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FPKzzZ-WXvcYoVGVJza76AHaEK%26pid%3DApi&f=1',
      "price": 1,
      "telephone_number": '911',
      "social_media_URL": 'www.facebook.com',
      "main_picture_URL": 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      "website_URL": 'www.awesome.com',
      "latitude": 22.382581,
      "longitude": 114.273730,
      "monday": '09:00-21:00',
    },
    {
      "name": 'Our cool restaurant',
      "street_address": 'GreenLand',
      "district_id": 1,
      "description": 'This is a placeholder restaurant. Please select another.',
      "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.5SvUKNDoIf7U1Yq2mI1EyAHaHa%26pid%3DApi&f=1',
      "price": 2,
      "telephone_number": '999',
      "social_media_URL": 'www.google.com',
      "main_picture_URL": 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      "website_URL": 'www.cool.com',
      "latitude": 22.280214,
      "longitude": 114.157866,
      "monday": '09:30-21:50',
    },
    {
      "name": 'Our niche restaurant',
      "street_address": 'Iceland',
      "district_id": 1,
      "description": 'This is a placeholder restaurant. Please select another.',
      "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TuFp-npFivX67UlkFh0BaAHaIf%26pid%3DApi&f=1',
      "price": 1,
      "telephone_number": '111',
      "social_media_URL": 'www.twitter.com',
      "main_picture_URL": 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      "website_URL": 'www.wicked.com',
      "latitude": 22.280214,
      "longitude": 114.157866,
      "monday": '08:30-22:50'
    },
    {
      "name": 'Our luxurious restaurant',
      "street_address": 'LuxuryLand',
      "district_id": 2,
      "description": 'This is a placeholder restaurant. Please select another.',
      "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.8qClpZE7Bej9BOj6C1_AyAHaHa%26pid%3DApi&f=1',
      "price": 3,
      "telephone_number": '222',
      "social_media_URL": 'www.instagram.com',
      "main_picture_URL": 'https://images.pexels.com/photos/370984/pexels-photo-370984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      "website_URL": 'www.dude.com',
      "latitude": 22.318295,
      "longitude": 114.169218,
      "monday": '09:15-22:15'
    },
    {
      "name": 'Our old restaurant',
      "street_address": 'Oldland',
      "district_id": 3,
      "description": 'This is a placeholder restaurant. Please select another.',
      "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Couc7NISL9ZGU5s9CBryDQHaEo%26pid%3DApi&f=1',
      "price": 3,
      "telephone_number": '333',
      "social_media_URL": 'www.linkedIn.com',
      "main_picture_URL": 'https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      "website_URL": 'www.sweet.com',
      "latitude": 22.219243,
      "longitude": 114.112058,
      "monday": '08:00-22:30'
    },
    {
      "name": 'Hollie\'s wicked whamboozel',
      "street_address": 'Elgin St',
      "district_id": 2,
      "description": 'This is a placeholder restaurant. Please select another.',
      "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.5pBOiauMyW9wTfsBdoSowwHaEU%26pid%3DApi&f=1',
      "price": 2,
      "telephone_number": '20061379',
      "social_media_URL": 'www.holliesareus.com',
      "main_picture_URL": 'https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      "website_URL": 'www.holly.com',
      "latitude": 22.318295,
      "longitude": 114.169218,
      "monday": '17:00-21:00',
    },
    {
      "name": 'BBQ Style',
      "street_address": 'Aussie St',
      "district_id": 1,
      "description": 'This is a placeholder restaurant. Please select another.',
      "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.fqes2uPxsG1t7u-Fsv-fqwHaFj%26pid%3DApi&f=1',
      "price": 2,
      "telephone_number": '14307488',
      "social_media_URL": 'www.facebook.com/bbq_style',
      "main_picture_URL": 'https://images.pexels.com/photos/1383776/pexels-photo-1383776.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      "website_URL": 'www.bbqstyle.com',
      "latitude": 22.280214,
      "longitude": 114.157866,
      "monday": '10:30-21:50',
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
