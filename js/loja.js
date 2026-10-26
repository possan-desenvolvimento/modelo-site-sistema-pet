document.addEventListener("DOMContentLoaded", () => {
    
    // 1. LÓGICA DE FILTRO DE CATEGORIA
    window.filtrarProdutos = function(categoria) {
        // Atualiza o botão ativo
        document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Mostra ou esconde os produtos
        const produtos = document.querySelectorAll('.card-produto');
        produtos.forEach(produto => {
            if (categoria === 'todos' || produto.getAttribute('data-categoria') === categoria) {
                produto.style.display = 'flex';
            } else {
                produto.style.display = 'none';
            }
        });
    }

    // 2. LÓGICA DE COMPRA (WHATSAPP)
    window.comprarProduto = function(nomeProduto, preco) {
        const telefonePetshop = "5511964801185"; 
        
        const precoFormatado = preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        const mensagem = `Olá! Vi o site e gostaria de comprar o seguinte produto:\n\n*Produto:* ${nomeProduto}\n*Valor:* ${precoFormatado}\n\nAinda tem disponível?`;
        
        window.open(`https://wa.me/${telefonePetshop}?text=${encodeURIComponent(mensagem)}`, "_blank");
    }
});