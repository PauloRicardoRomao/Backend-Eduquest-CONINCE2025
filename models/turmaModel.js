const { DataTypes } = require('sequelize');
const Sequelize = require('../config/config');

const turma = Sequelize.define("turma", {
    idTurma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    limiteTurma: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    carimboDataHoraTurma: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    situacaoTurma: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "turma",
    freezeTableName: true, // não pluraliza
    timestamps: false      // não cria createdAt / updatedAt automáticos
});
    

module.exports = turma;