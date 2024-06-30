(async function() {
    document.getElementById('form-login').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que o formulário seja enviado normalmente, o que recarregaria a página
        
        // Obtém o valor do campo de email
        const email = document.getElementById('email').value;
        // Obtém o valor do campo de senha
        const senha = document.getElementById('senha').value;

        // Cria um objeto com os dados do formulário
        const dadosForm = { emailDigit: email, senhaDigit: senha };

        try {
            // Envia os dados do formulário para o servidor
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosForm) // Converte os dados do formulário para JSON e envia
            });

            function limparCampo () {
                // Limpa os campos de email e senha
                document.getElementById('email').value = '';
                document.getElementById('senha').value = '';
            }

            if (response.ok) { // Se a resposta do servidor for bem-sucedida
                // Redireciona o usuário para a página inicial
                window.location.href = "/inicial";
            } else {
                if (response.status === 404) { // Se o usuário não for encontrado
                    const msgErroEmail = document.querySelector("#msgErroEmail");
                    const btnVoltarEmail = document.querySelector("#btnVoltarEmail");

                    msgErroEmail.show(); // Exibe uma mensagem de erro

                    btnVoltarEmail.onclick = function () {
                        msgErroEmail.close(); // Fecha a mensagem de erro ao clicar no botão 'Voltar'
                    };
                    limparCampo(); // Limpa os campos de email e senha
                }
                else if (response.status === 401) { // Se a senha estiver incorreta
                    const msgErroUsuario = document.querySelector("#msgErroSenha");
                    const btnVoltarUsuario = document.querySelector("#btnVoltarSenha");

                    msgErroUsuario.show(); // Exibe uma mensagem de erro

                    btnVoltarUsuario.onclick = function () {
                        msgErroUsuario.close(); // Fecha a mensagem de erro ao clicar no botão 'Voltar'
                    };

                    document.getElementById('senha').value = ''; // Limpa o campo de senha
                }
            }
        } catch (error) {
            console.error('Erro ao enviar dados de login: ', error); // Registra qualquer erro no console
            alert('Ocorreu um erro ao tentar fazer login!'); // Exibe uma mensagem de erro genérica
            limparCampo(); // Limpa os campos de email e senha
        }
    });
})();
