document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. LÓGICA DO CARROSSEL
    // ==========================================
    const carousel = document.querySelector(".carousel");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
        carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => { currentIndex = (currentIndex + 1) % totalSlides; updateCarousel(); });
        prevBtn.addEventListener("click", () => { currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; updateCarousel(); });
    }

    // ==========================================
    // 2. LÓGICA DO MODAL DE ESCOLHA
    // ==========================================
    window.abrirModalEscolha = function() {
        document.getElementById("modalEscolha").style.display = "flex";
    }

    window.fecharModalEscolha = function() {
        document.getElementById("modalEscolha").style.display = "none";
    }

    // Fecha o modal se clicar fora dele
    window.onclick = function(event) {
        const modal = document.getElementById("modalEscolha");
        if (event.target == modal) {
            fecharModalEscolha();
        }
    }

    // ==========================================
    // 3. REDIRECIONAMENTOS DA LOJA E AGENDAMENTO
    // ==========================================
    window.irParaProdutos = function() {
        // Redireciona para o arquivo de produtos
        window.location.href = "loja.html"; 
    }

    window.irParaAgendamentos = function() {
        // Redireciona para o arquivo de agendamentos
        window.location.href = "agendamentos.html"; 
    }
});