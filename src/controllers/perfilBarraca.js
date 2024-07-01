const { Model } = require("sequelize");
const { conexaoSequelize } = require("../../config/bdConnection");
const { Modelbarraqueiro } = require("../models/barraqueiro");
const { ModelCarrinho } = require("../models/carrinho")


module.exports = {
    perfilBarraca: async (req, res) => {
        try {
            const carrinhoId = req.params.id;
            
            if (!carrinhoId) {
                throw new Error('ID do carrinho não fornecido');
            }
    
            const carrinho = await ModelCarrinho.findOne({
                where: { cd_carrinho: carrinhoId },
                include: [{ 
                    model: Modelbarraqueiro,
                    attributes: [],
                    required: true,
                 }]
            });
    
            if (!carrinho) {
                return res.status(404).send('Carrinho não encontrado');
            }
    
            res.render('reserva/index', { 
                carrinho: carrinho
            });
        } catch (error) {
            console.error('Erro ao carregar barraca:', error);
            res.status(500).send('Erro ao carregar barraca');
        }
    },
    todasBarracas: async (req, res) => {
        try {
            const resultado = await ModelCarrinho.findAll({
                include: [{
                    model: Modelbarraqueiro,
                    attributes: [],
                    required: true,
                }]
            });
    
            res.render('carrinho/index', {
                barracas: resultado
            });
        } catch (error) {
            console.error('Erro ao buscar as barracas:', error);
            res.status(500).send('Erro ao buscar as barracas');
        }
    }
}
