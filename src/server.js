(async () => {
const express = require ('express');
const routes = require ('./routes');
const Sequelize = require('sequelize');
//const database = require('../bdtabs');

const app = express();

//Cria tabela de dados de acordo com os modelos
//await database.sync();

//Conectar ao servidor ao postgre
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

//conectar ao servidor SQL
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


//localhost:3333 porta

app.use( 
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());


app.use(routes);



//codigo restante

})();


/*

*/