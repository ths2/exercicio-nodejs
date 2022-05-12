
//Modelo Categoria Tabela banco de dados postgre

const Sequelize = require('sequelize');
const databasepg = require('../bdtabspg');

const CategoriaPg = databasepg.define('categoriaspg', {
    codigo: {
        type: Sequelize.STRING,
    },
    titulo: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.INTEGER
    }
});

module.exports = CategoriaPg;