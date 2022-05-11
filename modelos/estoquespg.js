
//Modelo Estoque Tabela banco de dados postgre

const Sequelize = require('sequelize');
const Produto = require('./produtos');
const databasepg = require('../bdtabspg');

const Estoque = databasepg.define('estoques', {
    
    quantidade: {
        type: Sequelize.INTEGER,
    },
    reserva: {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.INTEGER
    }
});

Estoque.belongsTo(Produto, {
    constraint: true,
    foreignKey: 'idProduto'

})


module.exports = Estoque;