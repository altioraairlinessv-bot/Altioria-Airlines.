/* ========================================
// RECUPERAR INFORMACION
// ======================================== */

const datosGuardados =
localStorage.getItem("asientosAltiora");

const totalGuardado =
localStorage.getItem("totalAltiora");

const precioVueloGuardado =
localStorage.getItem("precioVueloAltiora");

const precioAsientosGuardado =
localStorage.getItem("precioAsientosAltiora");

const vueloGuardado =
localStorage.getItem("vueloSeleccionadoAltiora");

let asientos = [];

let total = 0;

let precioVuelo = 0;

let precioAsientos = 0;

let vuelo = {};


// ========================================
// COMPROBAR DATOS
// ========================================

if (datosGuardados) {

    asientos =
        JSON.parse(datosGuardados);

}

if (precioVueloGuardado) {

    precioVuelo =
        Number(precioVueloGuardado);

}

if (precioAsientosGuardado) {

    precioAsientos =
        Number(precioAsientosGuardado);

}

if (vueloGuardado) {

    vuelo =
        JSON.parse(vueloGuardado);

}


// ========================================
// RECUPERAR TOTAL FINAL
// ========================================

if (totalGuardado) {

    total =
        Number(totalGuardado);

} else {

    total =
        precioVuelo +
        precioAsientos;

}


// ========================================
// MOSTRAR RESUMEN
// ========================================

const listaAsientos =
asientos
.map(asiento => asiento.codigo)
.join(", ");

const cantidad =
asientos.length;

const clases =
[
    ...new Set(
        asientos.map(
            asiento => asiento.clase
        )
    )
]
.map(clase => {

    if (clase === "ejecutiva") {

        return "Ejecutiva";

    }

    if (clase === "premium") {

        return "Premium";

    }

    return "Economica";

})
.join(", ");


document.getElementById(
    "asientosResumen"
).textContent =
listaAsientos || "-";


document.getElementById(
    "cantidadResumen"
).textContent =
cantidad;


document.getElementById(
    "clasesResumen"
).textContent =
clases || "-";


document.getElementById(
    "totalResumen"
).textContent =
"$" + total.toFixed(2);


// ========================================
// NUMERO DE TARJETA
// ========================================

const numeroTarjeta =
document.getElementById(
    "numeroTarjeta"
);

numeroTarjeta.addEventListener(
    "input",
    function() {

        let valor =
            this.value
                .replace(/\D/g, "")
                .substring(0, 16);


        let grupos =
            valor.match(/.{1,4}/g);


        this.value =
            grupos
                ? grupos.join(" ")
                : "";


        document.getElementById(
            "numeroTarjetaVista"
        ).textContent =

            grupos
                ? grupos.join(" ")
                : "•••• •••• •••• ••••";

    }
);


// ========================================
// NOMBRE DEL TITULAR
// ========================================

const titular =
document.getElementById(
    "titular"
);

titular.addEventListener(
    "input",
    function() {

        document.getElementById(
            "titularVista"
        ).textContent =

            this.value.toUpperCase()
            ||
            "NOMBRE DEL TITULAR";

    }
);


// ========================================
// FECHA DE VENCIMIENTO
// ========================================

const vencimiento =
document.getElementById(
    "vencimiento"
);

vencimiento.addEventListener(
    "input",
    function() {

        let valor =
            this.value
                .replace(/\D/g, "")
                .substring(0, 4);


        if (valor.length >= 3) {

            valor =
                valor.substring(0, 2)
                +
                "/"
                +
                valor.substring(2);

        }


        this.value =
            valor;


        document.getElementById(
            "fechaVista"
        ).textContent =

            valor
            ||
            "MM/AA";

    }
);


// ========================================
// NOMBRE DEL PASAJERO
// ========================================

const nombre =
document.getElementById(
    "nombre"
);

nombre.addEventListener(
    "input",
    function() {

        document.getElementById(
            "nombreResumen"
        ).textContent =

            this.value
            ||
            "Pendiente";

    }
);


// ========================================
// BOTON PAGAR
// ========================================

