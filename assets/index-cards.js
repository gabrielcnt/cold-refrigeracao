
let produtos = [];

function carregarProdutos() {
    fetch('assets/produtos.json')
        .then(response => response.json())
        .then(data => {
            produtos = data;
            exibirProdutos(produtos);
        });
}

function exibirProdutos(produtos) {
    const container = document.getElementById('container-cards');
    container.innerHTML = '';

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = produto.imagem;
        img.alt = produto.nome;

        const titulo = document.createElement('h3');
        titulo.textContent = produto.nome;

        card.addEventListener('click', () => abrirProduto(produto.id));

        card.appendChild(img);
        card.appendChild(titulo);
        container.appendChild(card);
    });
}