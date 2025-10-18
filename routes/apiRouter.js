const express = require("express");
const router = express.Router();

// Controllers

const aluno = require("../controllers/alunoController");
const professor = require("../controllers/professorController");
const materia = require("../controllers/materiaController");
const turma = require("../controllers/turmaController");
const tarefa = require("../controllers/tarefaController");

// Mapa de entidades e ações
const routes = {
    aluno: {
        cadastrarAluno: aluno.cadastrarAluno,
        alterarAluno: aluno.alterarAluno,
        consultarAluno: aluno.consultarAluno,
        deletarAluno: aluno.deletarAluno,
        vincularAlunoTurma: aluno.vincularAlunoTurma,
        deletarVinculoAlunoTurma: aluno.deletarVinculoAlunoTurma
    },
    professor: {
        cadastrarProfessor: professor.cadastrarProfessor,
        alterarProfessor: professor.alterarProfessor,
        consultarProfessor: professor.consultarProfessor,
        deletarProfessor: professor.deletarProfessor,
        vincularProfessorMateria: professor.vincularProfessorMateria,
        deletarVinculoProfessorMateria: professor.deletarVinculoProfessorMateria
    },
    materia: {
        cadastrarMateria: materia.criarMateria,
        alterarMateria: materia.atualizarMateria,
        consultarMaterias: materia.obterMaterias,
        deletarMateria: materia.deletarMateria,
        consultarMateria: materia.obterMateriaPorId
    },
    turma: {
        cadastrarTurma: turma.criarTurma,
        listarTurmas: turma.listarTurmas,
        obterDetalhesTurma: turma.obterDetalhesTurma
    },
    tarefa: {
        cadastrarTarefa: tarefa.criarTarefa,
        alterarTarefa: tarefa.atualizarTarefa,
        consultarTarefas: tarefa.obterTarefas,
        deletarTarefa: tarefa.deletarTarefa,
        consultarTarefa: tarefa.obterTarefaPorId
    }
};

// Rota centralizada
router.post("/", async (req, res) => {
    const { action, entity, data, id } = req.body;

    try {
        const entityActions = routes[entity];
        if (!entityActions) {
            return res.status(400).json({ error: "Entidade inválida" });
        }

        const controllerAction = entityActions[action.toLowerCase()];
        if (!controllerAction) {
            return res.status(400).json({ error: "Ação inválida para essa entidade" });
        }

        // Ajusta req para os controllers
        if (id) req.params.id = id;
        if (data) req.body = data;

        return controllerAction(req, res);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


module.exports = router;
