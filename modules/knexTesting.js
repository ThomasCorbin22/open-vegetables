// Taken from Jacky Cha

const knexConfig = require('..//knexfile')['development'];
const knex = require('knex')(knexConfig);
const initialize = () => {
    knex.initialize(knexConfig);
};
const getData = jest.fn((table) => {
    let query = knex(table).select();
    return query.then((data) => {
        return data;
    });
});
const destroy = () => {
    knex.destroy();
};

module.exports = {
    getData,
    initialize,
    destroy,
};