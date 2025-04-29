const input = document.getElementById('input');
const productos = document.querySelectorAll('.producto');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const contador = document.getElementById('contador');

// Función para filtrar productos por texto
function filtrarProductos() {
  const filtro = input.value.trim().toLowerCase();
  let visibles = 0;

  productos.forEach(producto => {
    const nombre = producto.querySelector(".nombre").textContent.toLowerCase();
    const visible = nombre.includes(filtro);
    producto.style.display = visible ? "block" : "none";
    if (visible) visibles++;
  });

  contador.textContent = `Mostrando ${visibles} producto${visibles !== 1 ? 's' : ''}`;
}

// Evento de filtrado al escribir
input.addEventListener('input', filtrarProductos);

// Función para abrir el lightbox
function openModal(element) {
  const imageSrc = element.querySelector("img").src;
  lightboxImg.src = imageSrc;
  lightbox.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
  const productos = document.querySelectorAll('.producto');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxNombre = document.getElementById('lightbox-nombre');
  const lightboxPrecio = document.getElementById('lightbox-precio');
  const cerrarBtn = document.getElementById('cerrar-lightbox');

  productos.forEach(producto => {
    const img = producto.querySelector('img');
    const btnAgregar = producto.querySelector('.agregar-carrito');

    img.addEventListener('click', () => {
      const nombre = producto.dataset.nombre;
      const precio = producto.dataset.precio;
      const imagen = producto.dataset.imagen;

      lightboxImg.src = imagen;
      lightboxNombre.textContent = nombre;
      lightboxPrecio.textContent = precio;

      lightbox.style.display = 'flex';
    });

    btnAgregar.addEventListener('click', () => {
      alert(`Agregado al carrito: ${producto.dataset.nombre}`);
      // Aquí podrías agregar lógica real de carrito
    });
  });

  cerrarBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
});

// Cerrar lightbox al hacer clic fuera de la imagen
lightbox.addEventListener('click', e => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = 'none';
  }
});

// Inicializar contador
filtrarProductos();
