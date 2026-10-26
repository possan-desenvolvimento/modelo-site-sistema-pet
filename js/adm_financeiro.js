document.addEventListener("DOMContentLoaded", () => {
    // Verifica Login
    if (sessionStorage.getItem("petAdminLogado") !== "true") {
        alert(window.PetIdiomas.traduzir("Acesso negado. Faça login primeiro."));
        window.location.href = "../index.html";
    }
});

function sairAdmin() {
    sessionStorage.removeItem("petAdminLogado");
    window.location.href = "../index.html";
}

// Controle do Modal de Novo Lançamento
window.abrirModalLancamento = function() {
    document.getElementById("modalLancamento").style.display = "flex";
}

window.fecharModalLancamento = function() {
    document.getElementById("modalLancamento").style.display = "none";
}

// Fecha o modal se clicar fora
window.onclick = function(event) {
    const modal = document.getElementById("modalLancamento");
    if (event.target == modal) {
        fecharModalLancamento();
    }
}