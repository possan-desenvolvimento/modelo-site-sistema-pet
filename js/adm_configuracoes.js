document.addEventListener("DOMContentLoaded", () => {
    const nome = document.getElementById("inputNome");
    const arquivo = document.getElementById("inputFoto");
    const idioma = document.getElementById("selectIdioma");
    const status = document.getElementById("statusConfiguracoes");
    let leituraAtual = 0;

    function avisar(mensagem, erro = false) {
        status.textContent = mensagem;
        status.dataset.erro = String(erro);
    }

    function sincronizar() {
        const preferencias = window.PetPreferencias.obter();
        if (document.activeElement !== nome) nome.value = preferencias.nome;
        idioma.value = preferencias.idioma;
        document.querySelectorAll(".cor-opcao").forEach((botao) => {
            const ativo = botao.dataset.cor === preferencias.cor;
            botao.classList.toggle("ativo", ativo);
            botao.setAttribute("aria-pressed", String(ativo));
        });
        document.getElementById("removerFoto").disabled = !preferencias.foto;
    }

    function salvarNome() {
        nome.setCustomValidity(nome.value.trim() ? "" : window.PetIdiomas.traduzir("Informe um nome de exibição."));
        if (!nome.reportValidity()) return;
        if (window.PetPreferencias.salvar({ nome: nome.value.trim() })) {
            avisar("Configurações salvas neste navegador.");
        }
    }

    nome.addEventListener("input", () => {
        nome.setCustomValidity("");
        if (nome.value.trim()) salvarNome();
    });
    document.getElementById("salvarPerfil").addEventListener("click", salvarNome);
    document.querySelectorAll(".cor-opcao").forEach((botao) => {
        botao.addEventListener("click", () => {
            if (window.PetPreferencias.salvar({ cor: botao.dataset.cor, corEscura: botao.dataset.corEscura })) {
                avisar("Configurações salvas neste navegador.");
            }
        });
    });
    idioma.addEventListener("change", () => {
        if (window.PetPreferencias.salvar({ idioma: idioma.value })) {
            avisar("Configurações salvas neste navegador.");
        } else {
            idioma.value = window.PetPreferencias.obter().idioma;
        }
    });

    arquivo.addEventListener("change", async () => {
        const selecao = ++leituraAtual;
        const foto = arquivo.files[0];
        if (!foto) return;
        if (!["image/jpeg", "image/png"].includes(foto.type) || foto.size > 2 * 1024 * 1024) {
            avisar("Escolha uma imagem JPG ou PNG de até 2 MB.", true);
            arquivo.value = "";
            return;
        }
        try {
            const dados = await new Promise((resolve, reject) => {
                const leitor = new FileReader();
                leitor.onload = () => resolve(leitor.result);
                leitor.onerror = () => reject(leitor.error);
                leitor.readAsDataURL(foto);
            });
            const imagem = new Image();
            imagem.src = dados;
            await imagem.decode();
            const proporcao = Math.min(1, 256 / Math.max(imagem.naturalWidth, imagem.naturalHeight));
            const canvas = document.createElement("canvas");
            canvas.width = Math.max(1, Math.round(imagem.naturalWidth * proporcao));
            canvas.height = Math.max(1, Math.round(imagem.naturalHeight * proporcao));
            const contexto = canvas.getContext("2d");
            if (!contexto) throw new Error("Canvas indisponível para processar a foto.");
            contexto.drawImage(imagem, 0, 0, canvas.width, canvas.height);
            if (selecao !== leituraAtual) return;
            if (window.PetPreferencias.salvar({ foto: canvas.toDataURL(foto.type, 0.9) })) {
                avisar("Configurações salvas neste navegador.");
            }
        } catch (erro) {
            console.error("Falha ao ler a foto de perfil:", erro);
            avisar("Não foi possível ler esta imagem. Escolha outro arquivo JPG ou PNG.", true);
        } finally {
            if (selecao === leituraAtual) arquivo.value = "";
        }
    });
    document.getElementById("removerFoto").addEventListener("click", () => {
        leituraAtual++;
        if (window.PetPreferencias.salvar({ foto: "" })) avisar("Configurações salvas neste navegador.");
    });
    document.addEventListener("preferenciasalteradas", sincronizar);
    sincronizar();
});
