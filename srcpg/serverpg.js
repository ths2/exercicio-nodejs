(async () => {
    const express = require ('express');
    const routespg = require ('./routespg');
    const Sequelize = require('sequelize');
    const CategoriaPg = require('../modelospg/categoriaspg');
    const ProdutoPg = require ('../modelospg/produtospg');
    const EstoquePg = require ('../modelospg/estoquespg');
    const databasepg = require('../bdtabspg');
    
    
    const app2 = express();
    await databasepg.sync(); 
  
    
    app2.use( 
        express.urlencoded({
            extended: true,
        }),
    )
        
    app2.listen(8080, () => {
        console.log("servidor rodando na porta 8080");
        
        //             /1 para rodar de 1 em um minuto
        //cron.schedule("* * * * * * ", () => console.log("o cron está rodando"))
    
    
        
    
    })


    app2.use(express.json());

    
    app2.use(routespg);

   

   
    
    //Porta Postgree
   
    
    //Porta MySql
    //app.listen(3333);
    
    
    
    
    
    
    //codigo restante
    
    })();