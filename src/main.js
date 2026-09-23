import './style.css'
import { productos } from './datos.js'

// Elemento donde se dibujan las tarjetas (lo creas en el Ejercicio 1)
const catalogo = document.getElementById('catalogo')

// ------------------------------------------------------------
// EJERCICIO 2 — mostrarProductos(lista)
// Convierte una lista de productos en tarjetas HTML y las pone en la página.
// Forma general:
//   catalogo.innerHTML = lista.map(p => `
//     <article class="...las mismas clases de tu Ejercicio 1...">
//       <h3>${p.nombre}</h3>
//       ...
//       <button data-id="${p.id}">Agregar</button>
//     </article>
//   `).join('')
// ------------------------------------------------------------
function mostrarProductos(lista) {
  // Escribe aquí tu código
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = lista.map(p => `
  <div class="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow p-4 flex flex-col justify-between">
      <div>
        <h2 class="font-bold text-lg">${p.nombre}</h2>
        <p class="dark:text-gray-300">$${p.precio} MXN</p>
      </div>
      <button data-id="${p.id}" class="mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors">
        Agregar
      </button>
    </div>
  `).join('');
}

mostrarProductos(productos)

// ------------------------------------------------------------
// EJERCICIO 3 — Armar el pedido
// El pedido es un arreglo con los productos que la persona va agregando.
// Pasos (detalle en el README):
//   1. Escucha el clic en el contenedor #catalogo (delegación de eventos).
//   2. Busca el producto por id con .find() y agrégalo con .push().
//   3. Dibuja el pedido con mostrarPedido() y calcula el total con .reduce().
//   4. Botón "Vaciar pedido".
// ------------------------------------------------------------
// Escribe aquí tu código del Ejercicio 3
const pedido = []
const listaPedido = document.getElementById("lista-pedido");
const totalEl = document.getElementById("total");
const btnVaciar = document.getElementById("btn-vaciar");

catalogo.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-id]');
  if (!boton) return;
  const id = Number(boton.dataset.id);

  const producto = productos.find(p => p.id === id);
  const enPedido = pedido.find(p => p.id === id);

  if (enPedido) {
    enPedido.cantidad++;
  } else {
    pedido.push({ ...producto, cantidad: 1 });
  }

  mostrarPedido();
});

function mostrarPedido() {
  listaPedido.innerHTML = pedido.map(p => `
    <li>${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad} MXN</li>
  `).join('');

  const total = pedido.reduce((suma, p) => suma + (p.precio * p.cantidad), 0);
  totalEl.textContent = `Total: $${total} MXN`;
}

btnVaciar.addEventListener('click', () => {
  pedido.length = 0;
  mostrarPedido();
});

// ------------------------------------------------------------
// EJERCICIO 4 — Filtrar por categoría
// Botones de categoría que llamen a mostrarProductos() con
// productos.filter(...). El botón "Todos" muestra la lista completa.
// ------------------------------------------------------------

// Escribe aquí tu código del Ejercicio 4

const filtros = document.getElementById("filtros");

filtros.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-categoria]');
  if (!boton) return;

  const categoria = boton.dataset.categoria;
  const filtrados = categoria === "todos"
    ? productos
    : productos.filter(p => p.categoria === categoria);

  mostrarProductos(filtrados);
  marcarActivo(boton);
});

function marcarActivo(botonActivo) {
  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.classList.remove('bg-blue-600', 'text-white');
    btn.classList.add('bg-white', 'text-gray-800');
  });
  botonActivo.classList.remove('bg-white', 'text-gray-800');
  botonActivo.classList.add('bg-blue-600', 'text-white');
}

// modo oscuro
const btnTema = document.getElementById("btn-tema");

//al cargar, revusa si ya había un tema guardado
if (localStorage.getItem("tema") === "oscuro") {
  document.documentElement.classList.add("dark");
}

btnTema.addEventListener('click', () => {
  document.documentElement.classList.toggle("dark");
  const esOscuro = document.documentElement.classList.contains("dark");
  localStorage.setItem("tema", esOscuro ? "oscuro" : "claro");
});

//