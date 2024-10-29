let produtos = [];

// Função para carregar produtos
function carregarProdutos() {
    fetch('assets/produtos.json')
        .then(response => response.json())
        .then(data => {
            produtos = data;
            exibirProdutos(produtos);
        });
}

// Função para coletar valores selecionados de checkboxes
function getCheckedValues(classe) {
    const checkboxes = document.querySelectorAll(`.${classe}:checked`);
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// Função para aplicar filtros
function aplicarFiltros() {
    const capacidades = getCheckedValues('filtro-btu');
    const tipos = getCheckedValues('filtro-tipo');
    const marcas = getCheckedValues('filtro-marca');

    let filtrados = produtos;

    if (capacidades.length > 0) {
        filtrados = filtrados.filter(produto => capacidades.includes(produto.btu.toString()));
    }
    if (tipos.length > 0) {
        filtrados = filtrados.filter(produto => tipos.includes(produto.tipo));
    }
    if (marcas.length > 0) {
        filtrados = filtrados.filter(produto => marcas.includes(produto.marca));
    }

    exibirProdutos(filtrados);

    // Exibe o botão de resetar se houver filtros aplicados
    document.getElementById('resetar-filtros').style.display =
        (capacidades.length || tipos.length || marcas.length) ? 'block' : 'none';
}

// Função para exibir produtos
function exibirProdutos(produtos) {
    const container = document.getElementById('produtos-container');
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

// Função para resetar filtros
document.getElementById('resetar-filtros').addEventListener('click', function () {
    document.querySelectorAll('.filtros input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    exibirProdutos(produtos);
    this.style.display = 'none';
});

// Event listener para aplicar filtros
document.querySelector('.filtros').addEventListener('change', aplicarFiltros);

// Carrega os produtos ao iniciar
carregarProdutos();

function abrirProduto(id){

    window.location.href = `detalhes.html?id=${id}`;
}
