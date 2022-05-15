(async () => {
const express = require ('express');
const routespg = require ('./routes');
const routes = require ('./routes');
const Sequelize = require('sequelize');
const Categoria = require('../modelos/categorias');
const Produto = require ('../modelos/produtos');
const Estoque = require ('../modelos/estoques');
const cron = require ('node-cron');


//cria tabelas se não existir
//await database.sync();

const app = express();

app.use( 
    express.urlencoded({
        extended: true,
    }),


)
app.use(express.json());


app.listen(3333, () => {

    console.log("servidor rodando na porta 3333");
    app.use(routes);
    

    
    //             /1 para rodar de 1 em um minuto
    //cron.schedule("* * * * * * ", () => console.log("o cron está rodando"))
    
   
})


//codigo restante

})();


/*app.listen(8080, () => {
    console.log("servidor rodando na porta 8080");
    
    //             /1 para rodar de 1 em um minuto
    //cron.schedule("* * * * * * ", () => console.log("o cron está rodando"))
    app.use(routespg)

})
*/


//Porta Postgree
//app.listen(8080);

//Porta MySql
//roda aplicação cron na porta 3333
 /*
app.listen(8080, () => {

    console.log("servidor rodando na porta 8080");
    //Salvar dados dos endpoints
   })  
*/

/*


*/

//Cria tabela de dados de acordo com os modelos
//await database.sync();

/*
//Conectar ao BD postgre
const sequelizePg = new Sequelize('exerciciopg', 'postgres', 'Thomaz123', {
    host: 'localhost',
    dialect: 'postgres',
    
});

sequelizePg.authenticate().then(function () {
    console.log('Conexão realizada com sucesso ao Postgree');
    app.listen(8080);

}).catch(function (err) {
    console.log('Erro ao realizar a conexão com BD: ' + err);
    
});

//conectar BD SQL
const sequelizeSql = new Sequelize('exercicio', 'root', 'Thomaz123', {
    host: 'localhost',
    dialect: 'mysql', 
    
});

sequelizeSql.authenticate().then(function () {
    console.log('Conexão realizada com sucesso ao SQL');
    app.listen(3333);

}).catch(function (err) {
    console.log('Erro ao realizar a conexão com BD: ' + err);
});
*/
//Localhost:8080 postgree
//localhost:3333 Mysql