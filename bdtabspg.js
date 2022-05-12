
//Conectar Banco de dados postgree

const Sequelize = require('sequelize');

const sequelize = new Sequelize('exerciciopg', 'postgres', 'Thomaz123', {
    host: 'localhost',
    dialect: 'postgres',
        
});


sequelize.authenticate().then(function () {
    console.log('Conexão realizada com sucesso ao postgree');
}).catch(function (err) {
    console.log('Erro ao realizar a conexão com BD: ' + err);
});

module.exports = sequelize;