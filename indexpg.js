
//Criar tabelas no Postgree

(async () => {
    const readline = require('readline-sync');
    const databasepg = require('./bdtabspg');
    const Categoria = require('./modelos/categoriaspg');
    const Produto = require ('./modelos/produtospg');
    const Estoque = require ('./modelos/estoquespg');
    
    await databasepg.sync();

    console.log('O programa acabou!!!!');
    
    


})();