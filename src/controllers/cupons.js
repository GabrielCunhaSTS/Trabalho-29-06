const { ModelCupom } = require('../models/cupom');

module.exports = {
    meusCupons: async (req, res) => {
        const cd_usuario = req.cookies.cookie_usuario;

        try {
            const cupons = await ModelCupom.findAll({ where: { cd_cliente: cd_usuario } });

            const cuponsData = cupons.map(cupom => {
                const dataValidade = new Date(cupom.dt_validade_cupom);
                const dia = String(dataValidade.getDate()).padStart(2, '0');
                const mes = String(dataValidade.getMonth() + 1).padStart(2, '0');
                const ano = dataValidade.getFullYear();

                return {
                    preco: cupom.vl_cupom,
                    validade: `${dia}/${mes}/${ano}`
                };
            });

            res.render('cupons/index', { cupons: cuponsData });
        } catch (error) {
            console.error("Erro ao carregar os cupons:", error);
            res.status(500).send("Erro ao carregar os cupons");
        }
    }
};
