// --- 1. Lógica do Carrossel de Produtos (Com Trava de Segurança) ---
const slider = document.querySelector('.product-slider-wrapper');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

// A MÁGICA ESTÁ AQUI: Só adiciona o clique SE os botões existirem na página!
if (slider && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        // scrollBy com 'smooth' faz o deslize ser elegante
        slider.scrollBy({ left: 350, behavior: 'smooth' }); 
    });

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -350, behavior: 'smooth' });
    });
}

// --- 2. Lógica do Carrossel de Ingredientes (Sem repetição) ---
function moveIngredients(direction) {
    const sliderIng = document.getElementById('ingredientsSlider');
    if (sliderIng) {
        const scrollAmount = sliderIng.offsetWidth; // Pega a largura visível
        sliderIng.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }
}


const addButtons = document.querySelectorAll('.add-to-cart');

addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Ele vai buscar o nome e preço que estão "perto" do botão no HTML
        const productCard = e.target.closest('article') || e.target.closest('.product-item');
        const name = productCard.querySelector('h3').innerText;
        const price = productCard.querySelector('.product-price').innerText;
        const image = productCard.querySelector('img').src;

        // 👇 A TRAVA DE SEGURANÇA ENTRA AQUI 👇
        // Se a caixa tiver a classe de esgotado, ele bloqueia!
        if (productCard.classList.contains('out-of-stock')) {
            alert("Ops! Este produto está esgotado no momento.");
            return; // Esse 'return' é o segurança da balada: não deixa o código passar daqui!
        }
        // 👆 FIM DA TRAVA 👆

        // Envia os dados para o cart.js
        addItemToCart(name, price, image);

        // Sua animação do botão verde (mantenha a que você já tem)
        const originalText = button.innerText;
        button.innerText = "Adicionado ✓";
        button.classList.add('added');
        setTimeout(() => {
            button.innerText = originalText;
            button.classList.remove('added');
        }, 1500);
    });
});



