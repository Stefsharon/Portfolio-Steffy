<script>
  import * as d3 from "d3";
  import { onMount, onDestroy } from "svelte";
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';


// Datos de tus proyectos
const projects = [
  {
    id: 1,
    title: 'ChatGPT y el Arte: Estimando el Control de la Industria Creativa',
    description: "Análisis de datos y visualización interactiva de Composición con rojo, azul y amarillo de Piet Mondrian, explorando el impacto de ChatGPT en la industria creativa, proyectando su control futuro y cuestionando los límites entre la inspiración humana y la automatización digital, mediante magnitudes visuales. Este estudio abre un diálogo entre arte y tecnología, invitándonos a reflexionar sobre el rol de la creatividad en un mundo cada vez más automatizado.",
    technologies: ["HTML",'Svelte', 'JavaScript', 'CSS', 'D3.js', "Google Slides", 'Visualización de Datos', "Figma", "Flourish", "Vercel", "GitHub" ],
    link: 'https://proyecto-uno-vd.vercel.app/',
    type: 'data-viz' // Un tipo para clasificar visualmente o filtrar si se desea
  },
  {
    id: 2,
    title: 'Notas Musicales Compartidas',
    description: 'Una página interactiva formada por reproductores musicales que vibran de acuerdo a los gustos musicales de Steffy y sus amigas, mostrando diferentes géneros según décadas. Cada reproductor tiene controles personalizados y animaciones que reaccionan al ritmo y estilo. Diseñamos símbolos únicos en Figma que representan a cada una del grupo, aportando identidad visual. Finalmente, un scrollytelling acompaña la experiencia, guiando al usuario a escuchar las canciones más reproducidas del 2025.',
    technologies: [ "HTML",'Svelte', 'JavaScript', 'CSS', 'D3.js', "Google Sheets", "Visualización de Datos", "Flourish", "Figma", "Vercel", "Microsoft Clip"],
    link: 'https://notas-musicales-compartidas.vercel.app/',
    type: 'data-viz'
  },
  {
    id: 3,
    title: 'Galaxia Estelar de Profesores',
    description: 'Visualización de datos con mis profesores preferidos de la universidad, donde cada estrella crece en tamaño según cuánto valoré su forma de enseñar y están ordenadas de mayor a menor puntaje para destacar a los mejores. Cada color representa el mood único del profesor, reflejando su estilo y energía al explicar. Al final de la página, los profesores están representados por muñecos diseñados por mí; al hacer click, se muestra información personal y una frase que los define. Un proyecto que une datos y diseño para destacar la esencia única de cada docente. ',
    technologies: ["HTML",'Svelte', 'JavaScript', 'CSS', 'D3.js', "Vercel", 'Visualización de Datos', "Gemini"],
    link: 'https://galaxia-estelar-visual.vercel.app/',
    type: 'data-viz'
  },
  {
    id: 4,
    title: 'Sharon Foods: Página Web Corporativa',
    description: "Para el Esame di Stato, con tres amigas creamos Sharon Foods, una empresa ficticia dedicada a la comida típica italiana. El objetivo era representar los sabores tradicionales de Italia y adaptarlos a una propuesta muy moderna pensada para el público argentino. El sitio fue desarrollado en Wix Studio e incluye secciones como presentación de productos (Carbonara, Lasagna, Malfatti y Tiramisu) para poder adquirlos, galería visual, preguntas frecuentes, servicios, promociones y un chat de contacto. Todo con un diseño cálido, simple y fácil de navegar.",
        technologies: ['Wix Studio', 'Diseño Web', 'UI/UX'],
    link: 'https://sharonsfood4.wixsite.com/website',
    type: 'web-design'
  },
  {
    id: 5,
    title: 'My Career App Diseño de Aplicación',
    description: 'Diseño integral de UX en Figma para una aplicación que acompaña la gestión de la carrera profesional, incorporando una evaluación vocacional interactiva. Este proyecto final presenta pantallas pensadas para ofrecer una experiencia sencilla y personalizada, con múltiples funciones: desde el inicio y registro, hasta un test que detecta intereses mediante un análisis visual de resultados y sugiere carreras afines. Además, permite explorar universidades, acceder a comunidades por cada carrera para conectar con otros estudiantes, y chatear en tiempo real con expertos según el área de interés.',
    technologies: ['Figma', 'UI/UX Design', 'Prototyping'],
    link: 'https://www.figma.com/design/3DprlYUpmvOgbAWsKgkrNc/App-My-Career-Victoria-Stefania-Schenone-Fernandez?node-id=102-2903&t=0MZoZq3Nm6BYoK4G-1', 
    type: 'ui-ux'
  },
  {id:6,
    title: 'Studify para estudiantes universitarios',
    description: 'Plataforma web creada en equipo para la materia Gestión de Proyectos Digitales, diseñada para potenciar el aprendizaje. Ofrece clases particulares con profesores especializados, comunidades organizadas por carrera y ejercicios desglosados paso a paso para facilitar la comprensión. Además, incorpora funciones inteligentes como un sistema de “match” entre estudiantes, técnica Pomodoro para optimizar el tiempo de estudio y recordatorios personalizados de exámenes. Este proyecto abarcó desde la planificación inicial hasta la creación de un prototipo funcional, reflejando un proceso completo de desarrollo.',
    technologies: ["HTML", "React", "CSS", "Netlify"],
    link: 'https://studify-gestion.netlify.app/', 
  }
  ];


  // Datos de algunos trabajos prácticos:
  const codeProjects = [
    {
      id: 1,
      title: 'Buscador de Binarios Balanceados (Tecnología I)',
      description: 'El sistema convierte números decimales a binario, detecta si tienen igual cantidad de ceros y unos (binarios balanceados), y busca el más cercano, anterior o posterior que cumpla con esa condición. Uso de estructuras de control, manejo de strings, ciclos while y lógica condicional para resolver problemas algorítmicos con foco en eficiencia y claridad. Además, se realizó una demostración formal de correctitud y terminación de las funciones utilizando invariantes de ciclo.',
      technologies: ['Python'],
      repositoryLink: 'https://github.com/Stefsharon/Binario-Balanceados-TP.git' 
    },
    {
      id: 2,
      title: 'Hospitales y Farmacias (Tecnología I)',
      description: 'Se implementó la clase Farmacia para representar su ubicación, dirección y código postal, y se usó la librería Haversine para calcular distancias geográficas precisas en metros. A través de estructuras como listas y diccionarios, se creó un sistema que permite consultar rápidamente qué farmacia está más cerca de cada hospital. Se trabajó con lectura de archivos, manipulación de datos geoespaciales y programación orientada a objetos.',
      technologies: ["Python", "Análisis Complejidad Algorítmica"],
      repositoryLink: 'https://github.com/Stefsharon/Hospital-y-Farmacias-TP-Grupal.git'
    },
    {
      id: 3,
      title: ' Little Enigma Simulación de Encriptador (Tecnología II)',
      description: 'Desarrollo en C una versión simplificada de la máquina Enigma, utilizada para cifrar y descifrar mensajes mediante una estructura de ruedas rotativas. El proyecto incluyó el manejo avanzado de punteros, memoria dinámica y listas circulares para modelar el alfabeto permutado. Se trabajó con estructuras como struct wheel y struct letter, gestionando nodos enlazados para simular el movimiento de las ruedas en cada paso. ',
      technologies: ["C", "VisualStudioCode"],
      repositoryLink: 'https://github.com/Stefsharon/Enigma-TP.git' 
    },
    {
      id: 4,
      title: ' Simulación de MicroArquitectura (Tecnología II)',
      description: 'Análisis detallado de una arquitectura de 8 bits con memoria de 256 bytes y palabras de 2 bytes. Se trabajó sobre con el tamaño de la memoria, los opcodes de las micro-instrucciones, el Program Counter (PC) y el Instruction Register (IR). Se analizaron instrucciones como JMP, JZ, CALL, RET, PUSH y POP en interacción con flags y la pila, diseñando y observando cómo las señales de control afectan el flujo de ejecución. El proyecto incluyó el diseño lógico de componentes: la ALU, el Decode y la Unidad de Control. ',
      technologies: ['ASSM', "Ubuntu", "VirtualBox", "Logisim", "VisualStudio"],
      repositoryLink: 'https://github.com/Stefsharon/MicroArquitectura-TD.git' 
    },
    {
      id: 5,
      title: 'Wordle Game (Tecnología III)',
      description: ' El proyecto consistió en programar la lógica del juego para adivinar una palabra en un número limitado de intentos, analizando letra por letra si está en la palabra oculta y en la posición correcta. Se utilizó CMake para la gestión del build del proyecto y se configuró un entorno aislado de desarrollo con Docker, lo que permitió mantener el código portable y reproducible.  Se trabajó intensamente con vectores, control de flujo, funciones auxiliares y manejo de archivos para cargar el diccionario de palabras.',
      technologies: ['C++', "DockerFile", "CMake"],
      repositoryLink: 'https://github.com/Stefsharon/Wordle-TP.git' 
    },
    {id: 6,
      title: 'Gestión de Billetera Digital y Blockchain (Tecnología III)',
      description: 'Implementación de una clase Billetera que maneja transacciones, actualiza saldos diarios y controla destinatarios frecuentes. Incluye lógica para modificar el saldo según origen o destino de las transacciones, registro eficiente en vectores, y actualización ordenada de destinatarios para optimizar consultas. Se trabajó con estructuras de datos, algoritmos de actualización incremental y gestión temporal de datos mediante calendarios.',
      technologies: ['C++', "DockerFile", "CMake"],
      repositoryLink: 'https://github.com/Stefsharon/Billetera-TP.git' 
    }
  ];



  // --- 1. Datos de Habilidades ---
  let skillsData = [
    { name: "Figma", level: 3, description: "Diseño UI/UX y prototipado, creando experiencias de usuario intuitivas y atractivas. Dominio de componentes y flujos.", icon: "fa-brands fa-figma", source: "UTDT", materia: "Diseño" },
    { name: "JavaScript", level: 3, description: "Desarrollo frontend interactivo.", icon: "fa-brands fa-js", source: "UTDT Fullstack", materia: "Visualización de Datos" },
    { name: "Python", level: 3, description: "Análisis de datos y automatización, desde scripts sencillos hasta modelos complejos.", icon: "fa-brands fa-python", source: "UTDT", materia: " Introducción a la programación Tecnología I"},
    { name: "HTML", level: 5, description: "Estructura de contenido web semántico y accesible, base de cualquier proyecto digital.", icon: "fa-brands fa-html5", source: "UTDT" , materia: "Visualización de Datos"},
    { name: "CSS", level: 5, description: "Estilización y diseño responsivo, creando interfaces atractivas y adaptables a cualquier dispositivo.", icon: "fa-brands fa-css3-alt", source: "UTDT", materia: "Visualización de Datos" },
    { name: "C++", level: 3, description: "Programación de sistemas y algoritmos, con énfasis en eficiencia y rendimiento.", icon: "fa-solid fa-c", source: "UTDT", materia: "Tecnología III" },
    { name: "C", level: 2, description: "Fundamentos de programación de bajo nivel y estructuras de datos eficientes.", icon: "fa-solid fa-c", source: "UTDT", materia: "Tecnología II" },
    { name: "Assembler", level: 2, description: "Programación de muy bajo nivel, entendimiento de la arquitectura de computadoras.", icon: "fa-solid fa-microchip", source: "UTDT", materia: "Tecnología II" }, 
    { name: "Logisim", level:1, description: "Diseño y simulación de circuitos lógicos digitales.", icon: "fa-solid fa-microchip", source: "UTDT", materia: "Tecnología II" }, 
    { name: "Visual Studio", level: 5, description: "Entorno de desarrollo integrado para múltiples lenguajes y plataformas.", icon: "fa-solid fa-code", source: "Autodidacta", materia: "Tecnología II & III" }, 
    { name: "Microsoft Office", level: 5, description: "Dominio de Word, Excel y PowerPoint para gestión de documentos, datos y presentaciones.", icon: "fa-solid fa-file-excel", source: "Alessandro Manzoni", materia: "Informática" }, 
    { name: "Adobe Photoshop", level: 3, description: "Edición de imágenes con filtros y diseño gráfico, para crear recursos visuales impactantes.", icon: "fa-solid fa-image", source: "Autodidacta", materia: "Gustos personales" },
    { name: "Svelte", level: 4, description: "Desarrollo de interfaces reactivas, con un enfoque en la optimización y el rendimiento.", icon: "fa-solid fa-s", source: "UTDT", materia: "Visualización De Datos" },
    { name: "D3.js", level: 3, description: "Visualización de datos avanzada, transformando datos complejos en gráficos interactivos y comprensibles.", icon: "fa-solid fa-chart-simple", source: "UTDT", materia: "Visualización de Datos" },
    { name: "GitHub", level: 3, description: "Control de versiones y colaboración, gestionando proyectos de código en equipo.", icon: "fa-brands fa-github", source: "UTDT", materia: "Visualización de Datos" },
    { name: "IA", level: 3, description: "Conceptos fundamentales de Inteligencia Artificial, incluyendo machine learning y redes neuronales.", icon: "fa-solid fa-brain", source: "Autodidacta", materia: "Gustos personales"},
    { name: "Canva", level: 5, description: "Creación de diseños gráficos, presentaciones y contenido visual de forma rápida y sencilla.", icon: "fa-solid fa-palette", source: "Autodidacta", materia: "Gustos personales"}, 
    { name: "CapCut", level: 5, description: "Edición de video móvil y de escritorio con herramientas intuitivas para redes sociales y proyectos personales.", icon: "fa-solid fa-video", source: "Autodidacta", materia: "Gustos Personales"},
    { name: "Wix Studio", level: 2, description: "Diseño y desarrollo de sitios web avanzados con herramientas de construcción visual y código.", icon: "fa-brands fa-wix", source: "Alessandro Manzoni", materia: "Construcción de la Ciudadanía"}, 
  ];

  const levelScale = d3.scaleLinear()
    .domain([1, 5])
    .range([20, 100]);

  let carouselRef;
  let animationFrameId;
  let isCarouselPaused = false;
  let activeSkillHover = null;

  let scrollPosition = 0;
  const scrollSpeed = 0.5;

  let showModal = false;
  let selectedSkill = null;
  

  let images = [
    "/vd-d3-escalas/images/blanco%20y%20negro/foto%20(1).jpg",
    "/vd-d3-escalas/images/blanco%20y%20negro/foto%20(2).jpg",
    "/vd-d3-escalas/images/blanco%20y%20negro/foto%20(3).jpg",
    "/vd-d3-escalas/images/blanco%20y%20negro/foto%20(4).jpg",
    "/vd-d3-escalas/images/blanco%20y%20negro/foto%20(5).jpg",
    "/vd-d3-escalas/images/blanco%20y%20negro/foto%20(6).jpg",
  ];

 // NUEVO: Variable para controlar si el scroll manual está en progreso
 let isManualScrolling = false;
  const MANUAL_SCROLL_DURATION = 1000; // Duración de la pausa manual en ms, un poco más que 'smooth' behavior

  function scrollLeft() {
    if (carouselRef) {
      isManualScrolling = true; // Indicar que hay scroll manual
      isCarouselPaused = true; // Pausar el scroll automático

      carouselRef.scrollBy({ left: -400, behavior: 'smooth' });

      // Después de un breve retraso, permitir que el scroll automático se reanude
      setTimeout(() => {
        isManualScrolling = false;
        // Solo reanudar el scroll automático si no hay hover ni modal
        if (!activeSkillHover && !showModal) {
          isCarouselPaused = false;
        }
      }, MANUAL_SCROLL_DURATION); // Dar tiempo para que la animación 'smooth' termine
    }
  }

  function scrollRight() {
    if (carouselRef) {
      isManualScrolling = true; // Indicar que hay scroll manual
      isCarouselPaused = true; // Pausar el scroll automático

      carouselRef.scrollBy({ left: 400, behavior: 'smooth' });

      // Después de un breve retraso, permitir que el scroll automático se reanude
      setTimeout(() => {
        isManualScrolling = false;
        // Solo reanudar el scroll automático si no hay hover ni modal
        if (!activeSkillHover && !showModal) {
          isCarouselPaused = false;
        }
      }, MANUAL_SCROLL_DURATION); // Dar tiempo para que la animación 'smooth' termine
    }
  }

  function getLevelText(level) {
    switch (level) {
      case 1: return "Básico";
      case 2: return "Intermedio";
      case 3: return "Avanzado";
      case 4: return "Experto";
      case 5: return "Maestro";
      default: return ""; // Por si acaso
    }
  }

  function handleClickSkill(skill) {
    if (activeSkillHover && activeSkillHover.name === skill.name) {
      openModal(skill);
    }
  }

  function openModal(skill) {
    selectedSkill = skill;
    showModal = true;
    isCarouselPaused = true; // Pausar el carrusel cuando el modal está abierto
  }

  function closeModal() {
    showModal = false;
    selectedSkill = null;
    // Solo reanudar el carrusel si no hay hover activo y no hay scroll manual en curso
    if (!activeSkillHover && !isManualScrolling) {
      isCarouselPaused = false;
    }
  }

  function animateScroll() {
    // Si el carrusel está pausado O si hay un scroll manual en progreso, no actualices scrollPosition
    if (!carouselRef || isCarouselPaused || isManualScrolling) {
      animationFrameId = requestAnimationFrame(animateScroll);
      return;
    }

    scrollPosition += scrollSpeed;
    if (scrollPosition >= (carouselRef.scrollWidth / 2)) {
      scrollPosition -= (carouselRef.scrollWidth / 2);
    }
    carouselRef.scrollLeft = scrollPosition;

    animationFrameId = requestAnimationFrame(animateScroll);
  }

  function handleCarouselMouseEnter() {
    isCarouselPaused = true;
  }

  function handleCarouselMouseLeave() {
    // Solo despausar si no hay un modal abierto y no estamos haciendo scroll manual
    if (!showModal && !isManualScrolling) {
      isCarouselPaused = false;
      activeSkillHover = null; // Reiniciar activeSkillHover si no hay nada más pausando
    }
  }

  function handleSkillMouseEnter(skill) {
    activeSkillHover = skill;
    isCarouselPaused = true; // Pausar el carrusel cuando se hace hover en una habilidad
  }

  function handleSkillMouseLeave() {
    activeSkillHover = null;
    // Solo despausar si no hay un modal abierto y no estamos haciendo scroll manual
    if (!showModal && !isManualScrolling) {
      isCarouselPaused = false;
    }
  }

  onMount(() => {
    animationFrameId = requestAnimationFrame(animateScroll);
  });

  onDestroy(() => {
    cancelAnimationFrame(animationFrameId);
  });
 // Generar automáticamente las 15 rutas
 let personalImages = [];
  for (let i =  1; i <= 6; i++) {
    personalImages.push(`/vd-d3-escalas/images/mis%20fotitos/foto%20(${i}).jpg`);
  }

   // Datos para la línea de tiempo
   const educationEvents = [
    {
      id: 1,
      type: 'highschool',
      yearRange: '2008 — 2021',
      title: 'Bachillerato con orientación humanística y Lenguas',
      institution: 'Scuole CCI Alessandro Manzoni, Buenos Aires',
      description: 'Durante mi formación, adquirí una sólida base en literatura, filosofía,<br> arte e historia, desarrollando pensamiento crítico y capacidad de análisis. Además, me formé en lenguas clásicas y modernas, logrando conocimientos <br> que enriquecieron mi perspectiva cultural y comunicativa.',
      details: [
        {language: 'Español', level: ' Nivel Nativo' },
        {language: 'Italiano', level: ' Nivel Experto' },
        { language: 'Portugués', level: 'Nivel Avanzado' },
        { language: 'Inglés', level: 'Nivel Básico' },
        { language: 'Latín', level: 'Nivel Básico'},     
      ]
    },
    {
      id: 2,
      type: 'university',
      yearRange: 'Marzo 2022 — Presente',
      title: 'Estudiante de Tecnología Digital',
      institution: 'Universidad Torcuato Di Tella',
      description: 'Soy Steffy, una apasionada de la tecnología digital que está buscando su <br> lugar en el mundo profesional donde pueda seguir aprendiendo, creando y dejando una huella auténtica. Mi objetivo es formar parte de un proyecto <br> que lleve mi sello personal, un “Proyecto Steffy”, donde la innovación y el crecimiento constante sean protagonistas. <br>Me motiva transformar ideas en soluciones digitales que impacten y conecten, siempre con ganas de superar límites y explorar nuevas fronteras.'
    }
  ];

  // Para el control de la visibilidad y animación (opcional, para futura interactividad)
  let activeEvent = null;

  // Animación para las barras de nivel de idioma
  const levels = {
  'Nativo': 150,
  'Nivel Experto': 100,
  'Nivel Avanzado': 80,
  'Nivel Intermedio': 60,
  'Nivel Básico': 30
};

