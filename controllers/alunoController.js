const usuarioModel = require('../models/usuarioModel');
const alunoModel = require('../models/usuarioAlunoModel');
const dadoAluno = require('../models/dadoAlunoModel');
const alunoTurmaModel = require('../models/alunoTurmaModel');
const turmaModel = require('../models/turmaModel');
const Sequelize = require('../config/config');

const cadastrarAluno = async (req, res) => {
    const t = await Sequelize.transaction(); // inicia transação

    try {
        const {
            emailUsuario,
            senhaUsuario,
            nomeDadoAluno,
            dataNascimentoDadoAluno
        } = req.body;

        const novoUsuario = await usuarioModel.create({
            emailUsuario,
            senhaUsuario
        }, { transaction: t });

        const novoUsuarioAluno = await alunoModel.create({
            usuarioUsuarioAluno: novoUsuario.idUsuario
        }, { transaction: t });

        const novoDadoAluno = await dadoAluno.create({
            alunoDadoAluno: novoUsuarioAluno.idUsuarioAluno,
            nomeDadoAluno,
            dataNascimentoDadoAluno
        }, { transaction: t });

        await t.commit();

        res.json({
            success: true,
            message: "Aluno registrado com sucesso!",
            data: {
                usuario: novoUsuario,
                usuarioAluno: novoUsuarioAluno,
                dadoAluno: novoDadoAluno
            }
        });

    } catch (error) {
        await t.rollback();
        console.error('Erro ao cadastrar aluno:', error);
        res.status(500).json({ error: 'Erro ao cadastrar aluno' });
    }
};



const alterarAluno = async (req, res) => {
    try {
        const { idAluno } = req.params;
        const { nomeDadoAluno, dataNascimentoDadoAluno } = req.body;

        const aluno = await alunoModel.findOne({
            where: {
                idUsuarioAluno: idAluno,
                situacaoUsuarioAluno: true
            }
        });

        if (!aluno) {
            return res.status(404).json({
                success: false,
                message: "Aluno não encontrado ou inativo"
            });
        }

        const [linhasAfetadas] = await dadoAluno.update(
            { nomeDadoAluno, dataNascimentoDadoAluno },
            { where: { alunoDadoAluno: idAluno } }
        );

        if (linhasAfetadas === 0) {
            return res.status(404).json({
                success: false,
                message: "Nenhum dado encontrado para atualizar"
            });
        }

        const alunoAtualizado = await dadoAluno.findOne({
            where: { alunoDadoAluno: idAluno }
        });

        res.json({
            success: true,
            message: "Dados do aluno atualizados com sucesso",
            data: alunoAtualizado
        });

    } catch (error) {
        console.error('Erro ao alterar aluno:', error);
        res.status(500).json({ error: 'Erro ao alterar aluno' });
    }
};


const consultarAluno = async (req, res) => {
    try {
        const { alunoId } = req.params;

        const aluno = await alunoModel.findOne({
            where: {
                idUsuarioAluno: alunoId,
                situacaoUsuarioAluno: true
            },
            attributes: ['idUsuarioAluno', 'carimboDataHoraUsuarioAluno'],
            include: [
                {
                    model: usuarioModel,
                    attributes: ['emailUsuario', 'situacaoUsuario']
                },
                {
                    model: dadoAluno,
                    attributes: ['nomeDadoAluno', 'dataNascimentoDadoAluno']
                }
            ]
        });

        if (!aluno) {
            return res.status(404).json({
                success: false,
                message: "Aluno não encontrado ou inativo"
            });
        }

        res.json({
            success: true,
            data: aluno
        });
    } catch (error) {
        console.error('Erro ao consultar aluno:', error);
        res.status(500).json({ error: 'Erro ao consultar aluno' });
    }
};

const deletarAluno = async (req, res) => {
    try {
        const { idAluno } = req.params;

        const aluno = await alunoModel.findOne({
            where: {
                idUsuarioAluno: idAluno,
                situacaoUsuarioAluno: true
            }
        });

        if (!aluno) {
            return res.status(404).json({
                success: false,
                message: "Aluno não encontrado ou inativo"
            });
        }

        await aluno.destroy({ where: { idUsuarioAluno: idAluno }});

        res.json({
            success: true,
            message: "Aluno deletado com sucesso"
        });
    } catch (error) {
        console.error('Erro ao deletar aluno:', error);
        res.status(500).json({ error: 'Erro ao deletar aluno' });
    }
};

const vincularAlunoTurma = async (req, res) => {
    try {
        const { alunoId, turmaId } = req.body;

        const aluno = await alunoModel.findOne({
            where: {
                idUsuarioAluno: alunoId,
                situacaoUsuarioAluno: true
            }
        });

        const turma = await turmaModel.findOne({
            where: {
                idTurma: turmaId,
                situacaoTurma: true
            }
        });

        if (!aluno || !turma) {
            return res.status(404).json({
                success: false,
                message: "Aluno ou turma não encontrada"
            });
        }

        const alunoTurma = await alunoTurmaModel.create({
            alunoAlunoTurma: alunoId,
            turmaAlunoTurma: turmaId
        });

        res.json({
            success: true,
            message: "Aluno vinculado à turma com sucesso",
            data: alunoTurma
        });
    } catch (error) {
        console.error('Erro ao vincular aluno à turma:', error);
        res.status(500).json({ error: 'Erro ao vincular aluno à turma' });
    }
};

const deletarVinculoAlunoTurma = async (req, res) => {
    try {
        const { alunoId, turmaId } = req.body;

        const alunoTurma = await alunoTurmaModel.findOne({
            where: {
                alunoAlunoTurma: alunoId,
                turmaAlunoTurma: turmaId
            }
        });

        if (!alunoTurma) {
            return res.status(404).json({
                success: false,
                message: "Vínculo entre aluno e turma não encontrado"
            });
        }

        await alunoTurma.destroy({ where: { alunoAlunoTurma: alunoId, turmaAlunoTurma: turmaId } });

        res.json({
            success: true,
            message: "Vínculo entre aluno e turma deletado com sucesso"
        });
    } catch (error) {
        console.error('Erro ao deletar vínculo entre aluno e turma:', error);
        res.status(500).json({ error: 'Erro ao deletar vínculo entre aluno e turma' });
    }
};

module.exports = {
    cadastrarAluno,
    alterarAluno,
    consultarAluno,
    deletarAluno,
    vincularAlunoTurma,
    deletarVinculoAlunoTurma
};