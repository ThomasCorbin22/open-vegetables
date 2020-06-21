exports.up = function (knex, Promise) {
    return knex.schema.createTable('restaurant_pictures', (table) => {
        table.increments();
        table.text("picture_URL");
        table.integer('restaurant_id').unsigned();
        table.foreign('restaurant_id').references('restaurants.id');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('restaurant_pictures');
}