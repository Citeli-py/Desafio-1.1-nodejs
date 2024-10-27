const prompt = require('prompt-sync')()
const Vertice = require('./Vertice')


// Função para ler valores do usuário
function lerVertice() {
    const x = parseFloat(prompt("Digite o valor de x:"));
    const y = parseFloat(prompt("Digite o valor de y:"));
    return new Vertice(x, y);
}

// Criando 3 vértices com entrada do usuário
const vertice1 = lerVertice();
const vertice2 = lerVertice();
const vertice3 = lerVertice();

// Chamando os métodos implementados
console.log(`Distância entre vértice 1 e vértice 2: ${vertice1.distancia(vertice2)}`);
console.log(`Distância entre vértice 2 e vértice 3: ${vertice2.distancia(vertice3)}`);

vertice1.move(5, 5);
console.log(`Novo valor de vértice 1 após mover para (5, 5): (${vertice1.x}, ${vertice1.y})`);

console.log(`Vértice 1 é igual ao vértice 2? ${vertice1.equals(vertice2) ? "Sim" : "Não"}`);