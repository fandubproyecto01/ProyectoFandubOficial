// Esperamos a que cargue el documento
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    // Función para ejecutar la búsqueda
    const ejecutarBusqueda = () => {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query === "") {
            alert("¡Escribe algo para buscar, mi king!");
            return;
        }

        // Sistema de rutas según lo que escriban
        if (query.includes("aiko")) {
            window.location.href = "aiko-origins.html";
        } else if (query.includes("proyecto")) {
            window.location.href = "proyectos.html";
        } else if (query.includes("voz") || query.includes("doblaje") || query.includes("actor")) {
            window.location.href = "dobladores.html";
        } else if (query.includes("sobre") || query.includes("quien")) {
            window.location.href = "sobre-mi.html";
        } else {
            alert("No encontré resultados para '" + query + "', pero lo añadiré pronto.");
        }
    };

    // Click en la lupa
    searchBtn.addEventListener('click', ejecutarBusqueda);

    // Presionar Enter en el teclado
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            ejecutarBusqueda();
        }
    });
});
/*
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
const volumeSlider = document.getElementById('volume-slider');

// Al cargar cualquier página del sitio
window.addEventListener('load', () => {
    const savedTime = localStorage.getItem('musicTime');
    const isPaused = localStorage.getItem('musicPaused');
    const savedVol = localStorage.getItem('musicVol');

    if (savedTime) music.currentTime = parseFloat(savedTime);
    if (savedVol) {
        music.volume = parseFloat(savedVol);
        volumeSlider.value = savedVol;
    } else {
        music.volume = 0.3; // Volumen inicial por defecto
    }

    // Si no estaba pausado, intentamos seguir sonando
    if (isPaused !== 'true') {
        music.play().catch(() => console.log("Clic en la página para seguir escuchando"));
    }
});

// Guardar progreso cada segundo
setInterval(() => {
    if (!music.paused) {
        localStorage.setItem('musicTime', music.currentTime);
    }
}, 1000);

// Play y Pause
musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        localStorage.setItem('musicPaused', 'false');
        musicIcon.className = 'fas fa-volume-up';
    } else {
        music.pause();
        localStorage.setItem('musicPaused', 'true');
        musicIcon.className = 'fas fa-volume-mute';
    }
});

// Guardar volumen cuando el usuario lo cambie
volumeSlider.addEventListener('input', (e) => {
    music.volume = e.target.value;
    localStorage.setItem('musicVol', e.target.value);
});
*/
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
const volumeSlider = document.getElementById('volume-slider');

const listaCanciones = [
    "audio/musica/AikoTheOriginsThemeRemix.mp3",
    "audio/musica/mesa-brava.mp3",
    "audio/musica/pursuit.mp3",
    "audio/musica/calm.mp3",
    "audio/musica/suspense.mp3",
    "audio/musica/taberna.mp3"
];

window.addEventListener('load', () => {
    const savedTime = localStorage.getItem('musicTime');
    const savedVol = localStorage.getItem('musicVol');
    const isPaused = localStorage.getItem('musicPaused');
    
    // DETECTOR DE REFRESH (F5)
    // 'reload' significa que el usuario pulsó el botón de refrescar
    const esRefresh = performance.getEntriesByType("navigation")[0].type === "reload";
    
    let cancionActual = sessionStorage.getItem('currentSongSession');

    // Si es REFRESH o no hay canción guardada, elegimos una nueva al azar
    if (esRefresh || !cancionActual) {
        const azar = Math.floor(Math.random() * listaCanciones.length);
        cancionActual = listaCanciones[azar];
        sessionStorage.setItem('currentSongSession', cancionActual);
        music.currentTime = 0; // Empezar de cero si es nueva
        console.log("Refresh detectado: Cambiando música.");
    } else {
        // Si llegó aquí por un clic en el menú, mantenemos el tiempo
        if (savedTime) music.currentTime = parseFloat(savedTime);
        console.log("Navegación detectada: Manteniendo música.");
    }

    music.src = cancionActual;

    // --- El resto de tu código de volumen y play se queda igual ---
    if (savedVol) {
        music.volume = parseFloat(savedVol);
        if (volumeSlider) volumeSlider.value = savedVol;
    } else {
        music.volume = 0.3;
    }

    if (isPaused !== 'true') {
        music.play().catch(() => console.log("Esperando clic para sonar"));
    }
});

// Guardar el progreso CADA SEGUNDO en LocalStorage
setInterval(() => {
    if (music && !music.paused) {
        localStorage.setItem('musicTime', music.currentTime);
    }
}, 1000);

// Botón Play/Pause
if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            localStorage.setItem('musicPaused', 'false');
            if (musicIcon) musicIcon.className = 'fas fa-volume-up';
        } else {
            music.pause();
            localStorage.setItem('musicPaused', 'true');
            if (musicIcon) musicIcon.className = 'fas fa-volume-mute';
        }
    });
}

// Control de Volumen
if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        music.volume = e.target.value;
        localStorage.setItem('musicVol', e.target.value);
    });
}


// 1. Declarar variables globales primero
let sakuraActive = true; 
let sakuraInterval;

