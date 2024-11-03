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

// Função para preencher os dados das lojas

function preencherLojas() {
    fetch('produtos.json')
        .then(response => response.json())
        .then(lojas => {
            const container = document.getElementById('lojas');
            container.innerHTML = '';

            produtos.forEach(produto=> {
                const loja = document.createElement('div')
                loja.classList.add('lj');
        
                const img = document.createElement('logo')
                img.src = produto.imagem;
                img.alt = produto.nome;
        
                const aVista = document.createElement('span');
                avista.textContent = produto.avista;
        
                const parcelado = document.createElement('span');
                cartao.textContent = produto.cartao;
        
                loja.appendChild(img);
                loja.appendChild(titulo);
                container.appendChild(card);
        
            })
        })


    
}

// Executa a função quando a página é carregada
document.addEventListener('DOMContentLoaded', carregarProduto);