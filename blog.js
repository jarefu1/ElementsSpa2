/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
/* ============================================================
   VARIABLES, TIPOS DE DATOS, CONSTANTES Y OPERADORES
   ============================================================ */

// variable (string)
let usuario = "Invitado";

// constante (number)
const descuento = 15;

// arreglo unidimensional
let servicios = ["Masaje", "Facial", "Reflexología", "Spa Pareja"];

// arreglo bidimensional (servicio - precio)
let precios = [
    ["Masaje", 129],
    ["Facial", 89],
    ["Reflexología", 59],
    ["Spa Pareja", 249]
];

/* ============================================================
   DOM Y PROPIEDADES DE NAVEGACIÓN
   ============================================================ */

const botonHamburger = document.getElementById("hamburger");
const navList = document.querySelector(".navlist");

// Evento para menú responsive
botonHamburger.addEventListener("click", () => {
    navList.classList.toggle("active");
});

/* Mostrar en consola propiedades de navegación */
console.log("URL actual:", window.location.href);
console.log("Host:", window.location.hostname);

/* ============================================================
   FUNCIÓN CON PROMPT, CONFIRM, ALERT + ESTRUCTURAS DE CONTROL
   ============================================================ */

function calcularReserva() {
    // prompt → entrada de datos
    let nombre = prompt("Ingrese su nombre para calcular una reserva:");
    if (!nombre) return alert("No se ingresó nombre.");

    // confirm → operación lógica
    let deseaContinuar = confirm("¿Desea calcular el costo de un servicio?");
    if (!deseaContinuar) return alert("Operación cancelada.");

    // Selección de servicio con switch
    let opcion = prompt(
        "Seleccione un servicio:\n1. Masaje\n2. Facial\n3. Reflexología\n4. Spa Pareja"
    );

    let precio = 0;

    switch (opcion) {
        case "1":
            precio = 129;
            break;
        case "2":
            precio = 89;
            break;
        case "3":
            precio = 59;
            break;
        case "4":
            precio = 249;
            break;
        default:
            alert("Opción inválida");
            return;
    }

    // Uso de operador aritmético
    let precioConDescuento = precio - (precio * descuento / 100);

    alert(
        `Hola ${nombre}, el precio original es S/${precio}.\n` +
        `Con descuento del ${descuento}%, el total es: S/${precioConDescuento}.`
    );
}

/* ============================================================
   ESTRUCTURAS REPETITIVAS (FOR, FOREACH, WHILE)
   ============================================================ */

function mostrarListaServicios() {
    let texto = "SERVICIOS DISPONIBLES:\n\n";

    // FOR tradicional
    for (let i = 0; i < servicios.length; i++) {
        texto += `${i + 1}. ${servicios[i]}\n`;
    }

    // FOREACH sobre arreglo 2D
    precios.forEach((fila) => {
        console.log(`Servicio: ${fila[0]} - Precio: S/${fila[1]}`);
    });

    alert(texto);
}

// WHILE → contador simple
function contadorAnimado() {
    let i = 1;
    let resultado = "Contador WHILE:\n";

    while (i <= 5) {
        resultado += `Número: ${i}\n`;
        i++;
    }

    alert(resultado);
}

/* ============================================================
   VENTANA FLOTANTE (MODAL) → SIN ENLACES, SIN BOOTSTRAP
   ============================================================ */

const modal = document.createElement("div");
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.background = "rgba(0,0,0,0.7)";
modal.style.display = "none";
modal.style.justifyContent = "center";
modal.style.alignItems = "center";
modal.style.zIndex = "9999";

const caja = document.createElement("div");
caja.style.background = "#fff";
caja.style.padding = "20px";
caja.style.borderRadius = "12px";
caja.style.color = "#000";
caja.innerHTML = `
    <h2>Bienvenido a Elements Spa</h2>
    <p>Haz clic en un botón para probar funcionalidades JS.</p>
    <button id="btnReserva">Calcular Reserva</button>
    <button id="btnServicios">Ver Servicios</button>
    <button id="btnContador">WHILE Test</button>
    <br><br>
    <button id="cerrarModal">Cerrar</button>
`;

modal.appendChild(caja);
document.body.appendChild(modal);

// Abrir modal automáticamente al cargar página
window.onload = () => {
    modal.style.display = "flex";
};

// Botones internos del modal
document.getElementById("btnReserva").onclick = calcularReserva;
document.getElementById("btnServicios").onclick = mostrarListaServicios;
document.getElementById("btnContador").onclick = contadorAnimado;

// Cerrar modal
document.getElementById("cerrarModal").onclick = () => {
    modal.style.display = "none";
};


