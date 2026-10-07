document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       PAGINA: RESERVAR VUELO
       ===================================== */

    const botonBuscar = document.getElementById("buscarVuelos");

    if (botonBuscar) {

        botonBuscar.addEventListener("click", function (evento) {

            evento.preventDefault();


            /* OBTENER DATOS DEL FORMULARIO */

            const origen = document.getElementById("origen").value.trim();

            const destino = document.getElementById("destino").value.trim();

            const salida = document.getElementById("salida").value;

            const regreso = document.getElementById("regreso").value;

            const pasajeros = document.getElementById("pasajeros").value;

            const clase = document.getElementById("clase").value;


            /* COMPROBAR CAMPOS */

            if (origen === "" || destino === "" || salida === "") {

                alert("Por favor completa el origen, destino y fecha de salida.");

                return;

            }


            /* GUARDAR INFORMACION */

            localStorage.setItem("origen", origen);

            localStorage.setItem("destino", destino);

            localStorage.setItem("salida", salida);

            localStorage.setItem("regreso", regreso);

            localStorage.setItem("pasajeros", pasajeros);

            localStorage.setItem("clase", clase);


            /* IR A LA PAGINA DE VUELOS */

            window.location.href = "vuelos.html";

        });

    }



    /* =====================================
       PAGINA: VUELOS DISPONIBLES
       ===================================== */

    const resumen = document.querySelector(".resumen");


    if (resumen) {


        /* RECUPERAR INFORMACION */

        const origen = localStorage.getItem("origen");

        const destino = localStorage.getItem("destino");

        const salida = localStorage.getItem("salida");

        const regreso = localStorage.getItem("regreso");

        const pasajeros = localStorage.getItem("pasajeros");

        const clase = localStorage.getItem("clase");



        /* =====================================
           RESUMEN DE LA RESERVA
           ===================================== */

        const datosResumen = resumen.querySelectorAll("div");


        /* ORIGEN */

        if (origen && datosResumen[0]) {

            datosResumen[0].querySelector("strong").textContent = origen;

        }


        /* DESTINO */

        if (destino && datosResumen[1]) {

            datosResumen[1].querySelector("strong").textContent = destino;

        }


        /* FECHA DE SALIDA */

        if (salida && datosResumen[2]) {

            const fechaSalida = new Date(salida + "T00:00:00");


            const opcionesFecha = {

                day: "2-digit",

                month: "short",

                year: "numeric"

            };


            datosResumen[2].querySelector("strong").textContent =

                fechaSalida.toLocaleDateString("es-ES", opcionesFecha);

        }


        /* PASAJEROS */

        if (pasajeros && datosResumen[3]) {

            datosResumen[3].querySelector("strong").textContent =

                pasajeros +

                (pasajeros == 1 ? " pasajero" : " pasajeros");

        }



        /* =====================================
           ACTUALIZAR RUTAS
           ===================================== */

        const rutas = document.querySelectorAll(".informacion p");


        rutas.forEach(function (ruta) {

            if (origen && destino) {

                ruta.textContent =

                    origen + " → " + destino;

            }

        });



        /* =====================================
           ACTUALIZAR CIUDADES
           ===================================== */

        const tarjetas = document.querySelectorAll(".tarjeta-vuelo");


        tarjetas.forEach(function (tarjeta) {


            const horarios =

                tarjeta.querySelectorAll(".horario");


            if (horarios.length >= 2) {


                /* CIUDAD DE ORIGEN */

                const ciudadOrigen =

                    horarios[0].querySelector("span");


                if (ciudadOrigen && origen) {

                    ciudadOrigen.textContent = origen;

                }


                /* CIUDAD DE DESTINO */

                const ciudadDestino =

                    horarios[1].querySelector("span");


                if (ciudadDestino && destino) {

                    ciudadDestino.textContent = destino;

                }

            }

        });

    }

});