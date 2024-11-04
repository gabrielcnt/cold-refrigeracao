function getProdutoId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Função para mostrar a animação de carregamento
function mostrarLoading() {
    document.querySelector('.loading').style.opacity = '1'; // Mostra a animação
    document.querySelector('main').style.opacity = '0'; // Oculta o conteúdo principal
    document.querySelector('footer').style.opacity = '0'; // Oculta o conteúdo principal
}

// Função para ocultar a animação de carregamento
function ocultarLoading() {
    document.querySelector('.loading').style.display = 'none'; // Oculta a animação
    document.querySelector('main').style.opacity = '1'; // Mostra o conteúdo principal
    document.querySelector('footer').style.opacity = '1'; // Mostra o conteúdo principal
}

// Função para carregar e exibir o produto no detalhes.html
async function carregarProduto() {
    mostrarLoading(); // Mostra a animação antes de carregar

    const id = getProdutoId(); // Obtém o ID da URL
    setTimeout(async () => {
        try {
            const response = await fetch('assets/produtos.json'); // Carrega o JSON
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }

            const produtos = await response.json(); // Converte a resposta em um objeto JavaScript
            const produto = produtos.find(p => p.id === id); // Encontra o produto pelo ID

            if (produto) {
                // Preenche os elementos da página com os dados do produto
                document.getElementById('produto-imagem').src = produto.imagem;
                document.getElementById('produto-nome').textContent = produto.nome;
                document.getElementById('produto-id').textContent = produto.id;
                document.getElementById('produto-capacidade').textContent = produto.capacidade;
                document.getElementById('produto-gas').textContent = produto["gas-refrigerante"];
                document.getElementById('produto-tecnologia').textContent = produto.tecnologia;

                preencherLojas(produto); // Preenche os dados das lojas, se houver

                ocultarLoading(); // Oculte a animação após o carregamento
            } else {
                alert('Produto não encontrado!');
                ocultarLoading(); // Oculte a animação em caso de erro
            }
        } catch (error) {
            console.error('Erro ao carregar produto:', error);
            ocultarLoading(); // Oculte a animação em caso de erro
        }
    }, 1500);
}

function preencherLojas(produto) {
    const lojasContainer = document.getElementById('lojas'); // Contêiner onde as divs de lojas serão inseridas
    lojasContainer.innerHTML = ''; // Limpa qualquer conteúdo existente

    // Percorre cada loja no produto
    for (const [lojaNome, lojaInfo] of Object.entries(produto.lojas)) {
        // Cria o elemento de loja
        const lojaDiv = document.createElement('div');
        lojaDiv.classList.add('lj'); // Adiciona a classe 'lj'

        // Cria o logo da loja
        const logoDiv = document.createElement('div');
        logoDiv.classList.add('logol');
        const logoImg = document.createElement('img');
        logoImg.src = lojaInfo.logo;
        logoImg.alt = `Logo ${lojaNome}`;
        logoDiv.appendChild(logoImg);

        // Cria a informação de pagamento à vista
        const avistaDiv = document.createElement('div');
        avistaDiv.classList.add('avista');
        avistaDiv.innerHTML = `<p>À vista por<br><span>${lojaInfo.avista}</span></p>`;

        // Cria a informação de pagamento no cartão
        const cartaoDiv = document.createElement('div');
        cartaoDiv.classList.add('cartao');
        cartaoDiv.innerHTML = `<p>ou <span>${lojaInfo.cartao}</span></p>`;

        // Cria o botão de link para a loja
        const linkDiv = document.createElement('div');
        linkDiv.classList.add('link');
        linkDiv.innerHTML = `<p>ir à loja</p>`;
        linkDiv.addEventListener('click', () => {
            window.open(lojaInfo.link, '_blank'); // Abre o link em uma nova aba
        });

        // Adiciona todos os elementos à div da loja
        lojaDiv.appendChild(logoDiv);
        lojaDiv.appendChild(avistaDiv);
        lojaDiv.appendChild(cartaoDiv);
        lojaDiv.appendChild(linkDiv);

        // Adiciona a loja ao contêiner
        lojasContainer.appendChild(lojaDiv);
    }
}
// Executa a função quando a página é carregada
document.addEventListener('DOMContentLoaded', carregarProduto);