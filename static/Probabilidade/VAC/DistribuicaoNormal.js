import {
  dadosClasses,
  distNormalDados,
  escolhaCalculosFunc,
  escolhaTipoDadoFunc,
  setMostrarResultados,
  escolhaTipoIntervaloFunc,
  setDistNormalAtiva,
  modoCalculo,
} from "../../state.js";

import { destroyChart } from "../../createCharts.js";

const btnNormalDiscreto = document.getElementById("btnNormalDiscreto");
const btnNormalClasses = document.getElementById("btnNormalClasses");
const btnNormalFinal = document.getElementById("btnNormalFinal");
const dadosCalculadosNormal = document.getElementById("dadosCalculadosNormal");
const formDistNormalAmostral = document.getElementById("formDistNormal");
const formDistNormalFinal = document.getElementById("formDistNormalFinal");
const mostrarConta = document.getElementById("mostrarContaNorm");

function aplicarUnidade(valor, tipo, potencia) {
  const v = parseFloat(valor).toFixed(2);
  if (tipo === "R$") return "R$ " + v;
  if (tipo === "semMedida") return v;
  const suf = potencia === 2 ? tipo + "²" : tipo;
  return v + " " + suf;
}

// Distribuição Normal Amostral
const inputValorANorm = document.getElementById("inputValorANorm");
const inputDuasVariaveisNorm = document.getElementById(
  "inputDuasVariaveisNorm",
);
const mediaNorm = document.getElementById("mediaNorm");
const desvioPadraoNorm = document.getElementById("desvioPadraoNorm");
const tamanhoAmostraNorm = document.getElementById("tamanhoAmostraNorm");

btnNormalDiscreto.addEventListener("click", (e) => {
  e.preventDefault();
  setDistNormalAtiva(true);
});

btnNormalClasses.addEventListener("click", (e) => {
  e.preventDefault();
  setDistNormalAtiva(true);
});

formDistNormalAmostral.addEventListener("submit", (e) => {
  e.preventDefault();

  const tipoIntervalo = escolhaTipoIntervaloFunc();

  containerTabelaDistribuicao.replaceChildren();
  if (modoCalculo == "NormalAmostral") {
    const valorAA = parseFloat(inputValorANorm.value.trim(), 10);
    const valorBA = parseFloat(inputDuasVariaveisNorm.value.trim(), 10);
    let verificar = validar(valorAA, valorBA);
    if (verificar == true) {
      document.getElementById("secaoDNormal_Amostral").style.display = "none";
    }
  }
});

// Distribuição Normal Final (cálculos dos dados recebidos em tabela ou desordenados)
const inputValorANormFinal = document.getElementById("inputValorANormFinal");
const inputDuasVariaveisNormF = document.getElementById(
  "inputDuasVariaveisNormF",
);

const intervaloDuplo = [
  "menorQueMenorQueNormF",
  "menorIgualMenorQueNormF",
  "menorQueMenorIgualNormF",
  "menorIgualMenorIgualNormF",
  "menorQueMenorQueNorm1",
  "menorIgualMenorQueNorm1",
  "menorQueMenorIgualNorm1",
  "menorIgualMenorIgualNorm1",
];

