
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('likes_dislikes').insert([
      {
        "user_id": 1,
        "comment_id": 2,
        "like": true,
      },
      {
        "user_id": 2,
        "comment_id": 3,
        "like": true,
      },
      {
        "user_id": 3,
        "comment_id": 1,
        "like": false,
      }
    ])
  };
  