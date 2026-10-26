(() => {
    "use strict";

    const chave = "petshop.preferencias.v1";
    const padrao = { nome: "Administrador", foto: "", cor: "#00bcd4", corEscura: "#008ba3", idioma: "pt" };
    const temas = {
        "#00bcd4": "#008ba3", "#2ecc71": "#27ae60", "#9b59b6": "#8e44ad",
        "#f39c12": "#d68910", "#e74c3c": "#c0392b"
    };
    let preferencias = { ...padrao };

    function validar(dados) {
        if (!dados || typeof dados !== "object" ||
            typeof dados.nome !== "string" || !dados.nome.trim() || dados.nome.length > 80 ||
            typeof dados.foto !== "string" || (dados.foto && !/^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(dados.foto)) ||
            !Object.hasOwn(temas, dados.cor) || temas[dados.cor] !== dados.corEscura ||
            !["pt", "en", "es"].includes(dados.idioma)) {
            throw new Error("As preferências salvas são inválidas. Salve novamente suas configurações.");
        }
        return { nome: dados.nome.trim(), foto: dados.foto, cor: dados.cor, corEscura: dados.corEscura, idioma: dados.idioma };
    }

    function ler() {
        const salvo = localStorage.getItem(chave);
        if (salvo !== null) return validar(JSON.parse(salvo));
        const cor = localStorage.getItem("temaCor") || padrao.cor;
        return validar({
            nome: localStorage.getItem("nomeUsuario") || padrao.nome,
            foto: localStorage.getItem("fotoUsuario") || "",
            cor,
            corEscura: localStorage.getItem("temaCorEscura") || temas[cor],
            idioma: localStorage.getItem("idioma") || "pt"
        });
    }

    function informarErro(erro) {
        console.error("Falha nas preferências do navegador:", erro);
        const mensagem = "Não foi possível salvar ou carregar as configurações. Verifique se o armazenamento do navegador está liberado e possui espaço.";
        const status = document.getElementById("statusConfiguracoes");
        if (status) {
            status.textContent = mensagem;
            status.dataset.erro = "true";
        } else {
            alert(window.PetIdiomas.traduzir(mensagem));
        }
    }

    function aplicar() {
        const raiz = document.documentElement;
        raiz.style.setProperty("--primary-color", preferencias.cor);
        raiz.style.setProperty("--primary-dark", preferencias.corEscura);
        document.querySelectorAll(".user-info > span").forEach((elemento) => {
            elemento.dataset.naoTraduzir = "";
            const saudacao = { pt: "Olá", en: "Hello", es: "Hola" }[preferencias.idioma];
            const nome = preferencias.nome === padrao.nome
                ? window.PetIdiomas.traduzir(padrao.nome, preferencias.idioma) : preferencias.nome;
            elemento.textContent = `${saudacao}, ${nome}`;
        });
        document.querySelectorAll(".user-info .avatar, #fotoPreview").forEach((avatar) => {
            avatar.dataset.naoTraduzir = "";
            avatar.textContent = preferencias.foto ? "" : [...preferencias.nome][0].toUpperCase();
            avatar.style.backgroundImage = preferencias.foto ? `url("${preferencias.foto}")` : "";
            avatar.style.backgroundSize = "cover";
            avatar.style.backgroundPosition = "center";
            avatar.setAttribute("aria-label", preferencias.nome);
        });
        window.PetIdiomas.aplicar(preferencias.idioma);
        document.dispatchEvent(new CustomEvent("preferenciasalteradas", { detail: { ...preferencias } }));
    }

    function salvar(alteracoes) {
        try {
            const atualizadas = validar({ ...preferencias, ...alteracoes });
            localStorage.setItem(chave, JSON.stringify(atualizadas));
            preferencias = atualizadas;
        } catch (erro) {
            informarErro(erro);
            return false;
        }
        aplicar();
        return true;
    }

    window.PetPreferencias = {
        obter: () => ({ ...preferencias }),
        salvar,
        informarErro
    };

    document.addEventListener("DOMContentLoaded", () => {
        try {
            preferencias = ler();
        } catch (erro) {
            informarErro(erro);
        }
        aplicar();
    });
    window.addEventListener("storage", (evento) => {
        if (evento.key !== chave && evento.key !== null) return;
        try {
            preferencias = ler();
            aplicar();
        } catch (erro) {
            informarErro(erro);
        }
    });
})();
