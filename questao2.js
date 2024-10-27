const Vertice = require('./Vertice');
const Triangulo = require('./Triangulo');
const prompt = require('prompt-sync')();

// Função auxiliar para ler um vértice
function lerVertice(numero) {
    const x = parseFloat(prompt(`Digite o valor de x do vértice ${numero}: `));
    const y = parseFloat(prompt(`Digite o valor de y do vértice ${numero}: `));
    return new Vertice(x, y);
}

// Função para criar um triângulo e chamar os métodos
function criarTriangulo() {
    try {
        console.log("Informe os vértices do triângulo:");
        const v1 = lerVertice(1);
        const v2 = lerVertice(2);
        const v3 = lerVertice(3);
        
        const triangulo = new Triangulo(v1, v2, v3);
        console.log("Perímetro:", triangulo.perimetro);
        console.log("Tipo:", triangulo.tipo());
        console.log("Área:", triangulo.area);

        return triangulo;
    } catch (error) {
        if (error instanceof TrianguloDegeneradoError) {
            console.log(error.message);
        } else {
            console.error("Erro desconhecido:", error);
        }
        return null;
    }
}

// Cria três triângulos e chama métodos para cada um
console.log("Criação do Triângulo 1:");
const triangulo1 = criarTriangulo();

console.log("\nCriação do Triângulo 2:");
const triangulo2 = criarTriangulo();

console.log("\nCriação do Triângulo 3:");
const triangulo3 = criarTriangulo();

// Comparação entre os triângulos, se válidos
if (triangulo1 && triangulo2) {
    console.log("\nTriângulo 1 é igual ao Triângulo 2?", triangulo1.equals(triangulo2));
}
if (triangulo1 && triangulo3) {
    console.log("Triângulo 1 é igual ao Triângulo 3?", triangulo1.equals(triangulo3));
}
if (triangulo2 && triangulo3) {
    console.log("Triângulo 2 é igual ao Triângulo 3?", triangulo2.equals(triangulo3));
}
