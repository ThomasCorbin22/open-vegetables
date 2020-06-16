
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('areas').insert([
    {
      "area": 'Hong Kong Island',
    },
    {
      "area": 'Kowloon',
    },
    {
      "area": 'Outlying Islands',
    },
    {
      "area": 'New Territories',
    }
  ])
  .then(function () {
    // Inserts seed entries
    return knex('districts').insert([
      {
        "district": 'Central',
        "area_id": 1
      },
      {
        "district": 'Mong Kok',
        "area_id": 2
      },
      {
        "district": 'Lamma Island',
        "area_id": 3
      },
      {
        "district": 'New Territories',
        "area_id": 4
      }
    ]);
  })
};
