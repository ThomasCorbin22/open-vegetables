
exports.up = function(knex, Promise) {
    return knex.schema.createTable('likes_dislikes', (table)=>{
        table.increments();
        table.boolean("like");
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.integer('comment_id').unsigned();
        table.foreign('comment_id').references('comments.id');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('likes_dislikes');
};
