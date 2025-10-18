const materiaModel = require('../models/materiaModel');
const Sequelize = require('../config/config');

// Criar uma nova matéria
const criarMateria = async (req, res) => {
    const t = await Sequelize.transaction(); // inicia transação
    try {
        const { descricaoMateria } = req.body;
        const novaMateria = await materiaModel.create({
            descricaoMateria
        }, { transaction: t });
        await t.commit();
        res.status(201).json({
            success: true,
            message: 'Matéria criada com sucesso.',
            materia: novaMateria
        });
    } catch (error) {
        await t.rollback();
        console.error('Erro ao criar matéria:', error);
        res.status(500).json({ error: 'Erro ao criar matéria' });
    }
};

const obterMaterias = async (req, res) => {
    try {
        const materias = await materiaModel.findAll();
        res.status(200).json({
            success: true,
            materias
        });
    } catch (error) {
        console.error('Erro ao obter matérias:', error);
        res.status(500).json({ error: 'Erro ao obter matérias' });
    }
};

const obterMateriaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const materia = await materiaModel.findByPk(id);
        if (!materia) {
            return res.status(404).json({ error: 'Matéria não encontrada' });
        }
        res.status(200).json({
            success: true,
            materia
        });
    } catch (error) {
        console.error('Erro ao obter matéria:', error);
        res.status(500).json({ error: 'Erro ao obter matéria' });
    }
};

const atualizarMateria = async (req, res) => {
    const t = await Sequelize.transaction(); // inicia transação
    try {
        const { id } = req.params;
        const { descricaoMateria } = req.body;
        const materia = await materiaModel.findByPk(id);
        if (!materia) {
            return res.status(404).json({ error: 'Matéria não encontrada' });
        }
        await materia.update({ descricaoMateria }, { transaction: t });
        await t.commit();
        res.status(200).json({
            success: true,
            message: 'Matéria atualizada com sucesso.',
            materia
        });
    } catch (error) {
        await t.rollback();
        console.error('Erro ao atualizar matéria:', error);
        res.status(500).json({ error: 'Erro ao atualizar matéria' });
    }
};

const deletarMateria = async (req, res) => {
    const t = await Sequelize.transaction(); // inicia transação
    try {
        const { id } = req.params;
        const materia = await materiaModel.findByPk(id);
        if (!materia) {
            return res.status(404).json({ error: 'Matéria não encontrada' });
        }
        await materia.destroy({ transaction: t });
        await t.commit();
        res.status(200).json({
            success: true,
            message: 'Matéria deletada com sucesso.'
        });
    } catch (error) {
        await t.rollback();
        console.error('Erro ao deletar matéria:', error);
        res.status(500).json({ error: 'Erro ao deletar matéria' });
    }
};

module.exports = {
    criarMateria,
    obterMaterias,
    obterMateriaPorId,
    atualizarMateria,
    deletarMateria
};