class Vertice{
    #x;
    #y;

    constructor(x, y){
        this.#x = x;
        this.#y = y;
    }

    get x(){
        return this.#x;
    }

    get y(){
        return this.#y;
    }

    distancia(vertice){
        let dx = vertice.x - this.#x;
        let dy = vertice.y - this.#y;

        return Math.sqrt(dx**2 + dy**2);
    }

    move(x, y){
        this.#x = x;
        this.#y = y;
    }

    equals(vertice){
        return (this.#x === vertice.x) && (this.#y === vertice.y);
    }
};

module.exports = Vertice;