(async function() {
    document.getElementById('form-cadastrar2').addEventListener('submit', async (event) => { 
        event.preventDefault();

        const modalTermos = document.getElementById('modalTermos2')
        const voltar = document.getElementById('voltar3')
        const btnContinuar = document.getElementById('btnTermo2')

        modalTermos.show();

        voltar.onclick = function () {
            modalTermos.close();
        }

        btnContinuar.onclick = async function () {
            const checkCond = document.getElementById('chkCond')
            const checkPriv = document.getElementById('chkPriv')

            if (checkCond.checked != false && checkPriv.checked != false) {
                
                const Senha = document.getElementById('senha').value;
                // Obtém o valor do campo de confirmação de senha
                const campoConfirmaSenha = document.getElementById('confirm-senha').value;
                
                // Verifica se as senhas são diferentes
                if (Senha !== campoConfirmaSenha) {
                    alert('As senhas estão diferentes!')

                    document.getElementById('senha').value = ''; // Limpa o campo de senha
                    document.getElementById('confirm-senha').value = '';
                    return;
                }

                const dadosForm = {
                    nmDigit: document.getElementById('nome').value, // Obtém o valor do campo de nome
                    sobnmDigit: document.getElementById('Sobnome').value,
                    emailDigit: document.getElementById('email').value, // Obtém o valor do campo de email
                    senhaDigit: Senha, // Usa a senha obtida anteriormente
                    nmrTelDigit: document.getElementById('nmrTel').value,// Obtém o valor do campo de número de telefone
                    cpfdigit: document.getElementById('nmrcpf').value
                };

                try {
                    // Envia os dados do formulário para o servidor
                    const response = await fetch('/cadastrarB', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(dadosForm) // Converte os dados do formulário para JSON e envia
                    });
        
                    // Função para limpar os campos do formulário após o envio bem-sucedido
                    function limparCampos() {
                        document.getElementById('nome').value = ''; // Limpa o campo de nome
                        document.getElementById('Sobnome').value = '';
                        document.getElementById('email').value = ''; // Limpa o campo de email
                        document.getElementById('nmrTel').value = ''; // Limpa o campo de número de telefone
                        document.getElementById('senha').value = ''; // Limpa o campo de senha
                        document.getElementById('confirm-senha').value = ''; // Limpa o campo de confirmação de senha
                        document.getElementById('nmrcpf').value = '';
                    }
        
                    if (response.ok) {
                        modalTermos.close();
                        const msgSucesso = document.querySelector("#msgSucesso");
                        const btnIrlogin= document.querySelector("#msgBtnConcluir");
        
                        msgSucesso.show(); // Exibe uma mensagem de erro
        
                        btnIrlogin.onclick = function () {
                            window.location.href = "/";
                        };
                    } else {
                        if (response.status === 409) {

                            alert('E-mail já cadastrado!')
                            modalTermos.close();
                            /*const msgErroEmail = document.querySelector("#msgErroEmail");
                            const btnVoltarEmail = document.querySelector("#btnVoltarEmail");
        
                            msgErroEmail.show(); // Exibe uma mensagem de erro
        
                            btnVoltarEmail.onclick = function () {
                                msgErroEmail.close(); // Fecha a mensagem de erro ao clicar no botão 'Voltar'
                            };*/
                        }
                        limparCampos();
                    }
                } catch (erro) {
                    console.error('Erro ao enviar dados do formulário: ', erro); // Registra qualquer erro no console
                    alert('Ocorreu um erro ao tentar criar a conta!'); // Exibe um alerta de erro
                    limparCampos(); // Limpa os campos do formulário
                }

            }

            else {
                alert('Os campos são obrigatórios')
            }
        }

    });
})();

document.addEventListener('DOMContentLoaded', function() {
    var nmr = document.getElementById('nmrTel');
    nmr.addEventListener('input', function() {
        var value = nmr.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        var formattedValue = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        nmr.value = formattedValue;
    });
});