
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reviews').insert([
    {
      "title": 'This sucked!',
      "body": 'Worse place Ive been in my life!',
      "rating": 1.5,
      "user_id": 1,
      "restaurant_id": 1
    },
    {
      "title": 'This was worse!',
      "body": 'Never coming back!',
      "rating": 2.5,
      "user_id": 2,
      "restaurant_id": 2
    },
    {
      "title": 'This wasnt bad!',
      "body": 'But I wouldnt come again',
      "rating": 3.5,
      "user_id": 3,
      "restaurant_id": 3
    }
  ])
    .then(function () {
      // Inserts seed entries
      return knex('review_pictures').insert([
        {
          "picture_URL": 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "review_id": 1
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "review_id": 2
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/842546/pexels-photo-842546.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "review_id": 3
        }
      ]);
    });
};
