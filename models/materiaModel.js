const { DataTypes } = require('sequelize');
const Sequelize = require('../config/config');

const materia = Sequelize.define("materia", {
    idMateria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descricaoMateria: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    situacaoMateria: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "materia",
    freezeTableName: true, // não pluraliza
    timestamps: false      // não cria createdAt / updatedAt automáticos
});


module.exports = materia;