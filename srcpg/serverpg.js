(async () => {
    const express = require ('express');
    const routespg = require ('./routespg');
    const Sequelize = require('sequelize');
    const CategoriaPg = require('../modelospg/categoriaspg');
    const ProdutoPg = require ('../modelospg/produtospg');
    const EstoquePg = require ('../modelospg/estoquespg');
    const databasepg = require('../bdtabspg');
    const cron = require ('node-cron');
    
    const app2 = express();
    await databasepg.sync(); 
  
    
    app2.use( 
        express.urlencoded({
            extended: true,
        }),
    )
    app2.use(express.json());
       
    app2.listen(8080, () => {
        console.log("servidor rodando na porta 8080");

        app2.use(routespg);

        //Enviar endpoints para o outro servidor e atualizar tabela
        
        //              /1 para rodar de 1 em um minuto
       cron.schedule("1 * * * * * ", () => 
       
       fetch("localhost:3333/listarcategorias")
       .then((resposta) => console.log(resposta))); ///código restante
       
       
        
    
    })


    

    
    

   

   
    
    //Porta Postgree
   
    
    //Porta MySql
    //app.listen(3333);
    
    
    
    
    
    
    //codigo restante
    
    })();