const { conexaoSequelize } = require("../../config/bdConnection")
const { ModelCarrinho } = require("../models/carrinho")


module.exports = {
    CarregarBarraca: async (req, res) => { 
        try {
            const cd_carrinho = req.query.id;

            let barraca = await ModelCarrinho.findOne({ where: { cd_carrinho: cd_carrinho } });

            if (!barraca) {
                return res.status(404).send('Barraca não encontrada');
            }

            res.render('carrinho/index', {
                nomeC: barraca.nm_carrinho,
                descricao: barraca.ds_localizacao,
                status: barraca.ds_status
            });
        } catch (error) {
            console.error('Erro ao carregar barraca', error);
            res.status(500).send('Erro ao carregar barraca');
        }
    }
}
