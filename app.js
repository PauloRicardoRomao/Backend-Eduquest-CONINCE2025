const express = require('express');
const app = express();
const sequelize = require('./config/config');
const { Sequelize } = require('sequelize');
const path = require("path");

const apiRouter = require("./routes/apiRouter");

const port = 3000;

// Configurar body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/api", apiRouter);


sequelize.sync().then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
        console.log(`Banco de dados conectado e servidor rodando na porta ${port}`);
        console.log(`Acesse: http://localhost:${port}`);
    });
}).catch((error) => {
    console.error('Error synchronizing database:', error);
});
