/* =========================================================
   ALTIORIA AIRLINES - INICIO DE SESION
   ========================================================= */


/* =========================================================
   FORMULARIO
   ========================================================= */

const formulario =
    document.getElementById("form-login");


if (formulario) {

    formulario.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            /* ================= DATOS ================= */

            const correo =
                document.getElementById("correo")
                .value
                .trim();


            const password =
                document.getElementById("password")
                .value;


            /* ================= CUENTA GUARDADA ================= */

            const usuarioGuardado =
                localStorage.getItem(
                    "usuarioAltioria"
                );


            /* ================= NO EXISTE CUENTA ================= */

            if (!usuarioGuardado) {

                alert(
                    "No existe una cuenta registrada."
                );

                return;

            }


            const usuario =
                JSON.parse(
                    usuarioGuardado
                );


            /* ================= COMPROBAR DATOS ================= */

            if (
                correo !== usuario.correo ||
                password !== usuario.password
            ) {

                alert(
                    "El correo o la contraseña son incorrectos."
                );

                return;

            }


            /* ================= ACTIVAR SESION ================= */

            localStorage.setItem(
                "sesionAltioria",
                "activa"
            );


            /* ================= MENSAJE ================= */

            alert(
                "Inicio de sesion exitoso."
            );


            /* ================= VOLVER AL INICIO ================= */

            window.location.href =
                "../index.html";

        }
    );

}