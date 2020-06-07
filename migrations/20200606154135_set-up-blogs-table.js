exports.up = function (knex, Promise) {
    return knex.schema.createTable('blogs', (table) => {
        table.increments();
        table.string("title");
        table.string("body");
        table.datetime("date_created", { precision: 6 }).defaultTo(knex.fn.now(6));
        table.datetime("date_modified", { precision: 6 }).defaultTo(knex.fn.now(6));
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('blogs');
}