function validar(valorA, valorB) {
  console.log(valorA);
  const tipoIntervalo = escolhaTipoIntervaloFunc();
  console.log(tipoIntervalo);

  mostrarConta.style.border = "";

  if (modoCalculo == "NormalAmostral") {
    let media = mediaNorm.value.trim();
    let desvio = desvioPadraoNorm.value.trim();
    let n = tamanhoAmostraNorm.value.trim();
    if (media < 0 || media == "") {
      mostrarConta.innerHTML = `<p class="msg-erro">
          <i class="fa-solid fa-triangle-exclamation fa-beat-fade"></i>
          "A média populacional tem que ser um valor positivo!"
        </p>`;
      return false;
    } else if (desvio < 0 || desvio == "") {
      mostrarConta.innerHTML = `<p class="msg-erro">
          <i class="fa-solid fa-triangle-exclamation fa-beat-fade"></i>
          "O desvio padrão populacional tem que ser um valor positivo!"
        </p>`;
      return false;
    } else if (n < 0 || n == "") {
      mostrarConta.innerHTML = `<p class="msg-erro">
          <i class="fa-solid fa-triangle-exclamation fa-beat-fade"></i>
          "O tamanho da amostra tem que ser um valor positivo!"
        </p>`;
      return false;
    }
  }

  if (isNaN(valorA) || valorA < 0) {
    mostrarConta.innerHTML = `<p class="msg-erro">
        <i class="fa-solid fa-triangle-exclamation fa-beat-fade"></i>
        "Valor A" deve ser um inteiro maior ou igual a 0!
      </p>`;
    return false;
  } else if (!tipoIntervalo) {
    mostrarConta.innerHTML = `<p class="msg-erro">
        <i class="fa-solid fa-triangle-exclamation fa-beat-fade"></i>
        Selecione um tipo de intervalo!
      </p>`;
    return false;
  } else if (intervaloDuplo.includes(tipoIntervalo)) {
    if (isNaN(valorB) || valorB < 0) {
      mostrarConta.innerHTML = `<p class="msg-erro">
          <i class="fa-solid fa-triangle-exclamation fa-beat-fade"></i>
          "Valor B" deve ser um inteiro maior ou igual a 0!
        </p>`;
      return false;
    } else if (valorB <= valorA) {
      mostrarConta.innerHTML = `<p class="msg-erro">
          <i class="fa-solid fa-triangle-exclamation fa-beat-fade"></i>
          "Valor B" deve ser maior que "Valor A"!
        </p>`;
      return false;
    } else {
      let escolhaTipoIntervalo = escolhaTipoIntervaloFunc();
      const p = document.createElement("p");
      mostrarConta.replaceChildren();
      if (
        escolhaTipoIntervalo == "menorQueMenorQueNormF" ||
        escolhaTipoIntervalo == "menorQueMenorQueNorm1"
      ) {
        p.innerHTML = valorA + " < X < " + valorB;
      } else if (
        escolhaTipoIntervalo == "menorIgualMenorQueNormF" ||
        escolhaTipoIntervalo == "menorIgualMenorQueNorm1"
      ) {
        p.innerHTML = valorA + " ≤ X < " + valorB;
      } else if (
        escolhaTipoIntervalo == "menorQueMenorIgualNormF" ||
        escolhaTipoIntervalo == "menorQueMenorIgualNorm1"
      ) {
        p.innerHTML = valorA + " < X ≤ " + valorB;
      } else if (
        escolhaTipoIntervalo == "menorIgualMenorIgualNormF" ||
        escolhaTipoIntervalo == "menorIgualMenorIgualNorm1"
      ) {
        p.innerHTML = valorA + " ≤ X ≤ " + valorB;
      } else {
        p.innerHTML = "";
      }
      mostrarConta.style.border = "2px dashed black";
      mostrarConta.appendChild(p);
      return true;
    }
  } else {
    let escolhaTipoIntervalo = escolhaTipoIntervaloFunc();
    const p = document.createElement("p");
    console.log(escolhaTipoIntervalo);
    mostrarConta.replaceChildren();
    if (
      escolhaTipoIntervalo == "maiorQueNormF" ||
      escolhaTipoIntervalo == "maiorQueNorm1"
    ) {
      p.innerHTML = "X > " + valorA;
    } else if (
      escolhaTipoIntervalo == "maiorIgualNormF" ||
      escolhaTipoIntervalo == "maiorIgualNorm1"
    ) {
      p.innerHTML = "X ≥ " + valorA;
    } else if (
      escolhaTipoIntervalo == "menorQueNormF" ||
      escolhaTipoIntervalo == "menorQueNorm1"
    ) {
      p.innerHTML = "X < " + valorA;
    } else if (
      escolhaTipoIntervalo == "menorIgualNormF" ||
      escolhaTipoIntervalo == "menorIgualNorm1"
    ) {
      p.innerHTML = "X ≤ " + valorA;
    } else if (
      escolhaTipoIntervalo == "intervaloIgualNormF" ||
      escolhaTipoIntervalo == "intervaloIgualNorm1"
    ) {
      p.innerHTML = "X = " + valorA;
    } else {
      p.innerHTML = "";
    }
    mostrarConta.style.border = "2px dashed black";
    mostrarConta.appendChild(p);
    return true;
  }
}

