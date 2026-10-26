document.addEventListener("DOMContentLoaded", () => {
    // Verifica se o usuário está logado como admin
    if (sessionStorage.getItem("petAdminLogado") !== "true") {
        alert(window.PetIdiomas.traduzir("Acesso negado. Faça login primeiro."));
        window.location.href = "../index.html"; // Volta para o login
    }
});

function sairAdmin() {
    sessionStorage.removeItem("petAdminLogado");
    window.location.href = "../index.html";
}

function consultarDados() {
    const mes = document.getElementById("selectMes").value;
    const ano = document.getElementById("selectAno").value;
    
    // Simula um carregamento
    const btn = document.querySelector(".btn-consultar");
    btn.innerText = "Consultando...";
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = "Consultar";
        btn.disabled = false;
        alert(window.PetIdiomas.traduzir(`Dados atualizados para ${mes}/${ano}!`));
        // Aqui no futuro você faria a chamada para o back-end
    }, 800);
}