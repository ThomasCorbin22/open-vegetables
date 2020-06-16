
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').insert([
    {
      "first_name": 'Thomas',
      "last_name": 'Corbin',
      "email": 'thomas@thomas.com',
      "password": '$2b$10$TeDLJ.CehjeNyXD8ZQnfh.xa6rsFd4x1H.cwdLexoPFuu3r7Q/4ii',
      "description": 'Something about Tom',
      'profile_picture_URL': 'https://avatars2.githubusercontent.com/u/30714819?s=460&u=2914c46d86409ec01d6a2515bd4ac4db27ce1eb5&v=4'
    },
    {
      "first_name": 'Alex',
      "last_name": 'Wong',
      "email": 'alex@alex.com',
      "password": '$2b$10$TeDLJ.CehjeNyXD8ZQnfh.xa6rsFd4x1H.cwdLexoPFuu3r7Q/4ii',
      "description": 'Something about Alex',
      'profile_picture_URL': 'https://avatars0.githubusercontent.com/u/40209618?s=460&u=2a86e8fa0d42014551e1f81ff24a1720185d66da&v=4'
    },
    {
      "first_name": 'Edwin',
      "last_name": 'Chan',
      "email": 'edwin@edwin.com',
      "password": '$2b$10$TeDLJ.CehjeNyXD8ZQnfh.xa6rsFd4x1H.cwdLexoPFuu3r7Q/4ii',
      "description": 'Something about Edwin',
      'profile_picture_URL': 'https://avatars2.githubusercontent.com/u/62528841?s=460&v=4'
    }
  ])
};
