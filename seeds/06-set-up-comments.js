
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('comments').insert([
    {
      "title": 'Who wrote this trash!',
      "body": 'Better go back to studying english!',
      "user_id": 1,
      "blog_id": 1
    },
    {
      "title": 'Some great points!',
      "body": 'What genius wrote this!',
      "user_id": 2,
      "blog_id": 2
    },
    {
      "title": 'Dont think this person knows what he is talking about!',
      "body": 'Clearly, he has never read a book before',
      "user_id": 3,
      "blog_id": 3
    }
  ])
};
