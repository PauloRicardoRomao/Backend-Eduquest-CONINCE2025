const { DataTypes } = require('sequelize');
const Sequelize = require('../config/config');
const professor = require('./usuarioProfessorModel');

const dadoProfessor = Sequelize.define("dadoProfessor", {
    idDadoProfessor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    professorDadoProfessor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nomeDadoProfessor: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    carimboDataHoraDadoProfessor: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "dadoProfessor",
    freezeTableName: true, // não pluraliza
    timestamps: false      // não cria createdAt / updatedAt automáticos
});


dadoProfessor.belongsTo(professor, { foreignKey: "professorDadoProfessor" });

module.exports = dadoProfessor;