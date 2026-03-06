import {
  escolhaCalculosFunc,
  escolhaTipoDadoFunc,
  setMostrarResultados,
  escolhaTipoIntervaloFunc,
  setDistNormalAtiva,
} from "../../main.js";

const btnNormalDiscreto = document.getElementById("btnNormalDiscreto");
const btnNormalClasses = document.getElementById("btnNormalClasses");
const btnNormalAmostral = document.getElementById("btnNormalAmostral");
const btnNormalFinal = document.getElementById("btnNormalFinal");

btnNormalDiscreto.addEventListener("click", (e) => {
  e.preventDefault();
  setDistNormalAtiva(true);
});
