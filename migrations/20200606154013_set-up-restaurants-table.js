exports.up = function (knex, Promise) {
    return knex.schema.createTable('restaurants', (table) => {
        table.increments();
        table.string("name").notNullable();
        table.unique('name');
        table.string("street_address");
        table.integer("district_id").unsigned();
        table.foreign('district_id').references('districts.id');
        table.string("logo");
        table.text("description");
        table.string("telephone_number");
        table.string("price");
        table.string("social_media_URL");
        table.string("main_picture_URL");
        table.string("website_URL");
        table.string("main_category");
        table.float("latitude");
        table.float("longitude");
        table.string("monday");
        table.string("tuesday");
        table.string("wednesday");
        table.string("thursday");
        table.string("friday");
        table.string("saturday");
        table.string("sunday");
        table.boolean("modified");
        table.datetime("date_created", { precision: 6 }).defaultTo(knex.fn.now(6));
        table.datetime("date_modified", { precision: 6 }).defaultTo(knex.fn.now(6));
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('restaurants');
}