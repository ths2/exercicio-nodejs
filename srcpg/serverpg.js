(async () => {
    const express = require ('express');
    const routespg = require ('./routespg');
    const Sequelize = require('sequelize');
    const CategoriaPg = require('../modelospg/categoriaspg');
    const ProdutoPg = require ('../modelospg/produtospg');
    const EstoquePg = require ('../modelospg/estoquespg');
    const databasepg = require('../bdtabspg');
    
    await databasepg.sync(); 

    const app2 = express();
  
    
    app2.use( 
        express.urlencoded({
            extended: true,
        }),
    )
    app2.listen(8080);

    app2.use(express.json());

    
    app2.use(routespg);

   

   
    
    //Porta Postgree
   
    
    //Porta MySql
    //app.listen(3333);
    
    
    
    
    
    
    //codigo restante
    
    })();