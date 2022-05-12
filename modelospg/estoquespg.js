
//Modelo Estoque Tabela banco de dados postgre

const Sequelize = require('sequelize');
const ProdutoPg = require('../modelospg/produtospg');
const databasepg = require('../bdtabspg');

const EstoquePg = databasepg.define('estoquespg', {
    
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

EstoquePg.belongsTo(ProdutoPg, {
    constraint: true,
    foreignKey: 'idProduto'

})


module.exports = EstoquePg;