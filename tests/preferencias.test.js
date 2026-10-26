const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const vm = require("node:vm");

const chave = "petshop.preferencias.v1";

function ambiente(iniciais = {}) {
    const armazenamento = new Map(Object.entries(iniciais));
    const eventosDocumento = new Map();
    const eventosJanela = new Map();
    const erros = [];
    const propriedades = new Map();
    const status = { textContent: "", dataset: {} };
    const contexto = {
        console: { error: (...dados) => erros.push(dados) },
        localStorage: {
            getItem: (nome) => armazenamento.get(nome) ?? null,
            setItem: (nome, valor) => armazenamento.set(nome, valor)
        },
        document: {
            documentElement: { style: { setProperty: (nome, valor) => propriedades.set(nome, valor) } },
            querySelectorAll: () => [],
            createTreeWalker: () => ({ nextNode: () => false }),
            getElementById: (id) => id === "statusConfiguracoes" ? status : null,
            addEventListener: (nome, executar) => eventosDocumento.set(nome, executar),
            dispatchEvent: (evento) => eventosDocumento.get(evento.type)?.(evento)
        },
        addEventListener: (nome, executar) => eventosJanela.set(nome, executar),
        MutationObserver: class { observe() {} disconnect() {} },
        CustomEvent: class { constructor(type, dados) { this.type = type; this.detail = dados.detail; } },
        NodeFilter: { SHOW_TEXT: 4 },
        alert: (mensagem) => erros.push(mensagem)
    };
    contexto.window = contexto;
    vm.createContext(contexto);
    for (const arquivo of ["idiomas.js", "preferencias.js"]) {
        vm.runInContext(readFileSync(resolve(__dirname, "../js", arquivo), "utf8"), contexto);
    }
    eventosDocumento.get("DOMContentLoaded")();
    return { contexto, armazenamento, erros, propriedades, status, eventosJanela };
}

test("salva as quatro preferências e restaura em uma nova página", () => {
    const app = ambiente();
    const foto = "data:image/png;base64,YWJj";
    assert.equal(app.contexto.PetPreferencias.salvar({
        nome: "Leonardo", foto, cor: "#9b59b6", corEscura: "#8e44ad", idioma: "en"
    }), true);
    const novaPagina = ambiente(Object.fromEntries(app.armazenamento));
    const preferencias = novaPagina.contexto.PetPreferencias.obter();
    assert.equal(preferencias.nome, "Leonardo");
    assert.equal(preferencias.foto, foto);
    assert.equal(novaPagina.propriedades.get("--primary-color"), "#9b59b6");
    assert.equal(novaPagina.contexto.document.documentElement.lang, "en-US");
});

test("recupera as chaves antigas sem perder o perfil", () => {
    const app = ambiente({ nomeUsuario: "Maria", temaCor: "#2ecc71", temaCorEscura: "#27ae60", fotoUsuario: "data:image/jpeg;base64,YWJj" });
    assert.equal(app.contexto.PetPreferencias.obter().nome, "Maria");
    assert.equal(app.contexto.PetPreferencias.obter().foto, "data:image/jpeg;base64,YWJj");
    assert.equal(app.propriedades.get("--primary-color"), "#2ecc71");
});

test("não anuncia sucesso nem aplica alterações se a cota estiver esgotada", () => {
    const app = ambiente();
    app.contexto.localStorage.setItem = () => { throw new Error("QuotaExceededError"); };
    assert.equal(app.contexto.PetPreferencias.salvar({ nome: "Não salvo" }), false);
    assert.equal(app.contexto.PetPreferencias.obter().nome, "Administrador");
    assert.equal(app.status.dataset.erro, "true");
    assert.equal(app.armazenamento.has(chave), false);
    assert.equal(app.erros.length, 1);
});

test("avisa sobre dados corrompidos e permite recuperá-los salvando novamente", () => {
    const app = ambiente({ [chave]: "JSON inválido" });
    assert.equal(app.erros.length, 1);
    assert.equal(app.contexto.PetPreferencias.salvar({ nome: "Recuperado" }), true);
    assert.equal(JSON.parse(app.armazenamento.get(chave)).nome, "Recuperado");
});

test("rejeita nome vazio, idioma desconhecido e fotos não suportadas", () => {
    const app = ambiente();
    for (const valor of [{ nome: "  " }, { idioma: "fr" }, { foto: "https://example.com/avatar.svg" }]) {
        assert.equal(app.contexto.PetPreferencias.salvar(valor), false);
    }
    assert.equal(app.armazenamento.has(chave), false);
});

test("sincroniza alterações de outra aba e restaura os padrões ao limpar", () => {
    const app = ambiente();
    const dados = { ...app.contexto.PetPreferencias.obter(), nome: "Outra aba", idioma: "es" };
    app.armazenamento.set(chave, JSON.stringify(dados));
    app.eventosJanela.get("storage")({ key: chave });
    assert.equal(app.contexto.PetPreferencias.obter().nome, "Outra aba");
    assert.equal(app.contexto.document.documentElement.lang, "es");
    app.armazenamento.clear();
    app.eventosJanela.get("storage")({ key: null });
    assert.equal(app.contexto.PetPreferencias.obter().nome, "Administrador");
});

test("traduz interface e rótulos dinâmicos sem mudar dados desconhecidos", () => {
    const { contexto } = ambiente();
    const traduzir = contexto.PetIdiomas.traduzir;
    assert.equal(traduzir("Configurações", "en"), "Settings");
    assert.equal(traduzir("Visão Geral", "es"), "Vista general");
    assert.equal(traduzir("Exibindo 3 de 5 produtos", "en"), "Showing 3 of 5 products");
    assert.equal(traduzir("Outubro 2026", "es"), "Octubre 2026");
    assert.equal(traduzir("Seg (Out)", "en"), "Mon (Oct)");
    assert.equal(traduzir("Nome cadastrado pelo cliente", "es"), "Nome cadastrado pelo cliente");
    assert.equal(traduzir("Configurações", "pt"), "Configurações");
});
