const { Op } = require("sequelize");
const { ModelNotificacao } = require("../models/notificacao");

module.exports = {
    CarregarNotificacoes: async (req, res) => {
        try {
            const cd_usuario = req.cookies.cookie_usuario;

            // Consulta ordenada por 'created_at' em ordem decrescente
            const notificacoes = await ModelNotificacao.findAll({
                where: { cd_cliente: cd_usuario }
            });

            // Notificação dos Cupons
            const ntfCupom = notificacoes.filter(notificacao => notificacao.ds_tipo === 'Cupom');
            const DetalhesCupom = ntfCupom.map(cupom => ({
                ttlCupom: cupom.ds_titulo,
                descricaoCupom: cupom.ds_descricao
            }));

            // Notificação dos Pedidos
            const ntfPedido = notificacoes.filter(notificacao => notificacao.ds_tipo === 'Pedido');
            const DetalhesPedido = ntfPedido.map(pedido => ({
                ttlPedido: pedido.ds_titulo,
                descricaoPedido: pedido.ds_descricao
            }));

            res.render('notificacao/index', {
                ntfCupom: DetalhesCupom,
                ntfPedido: DetalhesPedido
            });
        } catch (error) {
            console.error("Erro ao carregar notificações:", error);
            res.status(500).send("Erro ao carregar notificações");
        }
    }
}
