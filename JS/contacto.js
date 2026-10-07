emailjs.init({
    publicKey: "oL-H5Ii3GJXfd9NUe"
});


const formulario = document.getElementById("formulario-contacto");
const mensajeGracias = document.getElementById("mensaje-gracias");
const cerrarMensaje = document.getElementById("cerrar-mensaje");


formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    try {

        // PRIMER CORREO: llega a Altioria Airlines
        const respuesta = await emailjs.sendForm(
            "service_patznqv",
            "template_2o628bw",
            formulario
        );

        if (respuesta.status === 200) {

            // SEGUNDO CORREO: confirmacion al usuario
            try {

                await emailjs.sendForm(
                    "service_patznqv",
                    "template_uwsgn48",
                    formulario
                );

            } catch (errorUsuario) {

                console.error(
                    "El mensaje principal se envio, pero fallo el correo de confirmacion:",
                    errorUsuario
                );

            }

            formulario.reset();

            mensajeGracias.classList.add("mostrar");

        } else {

            alert("No se pudo enviar el mensaje. Intenta nuevamente.");

        }

    } catch (error) {

        console.error("Error al enviar el mensaje:", error);

        alert("Ocurrio un error al enviar el mensaje. Revisa tu conexion a internet.");

    }

});


cerrarMensaje.addEventListener("click", function() {

    mensajeGracias.classList.remove("mostrar");

});