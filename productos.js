/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

// ================================
// CAPTURAR PRODUCTO + CANTIDAD Y GUARDARLO EN LOCALSTORAGE
// ================================

// Botones de compra
const botonesComprar = document.querySelectorAll(".btn");

// Recorremos todos los botones Comprar
botonesComprar.forEach(boton => {
    boton.addEventListener("click", function (e) {

        e.preventDefault();

        // Capturamos la tarjeta del producto
        const card = this.parentElement;
        const nombre = card.querySelector("h3").textContent;
        const precioTexto = card.querySelector(".precio").textContent;

        // Convertimos "S/ 45.00" a número
        const precio = parseFloat(precioTexto.replace("S/", "").trim());

        // Preguntar cantidad al usuario
        let cantidad = prompt("¿Cuántas unidades deseas comprar?");

        // Validación
        cantidad = parseInt(cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Cantidad inválida.");
            return;
        }

        // Calcular subtotal
        const subtotal = precio * cantidad;

        // Crear objeto final
        const producto = {
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            subtotal: subtotal
        };

        // Guardar en localStorage
        localStorage.setItem("productoSeleccionado", JSON.stringify(producto));

        // Ir a pago.html
        window.location.href = "pago.html";
    });
});
