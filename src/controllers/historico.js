const { ModelHistorico } = require("../models/historico");
const { ModelProduto } = require("../models/produto");
const { ModelSacola } = require("../models/sacola");

module.exports = {
    CarregarHistorico: async (req, res) => {
        const cd_usuario = req.cookies.cookie_usuario;

        try {
            const historico = await ModelHistorico.findAll({
                where: { cd_cliente: cd_usuario }
            });

            const DetalhesPedido = [];

            for (const historicoItem of historico) {
                const Sacola = await ModelSacola.findAll({
                    where: { cd_pedido: historicoItem.cd_pedido }
                });

                const produtos = [];

                for (const produto of Sacola) {
                    const produtoDetalhe = await ModelProduto.findOne({
                        where: { cd_produto: produto.cd_produto }
                    });

                    produtos.push({
                        nome: produtoDetalhe.nm_produto,
                        ValorProduto: produtoDetalhe.vl_produto,
                        Quantidade: produto.quantidade
                    });
                }

                DetalhesPedido.push({
                    Produtos: produtos,
                    ValorTotalPedido: historicoItem.vl_total_pedido,
                    DataPedido: historicoItem.dt_pedido
                });
            }

            res.render('historico/index', {
                DetalhesPedido: DetalhesPedido
            });
        } catch (error) {
            console.error("Erro ao carregar histórico:", error);
            res.status(500).send("Erro ao carregar histórico");
        }
    }
};
