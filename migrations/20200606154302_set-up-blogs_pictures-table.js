exports.up = function (knex, Promise) {
    return knex.schema.createTable('blog_pictures', (table) => {
        table.increments();
        table.string("picture_URL");
        table.integer('blog_id').unsigned();
        table.foreign('blog_id').references('blogs.id');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('blog_pictures');
}