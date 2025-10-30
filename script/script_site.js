/* ======================================================
   CONECTASOCIAL - SCRIPT SIMPLES DE VALIDAÇÃO
   ------------------------------------------------------
   Este código valida os formulários e aplica pequenas 
   interações visuais. Pode ser usado em login, cadastro 
   e recuperação de senha.
   ====================================================== */

document.addEventListener("DOMContentLoaded", function() {

    // ======== LOGIN ========
    let formLogin = document.querySelector("form[action='#'][method='post']");
    if (formLogin) {
        formLogin.addEventListener("submit", function(event) {
            event.preventDefault(); // impede o envio automático

            // Pega os campos
            let email = document.querySelector("#email");
            let senha = document.querySelector("#senha");
            let tipo = document.querySelector("#tipo");

            // Validações simples
            if (email.value === "" || !email.value.includes("@")) {
                alert("Digite um e-mail válido!");
                email.focus();
                return;
            }

            if (senha.value.length < 6) {
                alert("A senha deve ter pelo menos 6 caracteres!");
                senha.focus();
                return;
            }

            if (tipo.value === "") {
                alert("Selecione o tipo de conta (ONG ou Voluntário)!");
                tipo.focus();
                return;
            }

            alert("✅ Login realizado com sucesso!");
            formLogin.reset(); // limpa o formulário
        });
    }

    // ======== CADASTRO ========
    let formCadastro = document.querySelector("form[action='#'][method='get']");
    if (formCadastro) {
        formCadastro.addEventListener("submit", function(event) {
            event.preventDefault();

            // Captura os campos
            let nome = document.querySelector("#nome");
            let email = document.querySelector("#email");
            let cpf = document.querySelector("#cpf");
            let telefone = document.querySelector("#telefone");
            let cep = document.querySelector("#CEP");
            let senha = document.querySelector("#senha");
            let termos = document.querySelector("#termos");

            // Validações simples
            if (nome.value.length < 3) {
                alert("Digite um nome com pelo menos 3 letras!");
                nome.focus();
                return;
            }

            if (!email.value.includes("@")) {
                alert("Digite um e-mail válido!");
                email.focus();
                return;
            }

            if (cpf.value.length < 11) {
                alert("Digite um CPF com 11 números!");
                cpf.focus();
                return;
            }

            if (telefone.value.length < 10) {
                alert("Digite um telefone válido!");
                telefone.focus();
                return;
            }

            if (cep.value.length < 8) {
                alert("Digite um CEP com 8 números!");
                cep.focus();
                return;
            }

            if (senha.value.length < 6) {
                alert("A senha precisa ter pelo menos 6 caracteres!");
                senha.focus();
                return;
            }

            if (!termos.checked) {
                alert("Você precisa aceitar os termos!");
                return;
            }

            alert("✅ Cadastro realizado com sucesso!");
            formCadastro.reset();
        });
    }

    // ======== RECUPERAÇÃO DE SENHA ========
    let formRecupera = document.querySelector("form[action='#'][method='post'] input[type='email']");
    if (formRecupera) {
        let form = document.querySelector("form");
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            let email = document.querySelector("input[type='email']");

            if (!email.value.includes("@")) {
                alert("Digite um e-mail válido!");
                email.focus();
                return;
            }

            alert("✅ Link de recuperação enviado para seu e-mail!");
            form.reset();
        });
    }

    // ======== MÁSCARAS SIMPLES ========
    // Adiciona pontuação automaticamente no CPF, telefone e CEP
    let cpf = document.querySelector("#cpf");
    if (cpf) {
        cpf.addEventListener("input", function() {
            cpf.value = cpf.value
                .replace(/\D/g, "") // remove o que não for número
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        });
    }

    let tel = document.querySelector("#telefone");
    if (tel) {
        tel.addEventListener("input", function() {
            tel.value = tel.value
                .replace(/\D/g, "")
                .replace(/^(\d{2})(\d)/g, "($1) $2")
                .replace(/(\d{5})(\d{4})$/, "$1-$2");
        });
    }

    let cep = document.querySelector("#CEP");
    if (cep) {
        cep.addEventListener("input", function() {
            cep.value = cep.value
                .replace(/\D/g, "")
                .replace(/(\d{5})(\d)/, "$1-$2");
        });
    }

    // ======== EFEITO NOS BOTÕES ========
    let botoes = document.querySelectorAll("button, input[type='submit'], input[type='reset']");
    botoes.forEach(function(botao) {
        // Quando o mouse passa em cima
        botao.addEventListener("mouseover", function() {
            botao.style.backgroundColor = "#b7ddf7"; // cor de destaque
            botao.style.color = "white";
            botao.style.transform = "scale(1.05)"; // aumenta um pouco
        });

        // Quando o mouse sai
        botao.addEventListener("mouseout", function() {
            botao.style.backgroundColor = "";
            botao.style.color = "";
            botao.style.transform = "scale(1)";
        });

        // Quando o botão é clicado
        botao.addEventListener("mousedown", function() {
            botao.style.transform = "scale(0.95)"; // encolhe levemente
        });
    });
});
