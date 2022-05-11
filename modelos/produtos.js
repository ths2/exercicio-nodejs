
//Modelo Tabela Produtos SQL

const Sequelize = require('sequelize');
const database = require('../bdtabs');
const Categoria = require('./categorias')

//modela a tabela
const Produto = database.define('produtos', {
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
Produto.belongsTo(Categoria, {
    constraint: true,
    foreignKey: 'idCategoria'

})
// chave estrangeira idCategoria tem muitos produtos da mesma categoria
Categoria.hasMany(Produto, {
    constraint: true,
    foreignkey: 'idCategoria'
    
})


module.exports = Produto;


//categorias.sync({force: true});
//produtos.sync({force: true});
//estoque.sync({force: true});