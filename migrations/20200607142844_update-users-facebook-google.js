
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', (table)=>{
        table.string("displayName");
        table.string("facebookID");
        table.string("facebookToken");
        table.string("googleID");
        table.string("googleToken");
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', (table)=>{
        table.dropColumn("displayName");
        table.dropColumn("facebookID");
        table.dropColumn("facebookToken");
        table.dropColumn("googleID");
        table.dropColumn("googleToken");
    })
};
