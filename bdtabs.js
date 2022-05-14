
//Conecotar banco de dados SQL

const Sequelize = require('sequelize');

const sequelize = new Sequelize('exercicio', 'root', 'Thomaz123', {
    host: 'localhost',
    dialect: 'mysql',
   
        
});


sequelize.authenticate().then(function () {
    console.log('Conexão realizada com sucesso ao MySQL');
}).catch(function (err) {
    console.log('Erro ao realizar a conexão com BD: ' + err);
    
});

module.exports = sequelize;


