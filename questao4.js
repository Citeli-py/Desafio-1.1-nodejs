class Aluno{
    #matricula;
    #nome;
    #P1= null;
    #P2= null;

    constructor(matricula, nome){
        this.#matricula = matricula;
        this.#nome = nome;
    }

    get nome(){
        return this.#nome;
    }

    get matricula(){
        return this.#matricula;
    }

    get P1(){
        return this.#P1;
    }

    get P2(){
        return this.#P2;
    }

    nota(prova, nota){
        if(prova === 1)
            this.#P1 = nota;

        if(prova === 2)
            this.#P2 = nota;
    }

    get NF(){
        let m = (this.#P1+this.#P2)/2;
        return m.toFixed(1);
    }


};


class Turma{
    // Lista de alunos
    #alunos=[];


    #procurarAluno(matricula){
        for (let i = 0; i < this.#alunos.length; i++) {
            if(this.#alunos[i].matricula === matricula)
                return this.#alunos[i];
        }

        return null;
    }

    addAluno(novoAluno){
        if(this.#procurarAluno(novoAluno.matricula))
            return false;

        this.#alunos.push(novoAluno);
        return true;
    }

    removerAluno(matricula){
        this.#alunos = this.#alunos.filter(aluno => aluno.matricula !== matricula);
    }

    lancarNota(matricula, prova, nota){

        let aluno = this.#procurarAluno(matricula);
        if(aluno){
            aluno.nota(prova, nota);
            return true;
        }
        
        return false;
    }

    boletim(){
        console.log("--------------------------------------------\n" +
                    "Matricula    Nome               P1   P2   NF\n" +
                    "--------------------------------------------\n");
        
        let alunosAlfabetico = this.#alunos.sort((a,b) => a.nome.localeCompare(b.nome));

        alunosAlfabetico.forEach(aluno => {
            console.log(`${String(aluno.matricula).padEnd(10)}`   +
                        `${String(aluno.nome).padEnd(20)} `     +
                        `${(aluno.P1? String(aluno.P1): ' -').padEnd(5)}`    +
                        `${(aluno.P2? String(aluno.P2): ' -').padEnd(5)}`    +
                        `${String(aluno.NF)}`);
        });

        console.log("--------------------------------------------");
        
    }


};

const prompt = require('prompt-sync')();

function main() {
    const turma = new Turma();
    let opcao;

    do {
        console.log("\n--- Menu ---");
        console.log("1. Adicionar Aluno");
        console.log("2. Remover Aluno");
        console.log("3. Lançar Nota");
        console.log("4. Exibir Boletim");
        console.log("5. Sair");
        
        opcao = prompt("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                const matricula = prompt("Matrícula do aluno: ");
                const nome = prompt("Nome do aluno: ");
                const novoAluno = new Aluno(matricula, nome);
                if (turma.addAluno(novoAluno)) {
                    console.log(`Aluno ${nome} adicionado com sucesso!`);
                } else {
                    console.log("Aluno já existe na turma.");
                }
                break;

            case "2":
                const matriculaRemover = prompt("Matrícula do aluno para remover: ");
                if (turma.removerAluno(matriculaRemover)) {
                    console.log("Aluno removido com sucesso.");
                } else {
                    console.log("Aluno não encontrado.");
                }
                break;

            case "3":
                const matriculaNota = prompt("Matrícula do aluno para lançar nota: ");
                const prova = parseInt(prompt("Informe a prova (1 ou 2): "));
                const nota = parseFloat(prompt("Informe a nota: "));
                if (turma.lancarNota(matriculaNota, prova, nota)) {
                    console.log("Nota lançada com sucesso.");
                } else {
                    console.log("Aluno não encontrado ou prova inválida.");
                }
                break;

            case "4":
                turma.boletim();
                break;

            case "5":
                console.log("Saindo do sistema...");
                break;

            default:
                console.log("Opção inválida. Tente novamente.");
                break;
        }
    } while (opcao !== "5");
}

main();



