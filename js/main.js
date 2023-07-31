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
            Debes elegir 2 cartas:`)
            ingresar = true
            break
        }
    } while (intentos < 3)

    return (ingresar)
}

if (login()) {
    let valorCarta = 0
    let carta1 = +(prompt("Elegí el número de tu primer carta"))
    let palo1 = prompt(`Elegí el palo de tu primer carta (con un número):\n
    1. Basto\n
    2. Oro\n
    3. Espada\n
    4. Copa`).trim()
    let carta2 = +(prompt("Elegí el número de tu segunda carta"))
    let palo2 = prompt(`Elegí el palo de tu segunda carta (con un número):\n
        1. Basto\n
        2. Oro\n
        3. Espada\n
        4. Copa`).trim()
    let valorTotalEnvido = 0

    function calculaValorCarta(c) {
         if (c >= 1 && c <= 7) {
             valorCarta = c
         }
         else if (c >= 10 && c <= 12) {
             valorCarta = 0
         }
         else {
             alert("Debe elegir una carta válida en el Truco (del 1 al 7 y del 10 al 12)")
             valorCarta = "N"
         }

     return valorCarta
    }

    function calculaPuntosEnvido(c1, p1, c2, p2) {
        if (!isNaN(calculaValorCarta(carta1)) && !isNaN(calculaValorCarta(carta2))) {
            if (p1 === p2) {
                valorTotalEnvido = calculaValorCarta(carta1) + calculaValorCarta(carta2) + 20
            }
            else {
                valorTotalEnvido = Math.max(calculaValorCarta(carta1), calculaValorCarta(carta2))
            }
        } else {
            alert("Alguna de tus cartas no es válida")

        }
        return valorTotalEnvido
    }

    alert(`Tus cartas suman ${calculaPuntosEnvido(carta1, palo1, carta2, palo2)} puntos`)
    let jugada = prompt(`Que deseas hacer?\n
    1.Envido\n
    2.Falta Envido\n
    3.Me voy`).trim()
    switch (jugada) {
        case "1":
            alert("son buenas! Ganaste 2 puntos")
            break
        case "2":
            alert("no kiero. Ganaste 1 punto")
            break
        case "3":
            alert("suerte la próxima!")
            break
    }
}

else {
    alert("demasiados intentos, vuelve a intentar en 10 minutos")
}


