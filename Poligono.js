const Vertice = require('./Vertice');


class Poligono{
    #vertices;

    constructor(vertices){
        // Verifica se exitem mais de 3 vertices
        if(vertices.length < 3)
            throw new Error("O polígono deve ter pelo menos 3 vértices.");

        this.#vertices = vertices;
    }

    addVertice(vertice){
        this.#vertices.forEach(v => {
            if(v.equals(vertice))
                return false;
        });

        this.#vertices.push(vertice);
        return true;
    }

    get perimetro() {
        let perimetro = 0;
        for (let i = 0; i < this.#vertices.length; i++) {
            // Pega os vertices adjacentes e calcula a distancia
            const verticeAtual = this.#vertices[i];
            const proximoVertice = this.#vertices[(i + 1) % this.#vertices.length];
            perimetro += verticeAtual.distancia(proximoVertice);
        }
        return perimetro;
    }

    get qtdVertices() {
        return this.#vertices.length;
    }
};


module.exports = Poligono;