/* Captura os elementos HTML que correspondem as teclas do piano. */
const pianoKeys = document.querySelectorAll(".piano-keys .key");

/* Captura o input responsável por aumentar e diminuir volume. */
const volumeSlider = document.querySelector(".volume-slider input");

/* Captura o input responsável por mostrar e ocultar as teclas do piano. */
const keysCheck = document.querySelector(".keys-check input");

/* Cria um array para mapear as teclas. */
let mapedKeys = [];

/* Cria uma instância do objeto e obtém o arquivo de audio. */
let audio = new Audio("./src/tunes/a.wav");

/* Função responsável para fazer as teclas reproduzirem o som do piano. */
const playTune = (key) => {

    /* O objeto recebe o nome de uma tecla como parâmetro. */
    audio.src = `src/tunes/${key}.wav`

    /* O objeto reproduz o som da tecla recebida como parâmetro. */
    audio.play();

    /* Captura o valor da tecla do piano. */
    const clickedKey = document.querySelector(`[data-key="${key}"]`);

    /* Adiciona o nome de classe ao elemento HTML correspondente a tecla do piano. */
    clickedKey.classList.add("active");

    /* Remove o nome da classe adicionado a cada 150 milisegundos. */
    setTimeout(() => {
        clickedKey.classList.remove("active")
    },150)
}

/* Executa uma ação para cada tecla do piano. */
pianoKeys.forEach((key) => {

    /* Adiciona um evento de click nas teclas e invoca uma função passando como parâmetro o valor de cada tecla. */
    key.addEventListener("click", () => playTune(key.dataset.key));
    
    /* Adiciona o valor das teclas no array de teclas mapeadas. */
    mapedKeys.push(key.dataset.key);
})

/* Adiciona um evento se uma tecla do dispositivo físico for pressionada(computador) */
document.addEventListener("keydown", (e) => {
    
    /* Verifica se o valor da tecla pressionada passada como parâmetro existe no array. */
    if(mapedKeys.includes(e.key)){

        /* Invoca a função passando como parâmetro a tecla pressionada. */
        playTune(e.key)
    }
})
/* Passa um evento como parâmetro da função */
const handleVolume = (e) => {

    /* Adiciona o valor do botão de volume ao método de aumentar e diminuir volume. */
    audio.volume = e.target.value;
}

/* Função mostrar e ocultar teclas. */
const showHideKeys = () => {
    
    /* Aciona para cada tecla o método forEach. Invoca uma arrow function passando como parâmetro as teclas do piano. Adiciona a classe hide para cada tecla se ela não estiver presente e remove se estiver. */
    pianoKeys.forEach((key) => key.classList.toggle("hide"));
}

/* Adiciona um evento input ao botão de volume e invoca a função. */
volumeSlider.addEventListener("input", handleVolume);


/* Adiciona um evento de click ao botão de ligar e desligar teclas e invoca a função. */
keysCheck.addEventListener("click", showHideKeys);