function getLevelWidth(finalWidth) {
  const width = tweened(0, {
    duration: 1000,
    easing: cubicOut
  });
  return width;
}

let españolWidth = getLevelWidth(levels['Nativo']);
let italianoWidth = getLevelWidth(levels['Nivel Experto']);
let portuguesWidth = getLevelWidth(levels['Nivel Avanzado']);
let inglesWidth = getLevelWidth(levels['Nivel Básico']);
let latinWidth = getLevelWidth(levels['Nivel Básico']);

function getColorForLevel(level) {
  switch (level) {
    case 'Nativo': return '#0044cc';
    case 'Nivel Experto': return '#007bff';
    case 'Nivel Avanzado': return '#33b5e5';
    case 'Nivel Intermedio': return '#66d9ef';
    case 'Nivel Básico': return '#99e6ff';
    default: return '#ccc';
  }
}

onMount(() => {
  españolWidth.set(levels['Nativo']);
  italianoWidth.set(levels['Nivel Experto']);
  portuguesWidth.set(levels['Nivel Avanzado']);
  inglesWidth.set(levels['Nivel Básico']);
  latinWidth.set(levels['Nivel Básico']);
});

onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item-new').forEach(item => {
      observer.observe(item);
    });
  });

let isDarkMode =  false; // la inicializo false porque la página empieza siendo blanca

  // Función para alternar el modo
  function toggleTheme() {
    isDarkMode = !isDarkMode;
    // Guardar la preferencia del usuario en localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    applyTheme(); // Aplicar el tema inmediatamente
  }
  // Función para aplicar las clases CSS al body
  function applyTheme() {
    if (typeof document !== 'undefined') { // Asegurarse de que estamos en el navegador
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
    }
  }

  // Detectar preferencia del sistema y cargar del localStorage al inicio
  onMount(() => {
    // Cargar preferencia guardada o detectar preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDarkMode = savedTheme === 'dark';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode = true; // Si el sistema prefiere oscuro y no hay nada guardado
    }
    applyTheme(); // Aplicar el tema inicial
    animationFrameId = requestAnimationFrame(animateScroll);
  });

  onDestroy(() => {
    cancelAnimationFrame(animationFrameId);
  });


 
</script>



<header class="main-header">
  <div class="header-content">
    <a href="/" class="header-logo">VS</a>
    <nav class="main-nav">
      <ul>
        <li><a href="#sobre-mi">Sobre Mí</a></li>
        <li><a href="#habilidades">Habilidades</a></li>
        <li><a href="#educacion">Educación</a></li>
        <li><a href="#proyectos">Proyectos</a></li>
        <li><a href="#contacto">Contacto</a></li> </ul>
    </nav>
    <button class="theme-toggle-button" on:click={toggleTheme} aria-label="Cambiar modo claro/oscuro">
      <i class={isDarkMode ? 'fas fa-moon' : 'fas fa-sun'}></i>
    </button>
  </div>
