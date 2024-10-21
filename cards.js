

function carregar(){
    fetch('produtos.json')
        .then(Response => Response.json())
        .then(produtos => {
            const container = document.querySelector("#produtos-container")
            
            produtos.forEach(produto => {
                const card = document.createElement('div');
                card.classList.add('card');

                const imagem = document.createElement('img');
                imagem.src = produto.imagem;
                imagem.alt = produto.nome;
                
                const titulo = document.createElement('h3');
                titulo.textContent = produto.nome;

                const botao = document.createElement('div');
                botao.classList.add('btnpreços');
                botao.textContent = 'Ver Preços';

                
                card.appendChild(imagem);
                card.appendChild(titulo);
                card.appendChild(botao);
                container.appendChild(card);
            })
        })
}
carregar()

function aplicarFiltros(){
    const capacidade = document.getElementById('filtro-btu').value;
    const tipo = document.getElementById('filtro-tipo').value;
    const marca = document.getElementById('filtro-marca').value;

    fetch('produtos.json')
    .then(response => response.json())
    .then(produtos => {
        let filtrados = produtos;

        if (capacidade) {
            filtrados = filtrados.filter(produto => produto.btu == capacidade);
        }
        if (tipo) {
            filtrados = filtrados.filter(produto => produto.tipo == tipo);
        }
        if (marca) {
            filtrados = filtrados.filter(produto => produto.marca == marca);
        }
        exibirProdutos(filtrados)
    });
}

function exibirProdutos(produtos) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';

    produtos.forEach(produto => {
        const card = document.createElement('div')
        card.classList.add('card')

        const img = document.createElement('img')
        img.src = produto.imagem
        img.alt = produto.nome

        const titulo = document.createElement('h3')
        titulo.textContent = produto.nome

        card.appendChild(img);
        card.appendChild(titulo);
        container.appendChild(card);
    })
}
document.querySelector('.filtros').addEventListener('change', aplicarFiltros);
