create database if not exists EduQuest;
use EduQuest;

/*  drop database EduQuest;  */

create table if not exists usuario(
	idUsuario int primary key auto_increment not null,
    emailUsuario varchar(100) not null,
    senhaUsuario varchar(70) not null,
    carimboDataHoraUsuario datetime default current_timestamp,
    situacaoUsuario boolean default true
);

create table if not exists usuarioProfessor(
	idUsuarioProfessor int primary key auto_increment not null,
    usuarioUsuarioProfessor int not null,
    carimboDataHoraUsuarioProfessor datetime default current_timestamp,
    situacaoUsuarioProfessor boolean default true,
    foreign key (usuarioUsuarioProfessor) references usuario(idUsuario)
        on delete cascade on update cascade
);

create table if not exists usuarioAluno(
	idUsuarioAluno int primary key auto_increment not null,
    usuarioUsuarioAluno int not null,
	carimboDataHoraUsuarioAluno datetime default current_timestamp,
    situacaoUsuarioAluno boolean default true,
    foreign key (usuarioUsuarioAluno) references usuario(idUsuario)
        on delete cascade on update cascade
);

create table if not exists dadoProfessor(
	idDadoProfessor int primary key auto_increment not null,
    professorDadoProfessor int not null,
    nomeDadoProfessor varchar(100) not null,
    carimboDataHoraDadoProfessor datetime default current_timestamp,
	foreign key (professorDadoProfessor) references usuarioProfessor(idUsuarioProfessor)
        on delete cascade on update cascade
);

create table if not exists dadoAluno(
	idDadoAluno int primary key auto_increment not null,
    alunoDadoAluno int not null,
    nomeDadoAluno varchar(100) not null,
    dataNascimentoAluno date,
    carimboDataHoraDadoAluno datetime default current_timestamp,
	foreign key (alunoDadoAluno) references usuarioAluno(idUsuarioAluno)
        on delete cascade on update cascade
);

create table if not exists materia(
	idMateria int primary key auto_increment not null,
    descricaoMateria varchar(50) not null,
    situacaoMateria boolean default true
);

create table if not exists materiaProfessor(
	idMateriaProfessor int primary key auto_increment not null,
    materiaMateriaProfessor int not null,
    professorMateriaProfessor int not null,
    carimboDataHoraMateriaProfessor datetime default current_timestamp,
    situacaoMateriaProfessor boolean default true,
    foreign key (materiaMateriaProfessor) references materia(idMateria)
        on delete cascade on update cascade,
    foreign key (professorMateriaProfessor) references usuarioProfessor(idUsuarioProfessor)
        on delete cascade on update cascade
);

create table if not exists turma(
	idTurma int primary key auto_increment not null,
    limiteTurma int,
    carimboDataHoraTurma datetime default current_timestamp,
    situacaoTurma boolean default true
);

create table if not exists alunoTurma(
	idAlunoTurma int primary key auto_increment not null,
    alunoAlunoTurma int not null,
    turmaAlunoTurma int not null,
    carimboDataHoraAlunoTurma datetime default current_timestamp,
    situacaoAlunoTurma boolean default true,
    foreign key (alunoAlunoTurma) references usuarioAluno(idUsuarioAluno)
        on delete cascade on update cascade,
    foreign key (turmaAlunoTurma) references turma(idTurma)
        on delete cascade on update cascade
);

create table if not exists TurmaMateriaProfessor(
	idTurmaMateriaProfessor int primary key auto_increment not null,
    turmaTurmaMateriaProfessor int not null,
    materiaProfessorTurmaMateriaProfessor int not null,
    carimboDataHoraTurmaMateriaProfessor datetime default current_timestamp,
    situacaoTurmaMateriaProfessor boolean default true,
    foreign key (turmaTurmaMateriaProfessor) references turma(idTurma)
        on delete cascade on update cascade,
    foreign key (materiaProfessorTurmaMateriaProfessor) references materiaProfessor(idMateriaProfessor)
        on delete cascade on update cascade
);

create table if not exists tarefa(
	idTarefa int primary key auto_increment not null,
    turmaMateriaProfessorTarefa int not null,
    tituloTarefa varchar(30) not null,
    dataFinalTarefa date not null,
	descricaoTarefa text,
    pontoTarefa decimal(5,2) not null,
    carimboDataHoraTarefa datetime default current_timestamp,
    situacaoTarefa boolean default true,
    foreign key (turmaMateriaProfessorTarefa) references turmaMateriaProfessor(idTurmaMateriaProfessor)
        on delete cascade on update cascade
);

create table if not exists logTarefa(
	idLogTarefa int primary key auto_increment not null,
    tarefaLogTarefa int not null,
    dadosAntigosLogTarefa text not null,
    dadosNovosLogTarefa text not null,
    carimboDataHoraLogTarefa datetime default current_timestamp,
    foreign key (tarefaLogTarefa) references tarefa(idTarefa)
);