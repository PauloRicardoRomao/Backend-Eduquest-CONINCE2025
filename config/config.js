const { Sequelize } = require('sequelize');

const connection = new Sequelize("EduQuest", "root", "NovaSenha123!", {
    host: '127.0.0.1',
    dialect: 'mysql'
});


module.exports = connection;