// Código para abrir o modal de busca
document.addEventListener("DOMContentLoaded", () => {
    // 1. Pegando os elementos do HTML
    const searchTriggers = document.querySelectorAll('.search-trigger');
    const overlay = document.getElementById('search-overlay');
    const closeSearchBtn = document.getElementById('close-search');
    const searchInput = document.getElementById('main-search-input');
    
    const historySection = document.getElementById('search-history-section');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');
    
    const resultsSection = document.getElementById('search-results-section');
    const resultsGrid = document.getElementById('search-results-grid');

    // Variável para a "memória" do Bottom Nav e função de troca
    let menuAtivoOriginal = document.querySelector('.bottom-nav .nav-item.active');

    function gerenciarDestaqueNav(elementoClicado) {
        if (!elementoClicado) return;
        document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
            item.classList.remove('active');
        });
        elementoClicado.classList.add('active');
    }

    // 2. Abrir e Fechar o Pop-up (BLINDADO)
    if (searchTriggers.length > 0 && overlay && closeSearchBtn && searchInput) {
        
        searchTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault(); 
                
                // Grava qual era a página antes de abrir a busca
                if (!trigger.classList.contains('active')) {
                    menuAtivoOriginal = document.querySelector('.bottom-nav .nav-item.active');
                }

                overlay.classList.add('active');
                searchInput.focus(); 
                renderHistory(); 

                // Se clicou na lupa do celular, acende ela
                if (trigger.classList.contains('nav-item')) {
                    gerenciarDestaqueNav(trigger);
                }
            });
        });

        closeSearchBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            searchInput.value = ''; 
            resultsSection.style.display = 'none';

            // QUANDO FECHA: Devolve o destaque...
            if (menuAtivoOriginal) {
                gerenciarDestaqueNav(menuAtivoOriginal);
            } else {
                // ✅ A SUA LÓGICA: Se estava no "Sobre", volta a acender o "Início" (Home)!
                const btnInicio = document.querySelector('.bottom-nav .nav-item[href="index.html"]');
                if (btnInicio) {
                    gerenciarDestaqueNav(btnInicio);
                }
            }
        });

    } else {
        console.log("Aviso: HTML da busca não encontrado nesta página.");
    }

    // 3. Sistema de Histórico (Salva no navegador)
    function getHistory() {
        return JSON.parse(localStorage.getItem('anaua_historico')) || [];
    }

    function saveHistory(termo) {
        if (!termo) return;
        let historico = getHistory();
        historico = historico.filter(t => t !== termo); // Tira duplicado
        historico.unshift(termo); // Coloca o novo no começo
        if (historico.length > 5) historico.pop(); // Guarda só as últimas 5 buscas
        localStorage.setItem('anaua_historico', JSON.stringify(historico));
    }

    function renderHistory() {
        const historico = getHistory();
        if (historico.length === 0) {
            historySection.style.display = 'none';
            return;
        }
        
        historySection.style.display = 'block';
        historyList.innerHTML = '';
        
        historico.forEach(termo => {
            const tag = document.createElement('span');
            tag.className = 'history-tag';
            tag.innerText = termo;
            tag.addEventListener('click', () => {
                // Se clicar no histórico, pesquisa aquela palavra de novo
                searchInput.value = termo;
                realizarBusca(termo);
            });
            historyList.appendChild(tag);
        });
    }

    clearHistoryBtn.addEventListener('click', () => {
        localStorage.removeItem('anaua_historico');
        renderHistory();
    });

    // 4. Busca em Tempo Real (A Mágica!)
    searchInput.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase().trim();
        realizarBusca(termo);
    });

    function realizarBusca(termo) {
        // Se apagou tudo, volta a mostrar o histórico
        if (termo.length === 0) {
            resultsSection.style.display = 'none';
            renderHistory();
            return;
        }

        historySection.style.display = 'none';
        resultsSection.style.display = 'block';
        resultsGrid.innerHTML = '';

        // Procura no bancoDeProdutos
        const chavesProdutos = Object.keys(bancoDeProdutos);
        const encontrados = chavesProdutos.filter(chave => {
            const produto = bancoDeProdutos[chave];
            return produto.nome.toLowerCase().includes(termo);
        });

        // Se não achou nada
        if (encontrados.length === 0) {
            resultsGrid.innerHTML = '<p style="color: #666; font-size: 14px; grid-column: 1 / -1;">Nenhum produto encontrado para essa busca.</p>';
            return;
        }

        // Se achou, cria as miniaturas na tela
        encontrados.forEach(chave => {
            const produto = bancoDeProdutos[chave];
            const item = document.createElement('div');
            item.className = 'search-item-mini';
            
            // Database Mapping fixed last turn
            const fotoProduto = produto.imagens[0];
            const precoProduto = produto.precoAtual;
            
            // O visual simples e elegante com o fundo verde claro
            // ADICIONEI "background: transparent !important;" na tag <img> para matar o fundo branco!
            item.innerHTML = `
                <div style="background-color: #C8D5BA; padding: 15px; border-radius: 4px; margin-bottom: 10px; display: flex; justify-content: center; align-items: center; aspect-ratio: 1;">
                    <img src="${fotoProduto}" alt="${produto.nome}" style="max-width: 100%; max-height: 100%; object-fit: contain; background: transparent !important;">
                </div>
                <h5 style="margin: 0 0 5px 0; font-size: 13px; color: #55573D; font-weight: normal; line-height: 1.2;">${produto.nome}</h5>
                <span style="font-size: 12px; color: #8C4B3E; font-weight: 600;">${precoProduto}</span>
            `;
            
            // Quando clica na miniatura, salva no histórico e vai pra página do produto!
            item.addEventListener('click', () => {
                saveHistory(termo);
                window.location.href = `produto.html?id=${chave}`;
            });
            
            resultsGrid.appendChild(item);
        });
    }

    // Salvar no histórico também se o cliente apertar a tecla "Enter"
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveHistory(searchInput.value.trim());
        }
    });
});
