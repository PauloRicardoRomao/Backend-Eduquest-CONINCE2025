const { DataTypes } = require('sequelize');
const Sequelize = require('../config/config');
const usuario = require('./usuarioModel');

const usuarioProfessor = Sequelize.define("usuarioProfessor", {
    idUsuarioProfessor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    usuarioUsuarioProfessor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    carimboDataHoraUsuarioProfessor: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    situacaoUsuarioProfessor: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    } 
}, {
    tableName: "usuarioProfessor",
    freezeTableName: true, // não pluraliza
    timestamps: false      // não cria createdAt / updatedAt automáticos
});


usuarioProfessor.belongsTo(usuario, { 
    foreignKey: "usuarioUsuarioProfessor",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

usuario.hasOne(usuarioProfessor, { 
    foreignKey: "usuarioUsuarioProfessor",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

module.exports = usuarioProfessor;