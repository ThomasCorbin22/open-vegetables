exports.up = function (knex, Promise) {
    return knex.schema.createTable('reviews', (table) => {
        table.increments();
        table.string("title").notNullable();
        table.unique("title");
        table.float("rating").notNullable();
        table.string("body").notNullable();
        table.datetime("date_created", { precision: 6 }).defaultTo(knex.fn.now(6));
        table.datetime("date_modified", { precision: 6 }).defaultTo(knex.fn.now(6));
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.integer('restaurant_id').unsigned();
        table.foreign('restaurant_id').references('restaurants.id');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('reviews');
}