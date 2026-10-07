

/* ================= HEADER ================= */

const header = document.getElementById("header");

window.addEventListener("scroll", function() {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ================= CARRITO ================= */

function actualizarContador() {

    const contador = document.getElementById("contador-carrito");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (contador) {
        contador.textContent = carrito.length;
    }

}

actualizarContador();


/* ================= VUELOS ================= */

const vuelos = [

    {
        codigo: "ALT 101",
        origen: "SAL",
        destino: "BOG",
        salida: "06:30",
        llegada: "09:15",
        duracion: "2h 45min",
        escalas: "Directo",
        precio: 245
    },

    {
        codigo: "ALT 202",
        origen: "SAL",
        destino: "MAD",
        salida: "18:30",
        llegada: "12:10",
        duracion: "10h 40min",
        escalas: "Directo",
        precio: 850
    },

    {
        codigo: "ALT 303",
        origen: "SAL",
        destino: "MIA",
        salida: "09:20",
        llegada: "13:30",
        duracion: "4h 10min",
        escalas: "Directo",
        precio: 390
    },

    {
        codigo: "ALT 404",
        origen: "SAL",
        destino: "GUA",
        salida: "07:15",
        llegada: "08:25",
        duracion: "1h 10min",
        escalas: "Directo",
        precio: 150
    },

    {
        codigo: "ALT 505",
        origen: "SAL",
        destino: "SJO",
        salida: "14:20",
        llegada: "15:35",
        duracion: "1h 15min",
        escalas: "Directo",
        precio: 175
    },

    {
        codigo: "ALT 606",
        origen: "BOG",
        destino: "SAL",
        salida: "15:40",
        llegada: "18:20",
        duracion: "2h 40min",
        escalas: "Directo",
        precio: 245
    },

    {
        codigo: "ALT 707",
        origen: "BOG",
        destino: "MAD",
        salida: "20:00",
        llegada: "12:30",
        duracion: "9h 30min",
        escalas: "Directo",
        precio: 790
    },

    {
        codigo: "ALT 808",
        origen: "MEX",
        destino: "MAD",
        salida: "19:10",
        llegada: "13:40",
        duracion: "10h 30min",
        escalas: "Directo",
        precio: 720
    },

    {
        codigo: "ALT 909",
        origen: "MAD",
        destino: "SAL",
        salida: "14:30",
        llegada: "19:10",
        duracion: "10h 40min",
        escalas: "Directo",
        precio: 850
    },

    {
        codigo: "ALT 110",
        origen: "MIA",
        destino: "SAL",
        salida: "16:00",
        llegada: "18:20",
        duracion: "4h 20min",
        escalas: "Directo",
        precio: 390
    },

    {
        codigo: "ALT 111",
        origen: "GUA",
        destino: "SAL",
        salida: "10:15",
        llegada: "11:25",
        duracion: "1h 10min",
        escalas: "Directo",
        precio: 150
    },

    {
        codigo: "ALT 112",
        origen: "SJO",
        destino: "SAL",
        salida: "17:30",
        llegada: "18:45",
        duracion: "1h 15min",
        escalas: "Directo",
        precio: 175
    }

];


/* ================= ELEMENTOS ================= */

const origen = document.getElementById("origen");
const destino = document.getElementById("destino");
const salida = document.getElementById("salida");
const regreso = document.getElementById("regreso");
const viajeros = document.getElementById("viajeros");

const btnBuscar = document.getElementById("btn-buscar");
const intercambiar = document.getElementById("intercambiar");

const campoRegreso = document.getElementById("campo-regreso");

const resultados = document.getElementById("resultados-vuelos");
const listaVuelos = document.getElementById("lista-vuelos");
const resumen = document.getElementById("resumen-busqueda");


/* ================= FECHA MINIMA ================= */

const hoy = new Date();

const fechaHoy =
    hoy.getFullYear() +
    "-" +
    String(hoy.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(hoy.getDate()).padStart(2, "0");

salida.min = fechaHoy;
regreso.min = fechaHoy;


salida.addEventListener("change", function() {

    regreso.min = salida.value;

});


/* ================= TIPO DE VIAJE ================= */

const tiposViaje = document.querySelectorAll(
    'input[name="tipoViaje"]'
);

tiposViaje.forEach(function(tipo) {

    tipo.addEventListener("change", function() {

        if (this.value === "solo-ida") {

            campoRegreso.style.display = "none";
            regreso.value = "";
            regreso.required = false;

        } else {

            campoRegreso.style.display = "flex";
            regreso.required = true;

        }

    });

});


/* ================= INTERCAMBIAR ================= */

intercambiar.addEventListener("click", function() {

    const temporal = origen.value;

    origen.value = destino.value;

    destino.value = temporal;

});


/* ================= BUSCAR VUELOS ================= */

btnBuscar.addEventListener("click", function() {

    const origenSeleccionado = origen.value;
    const destinoSeleccionado = destino.value;
    const fechaSalida = salida.value;
    const fechaRegreso = regreso.value;
    const cantidadPasajeros = Number(viajeros.value);

    const tipoViaje = document.querySelector(
        'input[name="tipoViaje"]:checked'
    ).value;


    if (!origenSeleccionado || !destinoSeleccionado || !fechaSalida) {

        mostrarSinVuelos(
            "Completa el origen, destino y fecha de salida."
        );

        return;
    }


    if (origenSeleccionado === destinoSeleccionado) {

        mostrarSinVuelos(
            "El origen y el destino no pueden ser iguales."
        );

        return;
    }


    if (tipoViaje === "ida-vuelta" && !fechaRegreso) {

        mostrarSinVuelos(
            "Selecciona la fecha de regreso."
        );

        return;
    }


    if (
        tipoViaje === "ida-vuelta" &&
        fechaRegreso < fechaSalida
    ) {

        mostrarSinVuelos(
            "La fecha de regreso no puede ser anterior a la fecha de salida."
        );

        return;
    }


    const vuelosEncontrados = vuelos.filter(function(vuelo) {

        return (
            vuelo.origen === origenSeleccionado &&
            vuelo.destino === destinoSeleccionado
        );

    });


    mostrarResultados(
        vuelosEncontrados,
        cantidadPasajeros,
        fechaSalida,
        fechaRegreso
    );

});


/* ================= MOSTRAR RESULTADOS ================= */

function mostrarResultados(
    vuelosEncontrados,
    cantidadPasajeros,
    fechaSalida,
    fechaRegreso
) {

    resultados.classList.add("mostrar");

    listaVuelos.innerHTML = "";


    if (vuelosEncontrados.length === 0) {

        mostrarSinVuelos(
            "No encontramos vuelos disponibles para la ruta seleccionada."
        );

        resultados.scrollIntoView({
            behavior: "smooth"
        });

        return;
    }


    resumen.textContent =
        "Encontramos " +
        vuelosEncontrados.length +
        " vuelo(s) para " +
        cantidadPasajeros +
        " pasajero(s).";


    vuelosEncontrados.forEach(function(vuelo) {

        const precioTotal =
            vuelo.precio * cantidadPasajeros;


        const tarjeta =
            document.createElement("div");


        tarjeta.className = "vuelo";


        tarjeta.innerHTML = `

            <div>

                <div class="vuelo-codigo">
                    ${vuelo.codigo}
                </div>

                <div class="vuelo-ruta">
                    ${vuelo.origen} → ${vuelo.destino}
                </div>

            </div>


            <div class="vuelo-horario">

                <div class="hora">

                    <strong>
                        ${vuelo.salida}
                    </strong>

                    <span>
                        ${vuelo.origen}
                    </span>

                </div>


                <div class="linea-vuelo"></div>


                <div class="hora">

                    <strong>
                        ${vuelo.llegada}
                    </strong>

                    <span>
                        ${vuelo.destino}
                    </span>

                </div>

            </div>


            <div class="detalles-vuelo">

                <div>
                    Duracion: ${vuelo.duracion}
                </div>

                <div>
                    ${vuelo.escalas}
                </div>

                <div>
                    Salida: ${formatearFecha(fechaSalida)}
                </div>

                ${
                    fechaRegreso
                    ?
                    `<div>
                        Regreso: ${formatearFecha(fechaRegreso)}
                    </div>`
                    :
                    ""
                }

            </div>


            <div class="precio-vuelo">

                <small>
                    ${cantidadPasajeros} pasajero(s)
                </small>

                <strong>
                    $${precioTotal} USD
                </strong>

                <button
                    class="seleccionar-vuelo"
                    data-codigo="${vuelo.codigo}"
                    data-precio="${precioTotal}"
                    data-origen="${vuelo.origen}"
                    data-destino="${vuelo.destino}"
                    data-salida="${fechaSalida}"
                    data-regreso="${fechaRegreso}"
                >
                    Seleccionar
                </button>

            </div>

        `;


        listaVuelos.appendChild(tarjeta);

    });


    agregarEventosSeleccion();


    resultados.scrollIntoView({
        behavior: "smooth"
    });

}


/* ================= SIN VUELOS ================= */

function mostrarSinVuelos(mensaje) {

    resultados.classList.add("mostrar");

    resumen.textContent = "";

    listaVuelos.innerHTML = `

        <div class="sin-vuelos">

            <h3>
                No hay vuelos disponibles
            </h3>

            <p>
                ${mensaje}
            </p>

        </div>

    `;

}


/* ================= FECHA ================= */

function formatearFecha(fecha) {

    if (!fecha) {
        return "";
    }

    const partes = fecha.split("-");

    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );

}


/* ================= SELECCIONAR VUELO ================= */

function agregarEventosSeleccion() {

    const botones =
        document.querySelectorAll(
            ".seleccionar-vuelo"
        );


    botones.forEach(function(boton) {

        boton.addEventListener("click", function() {

            const vueloSeleccionado = {

                codigo: boton.dataset.codigo,

                origen: boton.dataset.origen,

                destino: boton.dataset.destino,

                salida: boton.dataset.salida,

                regreso: boton.dataset.regreso,

                precio: Number(
                    boton.dataset.precio
                )

            };


            let carrito =
                JSON.parse(
                    localStorage.getItem("carrito")
                ) || [];


            carrito.push(
                vueloSeleccionado
            );


            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito)
            );


            actualizarContador();


            window.location.href =
                "HTML/carrito.html";

        });

    });

}