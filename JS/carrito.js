/* =========================================================
ALTIORIA AIRLINES - CARRITO
========================================================= */

/* =========================================================
ELEMENTOS
========================================================= */

const contenedorCarrito =
document.getElementById("carrito");

const subtotalElemento =
document.getElementById("subtotal");

const impuestosElemento =
document.getElementById("impuestos");

const totalElemento =
document.getElementById("total");

const contador =
document.getElementById("contador-carrito");

const continuar =
document.getElementById("continuar");

/* =========================================================
OBTENER CARRITO
========================================================= */

let carrito =
JSON.parse(
localStorage.getItem("carrito")
) || [];

/* =========================================================
CONTADOR
========================================================= */

function actualizarContador() {

if (!contador) {
    return;
}

contador.textContent =
    carrito.length;

}

/* =========================================================
MOSTRAR CARRITO
========================================================= */

function mostrarCarrito() {

if (!contenedorCarrito) {
    return;
}

contenedorCarrito.innerHTML = "";


if (carrito.length === 0) {

    contenedorCarrito.innerHTML = `

        <div class="carrito-vacio">

            <h2>
                Tu carrito esta vacio
            </h2>

            <p>
                Todavia no has seleccionado ningun vuelo.
            </p>

            <a href="../index.html">
                Buscar vuelos
            </a>

        </div>

    `;

    actualizarTotales();

    return;

}


carrito.forEach(function(vuelo, indice) {

    const tarjeta =
        document.createElement("div");


    tarjeta.className =
        "vuelo";


    let informacionAsientos = "";


    if (
        vuelo.asientos &&
        vuelo.asientos.length > 0
    ) {

        const listaAsientos =
            vuelo.asientos
                .map(function(asiento) {

                    return (
                        asiento.codigo +
                        " (" +
                        asiento.clase +
                        ")"
                    );

                })
                .join(", ");


        informacionAsientos = `

            <p>
                Asiento(s):
                <strong>
                    ${listaAsientos}
                </strong>
            </p>

        `;

    }


    const precioVuelo =
        Number(vuelo.precio) || 0;


    const precioAsientos =
        Number(vuelo.precioAsientos) || 0;


    const subtotalReserva =
        precioVuelo +
        precioAsientos;


    tarjeta.innerHTML = `

        <div class="vuelo-info">

            <h3>
                Vuelo ${vuelo.codigo}
            </h3>


            <p>

                <strong>
                    ${vuelo.origen}
                </strong>

                →

                <strong>
                    ${vuelo.destino}
                </strong>

            </p>


            <p>
                Fecha de salida:
                ${formatearFecha(vuelo.salida)}
            </p>


            ${
                vuelo.regreso
                ?
                `
                <p>
                    Fecha de regreso:
                    ${formatearFecha(vuelo.regreso)}
                </p>
                `
                :
                ""
            }


            <p>
                Pasajeros:
                ${vuelo.pasajeros || 1}
            </p>


            ${informacionAsientos}

        </div>


        <div class="precio">

            <p>
                Vuelo:
                <strong>
                    $${precioVuelo.toFixed(2)}
                </strong>
            </p>


            <p>
                Asiento(s):
                <strong>
                    $${precioAsientos.toFixed(2)}
                </strong>
            </p>


            <p>
                Subtotal:
                <strong>
                    $${subtotalReserva.toFixed(2)}
                </strong>
            </p>


            <button
                type="button"
                class="eliminar"
                data-indice="${indice}"
            >
                Eliminar
            </button>

        </div>

    `;


    contenedorCarrito.appendChild(
        tarjeta
    );

});


agregarEventosEliminar();

actualizarTotales();

}

/* =========================================================
CALCULAR TOTALES
========================================================= */

function actualizarTotales() {

let subtotal = 0;


carrito.forEach(function(vuelo) {

    subtotal +=
        Number(vuelo.precio) || 0;

    subtotal +=
        Number(vuelo.precioAsientos) || 0;

});


const impuestos =
    subtotal * 0.13;


const total =
    subtotal + impuestos;


if (subtotalElemento) {

    subtotalElemento.textContent =
        "$" + subtotal.toFixed(2);

}


if (impuestosElemento) {

    impuestosElemento.textContent =
        "$" + impuestos.toFixed(2);

}


if (totalElemento) {

    totalElemento.textContent =
        "$" + total.toFixed(2);

}

}

/* =========================================================
ELIMINAR RESERVA
========================================================= */

function agregarEventosEliminar() {

const botones =
    document.querySelectorAll(".eliminar");


botones.forEach(function(boton) {

    boton.addEventListener(
        "click",
        function() {

            const indice =
                Number(
                    boton.dataset.indice
                );


            if (
                isNaN(indice) ||
                indice < 0 ||
                indice >= carrito.length
            ) {

                return;

            }


            carrito.splice(
                indice,
                1
            );


            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito)
            );


            mostrarCarrito();

            actualizarContador();

        }
    );

});

}

/* =========================================================
FORMATEAR FECHA
========================================================= */

function formatearFecha(fecha) {

if (!fecha) {
    return "No especificada";
}


const partes =
    fecha.split("-");


if (partes.length !== 3) {
    return fecha;
}


return (
    partes[2] +
    "/" +
    partes[1] +
    "/" +
    partes[0]
);

}

/* =========================================================
CONTINUAR CON LA RESERVA
========================================================= */

if (continuar) {

continuar.addEventListener(
    "click",
    function() {

        if (carrito.length === 0) {

            alert(
                "No tienes ningun vuelo en el carrito."
            );

            return;

        }


        let subtotal = 0;


        carrito.forEach(function(vuelo) {

            subtotal +=
                Number(vuelo.precio) || 0;

            subtotal +=
                Number(vuelo.precioAsientos) || 0;

        });


        const impuestos =
            subtotal * 0.13;


        const total =
            subtotal + impuestos;


        localStorage.setItem(
            "resumenReserva",
            JSON.stringify({

                subtotal:
                    subtotal,

                impuestos:
                    impuestos,

                total:
                    total

            })
        );


        window.location.href =
            "pago.html";

    }
);

}

/* =========================================================
INICIAR
========================================================= */

actualizarContador();

mostrarCarrito();