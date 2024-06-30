const { conexaoSequelize } = require('../../config/bdConnection');
const { ModelClubeUsuario } = require('../models/clubeUsuario');
const { ModelHistorico } = require('../models/historico');
const { format } = require('date-fns');
const { ptBR } = require('date-fns/locale');

module.exports = {
    CarregarPontosClube: async (req, res) => {
        try {
            const cd_usuario = req.cookies.cookie_usuario;
        
            const usuario = await ModelClubeUsuario.findOne({ where: { cd_cliente: cd_usuario } });
            const historico = await ModelHistorico.findAll({ where: { cd_cliente: cd_usuario } });
        
            const historicoCompleto = historico.map(compra => {
                // Extrai o dia da semana, o número do dia e o mês
                let diaSemana = format(new Date(compra.dt_pedido), 'EEE', { locale: ptBR }); // Três primeiras letras do dia da semana em português
                const dia = format(new Date(compra.dt_pedido), 'd'); // Número do dia
                const mes = format(new Date(compra.dt_pedido), 'MM'); // Número do mês

                // Ajusta o formato do dia da semana para apenas as três primeiras letras em minúsculas
                diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1, 3).toLowerCase();

                return {
                    diaSemana,
                    dia,
                    mes,
                    pontos: compra.vl_total_pedido
                };
            });

            res.render('clube/index', {
                pontos: usuario.qt_pontos,
                historicoCompleto
            });
        } catch (error) {
            console.error('Erro ao carregar pontos do clube:', error);
            res.status(500).send('Erro ao processar os pontos do clube.');
        }
    }
};
