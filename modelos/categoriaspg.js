
//Modelo Categoria Tabela banco de dados postgre

const Sequelize = require('sequelize');
const databasepg = require('../bdtabspg');

const Categoria = databasepg.define('categorias', {
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

module.exports = Categoria;