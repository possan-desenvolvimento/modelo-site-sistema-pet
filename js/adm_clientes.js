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

// Variável para guardar o telefone de quem está recebendo a mensagem
let telefoneDestinatario = "";

// Função que abre o modal preenchendo os dados
window.abrirModalDisparo = function(nomeCliente, telefone, nomePet) {
    // Guarda o telefone para a hora do envio
    telefoneDestinatario = telefone;

    // Separa o primeiro nome do cliente para a mensagem ficar mais amigável
    const primeiroNome = nomeCliente.split(" ")[0];

    // Preenche o modal
    document.getElementById("nomeDestinatario").innerText = nomeCliente;
    document.getElementById("nomeMensagem").innerText = primeiroNome;
    document.getElementById("nomePet").innerText = nomePet;

    // Mostra o modal
    document.getElementById("modalDisparo").style.display = "flex";
}

// Função para fechar o modal
window.fecharModalDisparo = function() {
    document.getElementById("modalDisparo").style.display = "none";
}

// Fecha se clicar fora
window.onclick = function(event) {
    const modal = document.getElementById("modalDisparo");
    if (event.target == modal) {
        fecharModalDisparo();
    }
}

// Função que realmente abre o WhatsApp (Simulação de disparo)
window.enviarWhatsApp = function() {
    const nomePet = document.getElementById("nomePet").innerText;
    const primeiroNome = document.getElementById("nomeMensagem").innerText;

    // Cria a mensagem real para enviar
    const mensagem = `Olá, ${primeiroNome}! Sentimos sua falta por aqui. 🐾\n\nQue tal trazer a(o) ${nomePet} para um banho nesta semana?\n\nPreparamos um cupom especial de *15% de desconto* para vocês!\n\nClique aqui para agendar: [Link do Site]`;

    // Limpa o telefone (remove parênteses e traços) para o link do WhatsApp funcionar
    let numeroLimpo = telefoneDestinatario.replace(/\D/g, "");
    // Adiciona o 55 (Brasil) se não tiver
    if (numeroLimpo.length === 11) {
        numeroLimpo = "55" + numeroLimpo;
    }

    // Abre o WhatsApp em nova aba
    window.open(`https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}`, "_blank");
    
    // Fecha o modal
    fecharModalDisparo();
}