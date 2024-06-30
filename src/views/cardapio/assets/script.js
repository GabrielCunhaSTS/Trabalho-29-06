document.addEventListener("DOMContentLoaded", () => {

    
    const produtosDiv = document.getElementById('produtos');
    const modalProduto = document.getElementById('modalProduto');
    const modalNome = document.getElementById('modalNome');
    const modalDescricao = document.getElementById('modalDescricao');
    const modalPreco = document.getElementById('modalPreco');
    const modalCategoria = document.getElementById('modalCategoria');
    const fecharModal = document.getElementById('fecharModal');
    const adicionarSacola = document.getElementById('adicionarSacola');
    let produtoAtual = null;

    // Adicionar sacola
adicionarSacola.addEventListener('click', () => {
    if (produtoAtual) {
        const quantidadeInput = document.getElementById('quantidade');
        const quantidade = parseInt(quantidadeInput.value);
        
        fetch('/sacola', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cd_produto: produtoAtual.cd_produto,
                quantidade
            })
        })
        .then(response => {
            if (response.ok) {
                quantidadeInput.value = 1;
                const notificacao = document.getElementById('notificacao');
        
                notificacao.style.display = 'flex';
        
                function addAnimation(notificacao) {
                    let dynamicStyles = null;
            
                    if (!dynamicStyles) {
                        dynamicStyles = document.createElement('style');
                        dynamicStyles.type = 'text/css';
                        document.head.appendChild(dynamicStyles);
                    }
            
                    dynamicStyles.sheet.insertRule(notificacao, dynamicStyles.length);
                }
            
                addAnimation(`
                    @keyframes fecharNtf { 
                        0% {right: 0vw;}
                        100% {right: -90vw;}
                    }
                `);
        
                // Fechar a notificação automaticamente após 3 segundos
                setTimeout(() => {
                    notificacao.style.animation = 'fecharNtf 0.3s linear';
                    notificacao.addEventListener('animationend', () => {
                        notificacao.style.display = 'none';
                    }, { once: true });
                }, 2000);
        
                // Limpar a animação e o evento de fechamento ao abrir a notificação novamente
                notificacao.style.animation = '';
                notificacao.removeEventListener('animationend', () => {
                    notificacao.style.display = 'none';
                });

                return response.text();
            } else {
                throw new Error('Erro ao adicionar item à sacola');
            }
        })
        .then(data => {
            console.log(data);
            modalProduto.close();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }
});


    function abrirModal(produto) {
        produtoAtual = produto;
        modalNome.textContent = produto.nm_produto;
        modalDescricao.textContent = produto.ds_produto;
        modalPreco.textContent = `R$ ${produto.vl_produto.toFixed(2)}`;
        modalProduto.showModal();
    }

    fetch('/produtos')
    .then(response => response.json())
    .then(data => {
        produtosDiv.innerHTML = ''; // Limpar o contêiner antes de adicionar novos produtos
        data.forEach(produto => {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto');
            produtoDiv.innerHTML = `
                <img src='/cardapio/assets/img/imgProdutos.svg' class='imgProduto'> 
                <div class='details'>
                    <h2>${produto.nm_produto} <img src='/cardapio/assets/img/coracao.svg'></h2>
                    <p class='dsProduto'>${produto.ds_produto}</p>
                    <p class='valor'><strong>Valor:</strong> R$ ${produto.vl_produto.toFixed(2)}</p>
                </div>
            `;
            produtoDiv.addEventListener('click', () => {
                abrirModal(produto);
            });
            produtosDiv.appendChild(produtoDiv);
        });
    });

    const quantidadeInput = document.getElementById('quantidade');
    const diminuirQuantidadeBtn = document.getElementById('diminuirQuantidade');
    const aumentarQuantidadeBtn = document.getElementById('aumentarQuantidade');

    diminuirQuantidadeBtn.addEventListener('click', () => {
        if (quantidadeInput.value > 1) {
            quantidadeInput.value--;
        }
    });

    aumentarQuantidadeBtn.addEventListener('click', () => {
        quantidadeInput.value++;
    });

    fecharModal.addEventListener('click', () => {
        quantidadeInput.value = 1;
        modalProduto.close();
    });
});
