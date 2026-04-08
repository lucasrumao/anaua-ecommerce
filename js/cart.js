// Inicia o contador com o que estiver salvo no navegador, ou 0 se estiver vazio
let cartCountValue = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;

// Função para atualizar o visual do número no Header
function updateCartDisplay() {
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.innerText = cartCountValue;
    }
}

// Função para adicionar item (chamada por qualquer página)
function addItemToCart() {
    cartCountValue++;
    localStorage.setItem('cartCount', cartCountValue); // Salva no "cérebro" do navegador
    
    updateCartDisplay();
    
    // Faz o pulinho de luxo no ícone
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.classList.add('cart-bump');
        setTimeout(() => cartBadge.classList.remove('cart-bump'), 300);
    }
}

// Executa assim que a página carrega para mostrar o número salvo
document.addEventListener('DOMContentLoaded', () => {
 updateCartDisplay();
});


// Agora buscamos a lista de itens, ou um array vazio [] se não tiver nada
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function updateCartDisplay() {
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        // O número no badge agora é a soma das quantidades de todos os itens
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.innerText = totalItems;
    }
}

// Nova função que recebe os dados do produto
function addItemToCart(name, price, image) {
    // Verifica se o produto já está no carrinho
    const existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    // Salva a lista inteira no localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    updateCartDisplay();

    // Animação de pulo
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.classList.add('cart-bump');
        setTimeout(() => cartBadge.classList.remove('cart-bump'), 300);
    }
}

document.addEventListener('DOMContentLoaded', updateCartDisplay);







