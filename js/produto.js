
//  ========================================= 
// LÓGICA FOTOS E VÍDEO (O MOTOR QUE CONTROLA O CARROSSEL DE FOTOS E VÍDEO DO PRODUTO)
// ========================================= //
   
   // Função que cuida das FOTOS
    function showImage(src, element) {
        document.getElementById('main-product-video').style.display = 'none';
        document.getElementById('main-product-video').pause();
        
        document.getElementById('main-product-image').style.display = 'block';
        document.getElementById('main-product-image').src = src;
        
        updateActiveThumb(element);
    }

    // Função que cuida do VÍDEO
    function showVideo(element) {
        document.getElementById('main-product-image').style.display = 'none';
        
        document.getElementById('main-product-video').style.display = 'block';
        document.getElementById('main-product-video').play();
        
        updateActiveThumb(element);
    }

    // Função que rola o carrossel e troca a borda
    function updateActiveThumb(clickedElement) {
        let thumbs = document.querySelectorAll('.thumb');
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        clickedElement.classList.add('active');
        clickedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    // --- A LÓGICA MESTRA DAS SETAS E CLIQUES ---
    function triggerMedia(thumbElement) {
        // Checa se quem foi clicado tem a classe do vídeo
        if (thumbElement.classList.contains('video-thumb')) {
            showVideo(thumbElement);
        } else {
            // Se for imagem normal, pega a foto e mostra
            let src = thumbElement.src || thumbElement.querySelector('img').src;
            showImage(src, thumbElement);
        }
    }

    // Ação da Seta ❮
    function prevMedia() {
        let current = document.querySelector('.thumb.active');
        let prev = current.previousElementSibling;
        
        if (!prev) {
            let allThumbs = document.querySelectorAll('.thumb');
            prev = allThumbs[allThumbs.length - 1]; // Vai pra última
        }
        triggerMedia(prev);
    }

    // Ação da Seta ❯
    function nextMedia() {
        let current = document.querySelector('.thumb.active');
        let next = current.nextElementSibling;
        
        if (!next) {
            next = document.querySelector('.thumb'); // Volta pra primeira
        }
        triggerMedia(next);
    }

    // --- O BLINDADOR DE HTML ---
    // Isso conserta os cliques quebrados do HTML automaticamente ao carregar a página
    document.addEventListener("DOMContentLoaded", function() {
        let thumbs = document.querySelectorAll('.thumb');
        thumbs.forEach(thumb => {
            thumb.removeAttribute('onclick'); // Limpa os erros do HTML
            thumb.addEventListener('click', function() {
                triggerMedia(this); // Aciona o clique do jeito certo
            });
        });
    });



//  ========================================= 
// LÓGICA DE ADICIONAR AO CARRINHO (O MÁGICO QUE PEGA AS INFORMAÇÕES DO PRODUTO E MANDA PARA O CARRINHO FUNCIONAR)
// ========================================= //
    document.addEventListener("DOMContentLoaded", function() {
        const parametros = new URLSearchParams(window.location.search);
        const idProduto = parametros.get('id');

        if (idProduto && typeof bancoDeProdutos !== 'undefined' && bancoDeProdutos[idProduto]) {
            const produto = bancoDeProdutos[idProduto];

            // 1. TROCA TEXTOS SIMPLES
            document.querySelector('.product-name').innerText = produto.nome;
            document.querySelector('.product-subtitle').innerText = produto.subtitulo;
            document.querySelector('.current-price').innerText = produto.precoAtual;
            document.querySelector('.installments').innerText = produto.parcelas;

            // Lógica do Preço Antigo
            const oldPriceEl = document.querySelector('.old-price');
            const discountEl = document.querySelector('.discount-badge');
            
            if (produto.precoAntigo) {
                oldPriceEl.innerText = produto.precoAntigo;
                discountEl.innerText = produto.desconto;
                oldPriceEl.style.display = 'inline-block';
                discountEl.style.display = 'inline-block';
            } else {
                oldPriceEl.style.display = 'none';
                discountEl.style.display = 'none';
            }

            // 2. TROCA OS TEXTOS LONGOS
            document.querySelector('.product-storytelling').innerHTML = produto.historia;
            
            const accordions = document.querySelectorAll('.accordion-content');
            if(accordions[0]) accordions[0].innerHTML = produto.beneficios;
            if(accordions[1]) accordions[1].innerHTML = produto.ritual;

            // 3. A MÁGICA DAS IMAGENS
            const mainImage = document.getElementById('main-product-image');
            if (produto.imagens && produto.imagens.length > 0) {
                mainImage.src = produto.imagens[0];
            }

            const thumbContainer = document.getElementById('thumbnail-container');
            thumbContainer.innerHTML = '';

            produto.imagens.forEach((imgSrc, index) => {
                const imgEl = document.createElement('img');
                imgEl.src = imgSrc;
                imgEl.className = index === 0 ? 'thumb active' : 'thumb';
                imgEl.setAttribute('data-type', 'image');
                imgEl.setAttribute('onclick', 'showMedia(this)');
                thumbContainer.appendChild(imgEl);
            });

            if (produto.video) {
                const vidThumb = document.createElement('div');
                vidThumb.className = 'thumb video-thumb';
                vidThumb.setAttribute('data-type', 'video');
                vidThumb.setAttribute('onclick', 'showMedia(this)');
                vidThumb.innerHTML = `<img src="${produto.capaVideo || 'assets/img/capa-video.png'}" style="width: 100%; height: 100%; object-fit: cover;"><div class="play-icon">▶</div>`;
                thumbContainer.appendChild(vidThumb);

                const videoSource = document.querySelector('#main-product-video source');
                const videoPlayer = document.getElementById('main-product-video');
                if(videoSource && videoPlayer) {
                    videoSource.src = produto.video;
                    videoPlayer.load();
                }
            }

            // --- 4. SELETOR DE QUANTIDADE (+ e -) ---
            const btnMinus = document.querySelector('.qty-btn.minus');
            const btnPlus = document.querySelector('.qty-btn.plus');
            const qtyInput = document.querySelector('.qty-input');

            if (btnMinus && btnPlus && qtyInput) {
                btnMinus.onclick = function() {
                    let currentQty = parseInt(qtyInput.value) || 1;
                    if (currentQty > 1) {
                        qtyInput.value = currentQty - 1;
                    }
                };

                btnPlus.onclick = function() {
                    let currentQty = parseInt(qtyInput.value) || 1;
                    qtyInput.value = currentQty + 1;
                };
            }

            // --- 5. A OPÇÃO NUCLEAR (Adeus Fantasmas 👻) ---
            const btnOriginal = document.querySelector('.add-to-cart-main-btn');

            if (btnOriginal && qtyInput) {
                // Clonamos o botão e substituímos o antigo. Isso apaga TODOS os cliques velhos!
                const btnComprar = btnOriginal.cloneNode(true);
                btnOriginal.parentNode.replaceChild(btnComprar, btnOriginal);

                // Agora só a lógica nova manda aqui
                btnComprar.onclick = function(e) {
                    e.preventDefault(); // Previne qualquer recarregamento louco
                    
                    const quantidadeDesejada = parseInt(qtyInput.value) || 1;
                    
                    // Roda o loop certinho
                    for (let i = 0; i < quantidadeDesejada; i++) {
                        window.addItemToCart(produto.nome, produto.precoAtual, produto.imagens[0]);
                    }

                    // Volta para 1 depois que o cara adiciona
                    qtyInput.value = 1;
                };
            }
        }
    });



//  ========================================= 
// LÓGICA TRAVA DE ESTOQUE (O GUARDA DE TRÂNSITO QUE SEGURA O BOTÃO QUANDO O PRODUTO ACABAR)
// ========================================= //
    // --- 🔒 SCRIPT DE TRAVA DE ESTOQUE (CORRIGIDO) ---
    document.addEventListener("DOMContentLoaded", function() {
        const parametros = new URLSearchParams(window.location.search);
        const idProduto = parametros.get('id');

        if (idProduto && typeof bancoDeProdutos !== 'undefined' && bancoDeProdutos[idProduto]) {
            const produto = bancoDeProdutos[idProduto];

            // A mágica acontece só se o estoque for 0
            if (produto.estoque === 0) {
                
                // Damos um fôlego de 50 milissegundos para o Script 2 montar a página primeiro
                setTimeout(() => {
                    // 1. Trava o Botão de Comprar exato do seu HTML
                    const btnComprar = document.querySelector('.add-to-cart-main-btn');
                    
                    if (btnComprar) {
                        btnComprar.innerText = "Esgotado";
                        btnComprar.disabled = true;
                        btnComprar.style.backgroundColor = "#cccccc"; 
                        btnComprar.style.borderColor = "#cccccc"; 
                        btnComprar.style.color = "#ffffff";
                        btnComprar.style.cursor = "not-allowed";
                        btnComprar.style.pointerEvents = "none"; // Proteção extra contra cliques
                    }

                    // 2. Trava os botões de quantidade (+ e -)
                    const qtyBtns = document.querySelectorAll('.qty-btn');
                    qtyBtns.forEach(btn => {
                        btn.disabled = true;
                        btn.style.opacity = "0.4";
                        btn.style.cursor = "not-allowed";
                    });

                    // 3. Trava o campinho do número
                    const qtyInput = document.querySelector('.qty-input');
                    if (qtyInput) {
                        qtyInput.disabled = true;
                        qtyInput.style.opacity = "0.4";
                    }
                }, 50); 
            }
        }
    });
    




//  ========================================= 
// LÓGICA CARROSSEL RELACIONADO (O MOTOR QUE FAZ AS SETAS FUNCIONAREM E O CARROSSEL ROLAR SUAVEMENTE)
// ========================================= //
     // --- LÓGICA BLINDADA DO CARROSSEL RELACIONADO ---
    document.addEventListener("DOMContentLoaded", function() {
        // Encontra a caixa que segura os produtos e os botões
        const sliderContainer = document.querySelector('.featured-products .product-slider');
        const btnPrev = document.querySelector('.featured-products .prev');
        const btnNext = document.querySelector('.featured-products .next');

        if (sliderContainer && btnPrev && btnNext) {
            
            // OPÇÃO NUCLEAR: Força o CSS a aceitar a rolagem via JavaScript
            sliderContainer.style.overflowX = 'auto';
            sliderContainer.style.scrollBehavior = 'smooth';
            sliderContainer.style.scrollbarWidth = 'none'; // Esconde a barrinha feia no Firefox
            sliderContainer.style.msOverflowStyle = 'none'; // Esconde no Edge
            
            // Esconde a barrinha no Chrome/Safari via injeção de estilo
            const style = document.createElement('style');
            style.innerHTML = '.featured-products .product-slider::-webkit-scrollbar { display: none; }';
            document.head.appendChild(style);

            // Botão Direita
            btnNext.addEventListener('click', function() {
                const card = sliderContainer.querySelector('.product-card');
                if (card) {
                    // Pega o tamanho do cartão e empurra para o lado
                    sliderContainer.scrollLeft += (card.offsetWidth + 20); 
                }
            });

            // Botão Esquerda
            btnPrev.addEventListener('click', function() {
                const card = sliderContainer.querySelector('.product-card');
                if (card) {
                    sliderContainer.scrollLeft -= (card.offsetWidth + 20);
                }
            });
        }
    });



//  ========================================= 
// LÓGICA MESTRA DE TROCA DE PRODUTO (O GRANDE CÉREBRO QUE CONTROLA TUDO)
// ========================================= //

    document.addEventListener("DOMContentLoaded", function() {
        const parametros = new URLSearchParams(window.location.search);
        const idProduto = parametros.get('id');

        if (idProduto && typeof bancoDeProdutos !== 'undefined' && bancoDeProdutos[idProduto]) {
            const produto = bancoDeProdutos[idProduto];

            // 1. TROCA TEXTOS SIMPLES
            document.querySelector('.product-name').innerText = produto.nome;
            document.querySelector('.product-subtitle').innerText = produto.subtitulo;
            document.querySelector('.current-price').innerText = produto.precoAtual;
            document.querySelector('.installments').innerText = produto.parcelas;

            // Lógica do Preço Antigo (Esconde se não tiver desconto)
            const oldPriceEl = document.querySelector('.old-price');
            const discountEl = document.querySelector('.discount-badge');
            
            if (produto.precoAntigo) {
                oldPriceEl.innerText = produto.precoAntigo;
                discountEl.innerText = produto.desconto;
                oldPriceEl.style.display = 'inline-block';
                discountEl.style.display = 'inline-block';
            } else {
                oldPriceEl.style.display = 'none';
                discountEl.style.display = 'none';
            }

            // 2. TROCA OS TEXTOS LONGOS (História e Acordeões)
            document.querySelector('.product-storytelling').innerHTML = produto.historia;
            
            const accordions = document.querySelectorAll('.accordion-content');
            if(accordions[0]) accordions[0].innerHTML = produto.beneficios;
            if(accordions[1]) accordions[1].innerHTML = produto.ritual;

            // 3. A MÁGICA DAS IMAGENS (Consertando as repetições)
            const mainImage = document.getElementById('main-product-image');
            if (produto.imagens && produto.imagens.length > 0) {
                mainImage.src = produto.imagens[0]; // Primeira foto vai pro quadro principal
            }

            const thumbContainer = document.getElementById('thumbnail-container');
            thumbContainer.innerHTML = ''; // ISSO AQUI DELETA AQUELAS 8 FOTOS DO SEU HTML!

            // Cria apenas as fotos que existem no banco de dados
            produto.imagens.forEach((imgSrc, index) => {
                const imgEl = document.createElement('img');
                imgEl.src = imgSrc;
                imgEl.className = index === 0 ? 'thumb active' : 'thumb';
                imgEl.setAttribute('data-type', 'image');
                imgEl.setAttribute('onclick', 'showMedia(this)');
                thumbContainer.appendChild(imgEl);
            });

            // Se tiver vídeo, adiciona o botão do vídeo no final
            if (produto.video) {
                const vidThumb = document.createElement('div');
                vidThumb.className = 'thumb video-thumb';
                vidThumb.setAttribute('data-type', 'video');
                vidThumb.setAttribute('onclick', 'showMedia(this)');
                vidThumb.innerHTML = `<img src="${produto.capaVideo || 'assets/img/capa-video.png'}" style="width: 100%; height: 100%; object-fit: cover;"><div class="play-icon">▶</div>`;
                thumbContainer.appendChild(vidThumb);

                // Carrega o arquivo do vídeo no player principal
                const videoSource = document.querySelector('#main-product-video source');
                const videoPlayer = document.getElementById('main-product-video');
                if(videoSource && videoPlayer) {
                    videoSource.src = produto.video;
                    videoPlayer.load();
                }
            }
        }
    });