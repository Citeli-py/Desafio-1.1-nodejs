const Vertice = require('./Vertice');
const Poligono = require('./Poligono');
const prompt = require('prompt-sync')();

// Função auxiliar para ler um vértice do usuário
function lerVertice(numero) {
    const x = parseFloat(prompt(`Digite o valor de x do vértice ${numero}: `));
    const y = parseFloat(prompt(`Digite o valor de y do vértice ${numero}: `));
    return new Vertice(x, y);
}

// Função para criar um polígono e chamar métodos
function criarPoligono() {
    let vertices = [];

    // Solicita pelo menos 3 vértices ao usuário
    const qtdVertices = parseInt(prompt("Quantos vértices o polígono terá? (mínimo 3): "));

    // Lê os vértices
    for (let i = 1; i <= qtdVertices; i++) {
        const vertice = lerVertice(i);
        vertices.push(vertice);
    }

    // Cria o polígono
    try {
        const poligono = new Poligono(vertices);
        console.log("Quantidade de Vértices:", poligono.qtdVertices);
        console.log("Perímetro:", poligono.perimetro);

        // Testa o método de adicionar um novo vértice
        const novoVertice = lerVertice("novo");
        const adicionado = poligono.addVertice(novoVertice);
        console.log(`Novo vértice adicionado: ${adicionado ? "Sim" : "Não"}`);
        console.log("Perímetro após adicionar novo vértice (se foi adicionado):", poligono.perimetro);

    } catch (error) {
        console.error("Erro ao criar o polígono:", error.message);
    }
}

// Executa o código para criação do polígono
criarPoligono();