</header>


<section class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">Hola, Soy Steffy!</h1>
    <p class="hero-subtitle">Apasionada por el Diseño Web</p>
    <p class="hero-description">
      Estudiante de la Universidad Torcuato Di Tella de la carrera profesional de <br> Licenciatura en Tecnología Digital con formación multidisciplinaria.
      <br><br>
      Combinando computación, capacidad analítica, visión de negocios, economía, contabilidad, administración y finanzas, e innovación y creatividad visual.
    </p>
    </div>
  </section>
    <section class="about-me-section" id="sobre-mi">
      <div class="about-me-content">
        <h2>Sobre Mí</h2>
        <div class="about-me-details">
          <div class="about-me-image">
            <img src="/vd-d3-escalas/images/aboutme.png" alt="Victoria Steffy Schenone">
          </div>
          <div class="about-me-text">
            <p>
              Soy Victoria Stefania Schenone Fernández, pero me gustan que me digan Steffy. <br> 
              <br>  
              Mis estudios me ha llevado a combinar mi pasión por el diseño y la creatividad
              con una sólida base en tecnología y análisis de datos.
            </p>
            
            <p>
              Comprometida, curiosa, detallista, y siempre con ganas de aprender. <br> Porque para mí, lo digital no es solo técnica es emoción, experiencia y conexión.
            </p>
            <p>
              Mi objetivo es transformar ideas en soluciones digitales estéticamente <br> atractivas e intuitivas,
              poniendo el foco en la experiencia del usuario <br> y la eficiencia del código.
            </p>
            </div>
        </div>
        
        <section class="personal-gallery">
          <h2>Un Poco Más de Mí</h2>
          <div id="typewriter-words" class="typewriter-container"></div>
          <p class="gallery-subtitle">
            Instantes, miradas y momentos que me representan <span class="heart-emoji">❤️</span>
        </p>
          <div class="gallery-grid">
            {#each personalImages as img}
              <div class="photo-card">
                <img src={img} alt="Foto personal de Steffy" />
              </div>
            {/each}
          </div>
        </section>        
        <section class="bw-photo-gallery">
          <h2>Mis Fotos en Blanco y Negro</h2>
          <div class="gallery-grid">
            {#each images as img}
              <div class="photo-card">
                <img src={img} alt="Foto en blanco y negro" />
              </div>
            {/each}
          </div>
        </section>
        
      </div>
    </section>
  


<section class="skills-section" id = "habilidades">
  <h2>Mis Habilidades Tecnológicas</h2>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="carousel-container" bind:this={carouselRef}
       on:mouseenter={handleCarouselMouseEnter}
       on:mouseleave={handleCarouselMouseLeave}>
    {#each skillsData as skill (skill.name)}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="skill-card"
           on:mouseenter={() => handleSkillMouseEnter(skill)}
           on:mouseleave={handleSkillMouseLeave}
           on:click={() => handleClickSkill(skill)}
           class:active-hover={activeSkillHover && activeSkillHover.name === skill.name}
      >
        <i class="{skill.icon} skill-icon"></i>
        <h3>{skill.name}</h3>
        <div class="level-bar-container">
          <div class="level-bar" style="width: {levelScale(skill.level)}%;"></div>
        </div>
        <p class="skill-description">{skill.description}</p>
        {#if skill.source}
          <p class="skill-source">{skill.source}</p>
        {/if}
        {#if skill.materia}
          <p class="skill-materia">{skill.materia}</p>
        {/if}
      </div>
    {/each}
    {#each skillsData as skill (skill.name + '-duplicate')}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="skill-card"
           on:mouseenter={() => handleSkillMouseEnter(skill)}
           on:mouseleave={handleSkillMouseLeave}
           on:click={() => handleClickSkill(skill)}
           class:active-hover={activeSkillHover && activeSkillHover.name === skill.name}
      >
        <i class="{skill.icon} skill-icon"></i>
        <h3>{skill.name}</h3>
        <div class="level-bar-container">
          <div class="level-bar" style="width: {levelScale(skill.level)}%;"></div>
        </div>
        <p class="skill-description">{skill.description}</p>
        {#if skill.source}
          <p class="skill-source">{skill.source}</p>
        {/if}
        {#if skill.materia}
          <p class="skill-materia">{skill.materia}</p>
        {/if}
      </div>
    {/each}
  </div>
  <!-- Flechas -->
<button class="carousel-button left" on:click={scrollLeft} aria-label="Ir a la izquierda">‹</button>
<button class="carousel-button right" on:click={scrollRight} aria-label="Ir a la derecha">›</button>
  <p class="instruction">Pasa el mouse sobre una habilidad para pausar el movimiento y haz clic en ella para ver más detalles.</p>

{#if showModal && selectedSkill}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="skill-modal-overlay" on:click|self={closeModal}>
    <div class="skill-modal-content">
      <button class="close-button" on:click={closeModal}>&times;</button>
      <i class="{selectedSkill.icon} modal-skill-icon"></i>
      <h2>{selectedSkill.name}</h2>
      <p class="modal-level">Nivel: <strong>{getLevelText(selectedSkill.level)}</strong></p>
      <p class="modal-description">{selectedSkill.description}</p>
      {#if selectedSkill.source}
        <p class="modal-source"><strong>{selectedSkill.source}</strong></p>
      {/if}
      {#if selectedSkill.materia}
        <p class="modal-materia"><strong>{selectedSkill.materia}</strong></p>
      {/if}
    </div>
  </div>
{/if}
</section>


<section class="education-section" id="educacion">
  <div class="education-content">
    <h2>Mi Educación</h2>

    <div class="timeline-container-new">
      {#each educationEvents as event (event.id)}
        <div class="timeline-item-new {event.type}">
          <div class="timeline-date-new">{event.yearRange}</div>
          <div class="timeline-dot-new"></div>
          <div class="timeline-card-new">
            <h3>{event.title}</h3>
            <h4>{event.institution}</h4>
            <p>{@html event.description}</p>
            
            
            {#if event.details}
              <div class="language-skills">
                <h4>Nivel de Idiomas:</h4>
                <div class="language-list">
                  {#each event.details as lang}
                    <div class="language-item">
                      <span>{lang.language}</span>
                      <div class="progress-bar-container">
                        <div
                          class="progress-bar"
                          style="width: {
                            lang.language === 'Español' ? $españolWidth :
                            lang.language === 'Italiano' ? $italianoWidth :
                            lang.language === 'Portugués' ? $portuguesWidth :
                            lang.language === 'Inglés' ? $inglesWidth :
                            $latinWidth
                          }%;"
                          
                        ></div>
                      </div>
                      <span class="level-text">{lang.level}</span>
                    </div>


                  {/each}
                </div>
              </div>
            {/if}
            {#if event.id === 1}
            <div class="graduation-section">
              <h4>Graduación: Esame Di Stato 2021</h4>
              <div class="image-gallery">
                <img src="images/graduate-1.jpg" alt>
                <img src="images/cci.jpg" alt>
            
              </div>
            </div>
          {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="projects-section" id="proyectos">
  <div class="projects-content">
    <h2>Mis Proyectos visuales</h2>
    <div class="steffy-tag">Creado con ♡, código y auriculares puestos 🎧</div>

    <div class="projects-grid">
      {#each projects as project (project.id)}
        <div class="project-card">
          <h3>{project.title}</h3>
          <p class="description">{project.description}</p>
          <div class="technologies">
            {#each project.technologies as tech}
              <span>{tech}</span>
            {/each}
          </div>
          <a href={project.link} target="_blank" rel="noopener noreferrer" class="project-link">
            Ver Proyecto
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/>
            </svg>
          </a>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="code-projects-section" id="proyectos-codigo">
  <div class="code-projects-content">
    <h2>Proyectos de Código & Desarrollo</h2>
    <div class="steffy-tag">Explorando la lógica y la ingeniería del software 💻</div>

    <div class="code-projects-grid">
      {#each codeProjects as project (project.id)}
        <div class="code-project-card">
          <h3>{project.title}</h3>
          <p class="description">{project.description}</p>
          <div class="technologies">
            {#each project.technologies as tech}
              <span>{tech}</span>
            {/each}
          </div>
          <a href={project.repositoryLink} target="_blank" rel="noopener noreferrer" class="code-project-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8"/>
            </svg>
            Ver Repositorio
          </a>
        </div>
      {/each}
    </div>
  </div>
</section>


<section class="my-strengths-section">
  <div class="strengths-content">
    <h2>Mis Fortalezas y Áreas de Conocimiento</h2>

    <div class="strengths-grid">
      <div class="strength-category">
        <h3><i class="fas fa-code"></i> Desarrollo y Tecnología Digital</h3>
        <ul>
          <li>Idear soluciones de Tecnología Digital y aplicaciones móviles.</li>
          <li>Desarrollar plataformas de productos.</li>
          <li>Diseñar algoritmos y sistemas con programación: C, C++, Python y ASSM.</li>
          <li>Trabajar con Visual Studio Code, Oracle Virtual Box y Logisim.</li>
          <li>Entender las implicancias de los aspectos éticos y legales de las tecnologías.</li>
        </ul>
      </div>

      <div class="strength-category">
        <h3><i class="fas fa-palette"></i> Diseño y Experiencia de Usuario</h3>
        <ul>
          <li>Diseño de interacción, visualización de datos y estética.</li>
          <li>Dominio de plataformas y programas de edición: Figma, HTML, Java Script, CSS, Adobe Photoshop, CapCut y Canva.</li>
          <li>Arquitecturas Web.</li>
          <li>Plataformas de redes sociales.</li>
        </ul>
      </div>

      <div class="strength-category">
        <h3><i class="fas fa-chart-line"></i> Datos y Análisis</h3>
        <ul>
          <li>Extraer, analizar y utilizar grandes volúmenes de datos para la toma de decisiones con algoritmos de data science.</li>
        </ul>
      </div>

      <div class="strength-category">
        <h3><i class="fas fa-brain"></i> Pensamiento e Innovación</h3>
        <ul>
          <li>Interés y curiosidad por la Tecnología que mejore nuestras vidas.</li>
          <li>Computación Gráfica, Animación Videojuegos, Inteligencia Artificial e Internet.</li>
          <li>Interesada en desarrollar nuevas habilidades de aprendizaje.</li>
          <li>Neurociencias: cognición humana, psicología experimental.</li>
        </ul>
      </div>

      <div class="strength-category">
        <h3><i class="fas fa-handshake"></i> Negocios y Finanzas</h3>
        <ul>
          <li>Contabilidad: Asientos contables, Impuestos, Balances, Cash Flow, Costos de producción, Cuentas por pagar, Cuentas por cobrar, Compras, Ventas y Sueldos y Jornales.</li>
        </ul>
      </div>

      <div class="strength-category">
        <h3><i class="fas fa-users"></i> Habilidades Blandas y Colaboración</h3>
        <ul>
          <li>Expresión oral y escrita.</li>
          <li>Gran capacidad creativa para trabajo independiente o en equipo e iniciativa para proyectos grupales.</li>
          <li>Adaptación a nuevos desarrollos tecnológicos.</li>
        </ul>
      </div>
    </div>

    <p class="study-scope">
      Mi ámbito de estudio en UTDT, donde aprender a emprender y hacer <br> realidad mis proyectos, profundiza mi
      conocimiento en las disciplinas <br> que me apasionan para liderar el futuro.
    </p>
  </div>
</section>

<section class="contact-section" id="contacto">
  <div class="contact-content">
    <h2>Contacto</h2>
    <p class="contact-intro">¡Me encantaría saber de ti! No dudes en enviarme un mensaje.</p>

    <div class="contact-grid">
      <div class="contact-form-container">
        <h3>Envíame un mensaje</h3>
        <form class="contact-form" action="https://formspree.io/f/manbnlgp" method="POST">
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name">
          </div>
          <div class="form-group">
            <label for="email"> Tu Email:</label>
            <input type="email" id="email" name="email" >
          </div>
          <div class="form-group">
            <label for="message">Mensaje:</label>
            <textarea id="message" name="message" rows="6" ></textarea>
          </div>
          <button type="submit" class="submit-button">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  </div>
</section>

<footer class="main-footer">
  <div class="footer-content">
    <p>&copy; 2025 Victoria Stefania Schenone. Todos los derechos reservados.</p>
    <div class="footer-links">
      <a href="#sobre-mi">Sobre Mí</a>
      <a href="#habilidades">Habilidades</a>
      <a href="#proyectos">Proyectos</a>
      <a href="#contacto">Contacto</a>
    </div>
  </div>
  <div class="social-icons">
    <a href="https://github.com/Stefsharon" aria-label="GitHub"><i class="fab fa-github"></i></a>
    <a href="https://www.linkedin.com/in/victoria-stefania-schenone-fern%C3%A1ndez-1ab05428b/" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
    <a href="https://www.instagram.com/stefanyred/"aria-label="Instagram"><i class="fab fa-instagram"></i></a>
  </div>
</footer>



<style>


/* Estilos para la sección de imágenes */
.school-images {
  margin-top: 35px; /* Espacio superior para separar de la sección anterior */
}

.school-images h4 {
  margin-bottom: 10px; /* Espacio debajo del título de las imágenes */
  color: #333; /* O el color que prefieras para los títulos */
}

.graduation-section h4 {
  text-align: center; /* Centra el texto horizontalmente */
  /* Mantén los otros estilos que ya tenías para h4 en .graduation-section */
  margin-bottom: 15px;
  color: #333;
}
.image-gallery {
  display: flex; /* Para poner las imágenes en fila */
  gap: 15px; /* Espacio entre las imágenes */
  flex-wrap: wrap; /* Para que las imágenes se ajusten si la pantalla es pequeña */
  justify-content: center; /* Centrar las imágenes horizontalmente */
}

.image-gallery img {
  width: 215px; /* Ancho fijo para las imágenes, ajusta según necesites */
  height: 215px; /* Altura fija para las imágenes, ajusta según necesites */
  object-fit: cover; /* Para recortar las imágenes y que cubran el espacio sin distorsionarse */
  border-radius: 8px; /* Bordes redondeados para un mejor aspecto */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra sutil para las imágenes */
  transition: transform 0.2s ease-in-out; /* Transición suave para el efecto hover */
}

.image-gallery img:hover {
  transform: scale(1.05); /* Efecto de zoom al pasar el ratón */
}

 
  .skills-section {
    padding: 60px 100px;
    background-color: #f8f8f8;
    text-align: center;
    overflow: hidden;
  }
  .bw-photo-gallery {
  padding: 60px 20px;
 
  text-align: center;
}

.bw-photo-gallery h2 {
  font-size: 2rem;
  margin-bottom: 40px;
  position: relative;
  display: inline-block;
}

.grayscale-photo {
  filter: grayscale(100%); /* Aplica un filtro de blanco y negro al 100% */
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.photo-card {
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.photo-card:hover {
  transform: scale(1.03);
}

.photo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}


.personal-gallery {
  padding: 60px 20px;
  background: #fff;
  text-align: center;
}

.personal-gallery h2 {
  font-size: 2rem;
  color: #e83e8c;
  margin-bottom: 10px;
}



p.gallery-subtitle {
  font-family: 'Poppins', sans-serif; /* Esto cambiará la tipografía */
  /* Mantén o añade cualquier otro estilo que tenga gallery-subtitle */
  font-size: 1.2em; /* Por ejemplo, si ya tiene un tamaño */
  color: #555; /* O el color que desees */
  /* ... otros estilos ... */
}

  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.5em;
    color: #333;
    margin-bottom: 40px;
    position: relative;
  }

  h2::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background-color: #EE0001;
    margin: 10px auto 0;
    border-radius: 2px;
  }

  .carousel-container {
    display: flex;
    overflow-x: hidden;
    scroll-behavior: smooth;
    padding: 20px 0;
    gap: 30px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
  }

  .skill-card {
    min-width: 280px;
    max-width: 280px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    cursor: default;
    position: relative;
    flex-shrink: 0;
    border: 2px solid transparent;
    overflow: hidden;
    flex: 0 0 auto; 
  }

  .skill-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  .skill-icon {
    font-size: 3.5em;
    color: #EE0001;
    margin-bottom: 20px;
  }

  .skill-card h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.6em;
    color: #333;
    margin-bottom: 15px;
    font-weight: 600;
  }

  .level-bar-container {
    width: 80%;
    height: 8px;
    background-color: #eee;
    border-radius: 5px;
    margin-bottom: 15px;
    overflow: hidden;
  }

  .level-bar {
    height: 100%;
    background: linear-gradient(to right, #FF7B00, #EE0001);
    border-radius: 5px;
    transition: width 0.5s ease-out;
  }

  .skill-description {
    font-family: 'Poppins', sans-serif;
    font-size: 1em;
    color:black;
    line-height: 1.5;
    min-height: 45px;
    margin-bottom: 10px;
  }

  .instruction {
    font-family: 'Poppins', sans-serif;
    margin-top: 40px;
    font-size: 0.9em;
    color: black;
  }

  .carousel-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 20px;
  padding: 20px 10px;
  flex-wrap: nowrap;
  scrollbar-width: none; /* para Firefox */
}

.carousel-container::-webkit-scrollbar {
  display: none; /* para Chrome y Safari */
}

  .carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.85);
  border: none;
  font-size: 2rem;
  padding: 8px 14px;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: background-color 0.2s;
}

.carousel-button:hover {
  background-color: #f0f0f0;
}

.carousel-button.left {
  left: 10px;
}

.carousel-button.right {
  right: 10px;
}

.skills-section {
  position: relative; /* para que los botones se posicionen bien */
}


  /* Media Queries existentes */
  @media (max-width: 768px) {
    .skills-section { padding: 40px 10px; }
    h2 { font-size: 2em; }
    .skill-card { min-width: 250px; max-width: 250px; padding: 25px; }
    .skill-icon { font-size: 3em; }
    .skill-card h3 { font-size: 1.4em; }
  }

  @media (max-width: 480px) {
    .skills-section { padding: 30px 5px; }
    h2 { font-size: 1.8em; }
    .skill-card { min-width: 220px; max-width: 220px; padding: 20px; }
    .skill-icon { font-size: 2.8em; }
    .skill-card h3 { font-size: 1.2em; }
    .skill-description { font-size: 0.9em; }
  }

  /* --- ESTILOS DEL MODAL (NO TOCAR) --- */
  .skill-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
    transition: opacity 0.3s ease;
  }

  .skill-modal-content {
    background-color: #fff;
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 90%;
    text-align: center;
    position: relative;
    transform: scale(0.9);
    opacity: 0;
    animation: modal-appear 0.3s forwards cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 2em;
    color: #999;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .close-button:hover {
    color: #EE0001;
  }

  .modal-skill-icon {
    font-size: 4em;
    color: #EE0001;
    margin-bottom: 20px;
  }

  .skill-modal-content h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 2em;
    color: #333;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .modal-level {
    font-family:'Poppins', sans-serif;
    font-size: 1.1em;
    color: black;
    margin-bottom: 15px;
  }

  .modal-level strong {
    color: #EE0001;
  }

  .modal-description {
    font-family: 'Poppins', sans-serif;
    font-size: 1em;
    color: black;
    line-height: 1.6;
    margin-bottom: 10px;
  }

  .modal-source {
    font-family: 'Poppins', sans-serif;
    font-size: 0.9em;
    color: black;

    margin-bottom: 5px; /* Espacio entre source y materia */
  }
  .modal-source strong {
    color: #EE0001;
  }

  .modal-materia { /* Nuevo estilo para la materia en el modal */
    font-family: 'Poppins', sans-serif;
    font-size: 0.9em;
    color: black;
   
  }
  .modal-materia strong {
    color: #EE0001;
  }


  @keyframes modal-appear {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes modal-disappear {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.9); }
  }


  /* --- ESTILOS PARA LA LÍNEA BRILLANTE --- */
  .skill-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #FF7B00, #EE0001);
    transform: scaleX(0);
    transform-origin: bottom center;
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  .skill-card.active-hover::after {
    transform: scaleX(1);
  }

  .skill-card.active-hover {
    cursor: pointer;
  }

  /* Estilo para el párrafo de Source en la tarjeta */
  .skill-source {
    font-family: 'Poppins', sans-serif;
    font-size: 0.85em;
    color: #181313;

    margin-top: auto;
  }

  /* Nuevo estilo para el párrafo de Materia en la tarjeta */
  .skill-materia {
    font-family: 'Poppins', sans-serif;
    font-size: 0.85em;
    color: black;
  
    margin-top: 5px; /* Pequeño espacio si Source está presente */
  }
  .main-header {
    position: fixed; /* Fijo en la parte superior */
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9); /* Blanco ligeramente transparente */
    backdrop-filter: blur(5px); /* Efecto de cristal esmerilado */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 15px 40px;
    z-index: 1000; /* Siempre en la parte superior */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px; /* Ancho máximo para el contenido */
    margin: 0 auto;
  }

  .header-logo {
    font-family: 'Montserrat', sans-serif;
    font-size: 2em;
    font-weight: 700;
    color: #EE0001; /* Tu rojo distintivo */
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .header-logo:hover {
    color: #FF7B00; /* Tu naranja al pasar el mouse */
  }

  .main-nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 30px; /* Espacio entre los enlaces */
  }
  /* ESTO ES LO CRUCIAL: Estilo para el h2 en modo oscuro */
  :global(body.dark-mode) h2 {
    color: #FFFFFF; /* Blanco puro */
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); /* Opcional: un ligero brillo */
  }


  /* Estilos para el modo oscuro */
  :global(body.dark-mode) .contact-intro {
      color: #FFFFFF; /* O cualquier color que desees para este subtítulo en dark mode */
  }


  /* Estilos para los labels en modo oscuro */
  /* Aquí es donde forzamos el color a blanco cuando el body está en dark-mode */
  :global(body.dark-mode) .form-group label {
      color: #FFFFFF; /* Blanco puro */
  }

  /* --- Repite para los placeholders si también se ven oscuros --- */
  /* Asegúrate de que los placeholders también sean legibles en dark mode.
     El color del placeholder a menudo sigue el color del texto del input,
     pero es bueno forzarlo si es necesario. */
  :global(body.dark-mode) .form-group input::placeholder,
  :global(body.dark-mode) .form-group textarea::placeholder {
      color: #bbbbbb; /* Un gris claro para el placeholder en dark mode */
  }


  /* --- MUY IMPORTANTE: Asegúrate de que los inputs mismos tengan texto blanco --- */
  /* Si el texto que escribes dentro del input también se ve negro,
     necesitas añadir esta regla dentro del mismo <style> del componente */
  :global(body.dark-mode) .form-group input[type="text"],
  :global(body.dark-mode) .form-group input[type="email"],
  :global(body.dark-mode) .form-group textarea {
      color: #FFFFFF; /* Texto que el usuario escribe en blanco */
      background-color: var(--clr-input-bg-light); /* Para usar tu variable de fondo oscuro para inputs */
  }
  .main-nav li a {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    color: #000000;
    text-decoration: none;
    font-weight: 500;
    position: relative; /* Para el efecto de subrayado */
    transition: color 0.2s ease;
  }

  .main-nav li a:hover {
    color: #EE0001; /* Rojo al pasar el mouse */
  }

  .main-nav li a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background-color: #EE0001; /* Subrayado rojo */
    bottom: -5px;
    left: 0;
    transition: width 0.3s ease-out;
  }

  .main-nav li a:hover::after {
    width: 100%;
  }

  /* Media Queries para responsividad */
  @media (max-width: 768px) {
    .main-header {
      padding: 10px 20px;
    }
    .header-logo {
      font-size: 1.8em;
    }
    .main-nav ul {
      gap: 20px;
    }
    .main-nav li a {
      font-size: 1em;
    }
  }

  @media (max-width: 600px) {
    .main-header {
      flex-direction: column; /* Apilar logo y nav verticalmente */
      align-items: center;
      padding: 10px 15px;
    }
    .main-nav {
      margin-top: 10px;
    }
    .main-nav ul {
      flex-wrap: wrap; /* Permitir que los enlaces se envuelvan */
      justify-content: center;
      gap: 15px;
    }
    .header-logo {
      margin-bottom: 5px;
    }
  }

  .hero-section {
    position: relative;
    width: 100%;
    min-height: 100vh; /* Ocupar toda la altura de la ventana */
    padding: 120px 20px 60px; /* Ajuste para el header fijo y espacio inferior */
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    overflow: hidden; /* Por si añadimos efectos de fondo */

    /* Fondo "Aesthetic" - muy sutil */
    background: #fdfdfe; /* Casi blanco */
    /* O un gradiente aún más sutil si quieres un toque: */
    /* background: linear-gradient(145deg, #f0f2f5, #ffffff); */
  }

  .hero-content {
    max-width: 900px; /* Mayor ancho para el contenido central */
    padding: 40px; /* Padding interno para que el contenido no se pegue a los bordes */
    background-color: rgba(255, 255, 255, 0.8); /* Fondo semitransparente si el principal es un gradiente */
    border-radius: 25px; /* Bordes más redondeados */
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.05); /* Sombra suave */
    z-index: 1; /* Para asegurar que el contenido esté por encima de cualquier elemento de fondo */
    animation: fadeInSlideUp 1s ease-out forwards;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-title {
    font-family: 'Montserrat', sans-serif;
    /* Ajuste aquí: Reducimos el tamaño para que sea impactante pero no abrumador */
    font-size: 3.5em; /* Antes 4.5em */
    font-weight: 800; /* Extra bold */
    color: #222; /* Un gris oscuro, menos agresivo que el negro puro */
    margin-bottom: 20px;
    line-height: 1.1;
    letter-spacing: -1px; /* Ajuste sutil de espaciado entre letras */
    position: relative;
    display: inline-block; /* Para el efecto de subrayado/línea */
  }

  /* Un efecto sutil debajo del título, tipo línea suave o un brillo */
  .hero-title::after {
    content: '';
    display: block;
    width: 80%; /* Ancho de la línea */
    height: 6px;
    background: linear-gradient(90deg, transparent, #EE0001, #FF7B00, transparent); /* Gradiente de color */
    margin: 10px auto 0;
    border-radius: 3px;
    opacity: 0.6; /* Sutil */
    transform: scaleX(0);
    animation: expandLine 1.5s ease-out forwards;
    animation-delay: 0.5s;
  }

  .hero-subtitle {
    font-family: 'Poppins', sans-serif;
    /* Ajuste aquí: Reducimos el tamaño para armonizar con el título */
    font-size: 1.6em; /* Antes 2em */
    font-weight: 600;
    color: #EE0001; /* Color de acento para destacar */
    margin-bottom: 35px; /* Buen espacio */
    animation: fadeIn 1.2s ease-out forwards;
    animation-delay: 0.3s;
  }

  .hero-description {
    font-family: 'Poppins', sans-serif;
    /* Puedes ajustar este tamaño si lo ves necesario, pero 1.15em suele ser bueno */
    font-size: 1.15em;
    line-height: 1.9; /* Mayor interlineado para legibilidad */
    color: black; /* Gris oscuro para el texto */
    max-width: 750px; /* Ancho máximo para que las líneas no sean demasiado largas */
    margin: 0 auto;
    animation: fadeIn 1.5s ease-out forwards;
    animation-delay: 0.6s;
    text-align: justify; /* Justificar el texto para una apariencia más formal */
    hyphens: auto; /* Permite guiones automáticos para mejor justificación */
  }

  
  /* Opcional: Estilo para el botón CTA si decides incluirlo */
  /* .cta-button { ... (Mantener el estilo anterior si te gusta) ... } */

  /* --- Animaciones --- */
  @keyframes fadeInSlideUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes expandLine {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }

  /* --- Media Queries para Responsividad --- */
  @media (max-width: 900px) {
    .hero-content {
      padding: 30px;
      margin: 0 15px; /* Más margen lateral en pantallas medianas */
    }
    .hero-title {
      font-size: 3em; /* Ajuste para tablets */
    }
    .hero-subtitle {
      font-size: 1.4em; /* Ajuste para tablets */
    }
    .hero-description {
      font-size: 1em;
      line-height: 1.7;
    }
  }
  .about-me-section {
    padding: 80px 20px;
    background-color: #ffffff; /* Fondo claro para la sección */
    text-align: center;
  }

  .about-me-content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }



  .about-me-details {
    display: flex;
    flex-direction: row; /* Imagen a la izquierda, texto a la derecha por defecto */
    gap: 40px;
    align-items: center; /* Centrar verticalmente imagen y texto */
    text-align: left; /* Alinear el texto a la izquierda */
  }

  .about-me-image {
    flex-shrink: 0; /* Evita que la imagen se encoja */
    width: 300px; /* Tamaño fijo para la imagen */
    height: 300px;
    border-radius: 50%; /* Hacerla circular */
    overflow: hidden; /* Recorta la imagen a la forma circular */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    margin-left: -100px;
  }

  .about-me-image img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Asegura que la imagen cubra el área sin distorsionarse */
    display: block; /* Elimina espacio extra debajo de la imagen */
    z-index: 1;
    object-position: top;
    transition: transform 0.3s ease;
  }
  .about-me-image:hover img {
    transform: scale(1.05);
}


  .about-me-text p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    line-height: 1.8;
    color: black;
    margin-bottom: 20px;
  }

  /* Media Queries para Responsividad */
  @media (max-width: 768px) {
    .about-me-details {
      flex-direction: column; /* Apilar imagen y texto en pantallas pequeñas */
      text-align: center; /* Centrar texto en móviles */
    }
    .about-me-image {
      width: 250px;
      height: 250px;
      margin-bottom: 30px;
    }
    .about-me-text p {
      text-align: left; /* Aunque la sección es centrada, el texto en párrafo puede ser left */
      margin-left: auto;
      margin-right: auto;
      max-width: 500px; /* Limitar ancho del texto */
    }
  }

  .my-strengths-section {
  padding: 80px 30px;
  background-color: #f3f4f9; /* lavanda muy suave */
  text-align: center;
}

.strengths-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 100px;
}

.strengths-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
  text-align: left;
}

.strength-category {
  background-color: #ffffff;
  border-radius: 25px 8px 25px 8px;
  box-shadow: 0 8px 20px rgba(108, 99, 255, 0.08); /* sombra suave violeta */
  padding: 30px;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  display: flex;
  flex-direction: column;
}

.strength-category:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 30px rgba(108, 99, 255, 0.15);
}

.strength-category h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.6em;
  color: #2d2d2d;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.strength-category h3 i {
  font-size: 1.6em;
  color: #3229d9;
  animation: iconPulse 4s ease-in-out infinite alternate;
}

@keyframes iconPulse {
  0% { color: #6C63FF; }
  100% { color: #0524bc; }
}

.strength-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
  .strength-category li {
  font-family: 'Poppins', sans-serif;
  font-size: 1em;
  color: #2d2d2d;
  line-height: 1.6;
  margin-bottom: 10px;
  padding-left: 25px;
  position: relative;
}

.strength-category li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 10px;
  height: 10px;
  background: #6C63FF;
  border-radius: 50%;
  box-shadow: 0 0 6px #B8C1EC;
  animation: bulletGlow 2.5s infinite alternate ease-in-out;
}

@keyframes bulletGlow {
  0% { box-shadow: 0 0 6px #B8C1EC; }
  100% { box-shadow: 0 0 10px #6C63FF; }
}
  .study-scope {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1em;
    color: var(--text-secondary);
    line-height: 1.8;
    margin-top: 60px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;

  }
/* Mantener estilos generales de la sección */
.education-section {
    scroll-behavior: smooth;
    overflow-x: hidden;
    overflow-y: visible;
    padding: 80px 20px;
    padding: 4rem;
    position: relative;
    background-color: #fff;
    text-align: center;
  }

  .education-content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }

  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.5em;
    color:black;
    margin-bottom: 60px;
    position: relative;
  }

  h2::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: #FF7B00;
    margin: 10px auto 0;
    border-radius: 2px;
  }

  /* --- NUEVOS ESTILOS PARA LA LÍNEA DE TIEMPO REVISADA --- */
  .timeline-container-new {
    position: relative;
    padding: 20px 0;
    margin: 0 auto;
    max-width: 800px; /* Ancho máximo para la línea de tiempo */
  }

  .timeline-container-new::before {
    content: '';
    position: absolute;
    width: 4px;
    background-color: #e4e2e2; /* Línea principal */
    top: 0;
    bottom: 0;
    left: 100px; /* Posiciona la línea a la izquierda para que los años queden a su izquierda */
    border-radius: 2px;
  }

  .timeline-item-new {
    display: flex;
    align-items: flex-start; /* Alinea los elementos al inicio */
    margin-bottom: 40px; /* Espacio entre items */
    position: relative;
    padding-left: 150px; /* Espacio para la fecha y el punto */
    scroll-snap-align: start;
    margin-bottom: 100px;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1.0s ease;
  }
  .timeline-item-new.active {
  opacity: 1;
  transform: translateY(0);
}
  .timeline-date-new {
    position: absolute;
    left: 0;
    top: 15px; /* Ajusta la posición vertical de la fecha */
    width: 90px; /* Ancho fijo para la fecha */
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    color: black;
    font-size: 1em;
    text-align: right;
    padding-right: 15px; /* Espacio entre fecha y línea */
  }

  .timeline-dot-new {
    position: absolute;
    left: 93px; /* Alinea el punto con la línea vertical (left + half of line width) */
    width: 18px;
    height: 18px;
    background-color: #EE0001;
    border-radius: 50%;
    top: 18px; /* Ajusta la posición vertical del punto */
    z-index: 1;
    border: 3px solid #fff;
  }

  .timeline-card-new {
    background-color: #f8f8f8;
    border-radius: 10px;
    border: 2px solid transparent;
    transition: border 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    padding: 25px;
    flex-grow: 1; /* Ocupa el espacio restante */
    text-align: left;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .timeline-card-new:hover {
  border: 1.2px solid #ff66cc; /* Rosita fino y elegante */
  box-shadow: 0 8px 20px rgba(255, 102, 204, 0.2);
  transform: translateY(-6px);;
  }

  .timeline-card-new h3 {
    font-family: 'Poppins', sans-serif;
    color: black;
    font-size: 1.3em;
    margin-bottom: 5px;
  }

  .timeline-card-new h4 {
    font-family: 'Poppins', sans-serif;
    color: #FF7B00;
    font-size: 0.95em;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .timeline-card-new p {
    font-family: 'Poppins', sans-serif;
    color: black;
    font-size: 0.9em;
    line-height: 1.6;
    margin-bottom: 10px; /* Menos margen si hay idiomas */
  }

  /* Estilos para la sección de idiomas (se mantienen iguales) */
  .language-skills {
    margin-top: 15px; /* Ajustado */
  
    padding-top: 15px; /* Ajustado */
  }

  .language-skills h4 {
    font-family: 'Poppins', sans-serif;
    color:black;
    font-size: 1.05em; /* Ajustado */
    margin-bottom: 12px; /* Ajustado */
  }

  .language-list {
    display: flex;
    flex-direction: column;
    gap: 12px; /* Ajustado */
  }

  .language-item {
    display: flex;
    align-items: center;
    gap: 8px; /* Ajustado */
    font-family: 'Poppins', sans-serif;
    font-size: 0.85em; /* Ajustado */
    color: black;
  }

  .language-item span {
    min-width: 70px; /* Ajustado */
  }

  .progress-bar-container {
    flex-grow: 1;
    height: 7px; /* Ajustado */
  
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background-color: #EE0001;
    border-radius: 4px;
    transition: width 1s ease-out;
  }

  .level-text {
    min-width: 110px; /* Ajustado */
    text-align: right;
    font-family: 'Poppins', sans-serif;
    color:black;
    font-size: 0.8em; /* Ajustado */
  }

  /* Media Queries para responsividad (ajustadas) */
  @media (max-width: 768px) {
    .timeline-container-new::before {
      left: 20px; /* Mueve la línea más a la izquierda en móvil */
    }
    .timeline-item-new {
      padding-left: 50px; /* Menos padding en móvil */
      margin-bottom: 30px;
    }
    .timeline-date-new {
      position: static; /* No absoluta en móvil */
      text-align: left;
      width: auto;
      font-size: 0.9em;
      color: #777;
      margin-bottom: 5px; /* Espacio entre fecha y card */
      padding-right: 0;
    }
    .timeline-dot-new {
      left: 13px; /* Ajusta la posición del punto */
      top: 10px; /* Ajusta la posición vertical del punto */
    }
    .timeline-card-new {
      padding: 20px;
    }
    .timeline-card-new h3 {
      font-size: 1.2em;
    }
    .timeline-card-new h4 {
      font-size: 0.85em;
    }
    .timeline-card-new p {
      font-size: 0.85em;
    }
    .language-item span {
      min-width: 60px;
    }
    .level-text {
      min-width: 100px;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 2em;
    }
    .timeline-item-new {
      padding-left: 40px;
    }
    .timeline-container-new::before {
      left: 15px;
    }
    .timeline-dot-new {
      left: 8px;
    }
    .language-item {
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .language-item span {
      flex-basis: auto; /* Dejar que el contenido decida */
      min-width: unset;
    }
    .progress-bar-container {
      flex-basis: 100%;
      margin-top: 5px;
    }
    .level-text {
      flex-basis: auto;
      text-align: left;
    }
  }
  .projects-section {
  padding: -5px 24px;
  background: var(--bg-color-primary);
  color: var(--text-color-primary);
  text-align: center;
}

.projects-content {
  max-width: 1200px;
  margin: 0 auto;
}

/* Título con glow y firma visual */
h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 2.8em;
  font-weight: 700;
  color: var(--text-color-primary);
  margin-bottom: 50px;
  position: relative;
}

h2::after {
  content: '';
  width: 72px;
  height: 4px;
  background: linear-gradient(to right, #ff66c4, #ffb86c);
  display: block;
  margin: 12px auto 0;
  border-radius: 2px;
  box-shadow: 0 0 10px #ff66c4;
}


/* Grid de proyectos */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  padding: 0 10px;
}

/* Tarjeta de proyecto con glassmorphism */
.project-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.08));
  border-radius: 16px;
  box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.12);
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
}

.project-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
  transition: left 0.6s ease;
}

