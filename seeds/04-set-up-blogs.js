
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('blogs').insert([
    {
      "title": 'Some cool post',
      "body": 'Image theres a great article written here',
      "user_id": 1
    },
    {
      "title": 'Another post',
      "body": 'We could win a pulitzer for this',
      "user_id": 2
    },
    {
      "title": 'Yet one more',
      "body": 'We need to think of better articles',
      "user_id": 3
    }
  ])
    .then(function () {
      // Inserts seed entries
      return knex('blog_categories').insert([
        {
          "category": 'Sustainability',
          "blog_id": 1
        },
        {
          "category": 'News',
          "blog_id": 2
        },
        {
          "category": 'Opinion',
          "blog_id": 3
        }
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('blog_favourites').insert([
        {
          "user_id": 1,
          "blog_id": 1
        },
        {
          "user_id": 2,
          "blog_id": 2
        },
        {
          "user_id": 3,
          "blog_id": 3
        }
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('blog_pictures').insert([
        {
          "picture_URL": 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "blog_id": 1
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "blog_id": 2
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/1517226/pexels-photo-1517226.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "blog_id": 3
        }
      ]);
    })
};
