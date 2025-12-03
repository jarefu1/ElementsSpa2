/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

// ========================================
// CARGAR PRODUCTO EN LA PÁGINA DE PAGO
// ========================================

// ====================================================
// CARGAR PRODUCTO DESDE LOCALSTORAGE EN LA TABLA
// ====================================================

const datos = localStorage.getItem("productoSeleccionado");

let producto = null;

if (datos) {
    producto = JSON.parse(datos);

    const celdaNombre = document.querySelector(".pedido table tr:nth-child(2) td:first-child");
    const celdaSubtotal = document.querySelector(".pedido table tr:nth-child(2) td:last-child");
    const celdaTotal = document.querySelector(".pedido table tr.total td:last-child");

    celdaNombre.textContent = `${producto.nombre} × ${producto.cantidad}`;
    celdaSubtotal.textContent = `S/ ${producto.subtotal.toFixed(2)}`;
    celdaTotal.textContent = `S/ ${producto.subtotal.toFixed(2)}`;
} else {
    alert("No seleccionaste ningún producto. Volviendo a la tienda...");
    window.location.href = "productos.html";
}

// ====================================================
// GENERAR FACTURA CON LOS DATOS DEL FORMULARIO
// ====================================================

document.addEventListener("DOMContentLoaded", () => {

    const btnPedido = document.getElementById("btnPedido");
    const modal = document.getElementById("facturaModal");
    const cerrar = document.getElementById("cerrarFactura");
    const detalle = document.getElementById("detalleFactura");

    btnPedido.addEventListener("click", () => {

        // Obtener datos del formulario
        const nombres = document.querySelector('input[placeholder="Número y nombre de la calle"]').previousElementSibling.previousElementSibling.value;
        const apellidos = document.querySelectorAll(".fila input")[1].value;
        const documento = document.querySelector('label:contains("Documento") + input')?.value || "No definido";
        const telefono = document.querySelectorAll(".fila input")[2].value;
        const correo = document.querySelector('input[type="email"]').value;
        const direccion = document.querySelector('input[placeholder="Número y nombre de la calle"]').value;
        const ciudad = document.querySelector('label:contains("Ciudad") + input')?.value || "No definido";

        // Validar que el usuario completó lo necesario
        if (!nombres || !apellidos || !telefono || !correo || !direccion || !ciudad) {
            alert("Por favor completa todos los campos obligatorios.");
            return;
        }

        // Fecha actual
        let fecha = new Date().toLocaleString();

        // Generar HTML de factura
        detalle.innerHTML = `
            <h3>Datos del Cliente</h3>
            <p><strong>Nombre:</strong> ${nombres} ${apellidos}</p>
            <p><strong>DNI:</strong> ${documento}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Correo:</strong> ${correo}</p>
            <p><strong>Dirección:</strong> ${direccion}, ${ciudad}</p>
            <hr>

            <h3>Detalles del Pedido</h3>
            <p><strong>Producto:</strong> ${producto.nombre}</p>
            <p><strong>Cantidad:</strong> ${producto.cantidad}</p>
            <p><strong>Subtotal:</strong> S/ ${producto.subtotal.toFixed(2)}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <hr>

            <h2>Total a Pagar: S/ ${producto.subtotal.toFixed(2)}</h2>
        `;

        modal.style.display = "flex";
    });

    cerrar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

});
