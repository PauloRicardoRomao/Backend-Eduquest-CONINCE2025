const { DataTypes } = require('sequelize');
const Sequelize = require('../config/config');
const usuario = require('./usuarioModel');

const usuarioAluno = Sequelize.define("usuarioAluno", {
    idUsuarioAluno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    usuarioUsuarioAluno: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    carimboDataHoraUsuarioAluno: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    situacaoUsuarioAluno: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    } 
}, {
    tableName: "usuarioAluno",
    freezeTableName: true, // não pluraliza
    timestamps: false      // não cria createdAt / updatedAt automáticos
});


usuarioAluno.belongsTo(usuario, { 
    foreignKey: "usuarioUsuarioAluno",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

usuario.hasOne(usuarioAluno, { 
    foreignKey: "usuarioUsuarioAluno",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

module.exports = usuarioAluno;