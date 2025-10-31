

document.addEventListener("DOMContentLoaded", function() {

    // ---  SELETORES GLOBAIS
    const body = document.body;
    const btnTema = document.getElementById('btn-toggle-tema');
    // Captura TODOS os formulários (Login, Cadastro, Recuperação)
    const todosFormularios = document.querySelectorAll('form'); 


    //  FUNÇÕES AUXILIARES DE UX E DADOS (Armazenamento Local)
   
    
    //  Dark Mode 
    function toggleTema() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        
        localStorage.setItem('temaPreferido', isDarkMode ? 'dark' : 'light');
        btnTema.textContent = isDarkMode ? '🌙 Mudar para Modo Claro' : '☀️ Mudar para Modo Escuro';
    }

    //  Lógica de Máscara (Simplificada)
    // Função auxiliar para aplicar eventos de máscara
    const applyInputMask = (selector, maskFunction) => {
        const input = document.querySelector(selector);
        if (input) {
            input.addEventListener("input", function() {
                this.value = maskFunction(this.value);
            });
        }
    };

    
    //  INICIALIZAÇÃO E EVENTOS DE TEMA
    

    // Carregar a preferência de tema salva
    const temaSalvo = localStorage.getItem('temaPreferido');
    if (temaSalvo === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Configura o texto e o evento do botão de tema
    if (btnTema) {
        // Inicializa o texto corretamente
        btnTema.textContent = body.classList.contains('dark-mode') ? '🌙 Mudar para Modo Claro' : '☀️ Mudar para Modo Escuro';
        btnTema.addEventListener('click', toggleTema);
    }
    
   
    //  APLICAÇÃO DE MÁSCARAS
   

    // CPF: 000.000.000-00
    applyInputMask("#cpf", (valor) => {
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return valor;
    });

    // Telefone: (00) 00000-0000
    applyInputMask("#telefone", (valor) => {
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d{5})(\d{4})$/, "$1-$2");
        return valor;
    });

    // CEP: 00000-000
    applyInputMask("#CEP", (valor) => {
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
        return valor;
    });

    
    //  LÓGICA DE FORMULÁRIOS (Unificada)
    

    // Itera sobre todos os formulários encontrados na página
    todosFormularios.forEach(form => {
        // Encontra o campo de email em cada formulário (se existir)
        const emailInput = form.querySelector("#email");
        
        // Carregar email salvo (UX)
        if (emailInput) {
            const emailSalvo = localStorage.getItem('ultimoEmailCadastro');
            if (emailSalvo) {
                emailInput.value = emailSalvo;
            }
        }
        
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 

            // Se for um formulário com campo de email, salvamos para o próximo acesso (UX)
            if (emailInput) {
                // Simples validação de email
                if (!emailInput.value.includes("@") || emailInput.value.length < 5) {
                    alert("Digite um e-mail válido!");
                    emailInput.focus();
                    return;
                }
                localStorage.setItem('ultimoEmailCadastro', emailInput.value);
            }
            
            // Lógica de validação do formulário de CADASTRO (se houver o campo nome, é cadastro)
            const nomeInput = form.querySelector("#nome");
            if (nomeInput && nomeInput.value.length < 3) {
                 alert("Digite um nome com pelo menos 3 letras!");
                 nomeInput.focus();
                 return;
            }
            
            // Lógica de aceitar termos (se houver o campo termos)
            const termosInput = form.querySelector("#termos");
            if (termosInput && !termosInput.checked) {
                alert("Você precisa aceitar os termos!");
                return;
            }

            // Ação de sucesso genérica
            let mensagemSucesso = nomeInput ? "✅ Cadastro realizado com sucesso!" : "✅ Ação realizada com sucesso!";
            alert(mensagemSucesso);
            form.reset();
        });
    });

    // ===================================
    //  EFEITOS VISUAIS NOS BOTÕES (Simplificado com 'this')
    // ===================================
    document.querySelectorAll("button, input[type='submit'], input[type='reset']").forEach(function(botao) {
        botao.addEventListener("mouseover", function() {
            // Se você já tem CSS para isso (como no .botao1:hover), o CSS é mais limpo.
            // Aqui mantemos o JS para o efeito de escala (transform).
            this.style.transform = "scale(1.05)";
        });

        botao.addEventListener("mouseout", function() {
            this.style.transform = "scale(1)";
        });

        botao.addEventListener("mousedown", function() {
            this.style.transform = "scale(0.95)";
        });
        
        botao.addEventListener("mouseup", function() {
            this.style.transform = "scale(1)"; 
        });
    });
});
