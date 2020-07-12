
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('blogs').insert([
    {
      "title": 'Some cool post',
      "body": 'This is a placeholder blog post. Please select another.',
      "main_picture_URL": 'https://images.pexels.com/photos/347134/pexels-photo-347134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      "user_id": 1
    },
    {
      "title": 'Another post',
      "body": 'This is a placeholder blog post. Please select another.',
      "main_picture_URL": 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      "user_id": 2
    },
    {
      "title": 'Yet one more',
      "body": 'This is a placeholder blog post. Please select another.',
      "main_picture_URL": 'https://images.pexels.com/photos/1153370/pexels-photo-1153370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      "user_id": 3
    },
    {
      "title": 'A last one!',
      "body": 'This is a placeholder blog post. Please select another.',
      "main_picture_URL": 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
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
          "category": 'Opinion',
          "blog_id": 1
        },
        {
          "category": 'News',
          "blog_id": 2
        },
        {
          "category": 'Speculation',
          "blog_id": 2
        },
        {
          "category": 'Opinion',
          "blog_id": 3
        },
        {
          "category": 'Breaking',
          "blog_id": 3
        },
        {
          "category": 'Future',
          "blog_id": 4
        },
        {
          "category": 'Recommended',
          "blog_id": 4
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
          "picture_URL": 'https://images.pexels.com/photos/965117/pexels-photo-965117.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          "blog_id": 1
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/768474/pexels-photo-768474.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          "blog_id": 1
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          "blog_id": 1
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "blog_id": 2
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/4071397/pexels-photo-4071397.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          "blog_id": 2
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/4110226/pexels-photo-4110226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          "blog_id": 2
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/1517226/pexels-photo-1517226.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          "blog_id": 3
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/4198141/pexels-photo-4198141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          "blog_id": 3
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/4045741/pexels-photo-4045741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          "blog_id": 3
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/4198168/pexels-photo-4198168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          "blog_id": 4
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/4198140/pexels-photo-4198140.jpeg?cs=srgb&dl=cottage-cheese-with-fresh-green-onions-in-bow-4198140.jpg&fm=jpg',
          "blog_id": 4
        },
        {
          "picture_URL": 'https://images.pexels.com/photos/4198040/pexels-photo-4198040.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          "blog_id": 4
        },
      ]);
    })
};