.project-card:hover::before {
  left: 100%;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px -10px rgba(255, 102, 196, 0.15), 0 0 50px rgba(255, 102, 196, 0.08);
  border-color: #ff66c4;
}

/* Título del proyecto */
.project-card h3 {
  font-family: 'Poppins', sans-serif;
  color: var(--accent-color);
  font-size: 1.7em;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: color 0.3s ease;
}

.project-card:hover h3 {
  color: #f5850e;;
}

/* Descripción del proyecto */
.project-card .description {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9em;
  padding-left: 6px;
  text-align:left;
  color: var(--text-color-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
  flex-grow: 1;
}

/* Etiquetas de tecnologías aesthetic */
.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}



.technologies span {
  background: rgba(255, 255, 255, 0.2);
  color:black;
  font-size: 0.78em;
  padding: 6px 14px;
  border-radius: 999px;
  font-family: 'Poppins', sans-serif;
  border: black;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  cursor: default;
}

.technologies span:hover {
  background-color: #ff66c4;
  color: white;
  transform: scale(1.05);
}

/* Enlace al proyecto */
.project-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  color: var(--color-project-link); /* Usa la variable */
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.05em;
  text-decoration: none;
  text-shadow: 0 1px 2px rgba(255, 102, 196, 0.2);
  transition: color 0.3s ease;
}

