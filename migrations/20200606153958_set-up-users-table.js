exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("email").notNullable();
        table.unique('email');
        table.string("password");
        table.text("description");
        table.text("profile_picture_URL");
        table.string("security_question");
        table.string("security_answer");
        table.integer("number_reviews").unsigned()
        table.integer("number_blogs").unsigned()
        table.integer("number_comments").unsigned()
        table.boolean("modified");
        table.datetime("date_created", { precision: 6 }).defaultTo(knex.fn.now(6));
        table.datetime("date_modified", { precision: 6 }).defaultTo(knex.fn.now(6));
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
}