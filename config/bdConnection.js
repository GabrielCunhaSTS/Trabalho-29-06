const { Sequelize } = require('sequelize');

const usuario = 'root';
const senha = 'root';
const nmBanco = 'db_praioou';
const conexaoSequelize = new Sequelize(
    `mysql://${usuario}:${senha}@localhost:3306/${nmBanco}`
);

module.exports = {
    nmBanco,
    conexaoSequelize
};