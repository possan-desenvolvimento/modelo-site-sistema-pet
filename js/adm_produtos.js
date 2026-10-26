(() => {
    "use strict";

    const imagemPadrao = "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=120&h=120&fit=crop";
    const produtos = [
        { id: 1, nome: "Ração Premium Cães 10kg", categoria: "Rações", preco: 149.90, estoque: 25, codigo: "", imagem: imagemPadrao },
        { id: 2, nome: "Brinquedo Mordedor", categoria: "Brinquedos", preco: 35, estoque: 3, codigo: "", imagem: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=120&h=120&fit=crop" },
        { id: 3, nome: "Shampoo Neutro 500ml", categoria: "Higiene", preco: 29.90, estoque: 18, codigo: "", imagem: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=120&h=120&fit=crop" },
        { id: 4, nome: "Coleira Ajustável", categoria: "Acessórios", preco: 45.90, estoque: 22, codigo: "", imagem: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=120&h=120&fit=crop" },
        { id: 5, nome: "Petisco Natural 100g", categoria: "Petiscos", preco: 19.90, estoque: 35, codigo: "", imagem: "https://images.unsplash.com/photo-1582798358481-d199fb7347bb?w=120&h=120&fit=crop" }
    ];
    const porId = (id) => document.getElementById(id);
    const modal = porId("modalProduto");
    const formulario = porId("formProduto");
    const pesquisa = porId("pesquisaProduto");
    const codigo = porId("codigoBarras");
    const nome = porId("nomeProduto");
    const imagem = porId("imagemProduto");
    const abas = [porId("abaManual"), porId("abaScanner")];
    const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
    let editandoId = null;
    let proximoId = 6;
    let focoAnterior = null;
    let leitor = null;
    let desejaCamera = false;
    let filaCamera = Promise.resolve();

    function normalizar(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    function criarCelula(linha, texto, classe) {
        const celula = linha.insertCell();
        celula.textContent = texto;
        if (classe) celula.className = classe;
        return celula;
    }

    function renderizarProdutos() {
        const termo = normalizar(pesquisa.value.trim());
        const filtrados = produtos.filter((produto) =>
            normalizar(`${produto.nome} ${produto.categoria} ${window.PetIdiomas.traduzir(produto.categoria)} ${produto.codigo}`).includes(termo));
        const corpo = porId("produtosTabela");
        corpo.replaceChildren();
        filtrados.forEach((produto) => {
            const baixo = produto.estoque <= 5;
            const linha = corpo.insertRow();
            if (baixo) linha.className = "produto-alerta";
            const foto = document.createElement("img");
            foto.src = produto.imagem;
            foto.alt = produto.nome;
            foto.width = 46;
            foto.height = 46;
            foto.loading = "lazy";
            foto.addEventListener("error", () => {
                const substituto = document.createElement("span");
                substituto.className = "produto-sem-imagem";
                substituto.textContent = "🐾";
                substituto.setAttribute("role", "img");
                substituto.setAttribute("aria-label", `Imagem indisponível: ${produto.nome}`);
                foto.replaceWith(substituto);
            }, { once: true });
            criarCelula(linha, "").append(foto);
            const nomeCelula = criarCelula(linha, produto.nome, "produto-nome");
            if (produto.codigo) {
                const detalhe = document.createElement("span");
                detalhe.className = "produto-codigo";
                detalhe.textContent = `EAN: ${produto.codigo}`;
                nomeCelula.append(detalhe);
            }
            criarCelula(linha, produto.categoria);
            criarCelula(linha, moeda.format(produto.preco));
            criarCelula(linha, `${produto.estoque} un.`, baixo ? "produto-quantidade-baixa" : "");
            const tag = document.createElement("span");
            tag.className = baixo ? "produto-tag produto-tag-baixo" : "produto-tag";
            tag.textContent = baixo ? "Estoque baixo" : "Normal";
            criarCelula(linha, "").append(tag);
            const editar = document.createElement("button");
            editar.type = "button";
            editar.className = "produto-editar";
            editar.textContent = "Editar";
            editar.setAttribute("aria-label", `Editar ${produto.nome}`);
            editar.addEventListener("click", () => abrirModal(produto));
            criarCelula(linha, "").append(editar);
        });
        if (!filtrados.length) {
            const celula = criarCelula(corpo.insertRow(), "Nenhum produto encontrado. Tente outro termo.");
            celula.colSpan = 7;
        }
        porId("resultadoPesquisa").textContent = `Exibindo ${filtrados.length} de ${produtos.length} produtos`;
        porId("totalProdutos").textContent = produtos.length;
        porId("totalEstoque").textContent = produtos.reduce((total, produto) => total + produto.estoque, 0);
        porId("totalBaixo").textContent = produtos.filter((produto) => produto.estoque <= 5).length;
    }

    function eanValido(valor) {
        if (!/^\d{13}$/.test(valor)) return false;
        const soma = [...valor.slice(0, 12)].reduce((total, digito, indice) =>
            total + Number(digito) * (indice % 2 ? 3 : 1), 0);
        return (10 - soma % 10) % 10 === Number(valor[12]);
    }

    function statusCamera(mensagem, erro = false) {
        const status = porId("statusScanner");
        status.textContent = mensagem;
        status.classList.toggle("produtos-erro", erro);
    }

    async function sincronizarCamera() {
        if (!desejaCamera) {
            if (leitor && leitor.isScanning) {
                await leitor.stop();
                leitor.clear();
            }
            return;
        }
        if (leitor && leitor.isScanning) return;
        if (!window.isSecureContext) {
            statusCamera("A câmera precisa de HTTPS ou localhost. Use o cadastro manual neste endereço.", true);
            return;
        }
        if (typeof Html5Qrcode === "undefined") {
            statusCamera("Não foi possível carregar o leitor. Verifique sua conexão e recarregue a página, ou use o cadastro manual.", true);
            return;
        }
        statusCamera("Solicitando acesso à câmera…");
        if (!leitor) {
            leitor = new Html5Qrcode("leitorCodigo", {
                formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
                verbose: false
            });
        }
        try {
            await leitor.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: (largura, altura) => ({
                        width: Math.floor(largura * 0.85),
                        height: Math.floor(Math.min(altura * 0.65, 140))
                    })
                },
                (valor) => {
                    if (!desejaCamera || !modal.open) return;
                    if (!eanValido(valor)) {
                        statusCamera("Código inválido. Enquadre novamente um código EAN-13.", true);
                        return;
                    }
                    codigo.value = valor;
                    codigo.setCustomValidity("");
                    porId("sucessoLeitura").hidden = false;
                    selecionarAba(0);
                    abas[0].focus();
                }
            );
            if (!desejaCamera) {
                await leitor.stop();
                leitor.clear();
                return;
            }
            statusCamera("Câmera ativa. Aproxime o código de barras para ler.");
        } catch (erro) {
            console.error("Falha ao iniciar ou encerrar o leitor de produtos:", erro);
            if (leitor.isScanning) {
                await leitor.stop();
                leitor.clear();
            }
            if (desejaCamera) {
                statusCamera("Não foi possível abrir a câmera. Verifique a permissão, se há uma câmera conectada e se outro aplicativo está usando-a. Tente novamente ou use o cadastro manual.", true);
            }
        }
    }

    function atualizarCamera() {
        filaCamera = filaCamera.then(sincronizarCamera).catch((erro) => {
            console.error("Falha ao controlar a câmera de produtos:", erro);
            statusCamera("Não foi possível encerrar a câmera. Tente fechar novamente ou recarregue esta página para liberar a câmera.", true);
            porId("notificacaoProdutos").textContent = "Erro ao liberar a câmera. Reabra e feche o cadastro para tentar novamente ou recarregue a página.";
            porId("notificacaoProdutos").classList.add("produtos-erro");
        });
    }

    function selecionarAba(indice) {
        abas.forEach((aba, i) => {
            aba.setAttribute("aria-selected", String(i === indice));
            aba.tabIndex = i === indice ? 0 : -1;
        });
        porId("painelManual").hidden = indice !== 0;
        porId("painelScanner").hidden = indice !== 1;
        desejaCamera = indice === 1 && modal.open;
        atualizarCamera();
    }

    function abrirModal(produto = null) {
        focoAnterior = document.activeElement;
        editandoId = produto ? produto.id : null;
        formulario.reset();
        [codigo, nome, imagem].forEach((campo) => campo.setCustomValidity(""));
        porId("sucessoLeitura").hidden = true;
        porId("tituloModal").textContent = produto ? "Editar produto" : "Cadastrar produto";
        porId("salvarProduto").textContent = produto ? "Salvar alterações" : "Salvar produto";
        if (produto) {
            nome.value = produto.nome;
            codigo.value = produto.codigo;
            porId("categoriaProduto").value = produto.categoria;
            porId("precoProduto").value = produto.preco;
            porId("estoqueProduto").value = produto.estoque;
            imagem.value = produto.imagem;
        }
        selecionarAba(0);
        modal.showModal();
        nome.focus();
    }

    function fecharModal() {
        desejaCamera = false;
        atualizarCamera();
        modal.close();
    }

    porId("cadastrarProduto").addEventListener("click", () => abrirModal());
    porId("fecharModal").addEventListener("click", fecharModal);
    porId("cancelarProduto").addEventListener("click", fecharModal);
    modal.addEventListener("cancel", (evento) => {
        evento.preventDefault();
        fecharModal();
    });
    modal.addEventListener("close", () => {
        if (modal.open) return;
        desejaCamera = false;
        atualizarCamera();
        if (focoAnterior && focoAnterior.isConnected) focoAnterior.focus();
        else porId("cadastrarProduto").focus();
    });
    abas.forEach((aba, indice) => {
        aba.addEventListener("click", () => selecionarAba(indice));
        aba.addEventListener("keydown", (evento) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(evento.key)) return;
            evento.preventDefault();
            const destino = evento.key === "Home" ? 0 : evento.key === "End" ? 1 : 1 - indice;
            selecionarAba(destino);
            abas[destino].focus();
        });
    });
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            desejaCamera = false;
            atualizarCamera();
            statusCamera("Câmera pausada. Clique em Tentar câmera novamente para continuar.");
        }
    });
    porId("tentarCamera").addEventListener("click", () => {
        desejaCamera = modal.open && !porId("painelScanner").hidden;
        atualizarCamera();
    });
    window.addEventListener("pagehide", () => {
        desejaCamera = false;
        atualizarCamera();
    });
    pesquisa.addEventListener("input", renderizarProdutos);
    [codigo, nome, imagem].forEach((campo) => {
        campo.addEventListener("input", () => campo.setCustomValidity(""));
    });
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        nome.setCustomValidity(nome.value.trim() ? "" : window.PetIdiomas.traduzir("Informe o nome do produto."));
        const valorCodigo = codigo.value.trim();
        codigo.setCustomValidity(valorCodigo && !eanValido(valorCodigo) ? window.PetIdiomas.traduzir("Informe um EAN-13 válido com 13 dígitos.") : "");
        if (valorCodigo && produtos.some((produto) => produto.codigo === valorCodigo && produto.id !== editandoId)) {
            codigo.setCustomValidity(window.PetIdiomas.traduzir("Este código de barras já está cadastrado em outro produto."));
        }
        const valorImagem = imagem.value.trim();
        imagem.setCustomValidity(valorImagem && !/^https?:\/\//i.test(valorImagem) ? window.PetIdiomas.traduzir("Use uma URL de imagem HTTP ou HTTPS.") : "");
        if (!formulario.reportValidity()) return;
        const produto = {
            id: editandoId === null ? proximoId++ : editandoId,
            nome: nome.value.trim(),
            codigo: valorCodigo,
            categoria: porId("categoriaProduto").value,
            preco: Number(porId("precoProduto").value),
            estoque: Number(porId("estoqueProduto").value),
            imagem: valorImagem || imagemPadrao
        };
        if (editandoId === null) produtos.push(produto);
        else produtos[produtos.findIndex((item) => item.id === editandoId)] = produto;
        pesquisa.value = "";
        renderizarProdutos();
        porId("notificacaoProdutos").classList.remove("produtos-erro");
        porId("notificacaoProdutos").textContent = `${produto.nome}: ${editandoId === null ? "cadastrado" : "atualizado"} nesta demonstração.`;
        fecharModal();
    });

    renderizarProdutos();
})();
