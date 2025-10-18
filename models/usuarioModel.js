const { DataTypes } = require('sequelize');
const Sequelize = require('../config/config');

const usuario = Sequelize.define("usuario", {
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    emailUsuario: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    senhaUsuario: {
        type: DataTypes.STRING(70), 
        allowNull: false
    },
    carimboDataHoraUsuario: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    situacaoUsuario: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    } 
}, {
    tableName: "usuario",
    freezeTableName: true, // não pluraliza
    timestamps: false      // não cria createdAt / updatedAt automáticos
});

module.exports = usuario;