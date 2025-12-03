/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


// servicios.js
// Gestión de servicios con Clase, Arreglo y operaciones CRUD:
// insertar, mostrar, buscar, editar, eliminar y ordenar.

// ===== Clase y estructura de datos =====
class Servicio {
  constructor(id, nombre, categoria, precio, duracion, nivel) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.duracion = duracion;
    this.nivel = nivel;
  }
}

// ===== Referencias al DOM =====
const formServicios = document.getElementById('formServicios');
const listaServicios = document.getElementById('serviciosLista');

const inputNombre = document.getElementById('nombreServicio');
const selectCategoria = document.getElementById('categoriaServicio');
const inputPrecio = document.getElementById('precioServicio');
const inputDuracion = document.getElementById('duracionServicio');
const selectNivel = document.getElementById('nivelServicio');

const buscadorServicios = document.getElementById('buscadorServicios');
const ordenarServicios = document.getElementById('ordenarServicios');

// arreglo principal y control de edición
let servicios = [];
let editingId = null;

// ===== Utilidades =====
function genIdServicio() {
  return 'srv-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function guardarServicios() {
  localStorage.setItem('serviciosSpa', JSON.stringify(servicios));
}

function cargarServicios() {
  const saved = JSON.parse(localStorage.getItem('serviciosSpa') || '[]');
  if (saved.length > 0) {
    servicios = saved.map(s => new Servicio(
      s.id, s.nombre, s.categoria, s.precio, s.duracion, s.nivel
    ));
  } else {
    // Servicios por defecto (para que el profe vea datos)
    servicios = [
      new Servicio(genIdServicio(), 'Masaje relajante', 'Masajes', 120, 60, 'Básico'),
      new Servicio(genIdServicio(), 'Masaje descontracturante', 'Masajes', 150, 60, 'Premium'),
      new Servicio(genIdServicio(), 'Facial hidratante', 'Faciales', 110, 45, 'Básico'),
      new Servicio(genIdServicio(), 'Manicure Spa', 'Manos y Pies', 80, 40, 'Básico'),
      new Servicio(genIdServicio(), 'Paquete Relax Total', 'Paquetes', 260, 120, 'Deluxe')
    ];
    guardarServicios();
  }
}

// ===== Renderizado =====
function renderServicios(lista) {
  if (!listaServicios) return;
  listaServicios.innerHTML = '';

  lista.forEach(servicio => {
    const card = document.createElement('div');
    card.className = 'servicio-card';
    card.setAttribute('data-id', servicio.id);

    card.innerHTML = `
      <h3>${escapeHtml(servicio.nombre)}</h3>
      <p>Categoría: ${escapeHtml(servicio.categoria)}</p>
      <p>Duración: ${escapeHtml(servicio.duracion)} min</p>
      <p>Precio: S/ ${Number(servicio.precio).toFixed(2)}</p>
      <p>Nivel: ${escapeHtml(servicio.nivel)}</p>
      <div class="servicio-actions" style="margin-top:15px; display:flex; gap:10px;">
        <button class="login-btn" data-action="edit" style="padding:6px 14px; font-size:14px;">Editar</button>
        <button class="login-btn" data-action="delete" style="padding:6px 14px; font-size:14px; background:#444;">Eliminar</button>
      </div>
    `;

    listaServicios.appendChild(card);
  });
}

// ===== Eventos =====

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', () => {
  cargarServicios();
  renderServicios(servicios);
});

// Insertar / Actualizar
if (formServicios) {
  formServicios.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    const categoria = selectCategoria.value;
    const precio = parseFloat(inputPrecio.value);
    const duracion = parseInt(inputDuracion.value, 10);
    const nivel = selectNivel.value;

    if (!nombre || !categoria || isNaN(precio) || isNaN(duracion) || !nivel) {
      alert('Por favor completa todos los campos del servicio.');
      return;
    }

    if (editingId) {
      // actualizar servicio
      const idx = servicios.findIndex(s => s.id === editingId);
      if (idx !== -1) {
        servicios[idx].nombre = nombre;
        servicios[idx].categoria = categoria;
        servicios[idx].precio = precio;
        servicios[idx].duracion = duracion;
        servicios[idx].nivel = nivel;
      }
      editingId = null;
      formServicios.querySelector('button[type="submit"]').textContent = 'Guardar servicio';
    } else {
      // insertar servicio nuevo
      const nuevo = new Servicio(
        genIdServicio(),
        nombre,
        categoria,
        precio,
        duracion,
        nivel
      );
      servicios.push(nuevo);
    }

    guardarServicios();
    renderServicios(servicios);
    formServicios.reset();
  });
}

// Editar / Eliminar con delegación
if (listaServicios) {
  listaServicios.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const action = btn.dataset.action;
    const card = btn.closest('.servicio-card');
    if (!card) return;

    const id = card.getAttribute('data-id');
    const servicio = servicios.find(s => s.id === id);
    if (!servicio) return;

    if (action === 'edit') {
      // Llenar formulario para editar
      inputNombre.value = servicio.nombre;
      selectCategoria.value = servicio.categoria;
      inputPrecio.value = servicio.precio;
      inputDuracion.value = servicio.duracion;
      selectNivel.value = servicio.nivel;

      editingId = servicio.id;
      formServicios.querySelector('button[type="submit"]').textContent = 'Actualizar servicio';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action === 'delete') {
      const confirmar = confirm('¿Seguro que deseas eliminar este servicio?');
      if (!confirmar) return;

      servicios = servicios.filter(s => s.id !== id);
      guardarServicios();
      renderServicios(servicios);
    }
  });
}

// Buscar servicios
if (buscadorServicios) {
  buscadorServicios.addEventListener('keyup', () => {
    const texto = buscadorServicios.value.toLowerCase();

    const filtrados = servicios.filter(s =>
      s.nombre.toLowerCase().includes(texto) ||
      s.categoria.toLowerCase().includes(texto) ||
      s.nivel.toLowerCase().includes(texto)
    );

    renderServicios(filtrados);
  });
}

// Ordenar servicios
if (ordenarServicios) {
  ordenarServicios.addEventListener('change', () => {
    let copia = servicios.slice();

    switch (ordenarServicios.value) {
      case 'nombreAsc':
        copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'nombreDesc':
        copia.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case 'precioAsc':
        copia.sort((a, b) => a.precio - b.precio);
        break;
      case 'precioDesc':
        copia.sort((a, b) => b.precio - a.precio);
        break;
      default:
        // sin orden especial
        break;
    }

    renderServicios(copia);
  });
}
