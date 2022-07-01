document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
}

function crearGaleria() {
    const galeria = document.querySelector('.imagenes-galeria');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source src="build/img/thumb/${i}.webp" type="image/webp">
        <img src="build/img/thumb/${i}.webp" type="image/webp">`;
        imagen.onclick = function () {
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }

}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source src="build/img/grande/${id}.webp" type="image/webp">
        <img src="build/img/grande/${id}.webp" type="image/webp">`;

    //Crear el overlay con la imagen dentro
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    //Boton para cerrar la ventana modal

    const cerrarVentana = document.createElement('P')
    cerrarVentana.textContent = 'X';
    cerrarVentana.classList.add('cerrar-ventana');
    cerrarVentana.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarVentana);

//Lo añade al HTML
const body = document.querySelector('body');
body.appendChild(overlay);
body.classList.add('fijar-body');
}

