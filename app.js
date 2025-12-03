/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


/* app.js - compartido por las 3 páginas
   Aquí encontrarás:
   - l) Tipos de datos y operadores
   - m) Estructuras de control (if/else, switch, for, forEach, while)
   - n) DOM y propiedades de navegación (location, history, document)
   - o) Barras de navegación responsivas y ventanas flotantes (modales)
*/

/* ---------------------------
   NAV: resaltar el enlace activo y menú responsive
   --------------------------- */
// Obtiene el nombre del archivo actual para comparar con href de los enlaces
const currentPage = location.pathname.split('/').pop() || "index.html";
document.querySelectorAll('.navlist a').forEach(a => {
  // n) uso de propiedad de navegación: location.pathname para detectar la página actual
  if (a.getAttribute('href') === currentPage) {
    a.classList.add('active'); // Marca el link activo
  }
});

// Toggle menú móvil (o)
const hamburger = document.querySelector('.hamburger');
const navlist = document.querySelector('.navlist');
if (hamburger && navlist) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); // animación de hamburguesa
    navlist.classList.toggle('show');     // muestra/oculta el menú responsive
    document.body.classList.toggle('menu-open'); // evita scroll cuando menú abierto
  });
}

/* ---------------------------
   l) Tipos de datos y operadores (const, let, arrays, matrices, operadores)
   --------------------------- */
// Tipos primitivos
const IVA_RATE = 0.18;           // const (no cambia)
let subtotal = 0;               // number variable
let clienteNombre = "";         // string
let esSocio = false;            // boolean

// Arreglo unidimensional: lista de productos (objetos)
let productos = [
  {id: 1, nombre: "Aceite esencial Lavanda", precio: 45.00},
  {id: 2, nombre: "Crema corporal nutritiva", precio: 55.50},
  {id: 3, nombre: "Exfoliante de sal", precio: 39.90},
];

// Arreglo bidimensional (matriz) ejemplo: inventario por sucursal [sucursal, productoId, stock]
let inventario = [
  ["Centro", 1, 12],
  ["Centro", 2, 8],
  ["Norte", 1, 6],
  ["Norte", 3, 10]
];

// Operadores aritméticos y lógicos (ejemplo)
function calcularTotalConIVA(subtotalLocal){
  // l) operador aritmético: multiplicación y suma
  const iva = subtotalLocal * IVA_RATE;
  const total = subtotalLocal + iva;
  return { subtotal: subtotalLocal, iva, total };
}

/* ---------------------------
   Mostrar productos en la página (DOM)
   n) uso del DOM: document.querySelector, createElement, innerText
   --------------------------- */
function renderProductos(){
  const cont = document.getElementById('productos-grid');
  if (!cont) return;
  cont.innerHTML = "";
  productos.forEach(p => {
    const card = document.createElement('div');
    card.className = "card fade-in";
    card.innerHTML = `
      <h3>${p.nombre}</h3>
      <p class="small">Descripción corta del producto.</p>
      <div class="price">S/ ${p.precio.toFixed(2)}</div>
      <div class="row">
        <a class="btn add-to-cart" href="#" data-id="${p.id}">Añadir</a>
        <a class="btn ghost" href="#" data-id="${p.id}" data-action="info">Ver</a>
      </div>
    `;
    cont.appendChild(card);
  });

  // l + m) ejemplo: evento y uso de operadores lógicos para manejar la acción
  cont.querySelectorAll('.add-to-cart').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = Number(btn.dataset.id);
      const prod = productos.find(x=> x.id === id);
      if(prod){
        subtotal += prod.precio; // operador +=
        alert(`Se añadió: ${prod.nombre}\nPrecio: S/ ${prod.precio.toFixed(2)}`);
        actualizarResumen(); // actualiza el resumen de carrito / totales
      }
    });
  });

  cont.querySelectorAll('[data-action="info"]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = Number(btn.dataset.id);
      const prod = productos.find(x=> x.id === id);
      if(prod) abrirModalInfo(prod); // muestra modal con info (ventana flotante)
    });
  });
}

/* ---------------------------
   Modal informativo (o: ventanas flotantes)
   --------------------------- */
const backdrop = document.getElementById('modal-backdrop');
function abrirModalInfo(prod){
  if(!backdrop) return;
  backdrop.style.display = 'flex';
  backdrop.innerHTML = `
    <div class="modal fade-in" role="dialog" aria-modal="true">
      <h3>${prod.nombre}</h3>
      <p class="small">Precio: S/ ${prod.precio.toFixed(2)}</p>
      <p class="small">Descripción detallada del producto y beneficios.</p>
      <div class="actions">
        <button id="modal-close" class="btn ghost">Cerrar</button>
        <button id="modal-add" class="btn">Comprar</button>
      </div>
    </div>
  `;
  document.getElementById('modal-close').addEventListener('click', cerrarModal);
  document.getElementById('modal-add').addEventListener('click', ()=>{
    subtotal += prod.precio;
    alert(`Compra simulada: ${prod.nombre} \nPrecio: S/ ${prod.precio.toFixed(2)}`);
    cerrarModal();
    actualizarResumen();
  });
}
function cerrarModal(){
  if(!backdrop) return;
  backdrop.style.display = 'none';
  backdrop.innerHTML = '';
}

