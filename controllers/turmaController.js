const turmaModel = require('../models/turmaModel');
const turmaMateriaProfessorModel = require('../models/turmaMateriaProfessorModel');

// Função para criar uma nova turma
const criarTurma = async (req, res) => {
    try {
        const { limiteTurma } = req.body;
        const novaTurma = await turmaModel.create({
            limiteTurma
        });
        res.status(201).json({
            success: true,
            message: "Turma criada com sucesso",
            data: novaTurma
        });
    } catch (error) {
        console.error('Erro ao criar turma:', error);
        res.status(500).json({ error: 'Erro ao criar turma' });
    }
};

// Função para listar todas as turmas
const listarTurmas = async (req, res) => {
    try {
        const turmas = await turmaModel.findAll();
        res.json({
            success: true,
            data: turmas
        });
    } catch (error) {
        console.error('Erro ao listar turmas:', error);
        res.status(500).json({ error: 'Erro ao listar turmas' });
    }
};

// Função para obter detalhes de uma turma específica, incluindo matérias e professores associados
const obterDetalhesTurma = async (req, res) => {
    try {
        const { id } = req.params;
        
        const turma = await turmaModel.findOne({
            where: { idTurma: id },
            include: [
                {
                    model: turmaMateriaProfessorModel,
                    as: 'materias',
                    include: [
                        { model: materiaModel, as: 'materia' },
                        { model: professorModel, as: 'professor' }
                    ]
                }
            ]
        });

        if (!turma) {
            return res.status(404).json({
                success: false,
                message: "Turma não encontrada"
            });
        }

        res.json({
            success: true,
            data: turma
        });
    } catch (error) {
        console.error('Erro ao obter detalhes da turma:', error);
        res.status(500).json({ error: 'Erro ao obter detalhes da turma' });
    }
};

module.exports = {
    criarTurma,
    listarTurmas,
    obterDetalhesTurma
};