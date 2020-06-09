exports.up = function (knex, Promise) {
    return knex.schema.createTable('blog_favourites', (table) => {
        table.increments();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.integer('blog_id').unsigned();
        table.foreign('blog_id').references('blogs.id');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('blog_favourites');
}