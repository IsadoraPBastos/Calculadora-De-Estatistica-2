export let dados = [];
export let tabelaRecebida = {};
export let FreqIndAbs = {};
export let tabelaDeDados = {};
export let dadosClasses = {};
export let distNormalAtiva = false;
export let distNormalDados = {}

export function escolhaCalculosFunc() {
  return [
    ...document.querySelectorAll('input[name="escolha-calculo"]:checked'),
  ].map((el) => el.value);
}

export function escolhaTipoDadoFunc() {
  const selecionado = document.querySelector('input[name="tipo"]:checked');
  return selecionado ? selecionado.value : null;
}

export let mostrarResultados = false;
export function setMostrarResultados(valor) {
  mostrarResultados = valor;

  const containerResultados = document.querySelector(
    ".container-estatisticas-dos-dados",
  );
  if (mostrarResultados == true) {
    containerResultados.style.display = "block";
    containerResultados.scrollIntoView({ behavior: "smooth" });
  } else {
    containerResultados.style.display = "none";
  }
}

export function escolhaTipoIntervaloFunc() {
  const selecionado = document.querySelector('input[name="intervalo"]:checked');
  return selecionado ? selecionado.value : null;
}

export function setDistNormalAtiva(valor) {
  distNormalAtiva = valor;
}

import "./Parametros_Estatisticos/AgrupamentoDiscreto.js";
import "./Parametros_Estatisticos/AgrupamentoEmClasses.js";
import "./Probabilidade/VAC/DistribuicaoUniforme.js";
import "./Probabilidade/VAC/DistribuicaoExponencial.js";
import "./Probabilidade/VAC/DistribuicaoNormal.js";
import "./Probabilidade/VAD/DistribuicaoBinomial.js";
import "./Probabilidade/VAD/DistribuicaoPoisson.js";
import "./Regressão_Linear/equacao1Grau.js";

import { limparTodosDados } from "./limparTodosDados.js";
limparTodosDados();
