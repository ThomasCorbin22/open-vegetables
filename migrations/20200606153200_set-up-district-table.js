exports.up = function (knex, Promise) {
    return knex.schema.createTable('districts', (table) => {
        table.increments();
        table.string("district").notNullable();
        table.unique('district');
        table.integer('area_id').unsigned();
        table.foreign('area_id').references('areas.id');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('districts');
}