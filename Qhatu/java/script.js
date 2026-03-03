document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // LOGICA DEL MODAL
    // ==========================================
    const modal = document.getElementById('modalProducto');
    const btnCerrar = document.getElementById('cerrarModal');
    const overlay = document.getElementById('modalOverlay');
    const botonesAbrir = document.querySelectorAll('.abrir-modal');

    // Función para abrir
    botonesAbrir.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página salte si es una etiqueta <a>
            modal.classList.add('modal-activo');
            document.body.style.overflow = 'hidden'; // Evita que el fondo haga scroll
        });
    });

    // Función para cerrar
    const cerrarModal = () => {
        modal.classList.remove('modal-activo');
        document.body.style.overflow = 'auto'; // Devuelve el scroll al fondo
    };

    btnCerrar.addEventListener('click', cerrarModal);
    overlay.addEventListener('click', cerrarModal);

    // ==========================================
    // LOGICA DE CANTIDAD Y PRECIO
    // ==========================================
    const btnMenos = document.getElementById('btnMenos');
    const btnMas = document.getElementById('btnMas');
    const inputCantidad = document.getElementById('inputCantidad');
    const precioTotalDisplay = document.getElementById('precioTotal');
    const precioUnitario = 25.00; // Precio base de Qhatu Cacao

    const actualizarPrecio = () => {
        const cantidad = parseInt(inputCantidad.value);
        const total = (precioUnitario * cantidad).toFixed(2);
        precioTotalDisplay.textContent = `S/ ${total}`;
    };

    btnMenos.addEventListener('click', () => {
        let valor = parseInt(inputCantidad.value);
        if (valor > 1) {
            inputCantidad.value = valor - 1;
            actualizarPrecio();
        }
    });

    btnMas.addEventListener('click', () => {
        let valor = parseInt(inputCantidad.value);
        inputCantidad.value = valor + 1;
        actualizarPrecio();
    });

    // Validar que no escriban números negativos
    inputCantidad.addEventListener('change', () => {
        if (inputCantidad.value < 1 || isNaN(inputCantidad.value)) {
            inputCantidad.value = 1;
        }
        actualizarPrecio();
    });

    // ==========================================
    // LOGICA DEL CARRUSEL DE IMÁGENES
    // ==========================================
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const imagenCarrusel = document.getElementById('imagenCarrusel');
    const indicadores = document.getElementById('indicadoresCarrusel').children;
    
    // Arreglo con fotos simuladas de los chocolates
    const imagenes = [
        "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1511381939415-e440c9f18aa4?auto=format&fit=crop&w=500&q=80"
    ];
    let indiceActual = 0;

    const actualizarCarrusel = () => {
        // Cambiar la imagen (con un pequeño efecto de opacidad)
        imagenCarrusel.style.opacity = 0;
        setTimeout(() => {
            imagenCarrusel.src = imagenes[indiceActual];
            imagenCarrusel.style.opacity = 1;
        }, 150);

        // Actualizar los puntitos indicadores
        Array.from(indicadores).forEach((punto, index) => {
            if (index === indiceActual) {
                punto.classList.remove('opacity-50');
                punto.classList.add('opacity-100');
            } else {
                punto.classList.add('opacity-50');
                punto.classList.remove('opacity-100');
            }
        });
    };

    btnNext.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % imagenes.length; // Vuelve al inicio si llega al final
        actualizarCarrusel();
    });

    btnPrev.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length; // Va al final si está en el inicio
        actualizarCarrusel();
    });

});