function renderizarResultadosFinal(
  tipoIntervalo,
  valorAF,
  valorBF,
  media,
  desvio,
  n,
) {
  let prob;
  function calcularZ(x, media, desvio, n) {
    return ((x - media) * Math.sqrt(n)) / desvio;
  }

  function calcularCdf(x) {
    let z = calcularZ(x, media, desvio, n);
    return (1 + math.erf(z / Math.sqrt(2))) / 2;
  }

  console.log(dadosClasses);
  console.log(tipoIntervalo);
  console.log(valorAF);
  console.log(valorBF);

  if (intervaloDuplo.includes(tipoIntervalo)) {
    if (valorAF >= valorBF) {
      prob = calcularCdf(valorAF) - calcularCdf(valorBF);
    } else {
      prob = calcularCdf(valorBF) - calcularCdf(valorAF);
    }
  } else if (
    tipoIntervalo == "maiorQueNormF" ||
    tipoIntervalo == "maiorIgualNormF" ||
    tipoIntervalo == "maiorQueNorm1" ||
    tipoIntervalo == "maiorIgualNorm1"
  ) {
    prob = 1 - calcularCdf(valorAF);
  } else if (
    tipoIntervalo == "menorQueNormF" ||
    tipoIntervalo == "menorIgualNormF" ||
    tipoIntervalo == "menorQueNorm1" ||
    tipoIntervalo == "menorIgualNorm1"
  ) {
    prob = calcularCdf(valorAF);
  } else if (
    tipoIntervalo == "intervaloIgualNormF" ||
    tipoIntervalo == "intervaloIgualNorm1"
  ) {
    prob = 0.0;
  }

  prob = (prob * 100).toFixed(2);

  console.log(prob);

  let variancia, coefVariacao;
  if (modoCalculo == "NormalFinal") {
    variancia = dadosClasses["Variancia"];
    coefVariacao = dadosClasses["CoefVariacao"];
  } else if (modoCalculo == "NormalAmostral") {
    variancia = Math.pow(desvio, 2);
    coefVariacao = media !== 0 ? ((desvio / media) * 100).toFixed(2) : Infinity;
  }

  const containerRes = document.querySelector(".container-calculos-resultados");

  containerRes.replaceChildren();

  let escolhasCalculo = escolhaCalculosFunc();
  console.log(escolhasCalculo);

  let tipoDado = escolhaTipoDadoFunc();
  if (tipoDado == "outro") {
    const outroInput = document.getElementById("tipo_custom");
    tipoDado = outroInput.value.trim();
  }

  const resultMap = {
    media: {
      label: "Média",
      valor: media,
      tipo: tipoDado,
      pot: 1,
      detail: `x̄ = Σ(fi·PMi)/n = ${media}`,
    },
    variancia: {
      label: "Variância",
      valor: variancia,
      tipo: tipoDado,
      pot: 2,
      detail: `s² = Σfi(PMi−x̄)²/(n−1) = ${variancia}`,
    },
    desvioPadrao: {
      label: "Desvio Padrão",
      valor: desvio,
      tipo: tipoDado,
      pot: 1,
      detail: `s = √s² = √${desvio}`,
    },
    coeficienteVariacao: {
      label: "Coeficiente de Variação",
      valor: null, // tratamento especial
      tipo: tipoDado,
      pot: 1,
      detail: `CV = (s/x̄)·100 = (${coefVariacao})·100`,
    },
    probabilidade: {
      label: "Probabilidade",
      valor: prob,
      tipo: tipoDado,
      pot: 2,
      detail: `${prob}%`,
    },
  };

  const ordemExibicao = [
    "media",
    "variancia",
    "desvioPadrao",
    "coeficienteVariacao",
    "probabilidade",
  ];
  const selecionadas = ordemExibicao.filter((r) => escolhasCalculo.includes(r));

  selecionadas.forEach((escolha) => {
    const def = resultMap[escolha];
    if (!def) return;

    const div = document.createElement("div");
    div.className = "calculos-resultados";

    const h3 = document.createElement("h3");
    h3.textContent = def.label;

    const p = document.createElement("p");
    if (escolha === "coeficienteVariacao") {
      p.textContent = isFinite(coefVariacao)
        ? coefVariacao + "%"
        : "∞ (média = 0)";
    } else if (escolha === "probabilidade") {
      p.textContent = prob + "%";
    } else {
      p.textContent = aplicarUnidade(def.valor, def.tipo, def.pot);
    }
    p.title = def.detail;

    div.appendChild(h3);
    div.appendChild(p);
    containerRes.appendChild(div);
  });

  setMostrarResultados(true);
}

