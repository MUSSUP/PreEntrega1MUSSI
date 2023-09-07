
//CREACION DE MAZO:
//para construir el mazo... hago un bucle anidado dentro de un for que me va a hacer los 12 numeros de cartas que preciso
//le indico en otro for que me lo haga por cada objeto de mi array de palos (o sea 4 veces), y luego quito las 8 cartas 
//que en el Truco Argentino no se usan para jugar  (los 8 y 9 de cada palo). 
//a todo eso lo coloco dentro de una función, ya que pretendo usarla cada vez que comience una jugada 

const mazo = []
let mazoBarajado = []
const palos = ["espada", "copa", "basto", "oro"]


const crearMazo = () => {
    for (let i = 1; i < 13; i++) {
        for (let j = 0; j < palos.length; j++) {
            const carta = {
                numero: i,
                palo: palos[j],
                img: `${i}_de_${palos[j]}`          // 3ºentrega: en la creacion de la carta agrego la imagen
            }
            mazo.push(carta)
        }
    }
    mazo.splice(28, 8)
}

//BARAJAR MAZO:
//el jugador antes de dar las cartas deberá barajar las mismas.. para ello la siguente función, la cual 
//crea un nuevo array medinate el map, reordenado mediante un sort y utilizo la función math.random para 
//generar la aleatoriedad.  

const barajarMazo = () => {
    mazoBarajado = mazo.map(carta => ({ carta, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ carta }) => carta)
}

//REPARTIR CARTAS: 
//quitar 2 cartas de mazoBarajado y dar una a jugador1 y otra a jugador2 (la PC)
//repetir x2 y mostrar las cartas al usuario (jugador 1)

let cartasJugador1 = []
let cartasJugador2 = []

const repartir = () => {
    for (let i = 0; i < 3; i++) {
        cartasJugador1.push(mazoBarajado[0])
        mazoBarajado.shift()
        cartasJugador2.push(mazoBarajado[0])
        mazoBarajado.shift()
    }
}
crearMazo()
barajarMazo()
repartir()

let empezar = document.getElementById("boton_empezar")    //3ºentrega: capuro el elemento boton 
empezar.onclick = () => { mostrarCartas(), juegoEnvido() }                      //para comenzar y que se repartan las cartas

const muestraCartasJug1 = cartasJugador1.map(cartasJugador1 => `${cartasJugador1.numero} de ${cartasJugador1.palo}`)


//3º entrega: creación de las cartas en html para mostrarlas.   

function mostrarCartas(cartasJugada) {
    let contenedorCartasJug1 = document.getElementById("cartas_jug1")
    cartasJugador1.forEach(carta => {
        let tarjetaCarta = document.createElement("div")
        tarjetaCarta.className = "tarjeta_cartas_Jug1"
        tarjetaCarta.innerHTML = `
            <h3>${carta.numero} de ${carta.palo}</h3>
            <img class = "img_carta" src="./img/cartas/${carta.img}.jpg">`
        contenedorCartasJug1.appendChild(tarjetaCarta)
    })
    let contenedorCartasJug2 = document.getElementById("cartas_jug2")
    cartasJugador2.forEach(carta => {
        let tarjetaCarta = document.createElement("div")
        tarjetaCarta.className = "tarjeta_cartas_Jug2"
        tarjetaCarta.innerHTML = `
            <img class = "img_carta" src="./img/cartas/dorso de las cartas.png">`
        contenedorCartasJug2.appendChild(tarjetaCarta)
    })
}

console.log(cartasJugador2)




//ANOTADOR DE PUNTOS: 
//para el contador destinamos una clase objeto, importada desde el archivo contador.js
// para poder asignar metodos y variables y usar los mismos para cada jugador (p1 y p2) 
//la funcion actualizar cuenta me va a oder agrupar los puntos de a 5, y mostrar fósforos por cada punto.

import {Contador} from "./contador.js"
const p1 = new Contador("Nosotros", document.getElementById("jugador1container"));
const p2 = new Contador("Ellos", document.getElementById("jugador2container"));



let reiniciar = document.getElementById("botonReinicio")                      //config boton reinicio
reiniciar.onclick = () => { p1.reiniciarPuntos(), p2.reiniciarPuntos() }























//FASE ENVIDO: 

//calculo de los valores de las cartas ( de 1 a 7 valen su valor.. y mayores que 7 valen cero)

let valores1 = []
const calcularPuntos1 = () => {
    for (let i = 0; i < cartasJugador1.length; i++) {
        if (cartasJugador1[i].numero >= 1 && cartasJugador1[i].numero <= 7) {
            valores1.push(cartasJugador1[i].numero)
        } else { valores1.push(0) }
    }
}
calcularPuntos1()

