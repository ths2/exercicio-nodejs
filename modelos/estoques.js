
//Modelo Estoques Tabela banco de dados SQL

const Sequelize = require('sequelize');
const database = require('../bdtabs');
const Produto = require('./produtos');

const Estoque = database.define('estoques', {
    
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