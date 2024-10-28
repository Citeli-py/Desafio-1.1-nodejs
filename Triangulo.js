const Vertice = require('./Vertice')

class Triangulo{
    #v1;
    #v2;
    #v3;

    constructor(v1, v2, v3){
        this.#v1 = v1;
        this.#v2 = v2;
        this.#v3 = v3;

        if (!this.#isTriangulo())
            throw new Error("Os vértices são colineares e formam um triângulo degenerado.")
    }

    get v1(){
        return this.#v1;
    }

    get v2(){
        return this.#v2;
    }

    get v3(){
        return this.#v3;
    }


    #isTriangulo(){
        // Calcula a área do triangulo a partir do determinante 
        const area = 0.5 * Math.abs(
            this.#v1.x * (this.#v2.y - this.#v3.y) + 
            this.#v2.x * (this.#v3.y - this.#v1.y) + 
            this.#v3.x * (this.#v1.y - this.#v2.y)
        );

        // Se a área for zero, os pontos são colineares e não formam um triângulo
        return this.area > 0;
    }

    equals(triangulo){
        // Vamos verificar se cada vertice tem um par no outro triangulo
        let meusVertices = [ this.#v1, this.#v2, this.#v3 ]
        let outrosVertices = [ triangulo.v1, triangulo.v2, triangulo.v3 ]

        // Para cada vértice no meu triângulo
        for (let i = 0; i < meusVertices.length; i++) {
            let encontrado = false; 

            // Verifica se o vértice atual tem um correspondente em outrosVertices
            for (let j = 0; j < outrosVertices.length; j++) {
                if (meusVertices[i].equals(outrosVertices[j])) {
                    // Se encontrado, remove o vértice correspondente
                    outrosVertices.splice(j, 1);
                    encontrado = true; 
                    break; 
                }
            }

            // Se não encontrou um par retorna falso
            if (!encontrado) {
                return false;
            }
        }

        return true;
    }

    get perimetro(){
        return  this.#v1.distancia(this.#v2) +
                this.#v2.distancia(this.#v3) +
                this.#v3.distancia(this.#v1);
    }

    tipo(){
        let lados = [
                this.#v1.distancia(this.#v2),
                this.#v2.distancia(this.#v3),
                this.#v3.distancia(this.#v1)
        ].sort();

        if(lados[0] === lados[1] && lados[1] === lados[2])
            return "Equilátero"

        if(lados[0] === lados[1] || lados[1] === lados[2] || lados[2] === lados[1])
            return "Isósceles"

        return "Escaleno"
    }

    clone(){
        return new Triangulo(this.#v1, this.#v2, this.#v3);
    }

    get area(){
        let lados = [
            this.#v1.distancia(this.#v2),
            this.#v2.distancia(this.#v3),
            this.#v3.distancia(this.#v1)
        ]

        let s = this.perimetro/2;

        return Math.sqrt(s*(s-lados[0])*(s-lados[1])*(s-lados[2]))
        
    }
};


module.exports = Triangulo;