/* click fuera del modal cierra */
if(backdrop){
  backdrop.addEventListener('click', (e)=>{
    if(e.target === backdrop) cerrarModal();
  });
}

/* ---------------------------
   Resumen / carrito visual
   --------------------------- */
function actualizarResumen(){
  const el = document.getElementById('resumen');
  if(!el) return;
  const { subtotal: s, iva, total } = calcularTotalConIVA(subtotal);
  el.innerHTML = `
    <div class="small">Subtotal: S/ ${s.toFixed(2)}</div>
    <div class="small">IVA (18%): S/ ${iva.toFixed(2)}</div>
    <div><strong>Total: S/ ${total.toFixed(2)}</strong></div>
  `;
}

/* ---------------------------
   m) ESTRUCTURAS DE CONTROL - ejemplos
   --------------------------- */
function ejemploEstructuras(){
  // IF - ELSE
  let edad = Number(prompt("Ingrese su edad para ver promociones (ejemplo IF-ELSE):", "25"));
  if (isNaN(edad) || edad <= 0) {
    alert("Edad inválida");
  } else if (edad < 18) {
    alert("Promoción: 10% descuento para menores de edad (ejemplo ELSE-IF)");
  } else {
    alert("Gracias, no aplica descuento por edad");
  }

  // SWITCH - CASE
  let metodo = prompt("Elija método de contacto: (1) WhatsApp (2) Llamada (3) Email", "1");
  switch (metodo) {
    case '1': alert("Seleccionaste WhatsApp"); break;
    case '2': alert("Seleccionaste Llamada"); break;
    case '3': alert("Seleccionaste Email"); break;
    default: alert("Opción no reconocida"); break;
  }

  // FOR
  let suma = 0;
  for (let i = 0; i < productos.length; i++) {
    suma += productos[i].precio; // operación aritmética en loop
  }
  console.log("Suma precios (for):", suma);

  // forEach
  productos.forEach(p => console.log("Producto por forEach:", p.nombre, p.precio));

  // WHILE (ejemplo: consumir inventario hasta que vacíe una sucursal)
  let idx = 0;
  while (idx < inventario.length) {
    // m) operadores lógicos
    if (inventario[idx][0] === "Centro") {
      // hacer algo (simulación)
    }
    idx++;
  }
}

/* ---------------------------
   Pagos: simulador simple (usando prompt/confirm/alert)
   --------------------------- */
function procesarPagoSimulado(){
  // m) uso de prompt y confirm para entrada/salida
  const nombre = prompt("Nombre del titular:");
  if (!nombre) { alert("Pago cancelado: faltó nombre"); return; }
  const tarjeta = prompt("Número de tarjeta (simulación):");
  if (!tarjeta) { alert("Pago cancelado: faltó tarjeta"); return; }
  // confirm
  const ok = confirm(`Confirmar pago de S/ ${(calcularTotalConIVA(subtotal).total).toFixed(2)} con la tarjeta terminada en ${tarjeta.slice(-4)}`);
  if (ok) {
    alert("Pago simulado: ¡Transacción exitosa!");
    // Reiniciar carrito
    subtotal = 0;
    actualizarResumen();
  } else {
    alert("Pago cancelado por el usuario.");
  }
}

/* ---------------------------
   Ejemplo de uso del history / navegación (n)
   --------------------------- */
function irA(pagina){
  // n) uso de history API y location
  history.pushState({page:pagina}, "", pagina);
  // Carga simple: cambiar location (aquí se usa para ejemplo; en proyecto real abrirías la página)
  location.href = pagina;
}

/* ---------------------------
   Iniciadores - ejecutar al cargar la pagina
   --------------------------- */
document.addEventListener('DOMContentLoaded', ()=> {
  renderProductos();        // muestra productos en la página si existe el contenedor
  actualizarResumen();     // actualiza resumen si existe
  // asignar botones globales si existen
  const pagoBtn = document.getElementById('btn-pagar');
  if (pagoBtn) pagoBtn.addEventListener('click', procesarPagoSimulado);

  const demoStrucBtn = document.getElementById('ejemplo-estructuras');
  if (demoStrucBtn) demoStrucBtn.addEventListener('click', ejemploEstructuras);

  // cerrar menú al navegar (UX)
  document.querySelectorAll('.navlist a').forEach(a=>{
    a.addEventListener('click', ()=> {
      if (navlist.classList.contains('show')){
        navlist.classList.remove('show');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  });
});
