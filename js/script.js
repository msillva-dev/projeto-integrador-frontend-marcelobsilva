// Sabores & Receitas — Análise de preparo e lista interativa
const receitasAnalise = [
    { id: 1, nome: "Bolo de chocolate", preparo: 20, cozimento: 30, favorita: false },
    { id: 2, nome: "Panqueca caseira", preparo: 10, cozimento: 20, favorita: false },
    { id: 3, nome: "Salada de frutas", preparo: 15, cozimento: 0, favorita: false },
    { id: 4, nome: "Brigadeiro", preparo: 5, cozimento: 15, favorita: false },
    { id: 5, nome: "Sopa de legumes", preparo: 15, cozimento: 25, favorita: false }
];

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

function analisarReceita(receita) {
    const tempoTotal = calcularTempoReceita(receita.preparo, receita.cozimento);

    return {
        ...receita,
        tempoTotal,
        classificacao: classificarTempoReceita(tempoTotal)
    };
}

function atualizarPainelDeTempos() {
    const painel = document.querySelector("#resultado");
    const classesPorClassificacao = {
        "Rápida": "receita-rapida",
        "Moderada": "receita-moderada",
        "Demorada": "receita-demorada"
    };
    const receitas = receitasAnalise.map(analisarReceita);
    const linhas = receitas.map(receita => {
        const linha = document.createElement("p");
        linha.classList.add("item-receita-analise", classesPorClassificacao[receita.classificacao]);
        linha.textContent = `${receita.nome} - ${receita.tempoTotal} minutos - ${receita.classificacao}`;
        return linha;
    });

    const tempoTotal = receitas.reduce((soma, receita) => soma + receita.tempoTotal, 0);
    const tempoMedio = (tempoTotal / receitas.length).toLocaleString("pt-BR", {
        maximumFractionDigits: 1
    });
    const rapidas = receitas.filter(receita => receita.classificacao === "Rápida").length;
    const resumo = document.createElement("p");
    resumo.className = "resumo-receitas";
    resumo.textContent = `Tempo total: ${tempoTotal} minutos | Tempo médio: ${tempoMedio} minutos | Receitas rápidas: ${rapidas}`;
    painel.replaceChildren(...linhas, resumo);
}

function calcularResumoReceitas(visiveis, receitas) {
    return {
        visiveis: visiveis.length,
        total: receitas.length,
        favoritas: receitas.filter(receita => receita.favorita).length
    };
}

function iniciarListaInterativa() {
    const lista = document.querySelector("#lista-receitas-interativas");
    const busca = document.querySelector("#busca-receitas");
    const resumo = document.querySelector("#resumo-receitas-interativas");
    const formulario = document.querySelector("#form-receita-interativa");
    const campoNome = formulario.elements.namedItem("nome");
    let proximoId = Math.max(...receitasAnalise.map(receita => receita.id)) + 1;

    function normalizarNome(texto) {
        return texto.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/\p{M}/gu, "");
    }

    function criarItem(receita) {
        const item = document.createElement("li");
        const nome = document.createElement("span");
        const botao = document.createElement("button");

        nome.textContent = `${receita.nome} (${calcularTempoReceita(receita.preparo, receita.cozimento)} min)`;
        botao.type = "button";
        botao.dataset.receitaId = String(receita.id);
        botao.textContent = receita.favorita ? "★ Favorita" : "☆ Favorita";
        botao.setAttribute("aria-label", `Favorita: ${receita.nome}`);
        botao.setAttribute("aria-pressed", String(receita.favorita));

        item.append(nome, botao);
        return item;
    }

    function desenhar() {
        const termo = normalizarNome(busca.value.trim());
        const visiveis = receitasAnalise.filter(receita => normalizarNome(receita.nome).includes(termo));
        const itens = visiveis.map(criarItem);
        if (itens.length === 0) {
            const aviso = document.createElement("li");
            aviso.textContent = "Nenhuma receita encontrada.";
            itens.push(aviso);
        }

        lista.replaceChildren(...itens);
        const contagem = calcularResumoReceitas(visiveis, receitasAnalise);
        resumo.textContent = `Receitas exibidas: ${contagem.visiveis} de ${contagem.total} | Favoritas: ${contagem.favoritas}`;
    }

    function alternarFavorita(evento) {
        const botao = evento.target.closest("button[data-receita-id]");
        if (!botao || !lista.contains(botao)) {
            return;
        }

        const receita = receitasAnalise.find(item => item.id === Number(botao.dataset.receitaId));
        receita.favorita = !receita.favorita;
        desenhar();
        // O redesenho substitui o botão, então restauramos o foco no novo elemento.
        lista.querySelector(`button[data-receita-id="${receita.id}"]`).focus();
    }

    function cadastrarReceita(evento) {
        evento.preventDefault();
        const nome = campoNome.value.trim();
        if (!nome) {
            campoNome.setCustomValidity("Digite o nome da receita.");
            campoNome.reportValidity();
            return;
        }

        const dados = new FormData(formulario);
        receitasAnalise.push({
            id: proximoId,
            nome,
            preparo: Number(dados.get("preparo")),
            cozimento: Number(dados.get("cozimento")),
            favorita: false
        });
        proximoId += 1;

        formulario.reset();
        busca.value = "";
        atualizarPainelDeTempos();
        desenhar();
        campoNome.focus();
    }

    function limparAvisoDoNome() {
        campoNome.setCustomValidity("");
    }

    lista.addEventListener("click", alternarFavorita);
    busca.addEventListener("input", desenhar);
    formulario.addEventListener("submit", cadastrarReceita);
    campoNome.addEventListener("input", limparAvisoDoNome);
    desenhar();
}

atualizarPainelDeTempos();
iniciarListaInterativa();
