const { ModelProduto } = require('../models/produto');
const { Sequelize } = require('sequelize');

const findAllProdutos = async (req, res) => {
    try {
        const produtos = await ModelProduto.findAll({ raw: true });
        res.json(produtos);
    } catch (error) {
        res.status(500).send('Erro ao buscar produtos');
    }
}

module.exports = { findAllProdutos };
