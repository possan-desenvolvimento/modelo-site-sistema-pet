document.addEventListener("DOMContentLoaded", () => {
    let diaSelecionado = null;
    let horarioSelecionado = null;

    // ==========================================
    // 1. GERAR CALENDÁRIO DE DIAS (Seg a Sáb)
    // ==========================================
    const calendarioDias = document.getElementById("calendarioDias");
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    let dataAtual = new Date();
    let diasAdicionados = 0;

    // Gera os próximos 10 dias úteis
    while (diasAdicionados < 10) { 
        dataAtual.setDate(dataAtual.getDate() + 1);
        
        // Pula domingo (0)
        if (dataAtual.getDay() === 0) continue;

        const diaSemanaTexto = diasSemana[dataAtual.getDay()];
        const diaNumero = dataAtual.getDate();
        const mesTexto = meses[dataAtual.getMonth()];

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "dia-btn";
        btn.innerHTML = `<span class="semana">${diaSemanaTexto} (${mesTexto})</span><span class="numero">${diaNumero}</span>`;
        
        // Guarda a data real no botão para usar depois
        btn.dataset.dataCompleta = dataAtual.toLocaleDateString('pt-BR');
        
        btn.onclick = () => {
            document.querySelectorAll('.dia-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            diaSelecionado = btn.dataset.dataCompleta;
            
            // Quando escolhe o dia, gera os horários para aquele dia
            gerarHorarios();
            verificarFormulario();
        };

        calendarioDias.appendChild(btn);
        diasAdicionados++;
    }

    // ==========================================
    // 2. GERAR HORÁRIOS (09h às 17h)
    // ==========================================
    const gridHorarios = document.getElementById("gridHorarios");
    const horariosBase = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

    function gerarHorarios() {
        gridHorarios.innerHTML = ""; // Limpa os horários antigos
        horarioSelecionado = null; // Reseta a escolha

        horariosBase.forEach(horario => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "horario-btn";
            btn.innerText = horario;

            // SIMULAÇÃO DE HORÁRIOS INDISPONÍVEIS (Mock)
            // Gera um número de 0 a 3. Se for 0 ou 1, o horário está lotado.
            const sorteio = Math.floor(Math.random() * 4); 
            if (sorteio === 0 || sorteio === 1) { 
                btn.disabled = true;
                btn.title = "Horário Lotado";
            } else {
                btn.onclick = () => {
                    document.querySelectorAll('.horario-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    horarioSelecionado = horario;
                    verificarFormulario();
                };
            }

            gridHorarios.appendChild(btn);
        });
    }

    // ==========================================
    // 3. MÁSCARA DE TELEFONE
    // ==========================================
    const telInput = document.getElementById("telCliente");
    telInput.addEventListener("input", (e) => {
        let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
        if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

        if (valor.length > 0) {
            valor = `(${valor.slice(0, 2)}) ` + valor.slice(2);
        }
        if (valor.length > 10) {
            valor = valor.slice(0, 10) + "-" + valor.slice(10);
        }
        e.target.value = valor;
    });

    // ==========================================
    // 4. VALIDAÇÃO DO FORMULÁRIO
    // ==========================================
    const nomeInput = document.getElementById("nomeCliente");
    const btnConfirmar = document.getElementById("btnConfirmar");

    function verificarFormulario() {
        const nome = nomeInput.value.trim();
        const tel = telInput.value.trim();

        // Só libera o botão se tiver nome, telefone válido, dia e horário escolhidos
        if (nome.length > 2 && tel.length >= 14 && diaSelecionado && horarioSelecionado) {
            btnConfirmar.disabled = false;
        } else {
            btnConfirmar.disabled = true;
        }
    }

    // Monitora a digitação no nome e telefone
    nomeInput.addEventListener("input", verificarFormulario);
    telInput.addEventListener("input", verificarFormulario);

    // ==========================================
    // 5. ENVIO DO AGENDAMENTO E POP-UP
    // ==========================================
    const form = document.getElementById("formAgendamento");
    const modalSucesso = document.getElementById("modalSucesso");
    const resumoAgendamento = document.getElementById("resumoAgendamento");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = nomeInput.value;
        const tel = telInput.value;
        const data = diaSelecionado;
        const hora = horarioSelecionado;

        // Mensagem formatada para o WhatsApp
        const mensagem = `Olá! Gostaria de confirmar meu agendamento:\n\n*Nome:* ${nome}\n*Telefone:* ${tel}\n*Data:* ${data}\n*Horário:* ${hora}\n\nAguardo a confirmação!`;

        // Mostra o pop-up bonito com o resumo
        resumoAgendamento.innerHTML = `Seu horário foi pré-reservado para <strong>${data}</strong> às <strong>${hora}</strong>.`;
        modalSucesso.style.display = "flex";

        // Abre o WhatsApp do Pet Shop
        const telefonePetshop = "5511964801185"; 
        
        // O timeout dá um tempo para a pessoa ver o pop-up antes do WhatsApp abrir
        setTimeout(() => {
            window.open(`https://wa.me/${telefonePetshop}?text=${encodeURIComponent(mensagem)}`, "_blank");
        }, 3000); // 3 segundos
    });

    // Fechar pop-up e limpar tudo
    window.fecharModalSucesso = function() {
        modalSucesso.style.display = "none";
        form.reset();
        btnConfirmar.disabled = true;
        
        // Limpa os selecionados
        document.querySelectorAll('.dia-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.horario-btn').forEach(b => b.classList.remove('active'));
        diaSelecionado = null;
        horarioSelecionado = null;
    }
});