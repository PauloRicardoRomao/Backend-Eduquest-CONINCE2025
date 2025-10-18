const { DataTypes } = require('sequelize');
const Sequelize = require('../config/config');
const turmaMateriaProfessor = require('./turmaMateriaProfessorModel');

const tarefa = Sequelize.define("tarefa", {
    idTarefa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    turmaMateriaProfessorTarefa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tituloTarefa: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    descricaoTarefa: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    pontoTarefa: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    dataFinalTarefa: {
        type: DataTypes.DATE,
        allowNull: true
    },
    carimboDataHoraTarefa: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    situacaoTarefa: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "tarefa",
    freezeTableName: true, // não pluraliza
    timestamps: false      // não cria createdAt / updatedAt automáticos
});


//Uma tarefa pertence a uma turmaMateriaProfessor
tarefa.belongsTo(turmaMateriaProfessor, { 
    foreignKey: "turmaMateriaProfessorTarefa",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

//Uma turmaMateriaProfessor pode ter várias tarefas
turmaMateriaProfessor.hasMany(tarefa, { 
    foreignKey: "turmaMateriaProfessorTarefa",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

module.exports = tarefa;