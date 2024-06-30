const { ModelPedido } = require("../models/pedido");
const { ModelSacola } = require("../models/sacola");
const { ModelProduto } = require("../models/produto");
const fetch = require('node-fetch');

const renderCarrinho = (req, res) => {
    res.render("carrinho.ejs");
};

const iniciarPagamento = async (req, res) => {
    const token = "APP_USR-7499033670655943-050513-0932d668bdd5cea0c60756b716bdf096-663046811";

    try {
        // Obter o valor total do pedido
        const pedido = await ModelPedido.findOne({
            where: {
                cd_cliente: req.cookies.cookie_usuario,
            }
        });

        if (!pedido) {
            return res.status(404).send('Pedido não encontrado');
        }

        const total = pedido.vl_total_pedido;

        const paymentData = {
            items: [
                { id: "1", title: "Pedido", quantity: 1, currency_id: "BRL", unit_price: total }
            ],
            back_urls: {
                success: "http://localhost:3000/compracerta",
                failure: "http://localhost:3000/compraerrada",
                pending: "http://localhost:3000/compraerrada"
            },
            auto_return: "all"
        };

        const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(paymentData)
        });
        
        const responseData = await response.json();
        const linkIniciarPagamento = responseData.init_point;

        res.redirect(linkIniciarPagamento);
    } catch (error) {
        console.error('Erro ao solicitar pagamento:', error);
        res.status(500).send('Erro ao solicitar pagamento');
    }
};

const renderCompraCerta = (req, res) => {
    res.render("compracerta.ejs");
};

const renderCompraErrada = (req, res) => {
    res.render("compraerrada.ejs");
};

module.exports = {
    renderCarrinho,
    iniciarPagamento,
    renderCompraCerta,
    renderCompraErrada
};
