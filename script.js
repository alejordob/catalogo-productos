// Variables globales
const input = document.getElementById('input');
const productosContainer = document.getElementById('productosContainer'); // contenedor de productos
const productos = document.querySelectorAll('.producto');
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const contador = document.getElementById('contador');

// Función para cargar imágenes en la galería
document.getElementById('imageUpload').addEventListener('change', function(event) {
  const files = event.target.files;
  gallery.innerHTML = ''; // Limpiar galería

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

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

// Función para filtrar productos por categoría directamente
function filtrarCategoria(categoria) {
  input.value = categoria;
  filtrarProductos();
}

// Evento de filtrado al escribir
input.addEventListener('input', filtrarProductos);

// Evento delegador para abrir imágenes en lightbox
productosContainer.addEventListener('click', function(e) {
  const clickedImg = e.target.closest('.producto img');
  if (clickedImg) {
    lightboxImg.src = clickedImg.src;
    lightbox.style.display = 'flex';
  }
});

// Cerrar lightbox al hacer clic fuera de la imagen
lightbox.addEventListener('click', e => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = 'none';
  }
});


document.getElementById('cart-icon').onclick = showCart;

function showCart() {
  const itemsList = document.getElementById('cart-items');
  itemsList.innerHTML = '';

  if (cart.length === 0) {
    itemsList.innerHTML = '<li>Tu carrito está vacío.</li>';
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${item.image}" width="40" style="vertical-align: middle;">
        <span style="margin-left:10px;">${item.name} - ${item.price}</span>
      `;
      itemsList.appendChild(li);
    });
  }

  document.getElementById('cart-window').style.display = 'flex';
}

function closeCart() {
  document.getElementById('cart-window').style.display = 'none';
}

// Abre el modal al hacer clic en una tarjeta

let cartCount = 0;
let cartTotal = 0;

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", (e) => {
    e.stopPropagation(); // Para que no se dispare el modal si haces clic en el botón

    const producto = e.target.closest(".producto");
    const precio = parseInt(producto.getAttribute("data-precio"));
    
    cartCount++;
    cartTotal += precio;

    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("cart-total").textContent = cartTotal.toLocaleString("es-CO");
  });
});

function openModal(element) {
  const imageSrc = element.querySelector("img").src;
  lightboxImg.src = imageSrc;
  lightbox.style.display = "flex";
}
// Inicializar filtrado y contador
filtrarProductos();
actualizarContador();
