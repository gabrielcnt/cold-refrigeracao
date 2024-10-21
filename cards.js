

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

let produtos = []; // Variável para armazenar a lista de produtos
let capacidade = null;
let tipo = null;
let marca = null;

// Função para carregar produtos do JSON
function carregarProdutos() {
    fetch('produtos.json')
        .then(response => response.json())
        .then(data => {
            produtos = data; // Armazena os produtos
            exibirProdutos(produtos); // Exibe todos os produtos ao carregar
        });
}

// Função para aplicar filtros
function aplicarFiltros() {
    const capacidade = document.getElementById('filtro-btu').value;
    const tipo = document.getElementById('filtro-tipo').value;
    const marca = document.getElementById('filtro-marca').value;

    let filtrados = produtos; // Começa com todos os produtos

    if (capacidade) {
        filtrados = filtrados.filter(produto => produto.btu == capacidade);
    }
    if (tipo) {
        filtrados = filtrados.filter(produto => produto.tipo == tipo);
    }
    if (marca) {
        filtrados = filtrados.filter(produto => produto.marca == marca);
    }

    exibirProdutos(filtrados); // Exibe os produtos filtrados

    // Exibe ou oculta o botão de resetar filtros
    document.getElementById('resetar-filtros').style.display = (filtrados.length < produtos.length) ? 'block' : 'none';
}

// Função para exibir produtos
function exibirProdutos(produtos) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = ''; // Limpa o container

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = produto.imagem;
        img.alt = produto.nome;

        const titulo = document.createElement('h3');
        titulo.textContent = produto.nome;

        card.appendChild(img);
        card.appendChild(titulo);
        container.appendChild(card);
        
    });
}

// Função para resetar filtros
document.getElementById('resetar-filtros').addEventListener('click', function() {
    // Reseta os valores de capacidade, tipo e marca
    document.getElementById('filtro-btu').value = '';
    document.getElementById('filtro-tipo').value = '';
    document.getElementById('filtro-marca').value = '';

    exibirProdutos(produtos); // Exibe todos os produtos

    this.style.display = 'none'; // Oculta o botão de resetar filtros
});

// Event listener para aplicar filtros
document.querySelector('.filtros').addEventListener('change', aplicarFiltros);

// Carrega os produtos ao iniciar
carregarProdutos();