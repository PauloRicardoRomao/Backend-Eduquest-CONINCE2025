const { DataTypes } = require('sequelize');
const Sequelize = require('../config/config');
const turma = require('./turmaModel');
const materiaProfessor = require('./materiaProfessorModel');


const turmaMateriaProfessor = Sequelize.define("turmaMateriaProfessor", {
    idTurmaMateriaProfessor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    turmaTurmaMateriaProfessor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    materiaProfessorTurmaMateriaProfessor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    carimboDataHoraTurmaMateriaProfessor: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    situacaoTurmaMateriaProfessor: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "turmaMateriaProfessor",
    freezeTableName: true, // não pluraliza
    timestamps: false      // não cria createdAt / updatedAt automáticos
});



// Turma ↔ TurmaMateriaProfessor
turma.hasMany(turmaMateriaProfessor, {
    foreignKey: "turmaTurmaMateriaProfessor",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

turmaMateriaProfessor.belongsTo(turma, {
    foreignKey: "turmaTurmaMateriaProfessor",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

// MateriaProfessor ↔ TurmaMateriaProfessor
materiaProfessor.hasMany(turmaMateriaProfessor, {
    foreignKey: "materiaProfessorTurmaMateriaProfessor",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

turmaMateriaProfessor.belongsTo(materiaProfessor, {
    foreignKey: "materiaProfessorTurmaMateriaProfessor",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});


module.exports = turmaMateriaProfessor;