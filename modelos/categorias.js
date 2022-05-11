
//Modelo Categoria Tabela Banco de Dados SQL

const Sequelize = require('sequelize');
const database = require('../bdtabs');

const Categoria = database.define('categorias', {
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