formDistNormalFinal.addEventListener("submit", (e) => {
  e.preventDefault();

  containerTabelaDistribuicao.replaceChildren();
  if (modoCalculo == "NormalFinal") {
    const valorAF = parseFloat(inputValorANormFinal.value.trim(), 10);
    const valorBF = parseFloat(inputDuasVariaveisNormF.value.trim(), 10);
    let verificar = validar(valorAF, valorBF);
    if (verificar == true) {
      document.getElementById("secaoDNormal_Final").style.display = "none";
    }
  }
});

const btnCalcular = document.getElementById("btnCalcular");
btnCalcular.addEventListener("click", (e) => {
  e.preventDefault();
  const tipoIntervalo = escolhaTipoIntervaloFunc();
  let media, desvio, n;
  let escolhasCalculo = escolhaCalculosFunc();
  let escolhaTipoDado = escolhaTipoDadoFunc();

  if (modoCalculo == "NormalFinal") {
    const valorAF = parseFloat(inputValorANormFinal.value.trim(), 10);
    const valorBF = parseFloat(inputDuasVariaveisNormF.value.trim(), 10);
    if (
      !isNaN(valorAF) &&
      tipoIntervalo != "" &&
      escolhasCalculo.length != 0 &&
      escolhaTipoDado != null
    ) {
      setMostrarResultados(false);
      let verificar = validar(valorAF, valorBF);
      if (verificar == true) {
        for (const [key, value] of Object.entries(dadosClasses)) {
          if (key == "Media") {
            media = value;
          } else if (key == "DesvioPadrao") {
            desvio = value;
          } else if (key == "TamAmostra") {
            n = value;
          }
        }
        renderizarResultadosFinal(
          tipoIntervalo,
          valorAF,
          valorBF,
          media,
          desvio,
          n,
        );
      }
    } else {
      destroyChart();
      document.getElementById("chartsTitle").innerHTML = "";
      setMostrarResultados(false);
    }
  } else if (modoCalculo == "NormalAmostral") {
    const valorAA = parseFloat(inputValorANorm.value.trim(), 10);
    const valorBA = parseFloat(inputDuasVariaveisNorm.value.trim(), 10);
    if (
      !isNaN(valorAA) &&
      tipoIntervalo != "" &&
      escolhasCalculo.length != 0 &&
      escolhaTipoDado != null
    ) {
      setMostrarResultados(false);
      let verificar = validar(valorAA, valorBA);
      if (verificar == true) {
        media = mediaNorm.value.trim();
        desvio = desvioPadraoNorm.value.trim();
        n = tamanhoAmostraNorm.value.trim();
        renderizarResultadosFinal(
          tipoIntervalo,
          valorAA,
          valorBA,
          media,
          desvio,
          n,
        );
      }
    } else {
      destroyChart();
      document.getElementById("chartsTitle").innerHTML = "";
      setMostrarResultados(false);
    }
  }
});
