/* =========================================================
ALTIORIA AIRLINES - JAVASCRIPT PRINCIPAL
========================================================= */

document.addEventListener("DOMContentLoaded", function() {

/* =========================================================
NAVBAR
========================================================= */

const header = document.getElementById("header");

function actualizarNavbar() {

    if (!header) {
        return;
    }

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", actualizarNavbar);

actualizarNavbar();


/* =========================================================
MENU HAMBURGUESA
========================================================= */

const menuHamburguesa =
    document.getElementById(
        "menu-hamburguesa"
    );

const navbar =
    document.querySelector(
        ".navbar"
    );


if (
    menuHamburguesa &&
    navbar
) {

    menuHamburguesa.addEventListener(
        "click",
        function() {

            navbar.classList.toggle(
                "menu-abierto"
            );

        }
    );

}


/* =========================================================
VUELOS DISPONIBLES
========================================================= */

const vuelos = [

    {
        codigo:"ALT 101",
        origen:"SAL",
        destino:"BOG",
        salida:"06:30",
        llegada:"09:15",
        duracion:"2h 45min",
        escalas:"Directo",
        precio:245
    },

    {
        codigo:"ALT 202",
        origen:"SAL",
        destino:"MAD",
        salida:"18:30",
        llegada:"12:10",
        duracion:"10h 40min",
        escalas:"Directo",
        precio:850
    },

    {
        codigo:"ALT 303",
        origen:"SAL",
        destino:"MIA",
        salida:"09:20",
        llegada:"13:30",
        duracion:"4h 10min",
        escalas:"Directo",
        precio:390
    },

    {
        codigo:"ALT 404",
        origen:"SAL",
        destino:"GUA",
        salida:"07:15",
        llegada:"08:25",
        duracion:"1h 10min",
        escalas:"Directo",
        precio:150
    },

    {
        codigo:"ALT 505",
        origen:"SAL",
        destino:"SJO",
        salida:"14:20",
        llegada:"15:35",
        duracion:"1h 15min",
        escalas:"Directo",
        precio:175
    },

    {
        codigo:"ALT 606",
        origen:"BOG",
        destino:"SAL",
        salida:"15:40",
        llegada:"18:20",
        duracion:"2h 40min",
        escalas:"Directo",
        precio:245
    },

    {
        codigo:"ALT 707",
        origen:"BOG",
        destino:"MAD",
        salida:"20:00",
        llegada:"12:30",
        duracion:"9h 30min",
        escalas:"Directo",
        precio:790
    },

    {
        codigo:"ALT 808",
        origen:"MEX",
        destino:"MAD",
        salida:"19:10",
        llegada:"13:40",
        duracion:"10h 30min",
        escalas:"Directo",
        precio:720
    },

    {
        codigo:"ALT 909",
        origen:"MAD",
        destino:"SAL",
        salida:"14:30",
        llegada:"19:10",
        duracion:"10h 40min",
        escalas:"Directo",
        precio:850
    },

    {
        codigo:"ALT 110",
        origen:"MIA",
        destino:"SAL",
        salida:"16:00",
        llegada:"18:20",
        duracion:"4h 20min",
        escalas:"Directo",
        precio:390
    },

    {
        codigo:"ALT 111",
        origen:"GUA",
        destino:"SAL",
        salida:"10:15",
        llegada:"11:25",
        duracion:"1h 10min",
        escalas:"Directo",
        precio:150
    },

    {
        codigo:"ALT 112",
        origen:"SJO",
        destino:"SAL",
        salida:"17:30",
        llegada:"18:45",
        duracion:"1h 15min",
        escalas:"Directo",
        precio:175
    }

];


/* =========================================================
ELEMENTOS DEL BUSCADOR
========================================================= */

const origen =
    document.getElementById("origen");

const destino =
    document.getElementById("destino");

const salida =
    document.getElementById("salida");

const regreso =
    document.getElementById("regreso");

const viajeros =
    document.getElementById("viajeros");

const btnBuscar =
    document.getElementById("btn-buscar");

const intercambiar =
    document.getElementById("intercambiar");

const resultados =
    document.getElementById("resultados-vuelos");

const listaVuelos =
    document.getElementById("lista-vuelos");

const resumen =
    document.getElementById("resumen-busqueda");


/* =========================================================
FECHAS
========================================================= */

function establecerFechasMinimas() {

    if (!salida && !regreso) {
        return;
    }

    const hoy = new Date();

    const año =
        hoy.getFullYear();

    const mes =
        String(
            hoy.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            hoy.getDate()
        ).padStart(2, "0");

    const fechaActual =
        `${año}-${mes}-${dia}`;

    if (salida) {
        salida.min = fechaActual;
    }

    if (regreso) {
        regreso.min = fechaActual;
    }

}

establecerFechasMinimas();


/* =========================================================
REGRESO
========================================================= */

if (salida && regreso) {

    salida.addEventListener(
        "change",
        function() {

            regreso.min =
                salida.value;

            if (
                regreso.value &&
                regreso.value < salida.value
            ) {

                regreso.value =
                    salida.value;

            }

        }
    );

}


/* =========================================================
INTERCAMBIAR
========================================================= */

if (intercambiar) {

    intercambiar.addEventListener(
        "click",
        function() {

            if (!origen || !destino) {
                return;
            }

            const valorOrigen =
                origen.value;

            origen.value =
                destino.value;

            destino.value =
                valorOrigen;

        }
    );

}


/* =========================================================
BUSCAR VUELOS
========================================================= */

if (btnBuscar) {

    btnBuscar.addEventListener(
        "click",
        function() {

            if (!origen || !destino) {
                return;
            }

            if (
                !origen.value ||
                !destino.value
            ) {

                alert(
                    "Selecciona el origen y el destino."
                );

                return;
            }

            if (
                origen.value ===
                destino.value
            ) {

                alert(
                    "El origen y el destino no pueden ser iguales."
                );

                return;
            }

            if (
                salida &&
                !salida.value
            ) {

                alert(
                    "Selecciona una fecha de salida."
                );

                return;
            }

            if (
                regreso &&
                regreso.value &&
                salida &&
                regreso.value < salida.value
            ) {

                alert(
                    "La fecha de regreso no puede ser anterior a la fecha de salida."
                );

                return;
            }

            mostrarVuelos();

        }
    );

}


/* =========================================================
MOSTRAR VUELOS
========================================================= */

function mostrarVuelos() {

    if (!listaVuelos) {
        return;
    }

    listaVuelos.innerHTML = "";

    const vuelosEncontrados =
        vuelos.filter(
            function(vuelo) {

                return (
                    vuelo.origen ===
                    origen.value &&

                    vuelo.destino ===
                    destino.value
                );

            }
        );


    if (vuelosEncontrados.length === 0) {

        listaVuelos.innerHTML = `

            <div class="sin-vuelos">

                <h3>
                    No encontramos vuelos
                </h3>

                <p>
                    No hay vuelos disponibles para esta ruta.
                </p>

            </div>

        `;

        if (resultados) {

            resultados.style.display =
                "block";

            resultados.classList.add(
                "mostrar"
            );

        }

        return;
    }


    let cantidadPasajeros = 1;

    if (viajeros) {

        cantidadPasajeros =
            Number(
                viajeros.value
            ) || 1;

    }


    vuelosEncontrados.forEach(
        function(vuelo) {

            const precioTotal =
                vuelo.precio *
                cantidadPasajeros;


            const tarjeta =
                document.createElement(
                    "div"
                );


            /*
             * IMPORTANTE:
             * El CSS utiliza .vuelo
             * para estas tarjetas.
             */

            tarjeta.className =
                "vuelo";


            tarjeta.innerHTML = `

                <div>

                    <div class="vuelo-codigo">

                        <strong>
                            ${vuelo.codigo}
                        </strong>

                    </div>

                    <div class="vuelo-ruta">

                        ${vuelo.origen}
                        →
                        ${vuelo.destino}

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


                    <div>

                        <div class="linea-vuelo"></div>

                    </div>


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
                        ${vuelo.duracion}
                    </div>

                    <div>
                        ${vuelo.escalas}
                    </div>

                    <div>
                        ${cantidadPasajeros}
                        pasajero(s)
                    </div>

                </div>


                <div class="precio-vuelo">

                    <small>
                        Precio total
                    </small>

                    <strong>
                        $${precioTotal.toFixed(2)}
                    </strong>


                    <button
                        type="button"
                        class="seleccionar-vuelo"

                        data-codigo="${vuelo.codigo}"

                        data-origen="${vuelo.origen}"

                        data-destino="${vuelo.destino}"

                        data-salida="${salida ? salida.value : ""}"

                        data-regreso="${regreso ? regreso.value : ""}"

                        data-precio="${precioTotal}"

                        data-pasajeros="${cantidadPasajeros}"
                    >

                        Seleccionar

                    </button>

                </div>

            `;


            listaVuelos.appendChild(
                tarjeta
            );

        }
    );


    if (resumen) {

        resumen.textContent =
            `Vuelos de ${origen.value} a ${destino.value}`;

    }


    if (resultados) {

        resultados.style.display =
            "block";

        resultados.classList.add(
            "mostrar"
        );

        resultados.scrollIntoView({
            behavior: "smooth"
        });

    }


    agregarEventosSeleccionar();

}


/* =========================================================
SELECCIONAR VUELO
========================================================= */

function agregarEventosSeleccionar() {

    const botones =
        document.querySelectorAll(
            ".seleccionar-vuelo"
        );


    /*
     * LA RUTA ESTA EN EL HTML.
     * JAVASCRIPT NO TIENE LA RUTA ESCRITA.
     */

    const rutaAsientos =
        document.getElementById(
            "ruta-asientos"
        );


    botones.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const vueloSeleccionado = {

                        codigo:
                            boton.dataset.codigo,

                        origen:
                            boton.dataset.origen,

                        destino:
                            boton.dataset.destino,

                        salida:
                            boton.dataset.salida,

                        regreso:
                            boton.dataset.regreso,

                        pasajeros:
                            Number(
                                boton.dataset.pasajeros
                            ) || 1,

                        precio:
                            Number(
                                boton.dataset.precio
                            ) || 0

                    };


                    /*
                     * GUARDAR EL VUELO
                     */

                    localStorage.setItem(
                        "vueloSeleccionadoAltiora",
                        JSON.stringify(
                            vueloSeleccionado
                        )
                    );


                    /*
                     * OBTENER LA RUTA
                     * DESDE EL HTML
                     */

                    if (rutaAsientos) {

                        const ruta =
                            rutaAsientos.getAttribute(
                                "href"
                            );

                        if (ruta) {

                            window.location.href =
                                ruta;

                        }

                    }

                }
            );

        }
    );

}