/* Estilos para el Modo Oscuro */
.code-project-card h3 {
  color: var(--color-texto-oscuro); /* Usa la variable aquí también */
}

.project-link:hover {
  color: #f5850e;
}

.project-link svg {
  fill: currentColor;
  transition: transform 0.3s ease;
}

.project-link:hover svg {
  transform: translateX(6px) rotate(3deg);
}

/* Firma visual */
.steffy-tag {
  margin-top: 60px;
  font-family: 'Poppins', sans-serif;
  font-size: 3.5em;
  color:black;
  padding: 15px;
  letter-spacing: 1px;
  text-align: center;
  opacity: 0.85;
  text-shadow: black
}

.code-projects-section {
    padding: 80px 20px;
    background-color: var(--bg-color-primary);
    color: var(--text-color-primary);
    text-align: center;
  }

  .code-projects-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.5em;
    color: var(--text-color-primary);
    margin-bottom: 60px;
    position: relative;
  }

  h2::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: var(--accent-color); /* Usamos el rojo para este separador */
    margin: 10px auto 0;
    border-radius: 2px;
  }

  .steffy-tag {
    font-family: 'Poppins', sans-serif;
    font-size: 1.4em;
    color: var(--text-color-secondary);
    margin-bottom: 40px; /* Más espacio debajo de la tag */
    font-style: italic;
    opacity: 0.8;
  }

  .code-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    padding: 0 10px;
    justify-content: center;
  }


  .code-project-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.08));
  border-radius: 16px;
  box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.12);
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  }

  
/* Efecto de brillo al pasar el mouse */
.code-project-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
  transition: left 0.6s ease;
}

