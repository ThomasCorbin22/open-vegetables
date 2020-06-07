exports.up = function (knex, Promise) {
    return knex.schema.createTable('restaurants', (table) => {
        table.increments();
        table.string("name");
        table.string("address");
        table.string("rating");
        table.string("description");
        table.string("telephone_number");
        table.string("price");
        table.string("social_media_URL");
        table.string("main_picture_URL");
        table.string("website_URL");
        table.integer("latitude");
        table.integer("longitude");
        table.datetime("opening_time");
        table.datetime("closing_time");
        table.datetime("date_created", { precision: 6 }).defaultTo(knex.fn.now(6));
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('restaurants');
}