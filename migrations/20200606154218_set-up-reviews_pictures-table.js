exports.up = function (knex, Promise) {
    return knex.schema.createTable('review_pictures', (table) => {
        table.increments();
        table.text("picture_URL");
        table.integer('review_id').unsigned();
        table.foreign('review_id').references('reviews.id');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('review_pictures');
}