.code-project-card:hover::before {
  left: 100%;
}

.code-project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px -10px rgba(9, 96, 150, 0.2), 0 0 50px rgba(102, 196, 255, 0.08);
  border-color: #4237d7; /* Azulito suave para código */
}


/* Título del proyecto */
.code-project-card h3 {
  font-family: 'Poppins', sans-serif;
  color: var(--accent-color);
  font-size: 1.6em;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: color 0.3s ease;
}

.code-project-card:hover h3 {
  color: #28168f;
}

/* Descripción */
.code-project-card .description {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9em;
  color: var(--text-color-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
  text-align: left;
  padding-left: 6px;
  flex-grow: 1;
}

/* Etiquetas de tecnologías */
.code-project-card .technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.code-project-card .technologies span {
  background: rgba(255, 255, 255, 0.2);
  color: black;
  font-size: 0.78em;
  padding: 6px 14px;
  border-radius: 999px;
  font-family: 'Poppins', sans-serif;
  border: black;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  cursor: default;
}



/* Enlace al repositorio */
.code-project-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  color: black;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.05em;
  text-decoration: none;
  text-shadow: 0 1px 2px rgba(2, 10, 84, 0.2);
  transition: color 0.3s ease;
}

.code-project-link:hover {
  color: #18036b;
}

.code-project-link svg {
  fill: currentColor;
  transition: transform 0.3s ease;
}

.code-project-link:hover svg {
  transform: translateX(6px) rotate(3deg);
}

  /* Media Queries */
  @media (max-width: 768px) {
    .code-projects-section {
      padding: 60px 15px;
    }

    h2 {
      font-size: 2em;
      margin-bottom: 40px;
    }

    .code-projects-grid {
      grid-template-columns: 1fr;
      gap: 25px;
    }

    .code-project-card {
      padding: 25px;
    }

    .code-project-card h3 {
      font-size: 1.3em;
    }

    .code-project-card .description {
      font-size: 0.9em;
    }

    .technologies span {
      font-size: 0.75em;
      padding: 5px 10px;
    }

    .code-project-link {
      font-size: 0.9em;
    }
  }




/* --- Variables CSS (¡Asegúrate de que estas son las únicas variables en tu archivo CSS!) --- */
:root {
    /* Modo Claro (valores por defecto) */
    --bg-primary: #f3f4f9; /* Fondo principal de secciones (similar a lavanda suave) */
    --bg-card: #ffffff; /* Fondo de tarjetas/contenedores/modals */
    --text-primary: #2d2d2d; /* Texto principal oscuro */
    --text-secondary: #555; /* Texto secundario, descripciones, texto por defecto de iconos */
    --text-light-on-dark: #f0f0f0; /* Texto claro para usar sobre fondos oscuros (ej. botones, footer) */

    --accent-main: #6C63FF; /* Tu violeta/azul principal (para botones, borders, iconos) */
    --accent-red: #EE0001; /* Tu rojo de acento (para hover en social links, subrayados) */
    --accent-orange: #FF7B00; /* Tu naranja secundario (para subrayados h3, hover de botones) */

    --shadow-card: rgba(108, 99, 255, 0.08); /* Sombra suave de tarjeta */
    --shadow-card-hover: rgba(108, 99, 255, 0.15); /* Sombra de tarjeta al hover */
    --border-light: #eee; /* Borde claro para inputs/divisores/lineas */
    --input-bg: #fefefe; /* Fondo de inputs un poco diferente */
    --border-focus: rgba(108, 99, 255, 0.2); /* Sombra al enfocar input */

    --bullet-glow: #B8C1EC; /* Sombra de la viñeta de fortalezas */
    --dark-purple-for-animation: #0524bc; /* Violeta oscuro para animación de iconos */

    --footer-bg: #333; /* Fondo del footer en modo claro */
    --footer-text-color: #f8f8f8; /* Color del texto del footer en modo claro */

    /* Variables RGB para RGBA() (útiles para opacidades) */
    --accent-red-rgb: 238, 0, 1;
    --accent-main-rgb: 108, 99, 255;

    /* Glow de iconos sociales */
    --social-glow-light: rgba(108, 99, 255, 0.4); /* Glow para modo claro (violeta suave) */
    --social-icon-color-light: #555; /* Color por defecto de los iconos sociales */
}

.dark-mode {
    --bg-primary: #1A1A2E;
    --bg-card: #2C3542;
    --text-primary: #F0F0F0;
    --text-secondary: #CCCCCC;
    --text-light-on-dark: #1A1A2E; /* Para elementos que eran claros y se vuelven oscuros */

    --accent-main: #8F82FF; /* Violeta/azul principal en dark mode */
    --accent-red: #FF4D4D; /* Rojo de acento en dark mode */
    --accent-orange: #FF4D4D; /* Naranja secundario en dark mode */

    --shadow-card: rgba(0, 0, 0, 0.5);
    --shadow-card-hover: rgba(0, 0, 0, 0.7);
    --border-light: #444;
    --input-bg: #1E2533;
    --border-focus: rgba(143, 130, 255, 0.3);

    --bullet-glow: #8F82FF;
    --dark-purple-for-animation: #8F82FF;

    --footer-bg: #101018; /* Un oscuro más profundo para el footer en dark mode */
    --footer-text-color: #CCCCCC; /* Texto más claro para el footer en dark mode */

    /* Variables RGB para RGBA() en dark mode */
    --accent-red-rgb: 255, 77, 77;
    --accent-main-rgb: 143, 130, 255;

    /* Glow de iconos sociales en dark mode */
    --social-glow-dark: #00FFFF; /* ¡Tu turquesa brillante para el glow en modo oscuro! */
    --social-icon-color-dark: #CCCCCC; /* Color de los iconos sociales en dark mode */
}


