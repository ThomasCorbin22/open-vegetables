exports.up = function (knex, Promise) {
    return knex.schema.createTable('user_access', (table) => {
        table.increments();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.integer('restaurant_id').unsigned();
        table.foreign('restaurant_id').references('restaurants.id');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('user_access');
}