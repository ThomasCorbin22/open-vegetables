exports.up = function (knex, Promise) {
    return knex.schema.createTable('restaurants', (table) => {
        table.increments();
        table.string("name").notNullable();
        table.unique('name');
        table.string("address");
        table.string("rating");
        table.string("description");
        table.string("telephone_number");
        table.string("price");
        table.string("social_media_URL");
        table.string("main_picture_URL");
        table.string("website_URL");
        table.float("latitude");
        table.float("longitude");
        table.time("opening_time", { precision: 6 });
        table.time("closing_time", { precision: 6 });
        table.datetime("date_created", { precision: 6 }).defaultTo(knex.fn.now(6));
        table.datetime("date_modified", { precision: 6 }).defaultTo(knex.fn.now(6));
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('restaurants');
}