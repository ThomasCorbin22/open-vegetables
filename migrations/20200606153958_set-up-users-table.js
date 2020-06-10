exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("email").notNullable();
        table.unique('email');
        table.string("password").notNullable();
        table.string("description");
        table.string("profile_picture_URL");
        table.integer("number_reviews").unsigned()
        table.integer("number_blogs").unsigned()
        table.integer("number_comments").unsigned()
        table.datetime("date_created", { precision: 6 }).defaultTo(knex.fn.now(6));
        table.datetime("date_modified", { precision: 6 }).defaultTo(knex.fn.now(6));
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
}