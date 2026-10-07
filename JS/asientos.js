const precios = {
    ejecutiva: 320,
    premium: 185,
    economica: 120
};


const configuracion = {

    ejecutiva: {
        inicio: 1,
        filas: 3
    },

    premium: {
        inicio: 4,
        filas: 3
    },

    economica: {
        inicio: 7,
        filas: 14
    }

};


let asientosSeleccionados = [];


// =========================================================
// RECUPERAR VUELO SELECCIONADO
// =========================================================

const vueloGuardado =
    localStorage.getItem(
        "vueloSeleccionadoAltiora"
    );


let vueloSeleccionado = null;

let precioVuelo = 0;


if (vueloGuardado) {

    vueloSeleccionado =
        JSON.parse(vueloGuardado);

    precioVuelo =
        Number(vueloSeleccionado.precio) || 0;

}


// =========================================================
// CREAR ASIENTOS
// =========================================================

function crearAsientos(clase) {

    const contenedor =
        document.getElementById(clase);

    const configuracionClase =
        configuracion[clase];

    for (
        let fila = configuracionClase.inicio;
        fila < configuracionClase.inicio + configuracionClase.filas;
        fila++
    ) {

        const filaElemento =
            document.createElement("div");

        filaElemento.classList.add("fila");


        const numero =
            document.createElement("span");

        numero.classList.add("numero-fila");

        numero.textContent = fila;


        const letras = ["A", "C", "D", "F"];


        filaElemento.appendChild(numero);


        letras.forEach((letra, indice) => {

            if (indice === 2) {

                const espacio =
                    document.createElement("span");

                espacio.classList.add("pasillo");

                filaElemento.appendChild(
                    espacio
                );

            }


            const asiento =
                document.createElement("button");

            const codigo =
                fila + letra;

            asiento.textContent = codigo;

            asiento.classList.add("asiento");


            asiento.dataset.clase =
                clase;

            asiento.dataset.precio =
                precios[clase];

            asiento.dataset.codigo =
                codigo;


            const ocupado =
                Math.random() < 0.20;


            if (ocupado) {

                asiento.classList.add(
                    "ocupado"
                );

                asiento.disabled = true;

            } else {

                asiento.addEventListener(
                    "click",
                    () => {

                        seleccionarAsiento(
                            asiento
                        );

                    }
                );

            }


            filaElemento.appendChild(
                asiento
            );

        });


        contenedor.appendChild(
            filaElemento
        );

    }

}


// =========================================================
// SELECCIONAR ASIENTO
// =========================================================

function seleccionarAsiento(asiento) {

    const codigo =
        asiento.dataset.codigo;

    const precio =
        Number(asiento.dataset.precio);

    const clase =
        asiento.dataset.clase;


    const existe =
        asientosSeleccionados.find(
            asiento =>
                asiento.codigo === codigo
        );


    if (existe) {

        asientosSeleccionados =
            asientosSeleccionados.filter(
                asiento =>
                    asiento.codigo !== codigo
            );

        asiento.classList.remove(
            "seleccionado"
        );

    } else {

        asientosSeleccionados.push({

            codigo: codigo,

            precio: precio,

            clase: clase

        });

        asiento.classList.add(
            "seleccionado"
        );

    }


    actualizarResumen();

}


// =========================================================
// ACTUALIZAR RESUMEN
// =========================================================

function actualizarResumen() {

    const cantidad =
        asientosSeleccionados.length;


    const precioAsientos =
        asientosSeleccionados.reduce(
            (suma, asiento) =>
                suma + asiento.precio,
            0
        );


    const total =
        precioVuelo +
        precioAsientos;


    const lista =
        asientosSeleccionados
            .map(asiento => asiento.codigo)
            .join(", ");


    document.getElementById(
        "cantidad"
    ).textContent =
        cantidad;


    document.getElementById(
        "asientosSeleccionados"
    ).textContent =
        lista || "Ninguno";


    document.getElementById(
        "total"
    ).textContent =
        "$" + total.toFixed(2);


    document.getElementById(
        "contador"
    ).textContent =
        "Asientos seleccionados: " +
        cantidad;


    const boton =
        document.getElementById(
            "confirmar"
        );


    if (cantidad === 0) {

        boton.classList.add(
            "desactivado"
        );

    } else {

        boton.classList.remove(
            "desactivado"
        );

    }

}


// =========================================================
// CONFIRMAR
// =========================================================

document
    .getElementById("confirmar")
    .addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            if (
                asientosSeleccionados.length === 0
            ) {

                return;

            }


            // PRECIO DE LOS ASIENTOS

            const precioAsientos =
                asientosSeleccionados.reduce(
                    (suma, asiento) =>
                        suma + asiento.precio,
                    0
                );


            // TOTAL FINAL

            const total =
                precioVuelo +
                precioAsientos;


            // GUARDAR ASIENTOS

            localStorage.setItem(
                "asientosAltiora",
                JSON.stringify(
                    asientosSeleccionados
                )
            );


            // GUARDAR PRECIO DEL VUELO

            localStorage.setItem(
                "precioVueloAltiora",
                precioVuelo.toFixed(2)
            );


            // GUARDAR PRECIO DE LOS ASIENTOS

            localStorage.setItem(
                "precioAsientosAltiora",
                precioAsientos.toFixed(2)
            );


            // GUARDAR TOTAL FINAL

            localStorage.setItem(
                "totalAltiora",
                total.toFixed(2)
            );


            // IR A PAGO

            window.location.href =
                "./pago.html";

        }
    );


// =========================================================
// CREAR LAS TRES CABINAS
// =========================================================

crearAsientos("ejecutiva");

crearAsientos("premium");

crearAsientos("economica");


// =========================================================
// MOSTRAR PRECIO DEL VUELO DESDE EL INICIO
// =========================================================

actualizarResumen();


// =========================================================
// NAVBAR
// =========================================================

window.addEventListener(
    "scroll",
    function() {

        const header =
            document.getElementById(
                "header"
            );


        if (!header) {

            return;

        }


        if (window.scrollY > 50) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }
);