
//Criar tabelas no Postgree

(async () => {
    const readline = require('readline-sync');
    const databasepg = require('./bdtabspg');
    const Categoria = require('./modelospg/categoriaspg');
    const Produto = require ('./modelospg/produtospg');
    const Estoque = require ('./modelospg/estoquespg');
    
    await databasepg.sync();

    console.log('O programa acabou!!!!');
    
    


})();