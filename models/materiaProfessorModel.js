const { DataTypes } = require('sequelize');
const Sequelize = require('../config/config');
const materia = require('./materiaModel');
const professor = require('./usuarioProfessorModel');

const materiaProfessor = Sequelize.define("materiaProfessor", {
    idMateriaProfessor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    materiaIdMateriaProfessor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    professorMateriaProfessor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    carimboDataHoraMateriaProfessor: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    situacaoMateriaProfessor: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "materiaProfessor",
    freezeTableName: true, // não pluraliza
    timestamps: false      // não cria createdAt / updatedAt automáticos
});


materiaProfessor.belongsTo(materia, { 
    foreignKey: "materiaMateriaProfessor",
    onDelete: "CASCADE", // se uma matéria for apagada, apaga o vínculo
    onUpdate: "CASCADE"
});

materiaProfessor.belongsTo(professor, { 
    foreignKey: "professorMateriaProfessor",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

//Uma matéria pode ter vários professores associados
materia.hasMany(materiaProfessor, {
    foreignKey: "materiaMateriaProfessor"
});

//Um professor pode estar ligado a várias matérias
professor.hasMany(materiaProfessor, {
    foreignKey: "professorMateriaProfessor"
});

module.exports = materiaProfessor;