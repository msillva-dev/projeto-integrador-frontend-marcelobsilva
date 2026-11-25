/*
Tema: análise de receitas do Sabores & Receitas.
Entrada: tempo máximo de preparo, em minutos.
Processamento: classificar as receitas pelo tempo, identificar a categoria
de cada uma, contar as que cabem no limite e somar os tempos de preparo.
Saída: tabela de receitas e resumo no console do navegador.

Pseudocódigo:
1. Preparar uma lista com cinco receitas.
2. Pedir e validar o tempo máximo de preparo.
3. Percorrer as receitas e classificar cada uma pelo tempo.
4. Usar a categoria para escolher uma mensagem sobre a receita.
5. Contar as receitas que cabem no limite e somar os tempos.
6. Mostrar a tabela e o resumo no console.
7. Repetir a consulta até a pessoa digitar "sair" ou cancelar.
*/

const receitasParaAnalise = [
    { nome: "Bolo de chocolate", tempoPreparo: 50, categoria: "doce" },
    { nome: "Panqueca caseira", tempoPreparo: 30, categoria: "salgada" },
    { nome: "Salada de frutas", tempoPreparo: 15, categoria: "saudavel" },
    { nome: "Brigadeiro", tempoPreparo: 20, categoria: "doce" },
    { nome: "Sopa de legumes", tempoPreparo: 40, categoria: "saudavel" }
];

const perguntaTempo = "Quanto tempo você tem para cozinhar? Digite de 1 a 1440 minutos ou 'sair'.";
let entradaTempo = prompt(perguntaTempo);

while (entradaTempo !== null && entradaTempo.trim().toLowerCase() !== "sair") {
    if (entradaTempo.trim() === ""){
    console.log("Digite o tempo disponível.");
} else {
    const tempoMaximo = Number(entradaTempo);

        if (!Number.isInteger(tempoMaximo) || tempoMaximo < 1 || tempoMaximo > 1440) {
        console.log("Digite um número inteiro entre 1 e 1440.");
    } else {
        console.log(`Tempo disponível: ${tempoMaximo} minutos.`);

        let receitasNoLimite = 0;
        let tempoTotal = 0;

                const relatorioReceitas = [];

        for (const receita of receitasParaAnalise) {
            let faixaDePreparo;

            if (receita.tempoPreparo <= 20) {
                faixaDePreparo = "Rápida";
            } else if (receita.tempoPreparo <= 40) {
                faixaDePreparo = "Média";
            } else {
                faixaDePreparo = "Demorada";
            }

            console.log(`${receita.nome} (${receita.tempoPreparo} min): ${faixaDePreparo}`);
            switch (receita.categoria) {
                case "doce":
                    console.log("Uma opção para a sobremesa.");
                    break;
                case "salgada":
                    console.log("Uma opção para a refeição.");
                    break;
                case "saudavel":
                    console.log("Uma opção para um cardápio saudável.");
                    break;
                default:
                    console.log("Categoria não cadastrada.");
                    break;
            }

                        relatorioReceitas.push({
                receita: receita.nome,
                minutos: receita.tempoPreparo,
                classificacao: faixaDePreparo,
                cabeNoLimite: receita.tempoPreparo <= tempoMaximo ? "Sim" : "Não"
            });

            tempoTotal += receita.tempoPreparo;

            if (receita.tempoPreparo <= tempoMaximo) {
                receitasNoLimite += 1;
            }
        }

                console.table(relatorioReceitas);

        console.log(`${receitasNoLimite} receitas ficam prontas em até ${tempoMaximo} minutos.`);
        console.log(`Tempo total das cinco receitas: ${tempoTotal} minutos.`);
    }
}

    entradaTempo = prompt(perguntaTempo);
}

/*
Teste de mesa do for...of — limite de 30 minutos
Antes do laço: tempoTotal = 0 e receitasNoLimite = 0.

Volta | Receita           | Minutos | Classificação | tempoTotal | receitasNoLimite
1     | Bolo de chocolate | 50      | Demorada      | 50         | 0
2     | Panqueca caseira  | 30      | Média         | 80         | 1
3     | Salada de frutas  | 15      | Rápida        | 95         | 2

Após as cinco voltas: tempoTotal = 155 e receitasNoLimite = 3.
*/