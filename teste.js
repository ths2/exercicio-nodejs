(async () => {
    const readline = require('readline-sync');
    const database = require('./bdtabs');
    const Categoria = require('./modelos/categorias');
    const Produto = require ('./modelos/produtos');
    const Estoque = require ('./modelos/estoques');
    
    await database.sync();

    var result = 'n';

    while (result != 's'){

        console.log('OI Seja bem vindo!');
        const sair = readline.question("deseja sair? s/n: ");
        result = sair;
    }


    
    
    console.log('O programa acabou!!!!');
    
    


})();