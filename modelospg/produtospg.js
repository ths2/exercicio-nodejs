
//Modelo Produtos Tabela banco de dados postgre

const Sequelize = require('sequelize');
const databasepg = require('../bdtabspg');
const CategoriaPg = require('./categoriaspg')

//modela a tabela
const ProdutoPg = databasepg.define('produtospg', {
    codigo: {
        type: Sequelize.STRING,
    },
    nome: {
        type: Sequelize.STRING,
    },
    descricao: {
        type: Sequelize.TEXT,
    },
    valor: {
        type: Sequelize.FLOAT,
    },
    status: {
        type: Sequelize.INTEGER
    }
});
//cria a chave estrangeira do produto(chave estrangeira idCategoria pertence a id da tabela categoria)
ProdutoPg.belongsTo(CategoriaPg, {
    constraint: true,
    foreignKey: 'idCategoria'

})
// chave estrangeira idCategoria tem muitos produtos da mesma categoria
CategoriaPg.hasMany(ProdutoPg, {
    constraint: true,
    foreignkey: 'idCategoria'
    
})


module.exports = ProdutoPg;


//categorias.sync({force: true});
//produtos.sync({force: true});
//estoque.sync({force: true});