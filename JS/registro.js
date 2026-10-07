/* =========================================================
   ALTIORIA AIRLINES - CREAR CUENTA
   ========================================================= */


/* =========================================================
   FORMULARIO
   ========================================================= */

const formulario =
    document.getElementById("form-registro");


if (formulario) {

    formulario.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            /* ================= DATOS ================= */

            const nombre =
                document.getElementById("nombre")
                .value
                .trim();


            const correo =
                document.getElementById("correo")
                .value
                .trim();


            const password =
                document.getElementById("password")
                .value;


            const confirmar =
                document.getElementById("confirmar")
                .value;


            /* ================= COMPROBAR CAMPOS ================= */

            if (
                !nombre ||
                !correo ||
                !password ||
                !confirmar
            ) {

                alert(
                    "Completa todos los campos."
                );

                return;

            }


            /* ================= COMPROBAR CONTRASEÑAS ================= */

            if (password !== confirmar) {

                alert(
                    "Las contraseñas no coinciden."
                );

                return;

            }


            /* ================= COMPROBAR CONTRASEÑA ================= */

            if (password.length < 6) {

                alert(
                    "La contraseña debe tener al menos 6 caracteres."
                );

                return;

            }


            /* ================= CREAR USUARIO ================= */

            const usuario = {

                nombre: nombre,

                correo: correo,

                password: password

            };


            /* ================= GUARDAR CUENTA ================= */

            localStorage.setItem(
                "usuarioAltioria",
                JSON.stringify(usuario)
            );


            /* ================= ACTIVAR SESION ================= */

            localStorage.setItem(
                "sesionAltioria",
                "activa"
            );


            /* ================= MENSAJE ================= */

            alert(
                "Cuenta creada correctamente."
            );


            /* ================= VOLVER AL INICIO ================= */

            window.location.href =
                "../index.html";

        }
    );

}