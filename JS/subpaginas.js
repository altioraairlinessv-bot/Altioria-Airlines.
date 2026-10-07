/* =========================================================
ALTIORIA AIRLINES - JAVASCRIPT PARA SUBPAGINAS
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

window.addEventListener(
    "scroll",
    actualizarNavbar
);

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


});