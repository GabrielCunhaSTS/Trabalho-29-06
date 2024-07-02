const bcrypt = require('bcrypt');
const { ModelCliente } = require('../models/cliente');
const { conexaoSequelize } = require('../../config/bdConnection');

module.exports = {
    CadastrarUsuario: async (req, resp) => {
        const {
            nmDigit,
            sobnmDigit,
            emailDigit,
            senhaDigit,
            nmrTelDigit
        } = req.body;

        try {
            const hashedSenha = await bcrypt.hash(senhaDigit, 10);

            const result = await conexaoSequelize.query('call adicionar_cliente(?, ?, ?, ?, ?)', {
                replacements: [nmDigit, sobnmDigit, emailDigit, hashedSenha, nmrTelDigit],
                raw: true // Obter resultados em formato simplificado
            });

            console.log(result);
            
            return resp.status(201).json({ msg: `Usuário ${nmDigit} criado com sucesso!` });
        } catch (error) {
            // Captura e exibe a mensagem de erro específica da trigger
            console.error('Erro ao cadastrar usuário:', error.message || error);
            
            // Verifica se o erro é uma instância de SequelizeDatabaseError para extrair a mensagem específica
            if (error.name === 'SequelizeDatabaseError') {
                return resp.status(400).json({ msg: error.message });
            }
            
            return resp.status(500).json({ msg: 'Erro no servidor ao tentar cadastrar usuário!' });
        }
    },

    // Função para realizar o login de um usuário existente
    LoginUsuario: async (req, resp) => {
        const { emailDigit, senhaDigit } = req.body;

        try {
            // Procura pelo usuário no banco de dados com o email fornecido
            const usuario = await ModelCliente.findOne({ where: { ds_emailC: emailDigit } });

            // Se o usuário não existir, retorna uma resposta de erro
            if (!usuario) {
                return resp.status(404).json({ msg: 'Usuário não encontrado!' });
            }

            // Verifica se a senha fornecida coincide com a senha armazenada no banco de dados
            const senhaCorreta = await bcrypt.compare(senhaDigit, usuario.ds_senhaC);

            // Se as senhas não coincidirem, retorna uma resposta de erro
            if (!senhaCorreta) {
                return resp.status(401).json({ msg: 'Senha incorreta!' });
            }

            const Hora = 3600000;
            const dtQuandoIraExpirar = new Date(Date.now() + Hora);

            resp.cookie('cookie_usuario', usuario.cd_cliente, {
                httpOnly: true,
                expires: dtQuandoIraExpirar
            });

            // Se tudo estiver correto, retorna uma resposta de sucesso
            console.log({ msg: 'Login bem-sucedido!' });
            return resp.status(200).json({ msg: 'Login bem-sucedido!', usuario });
        } catch (error) {
            console.error(error);
            // Retorna um erro 500 caso ocorra algum problema interno
            return resp.status(500).json({ msg: 'Erro no servidor ao tentar fazer login!' });
        }
    },

    // Função para realizar o logout de um usuário autenticado
    LogoutUsuario: async (req, resp) => {
        try {
            // Limpa as informações de autenticação do usuário
            resp.clearCookie('cookie_usuario');
            console.log({ msg: 'Logout bem sucedido.' });
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            resp.status(500).json({ msg: 'Erro ao fazer logout.' });
        }
    },

    // Middleware para verificar se o usuário não está autenticado
    verificarAutenticacao: async (req, resp, next) => {
        // Verifica se o cookie de autenticação está presente
        if (req.cookies.cookie_usuario) {
            // Se o usuário estiver autenticado, continua para a próxima rota
            next();
        } else {
            // Se não estiver autenticado, redireciona para a página de login
            return resp.redirect('/');
        }
    }
};
