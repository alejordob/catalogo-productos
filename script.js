document.getElementById('imageUpload').addEventListener('change', function(event) {
  const files = event.target.files;
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Limpia la galería antes de agregar nuevas imágenes

  for (const file of files) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});