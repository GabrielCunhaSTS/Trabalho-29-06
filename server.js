const express = require('express');
const appWeb = express();
const cookieParser = require('cookie-parser');
const {conexaoSequelize, nmBanco} = require('./config/bdConnection');
const path = require('path');
const routes = require('./src/routes/index')

// Verificando a autenticação da conexão com o banco de dados
conexaoSequelize.authenticate().then(() => {
    console.log(`>>> Conexão com o banco ${nmBanco} estabelecida com sucesso!`);
}).catch(erroConn => {
    console.log(`>>> Erro ao conectar-se ao banco ${nmBanco}`);
    console.log(erroConn);
});

appWeb.use(express.json()); // Middleware para analisar o corpo da solicitação como JSON
appWeb.use(express.urlencoded({ extended: false }));
appWeb.use(cookieParser());
appWeb.use(express.static('./src/views/'));
appWeb.use('/', routes)

appWeb.set('view engine', 'ejs');
appWeb.set('views', path.join(__dirname, 'src', 'views'));

// Definindo a porta em que o servidor rodas
const porta = 3000;

// Iniciando o servidor
appWeb.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});