/* =========================================================
CARRITO
========================================================= */

function actualizarContadorCarrito() {

    const contador =
        document.getElementById(
            "contador-carrito"
        );


    if (!contador) {
        return;
    }


    const carrito =
        JSON.parse(
            localStorage.getItem(
                "carrito"
            )
        ) || [];


    contador.textContent =
        carrito.length;

}

actualizarContadorCarrito();


/* =========================================================
USUARIO
========================================================= */

function mostrarUsuario() {

    const contenedor =
        document.getElementById(
            "usuario-nav"
        );


    if (!contenedor) {
        return;
    }


    const usuarioGuardado =
        localStorage.getItem(
            "usuarioAltioria"
        );


    const sesion =
        localStorage.getItem(
            "sesionAltioria"
        );


    if (
        !usuarioGuardado ||
        sesion !== "activa"
    ) {

        const rutaLogin =
            window.location.pathname.includes(
                "/HTML/"
            )
                ? "login.html"
                : "HTML/login.html";


        contenedor.innerHTML = `

            <a
                href="${rutaLogin}"
                class="inicio-de-sesion"
            >
                Iniciar sesion
            </a>

        `;

        return;
    }


    let usuario;


    try {

        usuario =
            JSON.parse(
                usuarioGuardado
            );

    } catch (error) {

        localStorage.removeItem(
            "usuarioAltioria"
        );

        localStorage.removeItem(
            "sesionAltioria"
        );

        return;

    }


    if (
        !usuario ||
        !usuario.nombre
    ) {

        return;

    }


    const inicial =
        usuario.nombre
        .charAt(0)
        .toUpperCase();


    contenedor.innerHTML = `

        <div class="usuario-activo">

            <span class="usuario-inicial">
                ${inicial}
            </span>

            <span class="usuario-datos">

                <span class="usuario-nombre">
                    ${usuario.nombre}
                </span>

                <span class="cuenta-activa">
                    ● Cuenta activa
                </span>

            </span>


            <button
                type="button"
                class="cerrar-sesion"
                id="cerrar-sesion"
            >
                Cerrar sesion
            </button>

        </div>

    `;


    const botonCerrar =
        document.getElementById(
            "cerrar-sesion"
        );


    if (botonCerrar) {

        botonCerrar.addEventListener(
            "click",
            cerrarSesion
        );

    }

}


/* =========================================================
CERRAR SESION
========================================================= */

function cerrarSesion() {

    localStorage.removeItem(
        "sesionAltioria"
    );


    mostrarUsuario();


    alert(
        "Has cerrado sesion correctamente."
    );

}


mostrarUsuario();

});