// 2. Definir la función de creación
function createSakura() {
    if (!sakuraActive) return; // El candado de seguridad

    const sakura = document.createElement('div');
    sakura.classList.add('sakura');
    
    // Configuración de estilo y posición
    const size = Math.random() * 10 + 10 + 'px';
    sakura.style.width = size;
    sakura.style.height = size;
    sakura.style.left = Math.random() * window.innerWidth + 'px';
    
    const duration = Math.random() * 5 + 5 + 's';
    sakura.style.animation = `fall ${duration} linear infinite`;
    sakura.style.animationDelay = Math.random() * 5 + 's';

    document.body.appendChild(sakura);

    setTimeout(() => {
        sakura.remove();
    }, 10000);
}

// 3. Funciones de control
function startSakura() {
    sakuraActive = true;
    if (sakuraInterval) clearInterval(sakuraInterval);
    sakuraInterval = setInterval(createSakura, 300);
    
    const btn = document.getElementById('sakura-control');
    if(btn) {
        btn.style.opacity = "1"; // Totalmente visible
    }
}

function stopSakura() {
    sakuraActive = false;
    clearInterval(sakuraInterval);
    
    const existingSakura = document.querySelectorAll('.sakura');
    existingSakura.forEach(p => p.remove());

    const btn = document.getElementById('sakura-control');
    if(btn) {
        btn.style.opacity = "0.3"; // Se pone transparente pero NO desaparece
    }
}
// 4. Event Listener y Ejecución inicial
document.getElementById('sakura-control').addEventListener('click', () => {
    if (sakuraActive) stopSakura();
    else startSakura();
});

// Arrancar al cargar la página
startSakura();





document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("welcome-modal");
    const closeBtn = document.getElementById("close-modal");

    // Verificar si ya se mostró en esta sesión
    if (!sessionStorage.getItem("welcomeShown")) {
        // Mostrar el modal con un pequeño retraso para que sea suave
        setTimeout(() => {
            modal.classList.add("active");
        }, 1000);
    }

    // Función para cerrar
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        // Guardar en la sesión para que no vuelva a salir hasta que cierren el navegador
        sessionStorage.setItem("welcomeShown", "true");
    });
});

let currentSlide = 0;

function showSlides() {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;

    // Quitar "active" de todas
    slides.forEach(s => s.classList.remove("active"));
    
    currentSlide++;
    if (currentSlide > slides.length) { currentSlide = 1; }
    
    // Mostrar la siguiente
    slides[currentSlide - 1].classList.add("active");
    
    // Cambiar cada 3 segundos
    setTimeout(showSlides, 3000); 
}

// Inicia la animación cuando el modal se activa
document.addEventListener("DOMContentLoaded", () => {
    // ... tu código anterior del modal ...
    showSlides(); 
});


// --- SISTEMA DE EASTER EGG DEFINITIVO (CON CIERRE INTELIGENTE) ---

document.addEventListener("DOMContentLoaded", () => {
    // 1. Al cargar, revisar qué stickers ya fueron encontrados
    let encontrados = JSON.parse(localStorage.getItem('idsLogosOmega')) || [];
    
    encontrados.forEach(id => {
        const sticker = document.getElementById(id);
        if (sticker) sticker.classList.add('encontrado');
    });

    // 2. REVISAR PREMIO (Aquí es donde agregamos el sessionStorage)
    let total = parseInt(localStorage.getItem('logosOmega')) || 0;
    
    // Si ya tiene los 4 Y NO ha cerrado el premio en esta sesión, lo mostramos
    if (total >= 4 && sessionStorage.getItem('premioCerrado') !== 'true') {
        const premio = document.getElementById('premio-secreto');
        if (premio) premio.style.display = 'block';
    }
});

function encontrarLogo(elemento) {
    if (elemento.classList.contains('encontrado')) return;

    elemento.classList.add('encontrado');

    let encontrados = JSON.parse(localStorage.getItem('idsLogosOmega')) || [];
    encontrados.push(elemento.id);
    localStorage.setItem('idsLogosOmega', JSON.stringify(encontrados));

    let total = parseInt(localStorage.getItem('logosOmega')) || 0;
    total++;
    localStorage.setItem('logosOmega', total);

    console.log("Stickers encontrados: " + total + "/4");

    if (total >= 4) {
        const premio = document.getElementById('premio-secreto');
        if (premio) {
            premio.style.display = 'block';
            // Al ganar, nos aseguramos de que se pueda ver (quitamos el bloqueo de cierre anterior)
            sessionStorage.removeItem('premioCerrado'); 
        }
        alert("¡Misión cumplida! Has encontrado los 4 secretos de The Omega Studios. 🎁");
    }
}

function cerrarPremio() {
    document.getElementById('premio-secreto').style.display = 'none';
    // ESTO ES LO QUE HACE QUE NO SE ABRA OTRA VEZ AL CAMBIAR DE PÁGINA
    sessionStorage.setItem('premioCerrado', 'true');
}





/* personajes*/
let currentPjIndex = 0;

function movePjSlide(step) {
    const slides = document.querySelectorAll('.pj-slide');
    const totalSlides = slides.length;
    const sliderContainer = document.querySelector('.pj-slides');

    currentPjIndex += step;

    if (currentPjIndex >= totalSlides) {
        currentPjIndex = 0;
    }
    if (currentPjIndex < 0) {
        currentPjIndex = totalSlides - 1;
    }

    const offset = -currentPjIndex * 100;
    sliderContainer.style.transform = `translateX(${offset}%)`;
}

