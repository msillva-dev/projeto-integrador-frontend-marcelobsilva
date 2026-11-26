// Aulas 10 e 11 - Funções, Arrays e DOM
// Projeto Integrador: Sabores & Receitas
// Análise do tempo de preparo das receitas

const receitasAnalise = [
    { id: 1, nome: "Bolo de chocolate", preparo: 20, cozimento: 30, favorita: false },
    { id: 2, nome: "Panqueca caseira", preparo: 10, cozimento: 20, favorita: false },
    { id: 3, nome: "Salada de frutas", preparo: 15, cozimento: 0, favorita: false },
    { id: 4, nome: "Brigadeiro", preparo: 5, cozimento: 15, favorita: false },
    { id: 5, nome: "Sopa de legumes", preparo: 15, cozimento: 25, favorita: false }
];

// Função que calcula o tempo total da receita
function calcularTempoReceita(preparo, cozimento = 0) {
    return preparo + cozimento;
}

// Função que classifica o tempo da receita
function classificarTempoReceita(tempoTotal) {
    if (tempoTotal <= 20) {
        return "Rápida";
    } else if (tempoTotal <= 40) {
        return "Moderada";
    } else {
        return "Demorada";
    }
}

// Testes da função de cálculo
console.log(calcularTempoReceita(20, 30));
console.log(calcularTempoReceita(10, 15));
console.log(calcularTempoReceita(15));

// Testes da função de classificação
console.log(classificarTempoReceita(15));
console.log(classificarTempoReceita(25));
console.log(classificarTempoReceita(50));

// Processar e classificar as receitas com map
const receitasProcessadas = receitasAnalise.map(receita => {
    const tempoTotal = calcularTempoReceita(
        receita.preparo,
        receita.cozimento
    );

    return {
        nome: receita.nome,
        tempoTotal: tempoTotal,
        classificacao: classificarTempoReceita(tempoTotal)
    };
});

console.table(receitasProcessadas);

// Filtrar as receitas rápidas
const receitasRapidasAnalise = receitasProcessadas.filter(
    receita => receita.classificacao === "Rápida"
);

console.table(receitasRapidasAnalise);

// Calcular o tempo total das receitas com reduce
const tempoTotalAnalise = receitasProcessadas.reduce(
    (acumulador, receita) => acumulador + receita.tempoTotal,
    0
);

// Calcular o tempo médio das receitas
const tempoMedioAnalise = tempoTotalAnalise / receitasProcessadas.length;

console.log("Tempo total das receitas: " + tempoTotalAnalise + " minutos.");
console.log("Tempo médio das receitas: " + tempoMedioAnalise + " minutos.");

// Selecionar a área de resultados no HTML
const areaResultadoReceitas = document.querySelector("#resultado");

// Verificar se o elemento foi encontrado
if (areaResultadoReceitas !== null) {
    console.log("Área de resultados encontrada com sucesso!");
} else {
    console.error("Área de resultados não encontrada!");
}

// Função que cria o elemento de cada receita
function criarElementoReceita(receita) {
    const elemento = document.createElement("p");

    elemento.textContent = receita.nome + " - " +
        receita.tempoTotal + " minutos - " +
        receita.classificacao;
        elemento.classList.add("item-receita-analise");

if (receita.classificacao === "Rápida") {
    elemento.classList.add("receita-rapida");
} else if (receita.classificacao === "Moderada") {
    elemento.classList.add("receita-moderada");
} else {
    elemento.classList.add("receita-demorada");
}

    return elemento;
}

// Inserir as receitas na página
if (areaResultadoReceitas !== null) {
    receitasProcessadas.forEach(receita => {
        const elemento = criarElementoReceita(receita);
        areaResultadoReceitas.append(elemento);
    });
}

// Inserir o resumo da análise na página
if (areaResultadoReceitas !== null) {
    const resumo = document.createElement("p");

    resumo.textContent =
        "Tempo total: " + tempoTotalAnalise + " minutos | " +
        "Tempo médio: " + tempoMedioAnalise + " minutos | " +
        "Receitas rápidas: " + receitasRapidasAnalise.length;

    resumo.classList.add("resumo-receitas");

    areaResultadoReceitas.append(resumo);
}

