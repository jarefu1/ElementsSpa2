// clientes.js
// Gestión de clientes con Clases, Arreglos y operaciones CRUD
// (insertar, buscar, editar, eliminar, mostrar y ordenar)

// ====== Clase y estructura de datos ======
class Cliente {
  constructor(id, nombre, dni, correo, telefono, preferencia) {
    this.id = id;
    this.nombre = nombre;
    this.dni = dni;
    this.correo = correo;
    this.telefono = telefono;
    this.preferencia = preferencia;
  }
}

// Selecciones iniciales del DOM
const form = document.querySelector('.cliente-form form');
const clientesGrid = document.querySelector('.clientes-grid');
const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
const buscador = document.getElementById('buscadorClientes');
const ordenarSelect = document.getElementById('ordenarClientes');

// Inputs del formulario (según el orden definido en clientes.html)
let nombreInput, dniInput, correoInput, telefonoInput, preferenciaSelect;
if (form) {
  const inputs = form.querySelectorAll('input');
  nombreInput = inputs[0];
  dniInput = inputs[1];
  correoInput = inputs[2];
  telefonoInput = inputs[3];
  preferenciaSelect = form.querySelector('select');
}

let editingId = null;   // si estamos editando, contiene id del cliente
let clientes = [];      // arreglo principal de clientes

// ====== Cargar clientes desde localStorage al iniciar ======
document.addEventListener('DOMContentLoaded', () => {
  if (!clientesGrid) return;

  const saved = JSON.parse(localStorage.getItem('clientes') || '[]');
  clientes = saved.map(c =>
    new Cliente(c.id, c.nombre, c.dni, c.correo, c.telefono, c.preferencia)
  );
  renderClientes(clientes);
});

// ====== Utilidades ======
function genId() {
  return 'cli-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

// pequeña utilidad para escapar HTML (previene inyección simple)
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ====== Mostrar clientes en el grid ======
function renderClientes(lista) {
  if (!clientesGrid) return;
  clientesGrid.innerHTML = '';
  lista.forEach(c => appendClienteCard(c));
}

function appendClienteCard(cliente) {
  const article = document.createElement('article');
  article.className = 'cliente-card';
  article.setAttribute('data-id', cliente.id);

  article.innerHTML = `
    <div class="cliente-meta">
      <img src="imagenes/avatar-placeholder.png" alt="Avatar" class="cliente-avatar">
      <div class="cliente-info">
        <h3>${escapeHtml(cliente.nombre)}</h3>
        <p>DNI: ${escapeHtml(cliente.dni)}</p>
        <p>Preferencia: ${escapeHtml(cliente.preferencia)}</p>
      </div>
    </div>
    <div class="cliente-actions">
      <button class="btn-small" data-action="view">Ver</button>
      <button class="btn-small" data-action="edit">Editar</button>
      <button class="btn-small" data-action="delete">Eliminar</button>
    </div>
  `;

  clientesGrid.prepend(article);
}

// ====== INSERTAR / ACTUALIZAR (submit formulario) ======
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!nombreInput || !dniInput || !correoInput || !telefonoInput || !preferenciaSelect) return;

    const nombre = nombreInput.value.trim();
    const dni = dniInput.value.trim();
    const correo = correoInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const preferencia = preferenciaSelect.value.trim();

    if (!nombre || !dni || !correo || !telefono || !preferencia) {
      alert('Por favor completa todos los campos.');
      return;
    }

    if (editingId) {
      // Actualizar cliente existente
      const idx = clientes.findIndex(c => c.id === editingId);
      if (idx !== -1) {
        clientes[idx].nombre = nombre;
        clientes[idx].dni = dni;
        clientes[idx].correo = correo;
        clientes[idx].telefono = telefono;
        clientes[idx].preferencia = preferencia;
      }

      editingId = null;
      if (submitBtn) submitBtn.textContent = 'Guardar';
    } else {
      // Insertar nuevo cliente
      const nuevo = new Cliente(genId(), nombre, dni, correo, telefono, preferencia);
      clientes.push(nuevo);
    }

    // Guardar en localStorage y refrescar vista
    localStorage.setItem('clientes', JSON.stringify(clientes));
    renderClientes(clientes);
    form.reset();
  });
}

// ====== Ver / Editar / Eliminar (delegación de eventos) ======
if (clientesGrid) {
  clientesGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const action = btn.dataset.action || btn.textContent.trim().toLowerCase();
    const card = btn.closest('.cliente-card');
    const id = card ? card.getAttribute('data-id') : null;
    if (!id) return;

    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return;

    if (action === 'view' || action === 'ver') {
      alert(
        'Cliente:\n' +
        `Nombre: ${cliente.nombre}\n` +
        `DNI: ${cliente.dni}\n` +
        `Correo: ${cliente.correo}\n` +
        `Teléfono: ${cliente.telefono}\n` +
        `Preferencia: ${cliente.preferencia}`
      );
    } else if (action === 'edit' || action === 'editar') {
      if (!form) return;
      if (!nombreInput || !dniInput || !correoInput || !telefonoInput || !preferenciaSelect) return;

      nombreInput.value = cliente.nombre;
      dniInput.value = cliente.dni;
      correoInput.value = cliente.correo;
      telefonoInput.value = cliente.telefono;
      preferenciaSelect.value = cliente.preferencia;

      editingId = cliente.id;
      if (submitBtn) submitBtn.textContent = 'Actualizar';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action === 'delete' || action === 'eliminar') {
      const confirmar = confirm('¿Seguro que deseas eliminar este cliente?');
      if (!confirmar) return;

      clientes = clientes.filter(c => c.id !== id);
      localStorage.setItem('clientes', JSON.stringify(clientes));

      card.remove();
    }
  });
}

// ====== Buscar clientes ======
if (buscador) {
  buscador.addEventListener('keyup', () => {
    const texto = buscador.value.toLowerCase();
    const filtrados = clientes.filter(c =>
      c.nombre.toLowerCase().includes(texto) ||
      c.dni.toLowerCase().includes(texto)
    );
    renderClientes(filtrados);
  });
}

// ====== Ordenar clientes ======
if (ordenarSelect) {
  ordenarSelect.addEventListener('change', () => {
    let copia = clientes.slice(); // copia superficial

    switch (ordenarSelect.value) {
      case 'nombreAsc':
        copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'nombreDesc':
        copia.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case 'dniAsc':
        copia.sort((a, b) => a.dni.localeCompare(b.dni));
        break;
      case 'dniDesc':
        copia.sort((a, b) => b.dni.localeCompare(a.dni));
        break;
      default:
        // sin orden especial, mostramos como están
        break;
    }

    renderClientes(copia);
  });
}
