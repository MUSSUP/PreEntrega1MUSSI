# PreEntrega1MUSSI-
Mi proyecto JS trata sobre el juego del TRUCO argentino.
En esta primer Pre-entrega, se desarrolla un simulador interactivo sobre la jugada "ENVIDO": Las claves para acceder son: usuario: "profe" (puede escribirse con mayusculas o minúsculas) y la constraseña es: 123. El usuario luego de loguearse deberá seleccionar 2 cartas para su jugada. (conforme avance en mi aprendizaje la idea es que luego.. el usuario reciba dos cartas al azar y arme su jugada) Las cartas válidas para este juego son del 1 al 12 y habitualmente el 8 y 9 se quitan... por lo que esta es la primer validación que apliqué. Luego dichas cartas poseen un valor (del 1 al 7 valen su propio número y las denominadas "negras" del 10 al 12 tinen valor 0 para esta ronda), ambas cartas van a sumar su valor +20 puntos si son del mismo palo.. quedando así conformado el valor total del Envido. Una vez que el usuario tiene el valor de sus cartas.. podrá decidir cómo jugar.

Espero les guste mi idea!! Aguardo comentarios! Muchas gracias.

# PreEntrega2MUSSI-
En esta segunda preentrega.. continúo avanzando con el simulador interactivo sobre la jugada "ENVIDO" del famoso juego Truco Argentino. 
El logueo continúa siendo como en la primer etapa: usuario "profe" (puede escribirse con mayusculas o minúsculas) y la constraseña: 123.
Luego realizo la creación de "mazo" de cartas que van desde los numeros 1 a 12, quitando las cartas que no juegan (ochos y nueves) por los 4 palos de las naipes españolas: oro, espada, basto y copa. 
A continuación se ejecuta la mezcla de cartas de manera aleatoria y se reparten 3 al usuario (jugador 1) y 3 a la "maquina" (jugador2), desde el inicio del mazo.
Luego se cuentan los puntos... dependiendo del numero de cartas y los palos de las mismas: si por lo menos dos cartas tienen el mismo palo, las mismas suman su valor + 20... (del 1 al 7 valen su propio número y las denominadas "negras" del 10 al 12 tinen valor 0)
y ahora si comienza la interacción con el usuario. Para este caso decidí no hacer aleatorias las respuestas de "la maquina" sino que dependen de los puntos que tocan (o sea no miento jeje) y se darán los siguientes casos (elegí solo algunos para simplificar en esta instancia, ya que cuando interacute a través de html será más comodo agregar el resto de los casos): 
1. si el usuario decide CANTAR ENVIDO.. y el valor de las cartas de jugador2 es mayor o igual que 23 y menor que 30.. se aceptará el envido. Si es mayor que 30, se cantará ENVIDO ENVIDO y en cualquier caso ganará el jugador que más puntos tenga. De lo contrario (si los puntos de la maquina son menores que 23, no se querrá el envido)
2. si el usuario Jug1 decide NO CANTAR NADA y la maquina Jug2 tiene 20 puntos o más.. la maquina cantará ENVIDO. El usuario podrá optar por querer o no... y ganará el que más puntos tenga.. en caso de empates en cualqueira de los casos.. gana el Jug 1 ya que es mano.    

Para la fase del TRUCO desarrolle un ranking que asigna valores a las cartas, siendo sus valores de menor a mayor: los 4; los 5; los 6 ; los 7 de basto y copa; los 10 ; los 11; los 12; los 1 (de oro y copa); los 2 ; los 3; 7 de oro; 7 de espada; 1 de basto; y 1 de espada.  


# PreEntrega3MUSSI-
Se agrega estructura estática en html y para la parte dinámica se accede y crean elementos desde el archivo JS. 
Se suman imágenes para cada carta.. cuadros para interacción con el usuario, con botones y eventos (reemplazando los prompts y alerts).
Además se agrega un Contador para ir llevando los puntos.
