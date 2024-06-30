document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    
    document.querySelectorAll('.produto').forEach(produto => {
        const id = produto.id.split('-')[1]; // Obtém o ID do produto
        console.log(`Processing product with id: ${id}`);

        const diminuirBtn = produto.querySelector(`#diminuir-${id}`);
        const aumentarBtn = produto.querySelector(`#aumentar-${id}`);
        const quantidadeElem = produto.querySelector(`#quantidade-${id}`);
        const excluirBtn = produto.querySelector(`#Excluir-${id}`);
        const removerBtn = produto.querySelector(`#apagar-${id}`);
        const fecharModalExcluir = produto.querySelector('.FecharModalExcluir');
        const modalExcluir = produto.querySelector('.ModalExcluir');

        console.log({diminuirBtn, aumentarBtn, quantidadeElem, excluirBtn, removerBtn, modalExcluir});

        if (diminuirBtn && aumentarBtn && quantidadeElem && excluirBtn && removerBtn) {
            diminuirBtn.addEventListener('click', () => {
                let quantidade = parseInt(quantidadeElem.textContent);
                if (quantidade > 1) {
                    quantidade--;
                    updateQuantidade(id, quantidade);
                }
            });

            aumentarBtn.addEventListener('click', () => {
                let quantidade = parseInt(quantidadeElem.textContent);
                quantidade++;
                updateQuantidade(id, quantidade);
            });

            excluirBtn.addEventListener('click', () => {
                modalExcluir.showModal();
            });

            fecharModalExcluir.addEventListener('click', () => {
                modalExcluir.close();
            });

            removerBtn.addEventListener('click', () => {
                removeProduto(id);
                modalExcluir.close();
            });
        } else {
            console.error('Elemento não encontrado:', {
                diminuirBtn,
                aumentarBtn,
                quantidadeElem,
                excluirBtn,
                removerBtn,
                produto
            });
        }
    });

    function updateQuantidade(id, quantidade) {
        console.log(`Updating quantity for id: ${id} to ${quantidade}`);
        fetch('/update-quantidade', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, quantidade })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            location.reload(); // Recarrega a página para refletir as alterações
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }

    function removeProduto(id) {
        console.log(`Removing product with id: ${id}`);
        fetch('/remove-produto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        .then(response => {
            if (response.ok) {
                exibirNotificacao('Produto removido da sacola');
                return response.text();
            } else {
                throw new Error('Erro ao remover item da sacola');
            }
        })
        .then(data => {
            console.log(data);
            location.reload(); // Recarrega a página para refletir as alterações
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }

    function exibirNotificacao(mensagem) {
        console.log(`Displaying notification: ${mensagem}`);
        const notificacao = document.getElementById('notificacao');
        notificacao.innerHTML = `<img src="/cardapio/assets/img/ItemAdd.png"><p>${mensagem}</p>`;
        notificacao.style.display = 'flex';
        
        notificacao.style.animation = '';
        setTimeout(() => {
            notificacao.style.animation = 'fecharNtf 0.3s linear';
            notificacao.addEventListener('animationend', () => {
                notificacao.style.display = 'none';
            }, { once: true });
        }, 2000);
    }
});
