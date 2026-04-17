document.addEventListener("DOMContentLoaded", () => {
    
    // ====================================================================================
    // 1. LÓGICA DE NAVEGAÇÃO ENTRE AS ABAS (MENU LATERAL E FOOTER)
    // ====================================================================================
    const linksMenu = document.querySelectorAll('.suporte-sidebar nav a');
    const conteudosAba = document.querySelectorAll('.suporte-tab');

    // Função Mestra que faz a troca das abas
    function ativarAba(idAlvo) {
        // Remove a classe 'active' de todos os links e abas
        linksMenu.forEach(link => link.classList.remove('active'));
        conteudosAba.forEach(conteudo => conteudo.classList.remove('active'));

        // Procura a aba e o link que devem ser ativados
        const linkAtivo = document.querySelector(`.suporte-sidebar nav a[href="#${idAlvo}"]`);
        const conteudoAtivo = document.getElementById(idAlvo);

        if (conteudoAtivo) {
            if (linkAtivo) linkAtivo.classList.add('active'); // Pinta o menu lateral de verde
            conteudoAtivo.classList.add('active'); // Mostra o texto
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola pro topo suavemente
        }
    }

    // A) Lê a URL ao carregar a página (Vindo da Home, Loja, etc)
    const hashNaUrl = window.location.hash.replace('#', '');
    if (hashNaUrl && document.getElementById(hashNaUrl)) {
        ativarAba(hashNaUrl);
    }

    // B) Clicks no Menu Lateral
    linksMenu.forEach(link => {
        link.addEventListener('click', (evento) => {
            evento.preventDefault(); 
            const idClicado = link.getAttribute('href').replace('#', '');
            history.pushState(null, null, `#${idClicado}`); // Muda a URL sem recarregar
            ativarAba(idClicado);
        });
    });

    // C) O VIGIA DE URL (A mágica que conserta o Footer!)
    // Se a URL mudar a qualquer momento (ex: clicando no footer), ele ativa a aba.
    window.addEventListener('hashchange', () => {
        const hashAtual = window.location.hash.replace('#', '');
        if (hashAtual && document.getElementById(hashAtual)) {
            ativarAba(hashAtual);
        }
    });


    // ====================================================================================
    // 2. LÓGICA DO ACORDEÃO (FAQ - PERGUNTAS E RESPOSTAS)
    // ====================================================================================
    const faqButtons = document.querySelectorAll('.faq-question');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            
            // Verifica se a pergunta clicada já está aberta
            const isOpen = faqItem.classList.contains('active');
            
            // Fecha todas as outras caixinhas primeiro (mantém o visual limpo)
            document.querySelectorAll('.faq-item-dynamic').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Se a que clicamos estava fechada, abre ela e calcula a altura do texto
            if (!isOpen) {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px"; 
            }
        });
    });

});