document
.getElementById("pagar")
.addEventListener(
    "click",
    function() {

        const nombreValor =
            document.getElementById(
                "nombre"
            ).value.trim();


        const correo =
            document.getElementById(
                "correo"
            ).value.trim();


        const telefono =
            document.getElementById(
                "telefono"
            ).value.trim();


        const tarjeta =
            document.getElementById(
                "numeroTarjeta"
            ).value.replace(
                /\s/g,
                ""
            );


        const titularValor =
            document.getElementById(
                "titular"
            ).value.trim();


        const fecha =
            document.getElementById(
                "vencimiento"
            ).value.trim();


        const cvv =
            document.getElementById(
                "cvv"
            ).value.trim();


        // ========================================
        // VALIDACION
        // ========================================

        if (
            !nombreValor ||
            !correo ||
            !telefono ||
            tarjeta.length !== 16 ||
            !titularValor ||
            fecha.length !== 5 ||
            cvv.length < 3
        ) {

            alert(
                "Por favor completa correctamente todos los campos."
            );

            return;

        }


        // ========================================
        // GENERAR CODIGO DE RESERVA
        // ========================================

        const codigoReserva =
            "ALT" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        // ========================================
        // OBTENER CLASE
        // ========================================

        const clasesReserva =
            [
                ...new Set(
                    asientos.map(
                        asiento => {

                            if (
                                asiento.clase ===
                                "ejecutiva"
                            ) {

                                return "Ejecutiva";

                            }

                            if (
                                asiento.clase ===
                                "premium"
                            ) {

                                return "Premium";

                            }

                            return "Economica";

                        }
                    )
                )
            ]
            .join(", ");


        // ========================================
        // CREAR RESERVA COMPLETA
        // ========================================

        const reserva = {

            codigoReserva:
                codigoReserva,

            nombre:
                nombreValor,

            correo:
                correo,

            telefono:
                telefono,

            vuelo:
                vuelo.codigo || "ALT 000",

            numeroVuelo:
                vuelo.codigo || "ALT 000",

            origen:
                vuelo.origen || "---",

            destino:
                vuelo.destino || "---",

            salida:
                vuelo.salida || "--:--",

            regreso:
                vuelo.regreso || "No aplica",

            fechaSalida:
                vuelo.fechaSalida ||
                vuelo.fecha ||
                "---",

            fechaRegreso:
                vuelo.fechaRegreso ||
                "---",

            pasajeros:
                cantidad || 1,

            asientos:
                asientos.map(
                    asiento => ({

                        codigo:
                            asiento.codigo,

                        precio:
                            asiento.precio,

                        clase:
                            asiento.clase

                    })
                ),

            clases:
                clasesReserva || "Economica",

            precioVuelo:
                precioVuelo,

            precioAsientos:
                precioAsientos,

            total:
                total,

            metodoPago:
                "Tarjeta",

            estado:
                "PAGADO"

        };


        // ========================================
        // GUARDAR RESERVA
        // ========================================

        localStorage.setItem(
            "reservaAltioria",
            JSON.stringify(reserva)
        );


        // ========================================
        // MOSTRAR MENSAJE
        // ========================================

        const mensaje =
            document.getElementById(
                "mensajePago"
            );


        if (mensaje) {

            mensaje.classList.add(
                "mostrar"
            );

        }


        // ========================================
        // CAMBIAR BOTON
        // ========================================

        this.textContent =
            "PAGO COMPLETADO ✓";


        this.disabled =
            true;


        this.style.background =
            "#3c9b52";


        // ========================================
        // SUBIR AL PRINCIPIO
        // ========================================

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


        // ========================================
        // IR AL BOLETO
        // ========================================

        setTimeout(() => {

            localStorage.removeItem(
                "asientosAltiora"
            );

            localStorage.removeItem(
                "totalAltiora"
            );

            localStorage.removeItem(
                "precioVueloAltiora"
            );

            localStorage.removeItem(
                "precioAsientosAltiora"
            );


            window.location.href =
                "pago-exitoso.html";

        }, 1500);

    }
);


// ========================================
// NAVBAR
// ========================================

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


// ========================================
// MENU HAMBURGUESA
// ========================================

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

            menuHamburguesa.classList.toggle(
                "activo"
            );

            navbar.classList.toggle(
                "activo"
            );

        }
    );


    const enlaces =
        navbar.querySelectorAll("a");


    enlaces.forEach(
        function(enlace) {

            enlace.addEventListener(
                "click",
                function() {

                    menuHamburguesa.classList.remove(
                        "activo"
                    );

                    navbar.classList.remove(
                        "activo"
                    );

                }
            );

        }
    );

}