/* --- Sección de Contacto General --- */
.contact-section {
    padding: 80px 20px; /* Padding unificado para la sección */
    padding-top: 30px;
    background-color: var(--bg-primary);
    text-align: center;
    transition: background-color 0.5s ease;
    background-image: none; /* Por defecto, sin patrón en modo claro */
}

.contact-section h2 { /* Título principal de la sección */
    font-family: 'Montserrat', sans-serif;
    font-size: 2.8em;
    color: var(--text-primary);
    margin-bottom: 20px;
    font-weight: 700;
    transition: color 0.5s ease;
}

.contact-section h2::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background-color: var(--accent-red);
    margin: 10px auto 0;
    border-radius: 2px;
    transition: background-color 0.5s ease;
}

.contact-intro {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1em;
    color: var(--text-secondary);
    margin-bottom: 40px;
    transition: color 0.5s ease;
}

.contact-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    /* align-items: stretch; <--- REMOVIDO PARA PERMITIR ALTURAS DIFERENTES */
    align-items: flex-start; /* Alinea los elementos al inicio, permitiendo diferentes alturas */
    margin-top: 20px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

/* --- Contenedor del Formulario (EL GRANDE) --- */
.contact-form-container {
    flex: 1 1 550px; /* Ancho base, puede crecer */
    min-width: 280px;
    max-width: 650px; /* Límite máximo para el formulario */
    background-color: var(--bg-card);
    border-radius: 15px;
    box-shadow: 0 10px 30px var(--shadow-card);
    padding: 30px; /* Padding ajustado para controlar la altura */
    transition: background-color 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease;
    position: relative;
    overflow: hidden;
    border: 2px solid var(--accent-main);
    animation: pulseBorder 3s infinite alternate ease-in-out;
}

/* --- Contenedor de Información de Contacto (EL MÁS CHICO) --- */
.contact-info-container {
    flex: 0 1 350px; /* Ancho más fijo, no crece tanto */
    min-width: 280px;
    max-width: 380px; /* Límite máximo para la información (puedes ajustar este si necesitas que sea más angosto) */
    background-color: var(--bg-card);
    border-radius: 15px;
    box-shadow: 0 10px 30px var(--shadow-card);
    padding: 30px; /* Padding ajustado, igual que el formulario para consistencia interna */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Empuja el contenido y los links sociales a los extremos */
    transition: background-color 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease;
    position: relative;
    overflow: hidden;
    border: 2px solid var(--accent-main);
    animation: pulseBorder 3s infinite alternate ease-in-out;
}

/* Animación para el borde de AMBAS tarjetas de contacto */
@keyframes pulseBorder {
    0% { border-color: var(--accent-main); box-shadow: 0 0 15px rgba(var(--accent-main-rgb), 0.3); }
    100% { border-color: var(--accent-red); box-shadow: 0 0 25px rgba(var(--accent-red-rgb), 0.4); }
}

.contact-form-container h3,
.contact-info-container h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.8em;
    color: var(--text-primary);
    margin-bottom: 25px;
    font-weight: 600;
    position: relative;
    padding-bottom: 10px; /* Espacio para el subrayado */
    transition: color 0.5s ease;
}

/* Subrayado sutil para los h3 de la sección de contacto */
.contact-form-container h3::after,
.contact-info-container h3::after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background-color: var(--accent-orange);
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 2px;
    transition: background-color 0.5s ease;
}

/* --- Estilos de los Campos del Formulario --- */
.form-group {
    margin-bottom: 20px;
    text-align: left;
}

.form-group label {
    display: block;
    font-family: 'Poppins', sans-serif;
    font-size: 0.95em;
    color: var(--text-primary);
    margin-bottom: 6px;
    font-weight: 500;
    transition: color 0.5s ease;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group textarea {
    width: 100%;
    padding: 10px 15px; /* *** ALTURA REDUCIDA DE LOS INPUTS *** */
    border: 1px solid var(--border-light);
    border-radius: 8px;
    background-color: var(--input-bg);
    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
    font-size: 1em;
    box-sizing: border-box;
    transition: border-color 0.3s ease, background-color 0.5s ease, color 0.5s ease;
}

.form-group input[type="text"]:focus,
.form-group input[type="email"]:focus,

.form-group textarea:focus {
    outline: none;
    border-color: var(--accent-main);
    box-shadow: 0 0 0 3px var(--border-focus);
}

/* Placeholder color */
.form-group input::placeholder,
.form-group textarea::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
    transition: color 0.5s ease;
}

.form-group textarea {
    resize: vertical;
    min-height: 100px; /* Altura mínima del textarea, ligeramente más chica */
}

.submit-button {
    background-color: var(--accent-main);
    color: var(--text-light-on-dark);
    padding: 12px 30px; /* *** ALTURA REDUCIDA DEL BOTÓN *** */
    border: none;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    margin-top: 25px;
    width: 100%;
}

.submit-button:hover {
    background-color: var(--accent-red);
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

/* --- Estilos del Contenedor de Información (datos de contacto y redes sociales) --- */

/* Datos de Contacto (Email, Teléfono) */
.contact-details {
    margin-bottom: 30px;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
    text-align: left;
}


.info-item p {
  font-family: 'Poppins', sans-serif;
    font-size: 1.05em;
    color: var(--text-primary);
    margin: 0;
    transition: color 0.5s ease;
}



/* --- Links de Redes Sociales --- */
.social-links-container { /* Contenedor principal de las redes */
    padding-top: 25px;
    text-align: center;
    position: relative;
}

/* Línea divisoria con efecto de luz/sombra */
.social-links-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--border-light), transparent);
    transition: background 0.5s ease;
}

.social-links-container h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.2em;
    color: var(--text-primary);
    margin-bottom: 20px;
    font-weight: 600;
    transition: color 0.5s ease;
}

.social-icons { /* Contenedor de los iconos sociales */
    display: flex; 
    justify-content: center;
    font-size: 10.8em; 
    gap: 35px; /* Espacio entre iconos más grande */
    flex-wrap: wrap;
}

/* --- Media Queries --- */
@media (max-width: 900px) {
    .contact-grid {
        flex-direction: column; /* Se apilan en pantallas medianas */
        align-items: center; /* Centra los contenedores apilados */
    }
    .contact-form-container,
    .contact-info-container {
        flex: 1 1 100%; /* Ocupan todo el ancho disponible */
        max-width: 550px; /* Límite de ancho para que no sean demasiado grandes en tablets */
        padding: 30px;
    }
}

@media (max-width: 500px) {
    .contact-form-container,
    .contact-info-container {
        padding: 25px;
    }
    .contact-section h2 {
        font-size: 2.2em;
    }
    .contact-intro {
        font-size: 1em;
    }
   
}

/* Modo Claro Footer Estilizado y Suave */
.main-footer {
  background-color: var(--main-footer);
  color: #555;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1.5px solid #e0e0e0;
}

:global(body.dark-mode) .main-footer {
    background-color: var(--footer-bg-dark); /* Fondo azul oscuro para dark mode */
    color: var(--footer-text-dark); /* Texto blanco para dark mode */
  }

.footer-content {
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

/* Etiquetas */
.footer-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.footer-links a:hover,
.footer-links a:active {
  background-color: #eee;
  color: #6c63ff;
  box-shadow: 0 0 0 2px #d8d8ff inset;
}

/* Íconos sociales */
.social-icons {
  display: flex;
  justify-content: center;
  gap: 18px;
  font-size: 1.8rem;
}

.social-icons a {
  color: #888;
  transition: all 0.3s ease;
  padding: 7px;
}

.social-icons a:hover,
.social-icons a:active {

  color: #6c63ff;
  transform: scale(1.1);
}

.footer-copy {
  color: #999;
  font-size: 0.75rem;
  text-align: center;
  line-height: 1.4;
}


/* ==== MODO OSCURO  FOOTER ==== */


body.dark-mode .footer-links a {
  color: #aaaaaa;
}

body.dark-mode .footer-links a:hover {
  color: #f50057;
}

body.dark-mode .footer-links a:active {
  color: #00d4ff;
}

body.dark-mode .social-icons a {
  color: #999;
}

body.dark-mode .social-icons a:hover {
  color: #00ffc3;
}








/* Variables CSS para los temas */
:root {
  /* Modo Claro (valores por defecto) */
  --background-color: #f8f8f8;
  --text-color: #333;
  --header-bg: rgba(255, 255, 255, 0.9);
  --header-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  --card-bg: #fff;
  --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  --accent-color: #EE0001;
  --secondary-accent-color: #FF7B00;
  --hero-title-color: #222;
  --hero-description-color: black;
  --footer-bg-start: #0d0d19;   /* noche profunda */
  --footer-bg-end:   #202045;   /* índigo cósmico */
  --footer-text:     #e7e9f0;   /* gris-azul claro */
  --footer-accent:   #ff7f50;   /* coral neón */
  --footer-accent-2: #00c6ff;   /* azul eléctrico */
  --light-bg-primary: #f3f4f9; /* Fondo principal (lavanda muy suave) */
    --light-bg-card: #ffffff; /* Fondo de las tarjetas */
    --light-text-primary: #2d2d2d; /* Texto principal oscuro */
    --light-text-secondary: #000000; /* Para el .study-scope que es 'black' */
    --light-accent-purple: #6C63FF; /* Violeta principal */
    --light-dark-purple: #0524bc; /* Violeta oscuro para animación */
    --light-shadow-card: rgba(108, 99, 255, 0.08); /* Sombra suave */
    --light-shadow-card-hover: rgba(108, 99, 255, 0.15); /* Sombra hover */
    --light-bullet-glow: #B8C1EC; /* Sombra de la viñeta */
    --clr-bg-section-light: #f3f4f9; /* Fondo de sección */
    --clr-bg-card-light: #ffffff; /* Fondo de tarjetas/formularios */
    --clr-text-dark: #2d2d2d; /* Texto oscuro */
    --clr-text-medium: #555; /* Texto medio */
    --clr-text-light: #f0f0f0; /* Texto muy claro */
    --clr-accent-blue: #6C63FF; /* Azul/violeta principal */
    --clr-accent-red: #EE0001; /* Rojo de acento (para hover en social links) */
    --clr-shadow-light: rgba(108, 99, 255, 0.08); /* Sombra clara */
    --clr-border-light: #eee; /* Borde claro */
}

.main-header {
  background-color: var(--header-bg);
  box-shadow: var(--header-shadow);
}

.header-logo {
  color: var(--accent-color);
}

.header-logo:hover {
  color: var(--secondary-accent-color);
}

.main-nav li a {
  color: var(--text-color);
}

.main-nav li a:hover {
  color: var(--accent-color);
}

.main-nav li a::after {
  background-color: var(--accent-color);
}

.hero-section {
  background: var(--background-color); /* Usamos la variable general para el fondo */
}

.hero-content {
  background-color: var(--card-bg);
  box-shadow: var(--card-shadow);
}

.hero-title {
  color: var(--hero-title-color);
}

.hero-title::after {
  background: linear-gradient(90deg, transparent, var(--accent-color), var(--secondary-accent-color), transparent);
}

.hero-subtitle {
  color: var(--accent-color);
}

.hero-description {
  color: var(--text-color);
}

.about-me-text p {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1em;
  line-height: 1.8;
  color: var(--text-color); /* <-- Usará el color de texto global, que es blanco en dark mode */
  margin-bottom: 20px;
}
.about-me-section,
.personal-gallery,
.bw-photo-gallery,
.skills-section,
.education-section,
.projects-section,
.code-projects-section,
.my-strengths-section,
.contact-section {
  background-color: var(--background-color); /* Aplicar a las secciones principales */
}

/* --- Sección de Fortalezas --- */
.my-strengths-section {
    padding: 80px 20px;
    padding-top: 40px;
    background-color: var(--light-bg-primary); /* Usa la variable de fondo */
    text-align: center;
    transition: background-color 0.4s ease; /* Transición suave para el cambio de fondo */
}

/* El .strengths-content no necesita cambios de color directos */
.strengths-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.strengths-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 50px;
    text-align: left;
}

