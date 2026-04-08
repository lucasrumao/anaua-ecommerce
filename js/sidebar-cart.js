// 1. SELETORES
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartTrigger = document.querySelector('.cart-trigger');

// VARIÁVEIS GLOBAIS
window.valorFreteCalculado = 0; 
window.prazoFreteCalculado = "";

// 2. FUNÇÕES DE ABRIR E FECHAR
function openCart(e) {
    if(e) e.preventDefault();
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
        renderCartItems(); 
    }
}

function closeCart() {
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = ''; 
    }
}

if (cartTrigger) cartTrigger.addEventListener('click', openCart);
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

// --- 3. LÓGICA DO BOTÃO DE CALCULAR CEP ---
document.addEventListener('click', async function(e) {
    if(e.target && e.target.id === 'calc-cep-btn') {
        const cepInput = document.getElementById('cep-input').value;
        const resultMsg = document.getElementById('shipping-result');

        // --- VERIFICAÇÃO SE TEM PRODUTO "ATIVO" NO CARRINHO ---
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        // Se o array está vazio OU se todos os itens estão com quantidade 0
        const temProdutoAtivo = items.some(item => item.quantity > 0);

        if (items.length === 0 || !temProdutoAtivo) {
            alert("⚠️ Seu carrinho está vazio! Adicione pelo menos um produto antes de calcular o frete.");
            return; 
        }

        if (cepInput.length < 8) {
            alert("Digite um CEP válido.");
            return;
        }

        resultMsg.innerText = "Consultando... 📦";

        try {
            const response = await fetch('http://localhost:3000/calcular-frete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cepDestino: cepInput })
            });

            const dados = await response.json();
            const sedex = dados[1]; 
            const infoEndereco = dados[2];

            if (!sedex || sedex.Erro !== "0") {
                resultMsg.innerText = "Erro ao calcular. Tente outro CEP.";
                return;
            }

            window.valorFreteCalculado = parseFloat(sedex.Valor.replace(',', '.'));
            window.prazoFreteCalculado = sedex.PrazoEntrega;

            localStorage.setItem('anaua_cep', cepInput);
            localStorage.setItem('anaua_cidade', infoEndereco.cidade);
            localStorage.setItem('anaua_uf', infoEndereco.uf);
            localStorage.setItem('anaua_rua', infoEndereco.rua);

            renderCartItems();

        } catch (error) {
            console.error("Erro na requisição:", error);
            resultMsg.innerText = "Erro: Servidor offline. Ligue o Node!";
        }
    }
});

