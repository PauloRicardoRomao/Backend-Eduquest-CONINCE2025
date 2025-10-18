const usuarioModel = require('../models/usuarioModel');
const professorModel = require('../models/usuarioProfessorModel');
const dadoProfessor = require('../models/dadoProfessorModel');
const materiaModel = require('../models/materiaModel');
const materiaProfessorModel = require('../models/materiaProfessorModel');
const Sequelize = require('../config/config');

const cadastrarProfessor = async (req, res) => {
    const t = await Sequelize.transaction(); // inicia transação

    try {
        const {
            emailUsuario,
            senhaUsuario,
            nomeDadoProfessor
        } = req.body;

        const novoUsuario = await usuarioModel.create({
            emailUsuario,
            senhaUsuario
        }, { transaction: t });

        const novoUsuarioProfessor = await professorModel.create({
            usuarioUsuarioProfessor: novoUsuario.idUsuario
        }, { transaction: t });

        const novoDadoProfessor = await dadoProfessor.create({
            professorDadoProfessor: novoUsuarioProfessor.idUsuarioProfessor,
            nomeDadoProfessor
        }, { transaction: t });

        await t.commit();

        res.json({
            success: true,
            message: "Professor registrado com sucesso!",
            data: {
                usuario: novoUsuario,
                usuarioProfessor: novoUsuarioProfessor,
                dadoProfessor: novoDadoProfessor
            }
        });

    } catch (error) {
        await t.rollback();
        console.error('Erro ao cadastrar professor:', error);
        res.status(500).json({ error: 'Erro ao cadastrar professor' });
    }
};



const alterarProfessor = async (req, res) => {
    try {
        const { idProfessor } = req.params;
        const { nomeDadoProfessor } = req.body;

        const professor = await professorModel.findOne({
            where: {
                idUsuarioProfessor: idProfessor,
                situacaoUsuarioProfessor: true
            }
        });

        if (!professor) {
            return res.status(404).json({
                success: false,
                message: "Professor não encontrado ou inativo"
            });
        }

        const [linhasAfetadas] = await dadoProfessor.update(
            { nomeDadoProfessor },
            { where: { professorDadoProfessor: idProfessor } }
        );

        if (linhasAfetadas === 0) {
            return res.status(404).json({
                success: false,
                message: "Nenhum dado encontrado para atualizar"
            });
        }

        const professorAtualizado = await dadoProfessor.findOne({
            where: { professorDadoProfessor: idProfessor }
        });

        res.json({
            success: true,
            message: "Dados do professor atualizados com sucesso",
            data: professorAtualizado
        });

    } catch (error) {
        console.error('Erro ao alterar professor:', error);
        res.status(500).json({ error: 'Erro ao alterar professor' });
    }
};


const consultarProfessor = async (req, res) => {
    try {
        const { professorId } = req.params;

        const professor = await professorModel.findOne({
            where: {
                idUsuarioProfessor: professorId,
                situacaoUsuarioProfessor: true
            },
            attributes: ['idUsuarioProfessor', 'carimboDataHoraUsuarioProfessor'],
            include: [
                {
                    model: usuarioModel,
                    attributes: ['emailUsuario', 'situacaoUsuario']
                },
                {
                    model: dadoProfessor,
                    attributes: ['nomeDadoProfessor']
                }
            ]
        });

        if (!professor) {
            return res.status(404).json({
                success: false,
                message: "Professor não encontrado ou inativo"
            });
        }

        res.json({
            success: true,
            data: professor
        });
    } catch (error) {
        console.error('Erro ao consultar professor:', error);
        res.status(500).json({ error: 'Erro ao consultar professor' });
    }
};

const deletarProfessor = async (req, res) => {
    try {
        const { idProfessor } = req.params;

        const professor = await professorModel.findOne({
            where: {
                idUsuarioProfessor: idProfessor,
                situacaoUsuarioProfessor: true
            }
        });

        if (!professor) {
            return res.status(404).json({
                success: false,
                message: "Professor não encontrado ou inativo"
            });
        }

        await professor.destroy({where : { idUsuarioProfessor: idProfessor }});

        res.json({
            success: true,
            message: "Professor deletado com sucesso"
        });
    } catch (error) {
        console.error('Erro ao deletar professor:', error);
        res.status(500).json({ error: 'Erro ao deletar professor' });
    }
};

const vincularProfessorMateria = async (req, res) => {
    try {
        const { idProfessor, idMateria } = req.body;

        const professor = await professorModel.findOne({
            where: {
                idUsuarioProfessor: idProfessor,
                situacaoUsuarioProfessor: true
            }
        });

        const materia = await materiaModel.findOne({
            where: {
                idMateria,
                situacaoMateria: true
            }
        });

        if (!professor || !materia) {
            return res.status(404).json({
                success: false,
                message: "Professor ou matéria não encontrada"
            });
        }

        const professorMateria = await materiaProfessorModel.create({
            materiaMateriaProfessor: idMateria,
            professorMateriaProfessor: idProfessor
        });

        res.json({
            success: true,
            message: "Professor vinculado à matéria com sucesso",
            data: professorMateria
        });
    } catch (error) {
        console.error('Erro ao vincular professor à matéria:', error);
        res.status(500).json({ error: 'Erro ao vincular professor à matéria' });
    }
};

const deletarVinculoProfessorMateria = async (req, res) => {
    try {
        const { idProfessorMateria } = req.params;

        const professorMateria = await materiaProfessorModel.findOne({
            where: {
                id: idProfessorMateria
            }
        });

        if (!professorMateria) {
            return res.status(404).json({
                success: false,
                message: "Vínculo entre professor e matéria não encontrado"
            });
        }

        await professorMateria.destroy({where: { id: idProfessorMateria }});

        res.json({
            success: true,
            message: "Vínculo entre professor e matéria deletado com sucesso"
        });
    } catch (error) {
        console.error('Erro ao deletar vínculo entre professor e matéria:', error);
        res.status(500).json({ error: 'Erro ao deletar vínculo entre professor e matéria' });
    }
};

module.exports = {
    cadastrarProfessor,
    alterarProfessor,
    consultarProfessor,
    deletarProfessor,
    vincularProfessorMateria,
    deletarVinculoProfessorMateria
};
