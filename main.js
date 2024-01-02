const html = document.querySelector("[data-contexto=foco]");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBtn = document.getElementById("start-pause");
const altenarMusica = document.getElementById("alternar-musica");
const iniciarOuPausarBtn = document.querySelector("#start-pause span");
const iniciarOuPausarImg = document.querySelector(".app__card-primary-butto-icon");
const tempo = document.getElementById("timer");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const sons = {
    play: new Audio ("/sons/play.wav"),
    pause: new Audio("/sons/pause.mp3"),
    beep: new Audio("/sons/beep.mp3")
}

//console.log(iniciarOuPausarBtn)

musica.loop = true;

let temporizador = 1500;
let setIntervalo = null;

console.log(temporizador)

altenarMusica.addEventListener("change", ()=> {
    if(musica.paused) {
        musica.play();
    }else{
        musica.pause()
    }
})

focoBtn.addEventListener("click", ()=> {
    temporizador = 1500;
    alterarContexto("foco");
    botoes[0].classList.add("active");
})

curtoBtn.addEventListener("click", ()=> {
    temporizador = 300;
    alterarContexto("descanso-curto");
    botoes[1].classList.add("active");
})

longoBtn.addEventListener("click", ()=> {
    temporizador = 900;
    alterarContexto("descanso-longo");
    botoes[2].classList.add("active");
})

function alterarContexto(contexto) {
    mostrartempo();
    botoes.forEach(function(contexto) {
        contexto.classList.remove("active");
    })
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;
        
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?,<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;

        default:
            break;
    }
}

const contagemRegreciva = () => {
    mostrartempo()
    if (temporizador <= 0) {
        zerar()
        sons.beep.play()
        alert("Tempo finalizado!" )
        return
    }
    temporizador -= 1;
}

startPauseBtn.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar () {
    if(setIntervalo){
        sons.pause.play()
        zerar()
        return
    }
    sons.play.play()
    setIntervalo = setInterval(contagemRegreciva, 1000);

    iniciarOuPausarBtn.textContent = "pausar"
    alterarImg("pause");
}

function zerar() {
    clearInterval(setIntervalo);
    iniciarOuPausarBtn.textContent = "começar";
    alterarImg("play_arrow");
    setIntervalo = null
}

function alterarImg(img) {
    iniciarOuPausarImg.setAttribute("src", `/imagens/${img}.png`);
}

function mostrartempo() {
    const tempoNaTela  = new Date(temporizador * 1000);
    const tempoFormatado = tempoNaTela.toLocaleTimeString("pt-Br", {minute:"2-digit", second: "2-digit"})
    tempo.innerHTML = `${tempoFormatado}`
}

mostrartempo()