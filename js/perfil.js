/* ==========================================================================
   1. MEUS DADOS PESSOAIS + GERAL (Abas, Upload de Foto, Super Pop-Up, Alterar Senha)
   ========================================================================== */
   
document.addEventListener("DOMContentLoaded", function() {
        
        // --- 1. ABAS DINÂMICAS ---
        const menuLinks = document.querySelectorAll('#profile-menu a[data-content]');
        const contents = document.querySelectorAll('.tab-content');
        const breadcrumbPage = document.getElementById('breadcrumb-page');

        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if(this.classList.contains('logout-link')) return;
                e.preventDefault();
                menuLinks.forEach(l => l.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                const contentId = `content-${this.getAttribute('data-content')}`;
                document.getElementById(contentId).classList.add('active');
                breadcrumbPage.innerText = this.innerText;
            });
        });

        // --- 2. UPLOAD DE FOTO ---
        const avatarInput = document.getElementById('avatar-input');
        if (avatarInput) {
            avatarInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(re) {
                        document.getElementById('avatar-display').style.display = 'none';
                        const img = document.getElementById('avatar-image');
                        img.style.display = 'block';
                        img.src = re.target.result;
                    }
                    reader.readAsDataURL(file);
                }
            });
        }

        // --- 3. SUPER POP-UP (DADOS ESSENCIAIS) ---
        const modalOverlay = document.getElementById('modal-overlay');
        const btnAbrirModal = document.getElementById('btn-abrir-super-modal');
        const inputTelefone = document.getElementById('modal-telefone');

        const fecharModal = () => modalOverlay.classList.remove('active');

        if (btnAbrirModal) {
            btnAbrirModal.addEventListener('click', () => {
                document.getElementById('modal-senha-confirmacao').value = '';
                modalOverlay.classList.add('active');
            });
        }

        document.getElementById('btn-close-modal').addEventListener('click', fecharModal);
        document.getElementById('btn-cancel-modal').addEventListener('click', fecharModal);
        modalOverlay.addEventListener('click', (e) => { if(e.target === modalOverlay) fecharModal(); });

        if (inputTelefone) {
            inputTelefone.addEventListener('input', function(e) {
                let v = e.target.value.replace(/\D/g, "");
                if (v.length > 11) v = v.slice(0, 11);
                if (v.length > 7) v = v.replace(/^(\d{2})(\d)(\d{4})(\d{0,4})/, "($1) $2 $3-$4");
                else if (v.length > 3) v = v.replace(/^(\d{2})(\d)(\d{0,4})/, "($1) $2 $3");
                else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,1})/, "($1) $2");
                else if (v.length > 0) v = v.replace(/^(\d*)/, "($1");
                e.target.value = v;
            });
        }

        document.getElementById('form-super-modal').addEventListener('submit', function(e) {
            e.preventDefault();
            const digitos = inputTelefone.value.replace(/\D/g, "");
            if (digitos.length < 11) return alert("Digite o telefone completo.");
            
            if (confirm("Confirmar alterações essenciais?")) {
                const btn = this.querySelector('button[type="submit"]');
                btn.innerText = "Salvando...";
                setTimeout(() => { fecharModal(); btn.innerText = "Salvar Alterações"; }, 800);
            }
        });

        // --- 4. SALVAMENTO SIMPLES (NOME/SOBRENOME) ---
        const btnSalvarSimples = document.getElementById('btn-salvar-simples');
        if (btnSalvarSimples) {
            btnSalvarSimples.closest('form').addEventListener('submit', function(e) {
                e.preventDefault();
                btnSalvarSimples.innerText = "Salvando...";
                setTimeout(() => { btnSalvarSimples.innerText = "Alterar Informações"; alert("Atualizado!"); }, 800);
            });
        }

        // --- 5. ATUALIZAR SENHA (BLOCO DE BAIXO) ---
        const formSenha = document.getElementById('form-alterar-senha');
        const inputNovaSenhaPerfil = document.getElementById('nova-senha');
        const btnOlhoPerfil = document.getElementById('btn-olho-perfil');
        const iconeOlhoPerfil = document.getElementById('icone-olho-perfil');
        const medidorPerfil = document.getElementById('medidor-forca-perfil');
        const barraForcaPerfil = document.getElementById('barra-forca-perfil');
        const textoForcaPerfil = document.getElementById('texto-forca-perfil');
        
        let senhaValidaPerfil = false;

        // A) Mágica do Olhinho
        if (btnOlhoPerfil && inputNovaSenhaPerfil) {
            btnOlhoPerfil.addEventListener('click', function() {
                if (inputNovaSenhaPerfil.type === 'password') {
                    inputNovaSenhaPerfil.type = 'text';
                    iconeOlhoPerfil.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`;
                } else {
                    inputNovaSenhaPerfil.type = 'password';
                    iconeOlhoPerfil.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
                }
            });
        }

        // B) Mágica da Barrinha de Força
        if (inputNovaSenhaPerfil) {
            inputNovaSenhaPerfil.addEventListener('input', function() {
                const senha = this.value;
                if (senha.length > 0) { medidorPerfil.style.display = 'block'; } 
                else { medidorPerfil.style.display = 'none'; senhaValidaPerfil = false; return; }

                let forca = 0;
                if (senha.length >= 8) forca++;
                if (/[A-Z]/.test(senha)) forca++;
                if (/[a-z]/.test(senha)) forca++;
                if (/[0-9]/.test(senha)) forca++;
                if (/[^A-Za-z0-9]/.test(senha)) forca++;

                switch(forca) {
                    case 0: case 1: case 2:
                        barraForcaPerfil.style.width = '25%'; barraForcaPerfil.style.backgroundColor = '#dc3545';
                        textoForcaPerfil.innerText = 'Fraca'; textoForcaPerfil.style.color = '#dc3545'; senhaValidaPerfil = false; break;
                    case 3:
                        barraForcaPerfil.style.width = '50%'; barraForcaPerfil.style.backgroundColor = '#ffc107';
                        textoForcaPerfil.innerText = 'Média'; textoForcaPerfil.style.color = '#ffc107'; senhaValidaPerfil = false; break;
                    case 4:
                        barraForcaPerfil.style.width = '75%'; barraForcaPerfil.style.backgroundColor = '#17a2b8';
                        textoForcaPerfil.innerText = 'Boa'; textoForcaPerfil.style.color = '#17a2b8'; senhaValidaPerfil = true; break;
                    case 5:
                        barraForcaPerfil.style.width = '100%'; barraForcaPerfil.style.backgroundColor = '#28a745';
                        textoForcaPerfil.innerText = 'Forte'; textoForcaPerfil.style.color = '#28a745'; senhaValidaPerfil = true; break;
                }
            });
        }

        // C) Validação Final ao Salvar
        if (formSenha) {
            formSenha.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const senhaAt = document.getElementById('senha-atual').value;
                const novaSe = inputNovaSenhaPerfil.value;

                // Regra 1: Não pode ser igual à antiga (que já tínhamos feito)
                if (senhaAt === novaSe) {
                    alert("A nova senha não pode ser igual à senha atual.");
                    return;
                }

                // Regra 2: TEM QUE SER FORTE!
                if (!senhaValidaPerfil) {
                    alert("Por favor, crie uma senha mais forte (pelo menos 'Boa') para garantir sua segurança.");
                    medidorPerfil.style.opacity = '0.5'; setTimeout(() => medidorPerfil.style.opacity = '1', 200);
                    inputNovaSenhaPerfil.focus();
                    return;
                }

                if (confirm("Deseja realmente alterar sua senha?")) {
                    const btn = this.querySelector('button[type="submit"]');
                    btn.innerText = "Atualizando...";
                    setTimeout(() => { 
                        this.reset(); 
                        medidorPerfil.style.display = 'none'; // Esconde a barrinha de novo
                        senhaValidaPerfil = false;
                        btn.innerText = "Atualizar Senha"; 
                        alert("Sua senha foi atualizada com sucesso e agora está blindada!"); 
                    }, 800);
                }
            });
        }

        // --- 6. MODAL: ESQUECI MINHA SENHA (3 ETAPAS) ---
        const modalEsqueci = document.getElementById('modal-esqueci-senha');
        const fecharEsqueci = () => modalEsqueci.classList.remove('active');

        document.getElementById('link-esqueci-senha').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('esqueci-step-1').style.display = 'block';
            document.getElementById('esqueci-step-2').style.display = 'none';
            document.getElementById('esqueci-step-3').style.display = 'none';
            document.getElementById('codigo-verificacao').value = '';
            document.getElementById('erro-codigo').style.display = 'none';
            modalEsqueci.classList.add('active');
        });

        document.getElementById('btn-close-esqueci').addEventListener('click', fecharEsqueci);

        document.getElementById('btn-avancar-step-2').addEventListener('click', function() {
            this.innerText = "Enviando...";
            setTimeout(() => {
                document.getElementById('esqueci-step-1').style.display = 'none';
                document.getElementById('esqueci-step-2').style.display = 'block';
                this.innerText = "Enviar Código";
            }, 800);
        });

        document.getElementById('btn-avancar-step-3').addEventListener('click', function() {
            const inputCod = document.getElementById('codigo-verificacao');
            const erroCod = document.getElementById('erro-codigo');
            if (inputCod.value === '123456') {
                document.getElementById('esqueci-step-2').style.display = 'none';
                document.getElementById('esqueci-step-3').style.display = 'block';
            } else {
                erroCod.style.display = 'block';
                inputCod.style.borderColor = 'red';
            }
        });

        // --- 7. LÓGICA DE SENHA FORTE E CONCLUSÃO ---
        const inputNovaSenhaRec = document.getElementById('nova-senha-recuperada');
        const medidorContainer = document.getElementById('medidor-forca-container');
        const barraForca = document.getElementById('barra-forca-senha');
        const textoForca = document.getElementById('texto-forca-senha');
        const btnConcluir = document.getElementById('btn-concluir-recuperacao');
        
        let senhaValida = false; // Começa bloqueado por segurança

        if (inputNovaSenhaRec) {
            inputNovaSenhaRec.addEventListener('input', function() {
                const senha = this.value;

                // Mostra a barrinha só quando começar a digitar
                if (senha.length > 0) {
                    medidorContainer.style.display = 'block';
                } else {
                    medidorContainer.style.display = 'none';
                    senhaValida = false;
                    return;
                }

                // A mágica do Regex (calcula os pontos)
                let forca = 0;
                if (senha.length >= 8) forca++;
                if (/[A-Z]/.test(senha)) forca++;
                if (/[a-z]/.test(senha)) forca++;
                if (/[0-9]/.test(senha)) forca++;
                if (/[^A-Za-z0-9]/.test(senha)) forca++;

                // Muda o visual e destrava o botão dependendo da pontuação
                switch(forca) {
                    case 0:
                    case 1:
                    case 2:
                        barraForca.style.width = '25%';
                        barraForca.style.backgroundColor = '#dc3545'; // Vermelho
                        textoForca.innerText = 'Fraca';
                        textoForca.style.color = '#dc3545';
                        senhaValida = false;
                        break;
                    case 3:
                        barraForca.style.width = '50%';
                        barraForca.style.backgroundColor = '#ffc107'; // Amarelo
                        textoForca.innerText = 'Média';
                        textoForca.style.color = '#ffc107';
                        senhaValida = false; // Média ainda não passa!
                        break;
                    case 4:
                        barraForca.style.width = '75%';
                        barraForca.style.backgroundColor = '#17a2b8'; // Azul
                        textoForca.innerText = 'Boa';
                        textoForca.style.color = '#17a2b8';
                        senhaValida = true; // Liberada!
                        break;
                    case 5:
                        barraForca.style.width = '100%';
                        barraForca.style.backgroundColor = '#28a745'; // Verde
                        textoForca.innerText = 'Forte';
                        textoForca.style.color = '#28a745';
                        senhaValida = true; // Liberada!
                        break;
                }
            });
        }

        // A Conclusão (Agora com a trava de segurança ativada)
        if (btnConcluir) {
            btnConcluir.addEventListener('click', function() {
                if (!senhaValida) {
                    alert("Por favor, crie uma senha mais forte (pelo menos 'Boa') para garantir sua segurança.");
                    // Faz a barrinha dar uma piscada de aviso
                    medidorContainer.style.opacity = '0.5';
                    setTimeout(() => medidorContainer.style.opacity = '1', 200);
                    return;
                }
                
                this.innerText = "Salvando...";
                setTimeout(() => {
                    alert("Sucesso! Sua senha blindada foi redefinida.");
                    fecharEsqueci(); // Aquela função de fechar que já temos
                    this.innerText = "Redefinir Senha";
                    
                    // Reseta tudo para a próxima vez que abrir
                    inputNovaSenhaRec.value = '';
                    medidorContainer.style.display = 'none';
                    senhaValida = false;
                }, 800);
            });
        }
        
    });






   /* ==========================================================================
   2. MEUS PEDIDOS (Filtros e Lista)
   ========================================================================== */
    document.addEventListener("DOMContentLoaded", function() {
            
            // Elementos da Tela
            const listaPedidos = document.getElementById('lista-de-pedidos');
            const emptyState = document.getElementById('pedidos-empty-state');
            
            // Elementos de Filtro (Prontos para disparar requisições pro Back-end)
            const inputBusca = document.getElementById('busca-pedido');
            const filtroAno = document.getElementById('filtro-ano');
            const filtroStatus = document.getElementById('filtro-status');

            // Função que o Back-end vai chamar para carregar a tela
            function carregarPedidosDoBanco() {
                
                // TODO: O Back-end vai entrar aqui usando Fetch/Axios.
                /* Exemplo de como vai ficar:
                
                fetch('/api/pedidos?ano=' + filtroAno.value + '&status=' + filtroStatus.value)
                    .then(resposta => resposta.json())
                    .then(dados => {
                        
                        // Limpa a tela
                        listaPedidos.innerHTML = ''; 

                        // Se não tiver pedidos, mostra o pacotinho vazio!
                        if (dados.length === 0) {
                            listaPedidos.style.display = 'none';
                            emptyState.style.display = 'block';
                            return;
                        }

                        // Se tiver, esconde o pacotinho e desenha os cards
                        emptyState.style.display = 'none';
                        listaPedidos.style.display = 'block';

                        const template = document.getElementById('pedido-card-template');

                        dados.forEach(pedido => {
                            // Clona o nosso molde HTML lindo
                            const clone = template.content.cloneNode(true);
                            
                            // Preenche com os dados reais do banco
                            clone.querySelector('.data-compra').textContent = pedido.data;
                            clone.querySelector('.total-compra').textContent = pedido.valor;
                            clone.querySelector('.numero-pedido').textContent = pedido.id;
                            
                            // ... o resto do preenchimento e botões vem aqui!

                            // Joga o card finalizado na tela
                            listaPedidos.appendChild(clone);
                        });
                    });
                */
            }

            // Avisa o Back-end para recarregar se o usuário mudar o filtro
            if(inputBusca) inputBusca.addEventListener('change', carregarPedidosDoBanco);
            if(filtroAno) filtroAno.addEventListener('change', carregarPedidosDoBanco);
            if(filtroStatus) filtroStatus.addEventListener('change', carregarPedidosDoBanco);

            // Carrega a tela pela primeira vez quando o usuário entra
            // carregarPedidosDoBanco();
        });





/* ==========================================================================
   3. MEUS ENDEREÇOS (CEP, Modais, Grid)
   ========================================================================== */
  
document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById('grid-de-enderecos');
    const modal = document.getElementById('modal-endereco');
    const checkPrincipal = document.getElementById('end-tornar-principal-check');
    const msgBloqueio = document.getElementById('msg-principal-bloqueado');
    const inputCep = document.getElementById('end-cep');
    const formEndereco = document.getElementById('form-endereco');
    
    let buscandoCep = false;

    // --- FUNÇÃO PARA ABRIR MODAL ---
    function abrirModal(card = null) {
        formEndereco.reset();
        buscandoCep = false;
        
        const camposTravar = [document.getElementById('end-cidade'), document.getElementById('end-estado')];
        camposTravar.forEach(el => {
            if(el) {
                el.readOnly = true;
                el.disabled = (el.tagName === 'SELECT');
                el.style.backgroundColor = "#f5f5f5";
            }
        });

        if (card) {
            document.getElementById('titulo-modal-endereco').innerText = 'Editar Endereço';
            
            // BACK-END: Aqui o script preencheria os inputs com os dados do 'card' vindo do banco
            document.getElementById('end-id').value = card.dataset.id;
            
            const ehPrincipal = card.classList.contains('principal');
            checkPrincipal.checked = ehPrincipal;
            if (ehPrincipal) {
                checkPrincipal.disabled = true;
                msgBloqueio.style.display = 'block';
            } else {
                checkPrincipal.disabled = false;
                msgBloqueio.style.display = 'none';
            }
        } else {
            document.getElementById('titulo-modal-endereco').innerText = 'Novo Endereço';
            document.getElementById('end-id').value = "";
            checkPrincipal.disabled = false;
            checkPrincipal.checked = false;
            msgBloqueio.style.display = 'none';
        }
        modal?.classList.add('active');
    }

    // GATILHOS MODAL
    document.getElementById('btn-novo-endereco')?.addEventListener('click', () => abrirModal());
    document.getElementById('card-add-endereco')?.addEventListener('click', () => abrirModal());
    const fechar = () => modal?.classList.remove('active');
    document.getElementById('btn-fechar-endereco')?.addEventListener('click', fechar);
    document.getElementById('btn-cancelar-endereco')?.addEventListener('click', fechar);

    // --- AÇÕES NA GRID (PREPARADAS PARA O BANCO) ---
    grid?.addEventListener('click', function(e) {
        const card = e.target.closest('.endereco-card');
        if (!card) return;
        const idEndereco = card.dataset.id;

        if (e.target.closest('.btn-editar')) abrirModal(card);

        if (e.target.closest('.btn-excluir')) {
            if (confirm("Deseja excluir este endereço?")) {
                // BACK-END: Aqui você dispararia um 'fetch' para deletar o ID no Banco de Dados
                card.remove();
            }
        }

        if (e.target.closest('.btn-tornar-principal')) {
            // BACK-END: Aqui você enviaria o ID para o Banco atualizar quem é o principal
            grid.querySelector('.endereco-card.principal')?.classList.remove('principal');
            card.classList.add('principal');
            grid.prepend(card);
        }
    });

    // --- SUBMIT DO FORMULÁRIO (SALVAR NO BANCO) ---
    formEndereco?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // BACK-END: Aqui você capturaria os dados com 'new FormData(this)'
        // e enviaria via POST para o seu servidor salvar no banco.
        
        alert("Endereço salvo com sucesso! (Simulação do Back-end)");
        fechar();
    });

   // --- LÓGICA DO CEP: TRAVA DE MEMÓRIA (ANTI-REPETIÇÃO) ---
    if (inputCep) {
        const novoInputCep = inputCep.cloneNode(true);
        inputCep.parentNode.replaceChild(novoInputCep, inputCep);

        window.ultimoCepProcessado = ""; 
        window.buscandoAgora = false;

        novoInputCep.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) value = value.replace(/^(\d{5})(\d)/, "$1-$2");
            e.target.value = value.slice(0, 9);

            const cepAtual = e.target.value.replace(/\D/g, '');

            if (cepAtual.length === 8 && cepAtual !== window.ultimoCepProcessado && !window.buscandoAgora) {
                window.buscandoAgora = true;
                window.ultimoCepProcessado = cepAtual;

                fetch(`https://viacep.com.br/ws/${cepAtual}/json/`)
                    .then(res => res.json())
                    .then(dados => {
                        const campoCidade = document.getElementById('end-cidade');
                        const campoEstado = document.getElementById('end-estado');
                        const campoRua = document.getElementById('end-rua');
                        const campoBairro = document.getElementById('end-bairro');

                        if (!dados.erro) {
                            if(campoRua) campoRua.value = dados.logradouro;
                            if(campoBairro) campoBairro.value = dados.bairro;
                            if(campoCidade) {
                                campoCidade.value = dados.localidade;
                                campoCidade.readOnly = true;
                                campoCidade.style.backgroundColor = "#f5f5f5";
                            }
                            if(campoEstado) {
                                campoEstado.value = dados.uf;
                                campoEstado.disabled = true;
                                campoEstado.style.backgroundColor = "#f5f5f5";
                            }
                            document.getElementById('end-numero')?.focus();
                        } else {
                            alert("Ops! CEP não encontrado.");
                            if(campoCidade) {
                                campoCidade.readOnly = false;
                                campoCidade.style.backgroundColor = "#fff";
                            }
                            if(campoEstado) {
                                campoEstado.disabled = false;
                                campoEstado.style.backgroundColor = "#fff";
                            }
                        }
                    })
                    .finally(() => {
                        setTimeout(() => { window.buscandoAgora = false; }, 2000);
                    });
            }
            if (cepAtual.length < 8) {
                window.ultimoCepProcessado = "";
                window.buscandoAgora = false;
            }
        });

        novoInputCep.addEventListener('blur', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
        }, true);
    }
});

   // ---  MINI-MENU DE FIGURINHAS ---
    const trigger = document.getElementById('select-trigger');
    const optionsContainer = document.getElementById('select-options');
    const selectedText = document.getElementById('selected-text');

    const tiposEnderecos = [
        { val: 'casa', txt: 'Casa', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>' },
        { val: 'trabalho', txt: 'Trabalho', icon: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>' },
        { val: 'apt', txt: 'Apartamento', icon: '<rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="9" y1="22" x2="9" y2="2"></line>' },
        { val: 'familia', txt: 'Casa Mãe/Pai', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>' },
        { val: 'praia', txt: 'Casa de Praia', icon: '<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path><path d="M12 7v5l3 3"></path>' },
        { val: 'namorado', txt: 'Casa Namorado(a)', icon: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>' }
    ];

    // Limpa e recria as opções para garantir que não haja duplicatas ou erros
    if (optionsContainer) {
        optionsContainer.innerHTML = ''; 
        tiposEnderecos.forEach(t => {
            const div = document.createElement('div');
            div.className = 'custom-option';
            div.style.padding = '10px 15px';
            div.style.cursor = 'pointer';
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.gap = '10px';
            
            div.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${t.icon}</svg> <span>${t.txt}</span>`;
            
            div.onclick = (e) => {
                e.stopPropagation();
                selectedText.innerText = t.txt;
                trigger.querySelector('span svg').innerHTML = t.icon;
                optionsContainer.classList.remove('open');
            };
            optionsContainer.appendChild(div);
        });
    }

    // Abre e fecha o menu
    trigger?.addEventListener('click', (e) => {
        e.stopPropagation();
        optionsContainer?.classList.toggle('open');
    });

    // Fecha o menu se clicar em qualquer outro lugar da tela
    window.addEventListener('click', () => {
        optionsContainer?.classList.remove('open');
    });





/* ==========================================================================
   4. FAVORITOS (Vitrine e Ações)
   ========================================================================== */
   // Captura todos os botões de remover favoritos

    document.querySelectorAll('.btn-remove-fav').forEach(button => {
    button.addEventListener('click', function(e) {
        // Previne que o clique dispare o link da imagem que está por baixo
        e.preventDefault();
        e.stopPropagation();

        const card = this.closest('.favorito-card');
        const nomeProduto = card.querySelector('.fav-nome').innerText;

        const certeza = confirm(`Tem certeza que quer remover "${nomeProduto}" dos favoritos?`);

        if (certeza) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => card.remove(), 300);
        }
    });

    function removerDosFavoritos(btn, nomeProduto) {
    const certeza = confirm(`Tem certeza que quer remover "${nomeProduto}" dos favoritos?`);
    
    if (certeza) {
        const card = btn.closest('.favorito-card');
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        card.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            card.remove();
            
            const grid = document.getElementById('grid-favoritos');
            if (grid && grid.children.length === 0) {
                grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: #999; margin-top: 40px;">Sua lista de favoritos está vazia.</p>';
            }
        }, 300);
    }
}
});











/* ==========================================================================
   5. LALALA
   ========================================================================== */
   // Lógica de busca e filtros de status...
















