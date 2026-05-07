import {
  dados,
  tabelaRecebida,
  FreqIndAbs,
  tabelaDeDados,
  dadosClasses,
  distNormalDados,
  setMostrarResultados,
  setDadosDistNormF,
  setDistNormalAtiva,
  setModoCalculo,
} from "./state.js";

import { destroyChart } from "../static/createCharts.js";

export function limparTodosDados() {
  setMostrarResultados(false);
  setDadosDistNormF(false);
  setDistNormalAtiva(false);
  setModoCalculo(null);

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
  for (let key in distNormalDados) {
    delete distNormalDados[key];
  }
}

const btnLimpar = document.querySelector(".btn_limpar_tudo");
btnLimpar.addEventListener("click", (e) => {
  e.preventDefault();
  limparTodosDados();
  location.reload();
});
