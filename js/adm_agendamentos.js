document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica Login
    if (sessionStorage.getItem("petAdminLogado") !== "true") {
        alert(window.PetIdiomas.traduzir("Acesso negado. Faça login primeiro."));
        window.location.href = "../index.html";
    }

    // 2. Configura a data de hoje no painel da direita
    const dataHoje = new Date();
    const diaHoje = String(dataHoje.getDate()).padStart(2, '0');
    const mesHoje = String(dataHoje.getMonth() + 1).padStart(2, '0');
    document.getElementById("dataHoje").innerText = `${diaHoje}/${mesHoje}`;

    // ==========================================
    // 3. LÓGICA DO CALENDÁRIO DINÂMICO
    // ==========================================
    
    // Variáveis de controle do calendário
    let dataCalendario = new Date(); // Começa com a data de hoje
    const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    function renderizarCalendario() {
        const grid = document.getElementById("calendarioGrid");
        const titulo = document.getElementById("mesAnoAtual");
        
        // Limpa os dias antigos (mantém apenas os nomes dos dias da semana que estão no HTML)
        // A forma mais fácil é limpar os filhos que NÃO têm a classe 'dia-semana'
        const diasAntigos = grid.querySelectorAll('.dia-mes');
        diasAntigos.forEach(dia => dia.remove());

        // Pega o mês e ano atual do controle
        const mes = dataCalendario.getMonth();
        const ano = dataCalendario.getFullYear();

        // Atualiza o título (Ex: Outubro 2026)
        titulo.innerText = `${mesesNomes[mes]} ${ano}`;

        // Descobre o primeiro dia da semana do mês (0 = Dom, 1 = Seg...)
        const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
        
        // Descobre quantos dias o mês tem
        // O dia 0 do próximo mês é o último dia do mês atual
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();

        // Cria os dias vazios antes do dia 1
        for (let i = 0; i < primeiroDiaSemana; i++) {
            const divVazia = document.createElement("div");
            divVazia.classList.add("dia-mes", "vazio");
            grid.appendChild(divVazia);
        }

        // Cria os dias do mês
        for (let dia = 1; dia <= diasNoMes; dia++) {
            const divDia = document.createElement("div");
            divDia.classList.add("dia-mes");
            divDia.innerText = dia;

            // Verifica se esse dia é o "Hoje" para pintar de azul
            const isHoje = dia === dataHoje.getDate() && mes === dataHoje.getMonth() && ano === dataHoje.getFullYear();
            if (isHoje) {
                divDia.classList.add("hoje");
            }

            // Adiciona o evento de clique para selecionar o dia
            divDia.addEventListener('click', () => {
                document.querySelectorAll('.dia-mes').forEach(d => d.classList.remove('hoje'));
                divDia.classList.add('hoje');
                // Aqui no futuro você pode carregar os agendamentos desse dia específico
            });

            grid.appendChild(divDia);
        }
    }

    // Função chamada pelos botões < e >
    window.mudarMes = function(direcao) {
        // direcao é -1 para voltar e 1 para avançar
        dataCalendario.setMonth(dataCalendario.getMonth() + direcao);
        renderizarCalendario();
    }

    // Renderiza o calendário pela primeira vez ao carregar a tela
    renderizarCalendario();
});

function sairAdmin() {
    sessionStorage.removeItem("petAdminLogado");
    window.location.href = "../index.html";
}