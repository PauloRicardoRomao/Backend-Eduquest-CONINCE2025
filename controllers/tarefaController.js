const tarefa = require('../models/tarefaModel');
const turmaMateriaProfessor = require('../models/turmaMateriaProfessorModel');

// Criar uma nova tarefa
module.exports = {
    async criarTarefa(req, res) {
        try {
            const { turmaMateriaProfessorTarefa, tituloTarefa, descricaoTarefa, pontoTarefa, dataFinalTarefa } = req.body;
            const novaTarefa = await tarefa.create({
                turmaMateriaProfessorTarefa,
                tituloTarefa,
                descricaoTarefa,
                pontoTarefa,
                dataFinalTarefa
            });
            res.status(201).json({
                success: true,
                message: 'Tarefa criada com sucesso.',
                tarefa: novaTarefa
            });
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            res.status(500).json({ error: 'Erro ao criar tarefa' });
        }
    },

    // Obter todas as tarefas
    async obterTarefas(req, res) {
        try {
            const tarefas = await tarefa.findAll();
            res.status(200).json({
                success: true,
                tarefas: tarefas
            });
        } catch (error) {
            console.error('Erro ao obter tarefas:', error);
            res.status(500).json({ error: 'Erro ao obter tarefas' });
        }
    },

    // Obter tarefa por ID
    async obterTarefaPorId(req, res) {
        try {
            const { id } = req.params;
            const tarefaEncontrada = await tarefa.findByPk(id);
            if (!tarefaEncontrada) {
                return res.status(404).json({ error: 'Tarefa não encontrada.' });
            }
            res.status(200).json({
                success: true,
                tarefa: tarefaEncontrada
            });
        } catch (error) {
            console.error('Erro ao obter tarefa:', error);
            res.status(500).json({ error: 'Erro ao obter tarefa' });
        }
    },

    // Atualizar tarefa
    async atualizarTarefa(req, res) {
        try {
            const { id } = req.params;
            const {tituloTarefa, descricaoTarefa, pontoTarefa, dataFinalTarefa } = req.body;
            const tarefaAtualizada = await tarefa.update({
                tituloTarefa: tituloTarefa,
                descricaoTarefa: descricaoTarefa,
                pontoTarefa: pontoTarefa,
                dataFinalTarefa: dataFinalTarefa
            },{
                where: { idTarefa: id }
            });
            if (!tarefaAtualizada[0]) {
                return res.status(404).json({ error: 'Tarefa não encontrada.' });
            }
            res.status(200).json({
                success: true,
                tituloTarefa: tituloTarefa,
                descricaoTarefa: descricaoTarefa,
                pontoTarefa: pontoTarefa,
                dataFinalTarefa: dataFinalTarefa,
                message: 'Tarefa atualizada com sucesso.'
            });
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            res.status(500).json({ error: 'Erro ao atualizar tarefa' });
        }
    },

    // Deletar tarefa
    async deletarTarefa(req, res) {
        try {
            const { id } = req.params;
            const tarefaDeletada = await tarefa.destroy({
                where: { idTarefa: id }
            });
            if (!tarefaDeletada) {
                return res.status(404).json({ error: 'Tarefa não encontrada.' });
            }
            res.status(200).json({
                success: true,
                message: 'Tarefa deletada com sucesso.'
            });
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
            res.status(500).json({ error: 'Erro ao deletar tarefa' });
        }
    }
};