.strength-category {
    background-color: var(--light-bg-card); /* Usa la variable de fondo de tarjeta */
    border-radius: 25px 8px 25px 8px;
    box-shadow: 0 8px 20px var(--light-shadow-card); /* Usa la variable de sombra */
    padding: 30px;
    transition: transform 0.4s ease, box-shadow 0.4s ease, background-color 0.4s ease; /* Añade background-color a la transición */
    display: flex;
    flex-direction: column;
}

.strength-category:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 30px var(--light-shadow-card-hover); /* Usa la variable de sombra hover */
}

.strength-category h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.6em;
    color: var(--light-text-primary); /* Usa la variable de texto principal */
    margin-bottom: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: color 0.4s ease; /* Transición suave para el cambio de color del texto */
}

.strength-category h3 i {
    font-size: 1.6em;
    color: var(--light-dark-purple); /* Usa la variable de violeta oscuro */
    animation: iconPulse 4s ease-in-out infinite alternate;
    transition: color 0.4s ease; /* Transición suave para el color del icono */
}

/* Animación iconPulse ajustada a las variables si es necesario */
@keyframes iconPulse {
    0% { color: var(--light-accent-purple); } /* Usa la variable de violeta acento */
    100% { color: var(--light-dark-purple); } /* Usa la variable de violeta oscuro */
}

.strength-category ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.strength-category li {
  font-family: 'Poppins', sans-serif;
    font-size: 1em;
    color: var(--light-text-primary); /* Usa la variable de texto principal */
    line-height: 1.6;
    margin-bottom: 10px;
    padding-left: 25px;
    position: relative;
    transition: color 0.4s ease; /* Transición suave para el color del texto */
}

.strength-category li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 10px;
    height: 10px;
    background: var(--light-accent-purple); /* Usa la variable de violeta acento */
    border-radius: 50%;
    box-shadow: 0 0 6px var(--light-bullet-glow); /* Usa la variable de sombra de viñeta */
    animation: bulletGlow 2.5s infinite alternate ease-in-out;
    transition: background 0.4s ease, box-shadow 0.4s ease; /* Transición suave para la viñeta */
}

/* Animación bulletGlow ajustada a las variables si es necesario */
@keyframes bulletGlow {
    0% { box-shadow: 0 0 6px var(--light-bullet-glow); }
    100% { box-shadow: 0 0 10px var(--light-accent-purple); }
}

.study-scope {
    font-family:  'Montserrat', sans-serif;
    font-size: 1.1em;
    color: var(--light-text-secondary); /* Usa la variable de texto secundario */
    line-height: 1.8;
    margin-top: 60px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    font-style: italic;
    transition: color 0.4s ease; /* Transición suave para el color del texto */
}

.timeline-date-new {
  position: absolute;
  left: 0;
  top: 15px;
  width: 90px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: var(--text-color); /* Así se pondrá blanco en dark mode */
  font-size: 1em;
  text-align: right;
  padding-right: 15px;
}
.timeline-card-new p {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9em;
  line-height: 1.6;
  color: var(--text-color); /* Esto hará que el texto sea blanco en modo oscuro */
  margin-bottom: 10px;
}

/* Títulos H2 */
h2 {
  color: var(--text-color);
}

h2::after {
  background-color: var(--accent-color);
}

/* Tarjetas de habilidades, proyectos, etc. */
.skill-card, .project-card, .code-project-card, .timeline-card-new, .contact-form-container, .contact-info-container, .strength-category {
  background-color: var(--card-bg);
  box-shadow: var(--card-shadow);
  color: var(--text-color); /* Asegura que el texto dentro de las tarjetas sea visible */
}

.skill-card h3, .project-card h3, .code-project-card h3, .timeline-card-new h3, .contact-form-container h3, .contact-info-container h3, .strength-category h3 {
  color: var(--text-color); /* Asegura que los títulos de las tarjetas sean visibles */
}

.skill-icon, .modal-skill-icon {
  color: var(--accent-color);
}
.skill-modal-content {
  background-color: var(--card-bg); /* <-- Usa la variable para el fondo de las tarjetas */
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2); /* Puedes considerar una variable para esta sombra si quieres controlarla en dark mode */
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
  transform: scale(0.9);
  opacity: 0;
  animation: modal-appear 0.3s forwards cubic-bezier(0.68, -0.55, 0.27, 1.55);
  color: var(--text-color); /* <-- Asegura que el texto general del modal sea el color de texto del tema */
}

.skill-modal-content h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 2em;
  color: var(--text-color); /* Usa la variable de texto */
  margin-bottom: 10px;
  font-weight: 700;
}

.modal-level {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1em;
  color: var(--text-color); /* Usa la variable de texto */
  margin-bottom: 15px;
}

.modal-description {
  font-family: 'Poppins', sans-serif;
  font-size: 1em;
  color: var(--text-color); /* Usa la variable de texto */
  line-height: 1.6;
  margin-bottom: 10px;
}

.modal-source {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9em;
  color: var(--text-color); /* Usa la variable de texto */
 
  margin-bottom: 5px;
}

.modal-materia {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9em;
  color: var(--text-color); /* Usa la variable de texto */

}
.level-bar {
  background: linear-gradient(to right, var(--secondary-accent-color), var(--accent-color));
}

.skill-description, .skill-source, .skill-materia, .modal-description, .modal-source, .modal-materia, .instruction {
  color: var(--text-color);
}

.modal-level strong, .modal-source strong, .modal-materia strong {
  color: var(--accent-color);
}

.skill-modal-overlay {
  background-color: rgba(0, 0, 0, 0.7); /* Oscurecer un poco más el overlay en modo oscuro si es necesario */
}

.close-button:hover {
  color: var(--accent-color);
}
/* Estilos generales para las etiquetas (tags) en tarjetas de proyectos de código */
.code-project-card .technologies span {
  font-size: 0.78em;
  padding: 6px 14px;
  border-radius: 999px; /* Para la forma de píldora */
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  cursor: default;
  text-shadow: none; /* Aseguramos que no haya sombra de texto en ningún modo */
}
/* Colores y fondos específicos para el MODO CLARO */
/* Esto se aplicará por defecto */
.code-project-card .technologies span {
  background: transparent; /* Fondo transparente para que solo se vea el reborde */
  color: black; /* Texto negro */
  border: 1px solid black; /* Borde negro finito */
}
/* Enlaces de proyectos */
.code-project-link {
  display: inline-flex;
  align-items: center;
  color: var(--accent-color); /* Este ya es el naranja */
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

/* Hover para "Ver Repositorio" */
.code-project-link:hover {
  color: var(--secondary-accent-color); /* Naranja al hacer hover en "Ver Repositorio" */
}

.code-project-link svg {
  margin-right: 5px;
  width: 18px;
  height: 18px;
  fill: var(--accent-color); /* Color por defecto del icono */
  transition: fill 0.3s ease;
}

/* Regla general para las etiquetas (tags) en modo claro (si es necesario) */
.technologies span {
  background: rgba(255, 255, 255, 0.2); /* Fondo claro con algo de transparencia */
  color: black;
  border: 1px solid black; /* Borde oscuro */
  text-shadow: none; /* Mejor sin sombra en modo claro */
  /* ... (otras propiedades que ya tienes como font-size, padding, border-radius, etc.) ... */
}

/* ESTO ES LO IMPORTANTE PARA EL MODO OSCURO */
body.dark-mode .technologies span {
  background: var(--card-bg); /* O un color más oscuro si quieres un contraste fuerte */
  /* background: var(--accent-color); /* Otra opción si quieres que los tags sean del color de acento */
  color: var(--text-color); /* Asegura que el texto del tag sea blanco */
  border: 1px solid var(--accent-color); /* Un borde del color de acento para que resalte */
  text-shadow: none; /* Desactiva la sombra de texto si choca */
}

/* Hover para el icono de "Ver Repositorio" */
.code-project-link:hover svg {
  fill: var(--secondary-accent-color); /* Cambiar el color del icono al hacer hover */
}

.project-tab-button.active {
  color: var(--button-active-color); /* Ahora usará el nuevo color */
}

.project-tab-button::after {
  content: '';
  position: absolute;
  width: 0;
  height: 3px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--button-active-color); /* La línea de abajo también usará el nuevo color */
  transition: width 0.3s ease;
}


/* Botón de cambio de tema */
.theme-toggle-button {
  background: none;
  border: none;
  font-size: 1.8em; /* Tamaño del icono */
  cursor: pointer;
  color: var(--text-color); /* Color del icono, se adaptará al tema */
 
  margin-left: 20px; /* Espacio para separarlo de la navegación */
  outline: none; /* Quita el contorno al hacer clic */
}

.theme-toggle-button:hover {
  color: var(--accent-color); /* Resaltar al pasar el mouse */
  transform: scale(1.1);
}

/* Ajustes específicos para el modo oscuro en elementos de imagen/galería si necesitas */
.bw-photo-gallery h2 {
    color: var(--text-color); /* El título de las fotos en B&N */
}

.personal-gallery h2 {
    color: var(--accent-color); /* El título de las fotos personales */
}

p.gallery-subtitle {
  color: var(--text-color);
}

.image-gallery img {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada en oscuro */
}

.grayscale-photo {
  filter: grayscale(100%); /* Mantener el filtro de blanco y negro */
}

/* Puedes ajustar más colores si es necesario, por ejemplo en los detalles de educación */
.language-skills h4 {
  color: var(--text-color);
}

.language-item span, .level-text {
  color: var(--text-color);
}

/* Color de fondo para los inputs y textareas en el formulario de contacto */
.contact-form input,
.contact-form textarea {
  background-color: var(--card-bg); /* O un color ligeramente diferente si prefieres */
  color: var(--text-color);
  border: 1px solid var(--text-color); /* Borde que se adapte al tema */
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: var(--text-color); /* Color del placeholder */
  opacity: 0.7; /* Para que no sea tan fuerte */
}
.contact-content{
  padding-top:0px;
}

.submit-button {
  background-color: var(--accent-color);
  color: var(--text-light-on-dark);/* Blanco o casi blanco para que resalte */
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: var(--secondary-accent-color);
}

 /* Hover del botón en MODO OSCURO (¡Aquí está el cambio clave!) */
 :global(body.dark-mode) .submit-button:hover {
      background-color: var(--button-hover-dark-mode); /* Usa tu nueva variable para el hover en dark mode */
      transform: translateY(-3px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4); /* Sombra más oscura para dark mode */
  }

  /* Active (cuando se hace click/touch) del botón en MODO OSCURO */
  :global(body.dark-mode) .submit-button:active {
      background-color: var(--button-hover-dark-mode); /* Mismo color que el hover, o ligeramente más oscuro */
      transform: translateY(0); /* Para el efecto de "presionado" */
      box-shadow: 0 0 0 3px rgba(var(--button-hover-dark-mode-rgb), 0.5); /* Sombra de foco */
  }
.contact-info-container p {
  color: var(--text-color);
}


.steffy-tag {
  color: var(--accent-color);
}


body.dark-mode .code-project-card h3 {
    color: #f0f0f0; /* Blanco claro */
  }

  /* Hover para el título del proyecto de código */
body.dark-mode .code-project-card h3:hover {
    color: var(--secondary-accent-color); /* Naranja al hacer hover en el título */
    cursor: pointer;
  }

  .code-project-card p {
    font-size: 0.95rem;
    color: var(--hero-description-color); /* Debería ser un gris claro en modo oscuro */
    margin-bottom: 15px;
    flex-grow: 1;
  }
</style>
