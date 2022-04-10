let jogadorO;

let vitoriasO = 0;
let vitoriasX = 0;

let totalJogos = 1;

const texto       = document.querySelector("#texto");
const mensagem    = document.querySelector("#mensagem");
const tabuleiro   = document.querySelector("#tabuleiro");
const btnProximo  = document.querySelector("#btnProximo");
const btnRestart  = document.querySelector("#btnRestart");
const btnIniciar  = document.querySelector("#botao-iniciar");

const ganhador    = document.querySelector('#ganhador');
const items       = document.querySelectorAll("#item");

const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');

const placar1 = document.querySelector('#placar1');
const placar2 = document.querySelector('#placar2');


const possiveisVitorias = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
];
tabuleiro.style.display = "none";
tabuleiro.style.cursor = "no-drop";
btnProximo.style.display = "none";
btnRestart.style.display = "none";


// Valida se os nomes foram inseridos
function comecar(){  
  const jogador1    = document.querySelector('#jogador1');
  const jogador2    = document.querySelector('#jogador2');
  
  if (jogador1.value == "" || jogador2.value == ""){
      alterarTexto("Preencha os nomes dos jogadores");
  }
  else{
      alterarTexto("Jogo iniciado");
      tabuleiro.style.cursor  = "pointer";
      btnIniciar.style.cursor = "no-drop";
      player1.innerHTML = jogador1.value;
      player2.innerHTML = jogador2.value;
      placar1.innerHTML = vitoriasO;
      placar2.innerHTML = vitoriasX;
      btnIniciar.disabled = true;
      iniciarJogo();
  }
}

const iniciarJogo = () => {
  jogadorO = false;
  tabuleiro.style.display  = "flex";
  btnIniciar.style.display = "none";
  btnProximo.style.display = "none";
  jogador1.disabled = true;
  jogador2.disabled = true;

  mapItems();
};

const verificaGanhador = (currentPlayer) => {
  return possiveisVitorias.some((combination) => {
    return combination.every((index) => {
      return items[index].classList.contains(currentPlayer);
    });
  });
};

const verificaJogadas = () => {
  return [...items].every((item) => {
    return item.classList.contains("x") || item.classList.contains("o");
  });
};

const fimDeJogo = (isDraw) => {
  if (isDraw) {
    texto.innerText = "Empate!";
  } else {
    if (jogadorO) {
      vitoriasO += 1;
      placar1.innerHTML  = vitoriasO;
      // Seleciona o elemento no DOM
      var $wrapper = document.querySelector('#historico-item'),

      // String de texto
      HTMLNovo = jogador1.value + '<br>';

      // Insere o texto antes do conteúdo atual do elemento
      $wrapper.insertAdjacentHTML('afterbegin', HTMLNovo);
    } else {
      vitoriasX += 1;
      placar2.innerHTML  = vitoriasX;
      var $wrapper = document.querySelector('#historico-item'),
      HTMLNovo = jogador2.value + '<br>';
      $wrapper.insertAdjacentHTML('afterbegin', HTMLNovo);
    }
  }
  btnProximo.style.display = "flex";
  tabuleiro.style.display = "none";
  melhorDeTres();
};

const handleClick = (e) => {
  // Colocar a marca (X ou Círculo)
  const item = e.target;
  const classToAdd = jogadorO ? "o" : "x";
  
  item.classList.add(classToAdd);
  
  // Verificar por vitória
  const ganhador = verificaGanhador(classToAdd);
  
  // Verificar por empate
  const isDraw = verificaJogadas();
  
  if (ganhador) {
    fimDeJogo(false);
  }
  else if (isDraw) {
    fimDeJogo(true);
  }
  else {
    jogadorO = !jogadorO;
  }
};

function alterarTexto(texto) {
  mensagem.innerHTML = texto
}

const melhorDeTres = () => {
  if(vitoriasO == 3){
    ganhador.innerHTML = "Ganhador!! " + jogador1.value;
    localStorage.setItem(totalJogos, jogador1.value);
    trocarbtns()
  }
  else if(vitoriasX == 3){
    ganhador.innerHTML = "Ganhador!! " + jogador2.value;
    localStorage.setItem(totalJogos, jogador2.value);
    trocarbtns()
  }
}

const trocarbtns = () => {
  btnProximo.style.display = "none";
  btnRestart.style.display = "flex";
  totalJogos += 1;
}

const mapItems = () => {
  for (const item of items) {
    item.classList.remove("o");
    item.classList.remove("x");
    item.removeEventListener("click", handleClick);
    item.addEventListener("click", handleClick, { once: true });
  }
}

function reiniciar(){
  zerar();
}

const zerar = () => {
  jogador1.removeAttribute("disabled");
  jogador2.removeAttribute("disabled");
  btnIniciar.removeAttribute("disabled");
  btnIniciar.style.cursor = "pointer";
  btnIniciar.style.display = "flex";
  mensagem.innerHTML = "";
  jogador1.value = "";
  jogador2.value = "";
  player1.innerHTML = "";
  player2.innerHTML = "";
  placar1.innerHTML = "";
  placar2.innerHTML = "";
  ganhador.innerHTML = "";
  texto.innerHTML = "";

  tabuleiro.style.display = "none";
  tabuleiro.style.cursor = "no-drop";
  btnProximo.style.display = "none";
  btnRestart.style.display = "none";
  document.querySelector('#historico-item').innerHTML = "";
  vitoriasO = 0;
  vitoriasX = 0;
  mapItems();
}
btnProximo.addEventListener("click", iniciarJogo);
