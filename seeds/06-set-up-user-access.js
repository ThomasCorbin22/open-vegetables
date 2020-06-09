
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user_access').insert([
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
  ])
};
