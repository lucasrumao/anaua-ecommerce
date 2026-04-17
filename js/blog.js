document.addEventListener("DOMContentLoaded", () => {
    console.log("Sistema do Editorial Anauá carregado.");

    // =========================================================================
    // 1. SIMULAÇÃO DE CRIAÇÃO DE POST (FRONT-END)
    // =========================================================================
    // Esse código pega os dados do formulário e insere um novo post no Acervo.
    const formAdmin = document.querySelector('.admin-post-form');
    const feedGrid = document.querySelector('.feed-grid');

    if (formAdmin && feedGrid) {
        formAdmin.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede a página de recarregar

            // Pega os valores que você digitou
            const inputs = formAdmin.querySelectorAll('input, textarea');
            const titulo = inputs[0].value;
            const categoria = inputs[1].value;
            const autor = inputs[2].value;
            const conteudo = inputs[3].value;

            // Formata a data atual (Ex: 16 Abr, 2026)
            const dataAtual = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('de ', '').replace('.','');

            // Cria a estrutura HTML do novo Post
            const novoPostHTML = `
                <article class="feed-card" style="animation: fadeIn 0.5s ease;">
                    <a href="#" class="feed-img-frame">
                        <img src="https://placehold.co/600x450/E6D8CA/E6D8CA?text=+" alt="Novo Post">
                    </a>
                    <div class="feed-info">
                        <a href="#" class="post-category-label">${categoria}</a>
                        <h3><a href="#">${titulo}</a></h3>
                        <p>${conteudo.substring(0, 90)}...</p>
                        <div class="meta-info">
                            <a href="#">Por ${autor}</a>
                            <span class="meta-dot">•</span>
                            <span>${dataAtual}</span>
                        </div>
                    </div>
                </article>
            `;

            // Insere o post novo no COMEÇO da grade (Posts Recentes)
            feedGrid.insertAdjacentHTML('afterbegin', novoPostHTML);

            // Limpa o formulário e avisa o usuário
            formAdmin.reset();
            alert("Sucesso! Editorial publicado no Acervo Botânico.");
        });
    }

    // =========================================================================
    // 2. LÓGICA FUTURA DE ORDENAÇÃO (BACK-END PREPARATION)
    // =========================================================================
    /* Aqui ficará a chamada para a sua API (ex: Node/Firebase).
       Exemplo de como funcionará:

       async function carregarPosts() {
           const response = await fetch('/api/posts');
           const posts = await response.json();

           // 1. Filtra os mais visitados (Likes > 100) e joga na seção "Rituais da Comunidade"
           const populares = posts.filter(post => post.likes > 100).sort((a,b) => b.likes - a.likes);
           renderizarSidebar(populares);

           // 2. Filtra os mais novos pela data e joga na seção "Acervo Botânico Recente"
           const recentes = posts.sort((a,b) => new Date(b.data) - new Date(a.data));
           renderizarFeed(recentes);
       }
    */
});