// 4. FUNÇÃO MÁGICA: Renderizar os itens e calcular valores
function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const subtotalDisplay = document.getElementById('cart-subtotal');
    const freteDisplay = document.getElementById('cart-shipping-value');
    const totalFinalDisplay = document.getElementById('cart-sidebar-total');
    const resultMsg = document.getElementById('shipping-result');
    const barraProgresso = document.getElementById('shipping-bar');
    const msgFrete = document.getElementById('free-shipping-msg');
    
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    if (items.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:20px; color:#888;">Seu carrinho está vazio.</p>';
        if(subtotalDisplay) subtotalDisplay.innerText = "R$ 0,00";
        if(freteDisplay) freteDisplay.innerText = "R$ 0,00";
        if(totalFinalDisplay) totalFinalDisplay.innerText = "R$ 0,00";
        if(barraProgresso) barraProgresso.style.width = "0%";
        return;
    }

   let html = "";
    let subtotal = 0;
    let temAlgumEsgotado = false; // ADICIONADO: Variável para avisar o botão verde no final

    items.forEach((item, index) => {
        
        // --- 1. A NOSSA INJEÇÃO: CHECA O ESTOQUE PRIMEIRO ---
        let isEsgotado = false;
        if (typeof bancoDeProdutos !== 'undefined') {
            for (let key in bancoDeProdutos) {
                if (bancoDeProdutos[key].nome === item.name && bancoDeProdutos[key].estoque === 0) {
                    isEsgotado = true;
                    temAlgumEsgotado = true;
                    break;
                }
            }
        }

        // --- 2. SE ESTIVER ESGOTADO (Card cinza, sem botões de + e -) ---
        if (isEsgotado) {
            html += `
                <div class="cart-item-sidebar" style="display:flex; align-items:center; gap:10px; padding:15px; border-bottom:1px solid #eee; background:#f9f9f9; opacity: 0.7;">
                    <img src="${item.image}" style="width:55px; height:55px; object-fit:contain; border-radius:5px; filter: grayscale(100%);">
                    <div style="flex:1;">
                        <h4 style="font-size:14px; margin:0; color:#333; text-decoration: line-through;">${item.name}</h4>
                        <p style="font-size:12px; color:#d9534f; margin:5px 0; font-weight:bold;">Esgotado (Remova para continuar)</p>
                    </div>
                    <button onclick="removeItem(${index})" style="background:none; border:none; color:#d9534f; cursor:pointer; font-size:20px; padding:5px;">&times;</button>
                </div>`;
        } 
        
        // --- 3. SE TEM ESTOQUE (Este é EXATAMENTE o seu código original) ---
        else {
            const priceValue = parseFloat(item.price.replace('R$', '').replace('.', '').replace(',', '.'));
            subtotal += priceValue * item.quantity;
            const opacity = item.quantity === 0 ? '0.5' : '1';

            html += `
                <div class="cart-item-sidebar" style="display:flex; align-items:center; gap:10px; padding:15px; border-bottom:1px solid #eee; opacity: ${opacity}; transition: opacity 0.3s;">
                    <img src="${item.image}" style="width:55px; height:55px; object-fit:contain; border-radius:5px;">
                    <div style="flex:1;">
                        <h4 style="font-size:14px; margin:0; color:#333;">${item.name}</h4>
                        <p style="font-size:13px; color:#8C4B3E; margin:5px 0; font-weight:bold;">${item.price}</p>
                        <div style="display:flex; align-items:center; gap:10px; margin-top:5px;">
                            <button onclick="changeQuantity(${index}, -1)" style="width:25px; height:25px; border-radius:50%; border:1px solid #ddd; background:white; cursor:pointer;">-</button>
                            <span style="font-size:14px; font-weight:600;">${item.quantity}</span>
                            <button onclick="changeQuantity(${index}, 1)" style="width:25px; height:25px; border-radius:50%; border:1px solid #ddd; background:white; cursor:pointer;">+</button>
                        </div>
                    </div>
                    <button onclick="removeItem(${index})" style="background:none; border:none; color:#bbb; cursor:pointer; font-size:20px; padding:5px;">&times;</button>
                </div>`;
        }
    });

    container.innerHTML = html;

    
  // --- ADICIONADO: TRAVA O BOTÃO DE CHECKOUT SE TIVER ALGO ESGOTADO ---
    const btnFinalizar = document.querySelector('.checkout-btn'); 
    
    if (btnFinalizar) {
        if (temAlgumEsgotado) {
            btnFinalizar.style.pointerEvents = 'none';
            btnFinalizar.style.backgroundColor = '#cccccc'; // Fica cinza
            btnFinalizar.style.borderColor = '#cccccc';     // Tira a borda se tiver
            btnFinalizar.style.color = '#ffffff';
            btnFinalizar.innerText = 'Remova itens esgotados';
        } else {
            btnFinalizar.style.pointerEvents = 'auto';
            btnFinalizar.style.backgroundColor = ''; // Remove o cinza 
            btnFinalizar.style.borderColor = '';     
            btnFinalizar.style.color = '';
            btnFinalizar.innerText = 'Finalizar Compra';
        }
    }
    // --- LÓGICA DO FRETE ---
    const freteGratisMinimo = 100;
    let valorParaSomar = (subtotal >= freteGratisMinimo) ? 0 : (window.valorFreteCalculado || 0);

    // BARRINHA DE PROGRESSO
    if (subtotal >= freteGratisMinimo) {
        if(barraProgresso) { barraProgresso.style.width = "100%"; barraProgresso.style.backgroundColor = "#4A6741"; }
        if(msgFrete) msgFrete.innerHTML = "✨ Parabéns! Você ganhou <strong>Frete Grátis</strong>!";
    } else {
        const faltam = freteGratisMinimo - subtotal;
        const porcentagem = (subtotal / freteGratisMinimo) * 100;
        if(barraProgresso) { barraProgresso.style.width = porcentagem + "%"; barraProgresso.style.backgroundColor = "#8C4B3E"; }
        
        if (subtotal > 0) {
            if(msgFrete) msgFrete.innerHTML = `Faltam apenas <strong>R$ ${faltam.toFixed(2).replace('.', ',')}</strong> para o Frete Grátis!`;
        } else {
            if(msgFrete) msgFrete.innerHTML = "";
        }
    }

    // EXIBIÇÃO DA CIDADE E VALOR DO FRETE
    if (resultMsg && window.valorFreteCalculado > 0) {
        const cidade = localStorage.getItem('anaua_cidade') || "";
        const uf = localStorage.getItem('anaua_uf') || "";
        const valorTxt = window.valorFreteCalculado.toFixed(2).replace('.', ',');

        if (subtotal >= freteGratisMinimo) {
            resultMsg.innerHTML = `📍 <strong>${cidade} - ${uf}</strong><br>✅ <strong>Frete Cortesia</strong> (SEDEX)`;
            resultMsg.style.color = "#4A6741";
        } else {
            resultMsg.innerHTML = `📍 <strong>${cidade} - ${uf}</strong><br>✅ SEDEX: R$ ${valorTxt} (${window.prazoFreteCalculado} dias)`;
            resultMsg.style.color = "#4A6741";
        }
    }

    // TOTAL FINAL
    const totalFinal = subtotal + valorParaSomar;
    if(subtotalDisplay) subtotalDisplay.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if(freteDisplay) freteDisplay.innerText = (subtotal >= freteGratisMinimo) ? "Grátis" : (window.valorFreteCalculado > 0 ? `R$ ${window.valorFreteCalculado.toFixed(2).replace('.', ',')}` : "Calcule o CEP");
    if(totalFinalDisplay) totalFinalDisplay.innerText = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;
}

