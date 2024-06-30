const {ModelCliente} = require('../models/cliente')
const { conexaoSequelize } = require('../../config/bdConnection')
const bcrypt = require('bcrypt');

module.exports = {
    CarregarPerfil: async (req, res) => {

        try {
 
            const cd_usuario = req.cookies.cookie_usuario;
            let usuario = await ModelCliente.findOne({ where: { cd_cliente: cd_usuario } });

            res.render('perfil/index', {
                nome: usuario.nm_cliente,
                sobreN: usuario.nm_sobrenomeC,
                email: usuario.ds_emailC,
                telefone: usuario.nmr_telefoneC
            });
        }
        catch (error) {
            console.error('Erro ao carregar perfil:', error);
            res.status(500).send('Erro ao carregar da sacola');
        }
    },

    AtualizarNome: async (req, res) => {
        try {
           const {
            nomeDigit,
            senhaDigit,
            sobreNDigit
            } = req.body;

            const cd_usuario = req.cookies.cookie_usuario;
            let usuario = await ModelCliente.findOne({ where: { cd_cliente: cd_usuario } });

            const senhaCorreta = await bcrypt.compare(senhaDigit, usuario.ds_senhaC);

            // Se as senhas não coincidirem, retorna uma resposta de erro
            if (!senhaCorreta) {
                return res.status(401).json({ msg: 'Senha incorreta!' });
            }

            const result = await conexaoSequelize.query('CALL atualiza_cliente(?, ?, ?)', {
                replacements: [usuario.ds_emailC, nomeDigit, sobreNDigit],
                raw: true // Obter resultados em formato simplificado
            });

            console.log(result);

            res.status(200).json({ msg: result});
        }
        
        catch (error) {
            console.error('Erro ao atualizar nome:', error);
            res.status(500).send('Erro ao atualizar nome');
        }
    },

    ExcluirConta: async (req, res) => {
        const senha = req.body.senha

        const cd_usuario = req.cookies.cookie_usuario;
        let usuario = await ModelCliente.findOne({ where: { cd_cliente: cd_usuario } });

        const senhaCorreta = await bcrypt.compare(senha, usuario.ds_senhaC);

        // Se as senhas não coincidirem, retorna uma resposta de erro
        if (!senhaCorreta) {
            return res.status(401).json({ msg: 'Senha incorreta!' });
        }

        const result = conexaoSequelize.query('call excluir_cliente(?)', {
            replacements: [usuario.ds_emailC],
            raw: true 
        }) 

        res.clearCookie('cookie_usuario');
        res.status(200).json({msg: result});
    }
};