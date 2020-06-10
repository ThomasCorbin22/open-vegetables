
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user_access').insert([
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
  ])
};
