const { DATE } = require("sequelize"); // Importa a constante DATE do módulo sequelize. Não está sendo usada no código atual.
const { ModelHistorico } = require("../models/historico"); // Importa o modelo ModelHistorico do arquivo historico.
const { ModelPedido } = require("../models/pedido"); // Importa o modelo ModelPedido do arquivo pedido.

module.exports = {
    AdiconarHistorico: async (req, res) => { // Exporta uma função assíncrona chamada AdiconarHistorico
        let usuario = req.cookies.cookie_usuario; // Obtém o usuário do cookie da requisição
        let pedido = await ModelPedido.findOne({ where: { cd_cliente: usuario } }); // Encontra o pedido correspondente ao usuário

        if (pedido) { // Verifica se o pedido foi encontrado
            const transaction = await ModelPedido.sequelize.transaction(); // Inicia uma transação
            try {
                // Desabilita a verificação de chaves estrangeiras temporariamente
                await ModelPedido.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { transaction });

                // Cria um registro no ModelHistorico com os dados do pedido, incluindo a data atual
                await ModelHistorico.create({
                    cd_pedido: pedido.cd_pedido,
                    cd_cliente: pedido.cd_cliente,
                    cd_carrinho: pedido.cd_carrinho,
                    vl_total_pedido: pedido.vl_total_pedido,
                    dt_pedido: new Date()  // Adiciona a data atual
                }, { transaction });

                // Destrói o pedido após criar o histórico
                await pedido.destroy({ transaction });

                // Habilita a verificação de chaves estrangeiras novamente
                await ModelPedido.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { transaction });

                await transaction.commit(); // Confirma a transação
                console.log(`Pedido ${pedido.cd_pedido} destruído com sucesso.`);
            } catch (error) { // Captura e trata qualquer erro ocorrido
                await transaction.rollback(); // Reverte a transação em caso de erro
                console.error('Erro ao criar o histórico ou destruir o pedido:', error);
            }
        } else { // Caso o pedido não seja encontrado
            console.log('Pedido não encontrado para o usuário:', usuario);
        }

        res.render('compracerta/index'); // Renderiza a página compracerta/index
    }
};
