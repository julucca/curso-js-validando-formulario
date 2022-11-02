import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

const camposDoFormulario = document.querySelectorAll("[required]");

// 2. Seleciona o elemento através do data-attributes
const formulario = document.querySelector("[data-formulario]");

// 2. Cria evento de evenvio para campos do formulário
formulario.addEventListener("submit", (e) => {
    // 2. Previne o comportamento padrão
    e.preventDefault();

    // 2. Cria lista com valores de cada alvo
    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value
    }

    // 2. Cria localStorage para salvar dados
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

    // 2. Redireciona o usuário para a próxima etapa do formulário
    window.location.href = "./abrir-conta-form-2.html";
})


camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    // Previne comportamento padrão
    campo.addEventListener("invalid", evento => evento.preventDefault());
})

// Lista com tipos de erros mais comuns
const tiposDeErro = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "tooShort",
    "customError"
]

// Objeto com mensagens customizadas.
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) {
    // Inicia variável mensagem
    let mensagem = "";
    // Redefine o setCustomValidity do campo, para sumir com erro
    campo.setCustomValidity("");

    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    if(campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }

    // Executa uma função para cada item de erro. 
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }

        // Variável que seleciona a classe mais próxima do input
        const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
        // Variável que checa se o campo é valido
        const validadorDeInput = campo.checkValidity();

        // Imprime mensagem no span se validadorDeInput for false
        if (!validadorDeInput) {
            mensagemErro.textContent = mensagem;
        } else {
            mensagemErro.textContent = "";
        }
    })
}