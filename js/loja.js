const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Estilo visual: remove 'active' de todos e coloca no clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            productItems.forEach(item => {
                // 2. Pega todas as categorias do produto (ex: "rosto corpo")
                const itemCategories = item.getAttribute('data-category');

                // 3. A Lógica Mágica:
                // Se for 'all' OU se a lista de categorias do produto incluir o filtro clicado
                if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });


// ✅ NOME ALTERADO PARA NÃO DAR CONFLITO COM O MAIN.JS
const botoesVitrineLoja = document.querySelectorAll('.add-to-cart');

botoesVitrineLoja.forEach(button => {
    button.addEventListener('click', (e) => {
        // 1. TRAVA DE SEGURANÇA (Para evitar o "V" duplo ou cliques múltiplos)
        if (button.innerText.includes("✓")) return;

        // 2. CAPTURA DOS DADOS
        const productCard = e.target.closest('article') || e.target.closest('.product-item');
        const name = productCard.querySelector('h3').innerText;
        const price = productCard.querySelector('.product-price').innerText;
        const image = productCard.querySelector('img').src;

        // 3. ENVIO PARA O CÉREBRO
        addItemToCart(name, price, image);

        // 4. FEEDBACK VISUAL
        const originalText = button.innerText;
        button.innerText = "Adicionado ✓";
        button.style.backgroundColor = "#4A6741"; 
        button.style.color = "white";
        
        setTimeout(() => {
            button.innerText = originalText;
            button.style.backgroundColor = ""; 
            button.style.color = "";
        }, 1500);
    });
});


// Função para alternar o estado de favorito //
function toggleFavorito(idProduto, btn) {
    // Busca a lista atual ou cria uma vazia
    let favoritos = JSON.parse(localStorage.getItem('anaua_favoritos')) || [];

    // Verifica se já está na lista
    const index = favoritos.indexOf(idProduto);

    if (index === -1) {
        // Não está nos favoritos: Adicionar
        favoritos.push(idProduto);
        btn.classList.add('active');
        // Opcional: Feedback visual
        console.log("Produto adicionado aos favoritos: " + idProduto);
    } else {
        // Já está nos favoritos: Remover
        favoritos.splice(index, 1);
        btn.classList.remove('active');
        console.log("Produto removido dos favoritos: " + idProduto);
    }

    // Salva a lista atualizada
    localStorage.setItem('anaua_favoritos', JSON.stringify(favoritos));
}


// ✅ APAGADAS AS FUNÇÕES DUPLICADAS AQUI!

// Altera a quantidade no input do card
function changeCardQty(btn, delta) {
    const input = btn.parentElement.querySelector('input');
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
}

// Adiciona ao carrinho respeitando a quantidade escolhida
function adicionarComQtd(btn, nome, preco, imagem) {
    const inputQtd = btn.parentElement.querySelector('input');
    const quantidade = parseInt(inputQtd.value);
    
    // Chama sua função addItemToCart o número de vezes da quantidade
    for (let i = 0; i < quantidade; i++) {
        window.addItemToCart(nome, preco, imagem);
    }
    
    // Opcional: Reseta o contador para 1 após adicionar
    inputQtd.value = 1;
}



/* --- AUTOMAÇÃO DE ESTRELAS (ANAUÁ) --- */

// 1. Quando a página carregar, a máquina começa a trabalhar
document.addEventListener("DOMContentLoaded", function() {
    initEstrelasDinamicas();
});

// 2. A função principal que busca os containers e desenha as estrelas
function initEstrelasDinamicas() {
    const containersDeEstrelas = document.querySelectorAll('.stars-container[data-nota]');

    containersDeEstrelas.forEach(container => {
        const notaRaw = container.getAttribute('data-nota');
        const nota = parseFloat(notaRaw);

        if (isNaN(nota)) return;

        const htmlDasEstrelas = gerarHtmlDeEstrelas(nota);
        container.innerHTML = htmlDasEstrelas;
    });
}

// 3. A função que decide se é Cheia, Meia ou Vazia e retorna o SVG
function gerarHtmlDeEstrelas(nota) {
    const svgCheio = '<svg class="star-svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z"/></svg>';
    const svgMeio = '<svg class="star-svg" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>';
    const svgVazio = '<svg class="star-svg empty" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>';

    let htmlAcumulado = '';

    for (let i = 1; i <= 5; i++) {
        if (nota >= i) {
            htmlAcumulado += svgCheio;
        } else if (nota >= i - 0.5) {
            htmlAcumulado += svgMeio;
        } else {
            htmlAcumulado += svgVazio;
        }
    }
    return htmlAcumulado;
}
         

// --- AUTOMAÇÃO DE ESTOQUE NA LOJA ---
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Pega todos os cards de produtos na tela
    const todosOsCards = document.querySelectorAll('.product-item');

    todosOsCards.forEach(card => {
        // 2. Tenta descobrir qual é o ID do produto lendo o link do título
        const tituloProduto = card.querySelector('.product-name');
        if (!tituloProduto) return;

        const linkDoClique = tituloProduto.getAttribute('onclick');
        if (!linkDoClique) return;

        // 3. Extrai o ID da URL (ex: "creme-corporal-castanha")
        const idEncontrado = linkDoClique.match(/id=([^']+)/);
        
        if (idEncontrado && idEncontrado[1]) {
            const produtoID = idEncontrado[1];

            // 4. Pergunta ao Banco de Dados: O estoque é zero?
            if (typeof bancoDeProdutos !== 'undefined' && bancoDeProdutos[produtoID] && bancoDeProdutos[produtoID].estoque === 0) {
                
                // 👉 A MÁGICA ACONTECE AQUI: Adiciona a classe do CSS automaticamente!
                card.classList.add('out-of-stock');

                // Cria e gruda o selo de "Esgotado"
                if (!card.querySelector('.out-of-stock-badge')) {
                    const selo = document.createElement('div');
                    selo.className = 'out-of-stock-badge';
                    selo.innerText = 'Esgotado';
                    card.insertBefore(selo, card.firstChild);
                }

                // Trava visualmente o botão de quantidade
                const qtySelector = card.querySelector('.qty-selector');
                if (qtySelector) {
                    qtySelector.style.opacity = '0.3';
                    qtySelector.style.pointerEvents = 'none'; 
                }

                // Trava visualmente o botão do carrinho e deixa cinza
                const btnComprar = card.querySelector('.btn-add-cart-loja');
                if (btnComprar) {
                    btnComprar.disabled = true;
                    btnComprar.style.cursor = 'not-allowed';
                    btnComprar.style.backgroundColor = '#cccccc';
                    btnComprar.style.color = 'white';
                    btnComprar.style.borderColor = '#cccccc';
                }
                card.parentElement.appendChild(card);
            }
        }
    });
});