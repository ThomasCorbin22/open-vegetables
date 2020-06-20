exports.up = function (knex, Promise) {
    return knex.schema.createTable('comments', (table) => {
        table.increments();
        table.string("title").notNullable();
        table.unique("title");
        table.string("body").notNullable();
        table.boolean("modified");
        table.datetime("date_created", { precision: 6 }).defaultTo(knex.fn.now(6));
        table.datetime("date_modified", { precision: 6 }).defaultTo(knex.fn.now(6));
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.integer('blog_id').unsigned();
        table.foreign('blog_id').references('blogs.id');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('comments');
}