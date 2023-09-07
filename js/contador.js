export class Contador {
    puntos = 0;
    nombre;
    cuentaFosforo;
    containerElement;
    

    constructor(nombre, containerElement, cuentaInicial = 0) {
        this.nombre = nombre;
        this.containerElement = containerElement;
        containerElement.querySelector("h4").innerText = nombre;
        this.puntos = cuentaInicial;
        this.cuentaFosforo = containerElement.querySelector(".cuenta");
       
    }

    agregarPuntos(cantidad = 1) {
        this.puntos += cantidad;
        this.actualizarCuenta();
    }

    reiniciarPuntos() {
        this.puntos = 0;
        this.actualizarCuenta();
    }

    actualizarCuenta() {                                   
        console.log(this.puntos, this.nombre);
        
        const fosforosActuales = this.containerElement.querySelectorAll("img");

        if (fosforosActuales) {
            fosforosActuales.forEach(fosforo => this.cuentaFosforo.removeChild(fosforo))
        }

        for (let i = 0; i < this.puntos; i++) {
            const nuevoFosforo = document.createElement("img");
            nuevoFosforo.className = "img_fosforo"
            nuevoFosforo.src = "img/fosforo.svg";
            this.cuentaFosforo.appendChild(nuevoFosforo);
        }

    }

}