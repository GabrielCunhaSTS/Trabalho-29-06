

(async function() {
    document.getElementById('form-atualizar').addEventListener('submit', async (event) => { 
    event.preventDefault();

        const nome = document.getElementById('nome').value;
        const sobreNome = document.getElementById('sobreNome').value;
        const senha = document.getElementById('senha').value;

        const dados = {
            nomeDigit: nome,
            senhaDigit: senha,
            sobreNDigit: sobreNome
        }

        function limparCampo() {
            document.getElementById('nome').value = '';
            document.getElementById('senha').value = '';
        }

        try {
            const response = await fetch('/atualizarNome', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
            });
            
            if (response.ok) {
                location.reload();
            }
            else {
                if (response.status == 401 ) {
                    alert('Senha incorreta')
                    limparCampo()
                }
            }
        }

        catch (error) {
            console.error('Erro ao carregar perfil:', error);
            res.status(500).send('Erro ao carregar da sacola');
        }
        
    });
})();

(async function() {
    document.getElementById('form-deletar').addEventListener('submit', async (event) => { 
        event.preventDefault();

        const senha = document.getElementById('senhaDel').value;

        try {
            const dados = {
                senha: senha
            };

            const response = await fetch('/DeletarConta', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados) // Converte o objeto 'dados' para JSON
            });
            
            if (response.ok) {
                alert('Conta excluída com êxito');
                window.location.href = '/'; // Redireciona para a página inicial após exclusão
            } else {
                if (response.status === 401) {
                    alert('Senha incorreta');
                    limparCampo();
                    location.reload();
                }
            }
        } catch (error) {
            console.error('Erro ao excluir conta:', error);
            alert('Erro ao excluir conta. Por favor, tente novamente mais tarde.');
        }
    });

    document.getElementById('btnSair').addEventListener('click', async () => {
        try {
            // Faz uma requisição ao servidor para realizar o logout
            const response = await fetch('/logout', {
                method: 'POST'
            });

            if (response.ok) {
                // Redireciona o usuário para a página inicial após o logout
                window.location.href = "/";
            } else {
                // Se ocorrer um erro, exibe um alerta
                alert('Erro ao fazer logout. Tente novamente mais tarde.');
            }
        } catch (error) {
            console.error('Erro ao fazer logout: ', error);
            alert('Ocorreu um erro ao tentar fazer logout. Tente novamente mais tarde.');
        }
    });
})();

const editarNome = document.getElementById('editarNome');
const ModalEditNome = document.getElementById('ModaEditNome');

editarNome.onclick = function () {
    ModalEditNome.show();

    const FecharModal = document.getElementById('FecharModal')

    FecharModal.onclick = function () {
        ModalEditNome.close();
    }
}

const btnExcluirConta = document.getElementById('btnExcluirConta');
const ModalExcluirConta = document.getElementById('ModalExcluirConta');

btnExcluirConta.onclick = function () {
    ModalExcluirConta.show();

    const FecharModal = document.getElementById('FecharModal2')

    FecharModal.onclick = function () {
        ModalExcluirConta.close();
    }
};