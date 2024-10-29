const { DateTime } = require('luxon');
const prompt = require('prompt-sync')({ sigint: true });


class Cliente{

    #nome;
    #cpf;
    #data_nascimento
    #renda_mensal
    #estado_civil
    #dependentes

    set nome(novoNome){
        if((typeof novoNome !== 'string'))
            throw new Error("Erro: Nome deve ser uma String");

        if (novoNome.length < 5)
            throw new Error("Erro: Nome deve ter pelo menos 5 caracteres");
        
        this.#nome = novoNome;
    }

    #isNumerico(str){
        // Regex para verificar se há apenas numeros na string
        return /^\d+$/.test(str)
    }

    set cpf(novoCpf){

        novoCpf = novoCpf.trim();
        
        if(novoCpf.length !== 11)
            throw new Error("Erro: CPF deve ter 11 digitos!")
        
        if(!this.#isNumerico(novoCpf))
            throw new Error("Erro: CPF deve ter apenas numeros")
        
        novoCpf = parseInt(novoCpf);

        if(novoCpf < 0)
            throw new Error("Erro: CPF deve ser um número positivo!")
        
        this.#cpf = novoCpf;
    }

    set data_nascimento(data){
        // Converte a string para uma data Luxon usando o formato "dd/MM/yyyy"
        data = DateTime.fromFormat(data, "dd/MM/yyyy");

        if (!data.isValid) 
            throw new Error("Erro: Data de nascimento inválida. Formato esperado: DD/MM/AAAA.");


        const idade = DateTime.now().diff(data, "years").years;
        if (idade < 18) {
            throw new Error("Erro: O cliente deve ter pelo menos 18 anos.");
        }

        this.#data_nascimento = data;
    }

    #isFormattedRenda(str){
        const regex = /^\d+,\d+$/;
        return regex.test(str);
    }

    set renda_mensal(novaRenda){
        
        if (!this.#isFormattedRenda(novaRenda))
            throw new Error("Erro: Valor de renda inválido")

        // Remove espaços e converte para float
        novaRenda = parseFloat(novaRenda.trim().replace(",", "."));
        
        if(novaRenda < 0)
            throw new Error("Erro: Renda menor que zero")

        let novaRendaTruncada = parseInt(novaRenda*100)/100;
        this.#renda_mensal = novaRendaTruncada;
    }

    set estado_civil(estadoCivil){
        let estados = ['c', 's', 'v', 'd'];

        if (!estados.find(elemento => elemento === estadoCivil.toLowerCase()))
            throw new Error("Erro: Estado civil deve ser C, S, V ou D")

        this.#estado_civil = estadoCivil;
    }

    set dependentes(dependentes){

        if(dependentes < 0 || dependentes > 10)
            throw new Error("Erro: Numero de dependentes maior que 10 ou menor que 0")

        this.#dependentes = dependentes;
    }


    toString(){
        return  `Nome: ${this.#nome}\nCPF: 999.999.999-99\nData de Nascimento: ${this.#data_nascimento.toFormat('dd/MM/yyyy')}\n`+
                `Renda Mensal: ${this.#renda_mensal}\nEstado Civil: ${this.#estado_civil}\n` +
                `Dependentes: ${this.#dependentes}\n`;
    }
};


function cadastrarCliente() {
    const cliente = new Cliente();

    function lerCampo(mensagem, campo) {
        while (true) {
            try {
                const entrada = prompt(mensagem);
                cliente[campo] = entrada;
                break;
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    lerCampo("Digite o nome (mínimo 5 caracteres): ", "nome");
    lerCampo("Digite o CPF (11 dígitos numéricos): ", "cpf");
    lerCampo("Digite a data de nascimento (DD/MM/AAAA): ", "data_nascimento");
    lerCampo("Digite a renda mensal (use vírgula como decimal): ", "renda_mensal");
    lerCampo("Digite o estado civil (C, S, V, D): ", "estado_civil");
    lerCampo("Digite o número de dependentes (0 a 10): ", "dependentes");

    console.log("\nCadastro realizado com sucesso:");
    console.log(cliente.toString());
}

cadastrarCliente();