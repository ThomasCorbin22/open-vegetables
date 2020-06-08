
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', (table)=>{
        table.string("display_name");
        table.string("facebook_ID");
        table.string("facebook_token");
        table.string("google_ID");
        table.string("google_token");
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', (table)=>{
        table.dropColumn("display_name");
        table.dropColumn("facebook_ID");
        table.dropColumn("facebook_token");
        table.dropColumn("google_ID");
        table.dropColumn("google_token");
    })
};
