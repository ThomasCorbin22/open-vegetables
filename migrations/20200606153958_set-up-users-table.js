exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string("first Name");
        table.string("last Name");
        table.string("email");
        table.string("password");
        table.string("description");
        table.integer("number_reviews");
        table.integer("number_blogs");
        table.integer("number_comments");
        table.datetime("date_created", { precision: 6 }).defaultTo(knex.fn.now(6));
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
}