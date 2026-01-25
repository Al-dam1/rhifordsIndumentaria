document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav');

    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
});
// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || []; 
const carritoDiv = document.getElementById('carrito-lista');
const totalDiv = document.getElementById('total');

// Inicializar carrito en cada página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});

// Agregar producto
function agregarProducto(id, nombre, precio) {
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === id);
    if (productoExistente) {
        return; 
    }

    const itemCarrito = { id, nombre, precio };
    carrito.push(itemCarrito); 
    guardarCarrito(); 
    actualizarCarrito(); 
}

// Actualizar carrito
function actualizarCarrito() {
    if (!carritoDiv) return;

    carritoDiv.innerHTML = ''; 
    let total = 0;

    // Mostrar los productos en el carrito
    carrito.forEach(item => {
        const divItem = document.createElement('div');
        divItem.classList.add('carrito-item');
        divItem.innerHTML = `${item.nombre} - ${item.precio} <button class="eliminar" data-id="${item.id}">Eliminar</button>`;
        carritoDiv.appendChild(divItem);

        total += parseFloat(item.precio.replace('$', '').replace('.', ''));
    });

    // Mostrar el total
    if (totalDiv) {
        totalDiv.innerHTML = `Total: $${total.toFixed(2)}`;
    }

    // Manejar los botones de eliminar
    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', () => {
            const id = boton.getAttribute('data-id');
            eliminarProducto(id);
        });
    });
}

// Eliminar producto
function eliminarProducto(id) {
    carrito = carrito.filter(item => item.id !== id); 
    guardarCarrito(); 
    actualizarCarrito(); 
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
}

// Manejo de agregar productos a carrito en la página de productos
const productos = document.querySelectorAll('.producto');

productos.forEach(producto => {
    const botonAgregar = producto.querySelector('.add-to-cart');

    botonAgregar.addEventListener('click', () => {
        const id = producto.getAttribute('data-id');
        const nombre = producto.querySelector('h3').innerText;
        const precio = producto.querySelector('p').innerText;

        agregarProducto(id, nombre, precio); 
    });
});
