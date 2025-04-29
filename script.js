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

// Cerrar lightbox al hacer clic fuera de la imagen
lightbox.addEventListener('click', e => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = 'none';
  }
});

// Inicializar contador
filtrarProductos();