window.changeQuantity = function(index, delta) {
    let items = JSON.parse(localStorage.getItem('cartItems')) || [];
    items[index].quantity += delta;
    
    // Apenas trava no zero, mas NÃO exclui o item do array!
    if (items[index].quantity < 0) {
        items[index].quantity = 0;
    }
    
    localStorage.setItem('cartItems', JSON.stringify(items));
    
    // Se todos os itens do carrinho estiverem zerados, limpa o cálculo de frete
    const temProdutoAtivo = items.some(item => item.quantity > 0);
    if (!temProdutoAtivo) {
        window.valorFreteCalculado = 0;
        window.prazoFreteCalculado = "";
        const resultMsg = document.getElementById('shipping-result');
        if(resultMsg) resultMsg.innerText = "";
    }
    
    renderCartItems(); 
    if (typeof updateCartDisplay === 'function') updateCartDisplay(); 
};

window.removeItem = function(index) {
    let items = JSON.parse(localStorage.getItem('cartItems')) || [];
    items.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(items));
    if (items.length === 0) {
        window.valorFreteCalculado = 0;
        window.prazoFreteCalculado = "";
        const resultMsg = document.getElementById('shipping-result');
        if(resultMsg) resultMsg.innerText = "";
    }
    renderCartItems(); 
    if (typeof updateCartDisplay === 'function') updateCartDisplay();
}

// --- 5. FUNÇÃO: ADICIONAR ITEM AO CARRINHO (Nome ajustado para conversar com a main.js) ---
window.addItemToCart = function(name, price, image) {
    let items = JSON.parse(localStorage.getItem('cartItems')) || [];
    let itemExistente = items.find(item => item.name === name);

    if (itemExistente) {
        itemExistente.quantity += 1;
    } else {
        items.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(items));
    renderCartItems();

    if (typeof updateCartDisplay === 'function') updateCartDisplay(); 
    if (typeof openCart === 'function') openCart();
};

// --- 6. ATUALIZADOR UNIVERSAL DA BOLINHA DO CARRINHO ---
window.updateCartDisplay = function() {
    let items = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalItems = 0;
    
    items.forEach(item => {
        totalItems += parseInt(item.quantity) || 0;
    });

    let bolinha = document.getElementById('cart-count'); 
    
    if (bolinha) {
        bolinha.innerText = totalItems; 
        bolinha.style.display = 'flex'; // Bolinha sempre visível, mesmo mostrando 0
    }
};

// Faz a bolinha atualizar sozinha assim que a página carrega
document.addEventListener('DOMContentLoaded', updateCartDisplay);








