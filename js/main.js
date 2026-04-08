const slider = document.querySelector('.product-slider-wrapper');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

nextBtn.addEventListener('click', () => {
    // scrollBy com 'smooth' faz o deslize ser elegante
    slider.scrollBy({ left: 350, behavior: 'smooth' }); 
});

prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -350, behavior: 'smooth' });
});

function moveIngredients(direction) {
    const slider = document.getElementById('ingredientsSlider');
    const scrollAmount = slider.clientWidth; // Pega a largura visível
    slider.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

function moveIngredients(direction) {
    const slider = document.getElementById('ingredientsSlider');
    if (slider) {
        // No mobile, cada slide é 100% da largura do slider
        const scrollAmount = slider.offsetWidth;
        slider.scrollBy({
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


