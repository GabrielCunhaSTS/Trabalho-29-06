const express = require('express');
const router = express.Router();
exports.router = router;
const auth = require('../controllers/autenticacao');
const authB = require('../controllers/autenticacaoB');
const { findAllProdutos } = require('../controllers/produto');
const pagamento = require('../controllers/pagamento');
const sacola = require('../controllers/Sacola');
const perfil = require('../controllers/perfil');
const { CarregarPontosClube } = require('../controllers/clube');
const { AdiconarHistorico } = require('../controllers/compraCerta');
const { CarregarHistorico } = require('../controllers/historico');

// Rotas GET
router.get('/', async (req, resp) => { return resp.render('login/index.ejs'); });
router.get('/escolher', async (req, resp) => { return resp.render('escolher/index.ejs'); });
router.get('/CadBanhista', async (req, resp) => { return resp.render('CadBanhista/index.ejs'); });
router.get('/CadBarraqueiro', async (req, resp) => { return resp.render('CadBarraqueiro/index.ejs'); });
router.get('/cardapio', auth.verificarAutenticacao, async (req, resp) => { return resp.render('cardapio/index.ejs'); });
router.get('/inicial', auth.verificarAutenticacao, async (req, resp) => { return resp.render('inicial/index.ejs'); });
router.get('/carrinho', auth.verificarAutenticacao, async (req, resp) => { return resp.render('carrinho/index.ejs'); });
router.get('/reserva', auth.verificarAutenticacao, async (req, resp) => { return resp.render('reserva/index.ejs'); });
router.get('/clube', auth.verificarAutenticacao, CarregarPontosClube);
router.get('/historico', auth.verificarAutenticacao, CarregarHistorico)
router.get('/sacola', auth.verificarAutenticacao, sacola.MostraItensSacola);
router.get('/produtos', auth.verificarAutenticacao, findAllProdutos);
router.get('/perfil', auth.verificarAutenticacao, perfil.CarregarPerfil);

// Rotas POST
router.post('/cadastrar', auth.CadastrarUsuario);
router.post('/cadastrarB', authB.CadastrarUsuarioB);
router.post('/login', auth.LoginUsuario);
router.post('/sacola', sacola.AddItemSacola);
router.post('/pagamento', pagamento.iniciarPagamento);
router.post('/update-quantidade', sacola.UpdateQuantidade);
router.post('/remove-produto', sacola.RemoveProduto);
router.post('/atualizarNome', perfil.AtualizarNome);
router.post('/DeletarConta', perfil.ExcluirConta)

// Rotas GET para o pagamento
router.get('/compracerta', AdiconarHistorico);
router.get('/compraerrada', pagamento.renderCompraErrada);

module.exports = router;
