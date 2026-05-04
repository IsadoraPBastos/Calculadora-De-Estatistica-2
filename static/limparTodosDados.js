import {
  dados,
  tabelaRecebida,
  FreqIndAbs,
  tabelaDeDados,
  setMostrarResultados,
  setDadosDistNormF,
  dadosClasses,
} from "./state.js";

import { destroyChart } from "../static/createCharts.js";

export function limparTodosDados() {
  setMostrarResultados(false);
  setDadosDistNormF(false);

  destroyChart();

  // Listas
  dados.length = 0;

  // Objetos
  for (let key in tabelaRecebida) {
    delete tabelaRecebida[key];
  }
  for (let key in FreqIndAbs) {
    delete FreqIndAbs[key];
  }
  for (let key in tabelaDeDados) {
    delete tabelaDeDados[key];
  }
  for (let key in dadosClasses) {
    delete dadosClasses[key];
  }
}

const btnLimpar = document.querySelector(".btn_limpar_tudo");
btnLimpar.addEventListener("click", (e) => {
  e.preventDefault();
  limparTodosDados();
  location.reload();
});
