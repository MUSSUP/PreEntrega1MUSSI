let user = "PROFE"
let password = "123"
let intentos = 0


const login = () => {
    let ingresar = false

    do {
        let userIngresado = prompt("Ingresa tu usuario").trim().toUpperCase()
        let passIngresada = prompt("Ingresa tu contraseña")

        if (passIngresada != password || userIngresado != user) {
            intentos += 1
            alert(`Usuario o contraseña incorrecta, vas ${intentos} de 3 intentos`)
        }
        if (password === passIngresada && user === userIngresado) {
            alert(`bienvenido ${user} vamos a Jugar!\n
            Yo doy y vos sos mano en esta vuela!`)
            ingresar = true
            break
        }
    } while (intentos < 3)

    return (ingresar)
}

if (login()) {

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
                    palo: palos[j]
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

    const muestraCartasJug1 = cartasJugador1.map(cartasJugador1 => `${cartasJugador1.numero} de ${cartasJugador1.palo}`)
        .join("\n");
    alert(`Tus cartas son:\n${muestraCartasJug1}`);



    console.log(cartasJugador1)
    console.log(cartasJugador2)

    //FASE ENVIDO: 

    //calculo de los valores de las cartas ( de 1 a 7 valen su valor.. y mayores que 7 valen cero)

    let valores1 = []
    const calcularPuntos1 = () => {
        for (let i = 0; i < cartasJugador1.length; i++) {
            if (cartasJugador1[i].numero >= 1 && cartasJugador1[i].numero <= 7) {
                valores1.push(cartasJugador1[i].numero)
            } else { valores1.push(0) }
        }
        console.log(valores1)
    }
    calcularPuntos1()

    let valores2 = []
    const calcularPuntos2 = () => {
        for (let i = 0; i < cartasJugador2.length; i++) {
            if (cartasJugador2[i].numero >= 1 && cartasJugador2[i].numero <= 7) {
                valores2.push(cartasJugador2[i].numero)
            } else { valores2.push(0) }
        }
        console.log(valores2)
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
    const cantarEnvido = () => {
        let cantoEnvidoJug2 = prompt(`ENVIDO!\n      
    1. Quiero
    2. No quiero`).trim()
        switch (cantoEnvidoJug2) {
            case "1":
                if (valorEnvidoJug1 >= valorEnvidoJug2) {
                    alert("Tus Cartas son buenas!! GANASTE 2 puntos.")
                } else {
                    alert(`${valorEnvidoJug2} son mejores!! 2 puntos para mi!`)
                }
                break
            case "2":
                alert("1 punto para mí!")
                break
        }
    }

    // juego: 
    alert(`Tus cartas suman ${valorEnvidoJug1} puntos para el envido`)
    let juegaEnvido = prompt(`Que deseas hacer?\n
    1.Envido\n
    2.No canto nada`).trim()
    switch (juegaEnvido) {
        case "1":
            if (valorEnvidoJug2 >= 23 && valorEnvidoJug2 < 30) {
                alert(`QUIERO!\n`)
                if (valorEnvidoJug1 >= valorEnvidoJug2) {
                    alert("Tus Cartas son buenas!! GANASTE 2 puntos.")
                } else {
                    alert(`${valorEnvidoJug2} son mejores!! 2 puntos para mi!`)
                }
                break
            } else if (valorEnvidoJug2 >= 30) {
                cantarEnvido()
            }
            else { alert("No Quiero.") }
            break
        case "2":
            if (valorEnvidoJug2 >= 20) {
                cantarEnvido()
            }
    }

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
                case 7: rankingCarta1.push(3);
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
            }
        }
        console.log (rankingCarta1)
    }
    verificarValoresCartas1 ()

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
                case 7: rankingCarta2.push(3);
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
            }
        }
        console.log (rankingCarta2)
    }
    verificarValoresCartas2 ()

    
   // let juega = rankingCarta2.some((elem) => elem > 5)
    //console.log (juega)

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
            alert ("ya va") 
            break;
    }

    



}

else {
    alert("demasiados intentos, vuelve a intentar en 10 minutos")
}

















