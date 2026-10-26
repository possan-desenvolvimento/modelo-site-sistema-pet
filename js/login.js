document.addEventListener("DOMContentLoaded", () => {
    
    // 1. AÇÕES DA TELA DE ESCOLHA
    window.acessarCliente = function() {
        // Redireciona para a página do cliente que está dentro da pasta 'pages'
        window.location.href = "pages/cliente.html"; 
    }

    window.mostrarLoginAdmin = function() {
        document.getElementById("titulo-boas-vindas").innerText = "Acesso Restrito";
        document.getElementById("subtitulo-boas-vindas").innerText = "Área exclusiva para administradores.";
        
        document.getElementById("etapa-escolha").classList.replace("etapa-ativa", "etapa-escondida");
        document.getElementById("etapa-admin").classList.replace("etapa-escondida", "etapa-ativa");
    }

    window.voltarParaEscolha = function() {
        document.getElementById("titulo-boas-vindas").innerText = "Bem-vindo ao Pet Shop";
        document.getElementById("subtitulo-boas-vindas").innerText = "Como você deseja acessar o sistema?";
        
        document.getElementById("loginForm").reset();
        document.getElementById("error-message").textContent = "";
        
        document.getElementById("etapa-admin").classList.replace("etapa-ativa", "etapa-escondida");
        document.getElementById("etapa-escolha").classList.replace("etapa-escondida", "etapa-ativa");
    }

    // 2. LÓGICA DO LOGIN
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message");

    const USER_ADMIN = "lpautomacoes";
    const PASS_ADMIN = "@Sucesso2026";

    if(loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            errorMessage.textContent = "";

            if (username === USER_ADMIN && password === PASS_ADMIN) {
                sessionStorage.setItem("petAdminLogado", "true");
                // Redireciona para a página do ADM dentro da pasta pages
                window.location.href = "pages/adm.html";
            } else {
                errorMessage.textContent = "Usuário ou senha incorretos.";
                const card = document.querySelector(".login-card");
                card.style.transform = "translateX(5px)";
                setTimeout(() => card.style.transform = "translateX(-5px)", 50);
                setTimeout(() => card.style.transform = "translateX(5px)", 100);
                setTimeout(() => card.style.transform = "translateX(0)", 150);
            }
        });
    }
});