let valores2 = []
const calcularPuntos2 = () => {
    for (let i = 0; i < cartasJugador2.length; i++) {
        if (cartasJugador2[i].numero >= 1 && cartasJugador2[i].numero <= 7) {
            valores2.push(cartasJugador2[i].numero)
        } else { valores2.push(0) }
    }
}
calcularPuntos2()

//calculo del valor del envido de cada jugados: suma los valores de las cartas, solo si dos cartas tienen el mismo palo

let valorEnvidoJug1 = 0
let valorEnvidoJug2 = 0

if (cartasJugador1[0].palo === cartasJugador1[1].palo) {
    valorEnvidoJug1 = valores1[0] + valores1[1] + 20
} else if (cartasJugador1[0].palo === cartasJugador1[2].palo) {
    valorEnvidoJug1 = valores1[0] + valores1[2] + 20
} else if (cartasJugador1[1].palo === cartasJugador1[2].palo) {
    valorEnvidoJug1 = valores1[1] + valores1[2] + 20
} else {
    valorEnvidoJug1 = Math.max(...valores1)
}
console.log(`valor envido jugador 1: ${valorEnvidoJug1}`)

if (cartasJugador2[0].palo === cartasJugador2[1].palo) {
    valorEnvidoJug2 = valores2[0] + valores2[1] + 20
} else if (cartasJugador2[0].palo === cartasJugador2[2].palo) {
    valorEnvidoJug2 = valores2[0] + valores2[2] + 20
} else if (cartasJugador2[1].palo === cartasJugador2[2].palo) {
    valorEnvidoJug2 = valores2[1] + valores2[2] + 20
} else {
    valorEnvidoJug2 = Math.max(...valores2)
}
console.log(`valor envido jugador 2: ${valorEnvidoJug2}`)

//INTERACCION CON USUARIO:

//funcion para cuando canta envido la PC (juagdor2)  
//3ra entrega: quito algunos alerts y reemplazo prompts por cuadros con botones para que usuario interactúe
//aplico eventos a esos botones
//suma puntos en el contador dependiendo las elecciones y valores

const cantarEnvido = () => {
    let eliminaBoxPreguntas = document.getElementsByClassName("box_preguntas");
    eliminaBoxPreguntas[0].remove();

    let eliminaBoxCantos = document.getElementsByClassName("box_cantos");

    let boxcantos = document.getElementById("mesa")
    let cantoEnvidoJug2 = document.createElement("div")
    cantoEnvidoJug2.className = "box_cantos"
    cantoEnvidoJug2.innerHTML = `
    <h3 class = "canto_envido">ENVIDO!</h3>
    <div id="botones_quiero">
    <button id= "boton_box_quiero">Quiero</button> 
    <button id= "boton_box_noquiero">No Quiero</button></div>`
    boxcantos.appendChild(cantoEnvidoJug2)


    let siCantoEnvidoJug2 = document.getElementById("boton_box_quiero")
    siCantoEnvidoJug2.onclick = () => {
        if (valorEnvidoJug1 >= valorEnvidoJug2) {
            alert("Tus Cartas son buenas!! GANASTE 2 puntos.");
            eliminaBoxCantos[0].remove();
            p1.agregarPuntos(2);
        } else {
            alert(`${valorEnvidoJug2} son mejores!! 2 puntos para mi!`);
            eliminaBoxCantos[0].remove();
            p2.agregarPuntos(2);
        }
    }
    let noCantoEnvidoJug2 = document.getElementById("boton_box_noquiero")
    noCantoEnvidoJug2.onclick = () => {
        alert("1 punto para mí!");
        eliminaBoxCantos[0].remove();
        p2.agregarPuntos();
    }
}



function juegoEnvido() {
    let boxjugada = document.getElementById("mesa")
    let boxpreguntas = document.createElement("div")
    boxpreguntas.className = "box_preguntas"
    boxpreguntas.innerHTML = `
    <h3 class = "titulo_box_preguntas">Tus cartas suman ${valorEnvidoJug1} puntos</h3>
    <h4>Querés cantar envido?</h4>`
    boxjugada.appendChild(boxpreguntas)
    let botonesBox = document.createElement("div")
    botonesBox.className = "botonesBox"
    botonesBox.innerHTML = `
    <button id= "boton_box_si">Si</button> 
    <button id= "boton_box_no">No</button>`
    boxpreguntas.appendChild(botonesBox)

    let eliminaBoxPreguntas = document.getElementsByClassName("box_preguntas");

    let canta_envido_jug1 = document.getElementById("boton_box_si")
    canta_envido_jug1.onclick = () => {
        if (valorEnvidoJug2 >= 23 && valorEnvidoJug2 < 30) {
            alert(`QUIERO!\n`)
            if (valorEnvidoJug1 >= valorEnvidoJug2) {
                alert("Tus Cartas son buenas!! GANASTE 2 puntos.");
                eliminaBoxPreguntas[0].remove();
                p1.agregarPuntos(2);
            } else {
                alert(`${valorEnvidoJug2} son mejores!! 2 puntos para mi!`);
                eliminaBoxPreguntas[0].remove();
                p2.agregarPuntos(2);
            }
        } else if (valorEnvidoJug2 >= 30) {
            cantarEnvido()
        }
        else {
            alert("No Quiero. 1 punto par vos!!");
            eliminaBoxPreguntas[0].remove();
            p1.agregarPuntos();
        }
    }

    let canta_envido_jug2 = document.getElementById("boton_box_no")
    canta_envido_jug2.onclick = () => {
        if (valorEnvidoJug2 >= 20) {
            cantarEnvido()
        } else { eliminaBoxPreguntas[0].remove(); }
    }
}





























