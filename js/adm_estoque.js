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

// Futuras funções de pesquisa e edição podem entrar aqui