const { DataTypes } = require('sequelize');
const Sequelize = require('../config/config');
const aluno = require('./usuarioAlunoModel');

const dadoAluno = Sequelize.define("dadoAluno", {
    idDadoAluno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    alunoDadoAluno: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nomeDadoAluno: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    dataNascimentoDadoAluno: {
        type: DataTypes.DATE,
        allowNull: true
    },
    carimboDataHoraDadoAluno: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "dadoAluno",
    freezeTableName: true, // não pluraliza
    timestamps: false      // não cria createdAt / updatedAt automáticos
});


dadoAluno.belongsTo(aluno, { foreignKey: "alunoDadoAluno" });

module.exports = dadoAluno;