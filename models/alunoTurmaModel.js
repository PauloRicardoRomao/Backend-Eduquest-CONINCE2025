const { DataTypes } = require('sequelize');
const Sequelize = require('../config/config');
const aluno = require('./usuarioAlunoModel');
const turma = require('./turmaModel');

const alunoTurma = Sequelize.define("alunoTurma", {
    idAlunoTurma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    alunoAlunoTurma: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    turmaAlunoTurma: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "alunoTurma",
    freezeTableName: true, // não pluraliza
    timestamps: false      // não cria createdAt / updatedAt automáticos
});


alunoTurma.belongsTo(aluno, { 
    foreignKey: "alunoAlunoTurma",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

alunoTurma.belongsTo(turma, { 
    foreignKey: "turmaAlunoTurma",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

// Um aluno pode estar em várias turmas
aluno.hasMany(alunoTurma, {
    foreignKey: "alunoAlunoTurma",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

// Uma turma pode ter vários alunos
turma.hasMany(alunoTurma, {
    foreignKey: "turmaAlunoTurma",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

module.exports = alunoTurma;