exports.up = function (knex, Promise) {
    return knex.schema.createTable('restaurant_categories', (table) => {
        table.increments();
        table.string('category');
        table.integer('restaurant_id').unsigned();
        table.foreign('restaurant_id').references('restaurants.id');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('restaurant_categories');
}