/*
//FASE TRUCO: 

//se hace un ranking para asignar valor a las cartas de cada jugador: 


let rankingCarta1 = []
const verificarValoresCartas1 = () => {
    for (let i = 0; i < cartasJugador1.length; i++) {
        switch (cartasJugador1[i].numero) {
            case 4: rankingCarta1.push(1);
                break;
            case 5: rankingCarta1.push(2);
                break;
            case 6: rankingCarta1.push(3);
                break;
            case 7: if (cartasJugador1[i].palo === "copa" || cartasJugador1[i].palo === "basto") {
                rankingCarta2.push(3)
            };
                break;
            case 10: rankingCarta1.push(4);
                break;
            case 11: rankingCarta1.push(5);
                break;
            case 12: rankingCarta1.push(6);
                break;
            case 1: rankingCarta1.push(7);
                break;
            case 2: rankingCarta1.push(8);
                break;
            case 3: rankingCarta1.push(9);
                break;
            case 7: if (cartasJugador1[i].palo === "oro") {
                rankingCarta2.push(10)
            };
                break;
            case 7: if (cartasJugador1[i].palo === "espada") {
                rankingCarta2.push(11)
            };
                break;
            case 1: if (cartasJugador1[i].palo === "basto") {
                rankingCarta2.push(12)
            };
                break;
            case 1: if (cartasJugador1[i].palo === "espada") {
                rankingCarta2.push(13)
            };
                break;
        }
    }
    console.log(rankingCarta1)
}
verificarValoresCartas1()
//arreglar el ranking!! y ver de filtrar los 1 falsos!!
let rankingCarta2 = []
const verificarValoresCartas2 = () => {
    for (let i = 0; i < cartasJugador2.length; i++) {
        switch (cartasJugador2[i].numero) {
            case 4: rankingCarta2.push(1);
                break;
            case 5: rankingCarta2.push(2);
                break;
            case 6: rankingCarta2.push(3);
                break;
            case 7: if (cartasJugador2[i].palo === "copa" || cartasJugador2[i].palo === "basto") {
                rankingCarta2.push(3)
            };
                break;
            case 10: rankingCarta2.push(4);
                break;
            case 11: rankingCarta2.push(5);
                break;
            case 12: rankingCarta2.push(6);
                break;
            case 1: rankingCarta2.push(7);
                break;
            case 2: rankingCarta2.push(8);
                break;
            case 3: rankingCarta2.push(9);
                break;
            case 7: if (cartasJugador2[i].palo === "oro") {
                rankingCarta2.push(10)
            };
                break;
            case 7: if (cartasJugador2[i].palo === "espada") {
                rankingCarta2.push(11)
            };
                break;
            case 1: if (cartasJugador2[i].palo === "basto") {
                rankingCarta2.push(12)
            };
                break;
            case 1: if (cartasJugador2[i].palo === "espada") {
                rankingCarta2.push(13)
            };
                break;
        }
    }
    console.log(rankingCarta2)
}
verificarValoresCartas2()


//juego: 

let juegaTruco = prompt(`Tu turno! te recuerdo tus cartas:\n
${muestraCartasJug1}\n
Que deseas hacer?\n
1.Truco
2.Tirar una carta`).trim()
switch (juegaTruco) {
    case "1":
        if (rankingCarta2.some((elem) => elem > 6)) {
            prompt(`QUIERO!\n`)
            //da vuelta tu primer carta:\n
            //1. ${muestraCartasJug1[0]}\n
            //2. ${muestraCartasJug1[1]}\n
            //3. ${muestraCartasJug1[2]}\n`)
            //alert (Math.max(...rankingCarta2))
        }
        else {
            alert(`no quiero!`)
        }
        break;

    case "2":
        alert("ya va")
        break;
}


*/




















