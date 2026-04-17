
document.getElementById('form-login').addEventListener('submit', function(e) {
            e.preventDefault(); // Impede a página de recarregar
            
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            // Aqui futuramente vai a conexão com o banco de dados.
            // Por enquanto, vamos só simular um login de sucesso e mandar pro perfil!
            if(email && senha) {
                console.log("Tentativa de login com:", email);
                window.location.href = 'perfil.html';
            }
        });



document.addEventListener("DOMContentLoaded", function() {
      
        // 1. ABRIR E FECHAR A MODAL
        const modalEsqueci = document.getElementById('modal-esqueci-senha');
        const linkEsqueci = document.getElementById('link-esqueci-senha');
        const inputNovaSenhaRec = document.getElementById('nova-senha-recuperada');
        const medidorRec = document.getElementById('medidor-forca-recuperacao');
        
        const fecharEsqueci = () => modalEsqueci.classList.remove('active');

        if (linkEsqueci) {
            linkEsqueci.addEventListener('click', function(e) {
                e.preventDefault();
                // Reseta tudo pra começar limpo na Etapa 1
                document.getElementById('esqueci-step-1').style.display = 'block';
                document.getElementById('esqueci-step-2').style.display = 'none';
                document.getElementById('esqueci-step-3').style.display = 'none';
                document.getElementById('codigo-verificacao').value = '';
                document.getElementById('erro-codigo').style.display = 'none';
                inputNovaSenhaRec.value = '';
                inputNovaSenhaRec.type = 'password';
                medidorRec.style.display = 'none';
                senhaValidaRec = false;
                
                modalEsqueci.classList.add('active');
            });
        }

        document.getElementById('btn-close-esqueci').addEventListener('click', fecharEsqueci);
        modalEsqueci.addEventListener('click', e => { if(e.target === modalEsqueci) fecharEsqueci(); });

        // 2. NAVEGAÇÃO ENTRE ETAPAS
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
                erroCod.style.display = 'none';
                document.getElementById('esqueci-step-2').style.display = 'none';
                document.getElementById('esqueci-step-3').style.display = 'block';
            } else {
                erroCod.style.display = 'block';
                inputCod.style.borderColor = 'red';
                inputCod.addEventListener('input', () => { inputCod.style.borderColor = '#E6D8CA'; erroCod.style.display = 'none'; }, { once: true });
            }
        });

        // 3. OLHINHO E FORÇA DA SENHA
        const btnOlhoRec = document.getElementById('btn-olho-recuperacao');
        const iconeOlhoRec = document.getElementById('icone-olho-rec');
        const barraForcaRec = document.getElementById('barra-forca-rec');
        const textoForcaRec = document.getElementById('texto-forca-rec');
        let senhaValidaRec = false;

        btnOlhoRec.addEventListener('click', function() {
            if (inputNovaSenhaRec.type === 'password') {
                inputNovaSenhaRec.type = 'text';
                iconeOlhoRec.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`;
            } else {
                inputNovaSenhaRec.type = 'password';
                iconeOlhoRec.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
            }
        });

        inputNovaSenhaRec.addEventListener('input', function() {
            const senha = this.value;
            if (senha.length > 0) { medidorRec.style.display = 'block'; } 
            else { medidorRec.style.display = 'none'; senhaValidaRec = false; return; }

            let forca = 0;
            if (senha.length >= 8) forca++;
            if (/[A-Z]/.test(senha)) forca++;
            if (/[a-z]/.test(senha)) forca++;
            if (/[0-9]/.test(senha)) forca++;
            if (/[^A-Za-z0-9]/.test(senha)) forca++;

            switch(forca) {
                case 0: case 1: case 2:
                    barraForcaRec.style.width = '25%'; barraForcaRec.style.backgroundColor = '#dc3545';
                    textoForcaRec.innerText = 'Fraca'; textoForcaRec.style.color = '#dc3545'; senhaValidaRec = false; break;
                case 3:
                    barraForcaRec.style.width = '50%'; barraForcaRec.style.backgroundColor = '#ffc107';
                    textoForcaRec.innerText = 'Média'; textoForcaRec.style.color = '#ffc107'; senhaValidaRec = false; break;
                case 4:
                    barraForcaRec.style.width = '75%'; barraForcaRec.style.backgroundColor = '#17a2b8';
                    textoForcaRec.innerText = 'Boa'; textoForcaRec.style.color = '#17a2b8'; senhaValidaRec = true; break;
                case 5:
                    barraForcaRec.style.width = '100%'; barraForcaRec.style.backgroundColor = '#28a745';
                    textoForcaRec.innerText = 'Forte'; textoForcaRec.style.color = '#28a745'; senhaValidaRec = true; break;
            }
        });

        // 4. CONCLUIR E SALVAR
        document.getElementById('btn-concluir-recuperacao').addEventListener('click', function() {
            if (!senhaValidaRec) {
                alert("Crie uma senha mais forte (pelo menos 'Boa').");
                medidorRec.style.opacity = '0.5'; setTimeout(() => medidorRec.style.opacity = '1', 200);
                return;
            }
            this.innerText = "Salvando...";
            setTimeout(() => {
                alert("Senha redefinida com sucesso! Você já pode fazer o Login.");
                fecharEsqueci();
                this.innerText = "Redefinir Senha";
            }, 800);
        });

    });