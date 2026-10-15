# Design

## Context

Ver `proposal.md` para la motivación. El proyecto contiene únicamente Astro, `index.astro`, un layout básico, el componente Welcome y los recursos iniciales. No hay framework de UI, backend, pruebas ni SVG de la marca. OpenSpec usa el esquema `spec-driven` sin reglas adicionales. La referencia es `/Users/davidmariolc/Desktop/HT9ZLF1W4AA9uVo.jpeg`; sus cuatro paneles representan secciones sucesivas de una misma página.

Este diseño es necesario porque la composición responsive, la construcción de escenas vectoriales y el control compartido de movimiento requieren decisiones coordinadas antes de implementar. Los contratos observables están en `specs/landing-page/spec.md` y `specs/animated-illustrations/spec.md`.

## Goals / Non-Goals

**Goals:**
- Separar estructura, contenido y escenas para poder ajustar la fidelidad visual sin duplicar lógica.
- Entregar HTML útil antes de ejecutar JavaScript y reservar dimensiones para evitar saltos de contenido.
- Mantener un solo estado de movimiento que combine visibilidad, preferencia del sistema y pausa del usuario.

**Non-Goals:**
- Motor 3D, canvas, video o imágenes rasterizadas para simular las ilustraciones.
- Pixel-perfect de los cuatro paneles como composición conjunta; el objetivo es reproducir cada sección dentro de una página continua.
- Nuevas rutas de producto o integraciones comerciales para rellenar enlaces de la maqueta.

## Decisions

### 1. Componentes Astro y mejora progresiva

`src/pages/index.astro` ensamblará Header, Hero, Features, Pricing, GetStarted y Footer desde `src/components/landing/`. Las escenas vivirán en `src/components/illustrations/`. El layout proporcionará metadatos, idioma y estilos base; `src/styles/global.css` contendrá tokens y estructura compartida, con estilos locales para cada sección. Datos tipados de planes, enlaces y contenido se centralizarán en `src/data/landing.ts`.

Usar scripts nativos de Astro para menú, facturación y movimiento. Alternativa considerada: React e hidratación de tarjetas; no aporta ventajas para estas interacciones pequeñas y añade runtime. No añadir dependencias de UI o animación.

### 2. Sistema visual editorial

Valores iniciales orientativos: fondo `#faf8f5`, texto `#20201e`, gris secundario `#73736e`, línea `#dedbd5`, naranja `#f45b16`, negro `#080808`. Comprobar contraste de etiquetas pequeñas y oscurecer el naranja de texto cuando sea necesario. Bordes de 1 px, esquinas rectas, sombras únicamente bajo plataformas isométricas.

Títulos con Georgia y alternativas serif del sistema; cuerpo con una pila sans serif del sistema; etiquetas con monospace. Usar `clamp()` para títulos, aproximadamente 40-72 px en hero, y limitar el ancho de sus líneas. No depender de descargas externas de fuentes. Alternativa: cargar una familia editorial externa; se pospone al no existir una fuente original identificada y para evitar una dependencia de red.

Contenedor máximo aproximado de 1280 px; gutters de 20 px en móvil, 32 px en tablet y 48-64 px en escritorio. Espaciado vertical fluido de 64-120 px por sección. Mantener las guías verticales y la alineación entre header, tarjetas y footer. El h1 y el CTA permanecen como HTML por encima de la escena.

### 3. Adaptación por contenido

| Ancho | Composición |
| --- | --- |
| 320-767 px | Header compacto con menú; hero centrado; funcionalidades y planes apilados; CTA con texto seguido de escena; footer en una columna y, donde quepa, dos |
| 768-1023 px | Menú compacto; tres columnas de tarjetas si caben sus textos; footer en dos columnas; escenas con menos periferia |
| Desde 1024 px | Navegación completa; tres funcionalidades y tres planes; CTA en dos columnas; footer en cuatro columnas |

Las columnas de tablet deben pasar a una sola columna si las medidas reales del contenido lo requieren, sin reducir fuentes para forzar encaje. Reservar proporción de ilustraciones mediante contenedores fluidos y `viewBox`; no usar anchos fijos que creen overflow. En hero móvil, ocultar grupos periféricos decorativos y ajustar el encuadre conservando el cubo y la plataforma completos. Alternativa: encoger toda la escena de escritorio; haría ilegible el motivo principal.

### 4. SVG originales por grupos

Construir un vocabulario de cubos, bases, aristas, conexiones punteadas y sombras planas. Reutilizar primitivas con componentes o símbolos y prefijos únicos para identificadores de cada instancia. Separar grupos estáticos y animados. Las escenas son decorativas y tendrán `aria-hidden="true"`; los beneficios se expresan en texto HTML.

Hero: máquina central transparente con cubo naranja, nodos laterales y pequeños módulos de almacenamiento/monitor. Funcionalidades: recinto independiente con nodos, llave y máquina conectada, servidor de capas con nodos. CTA: grúa, cubo suspendido y plataforma de destino. Alternativa: usar el JPEG o generar un bitmap; no permitiría movimiento independiente ni conservaría la naturaleza vectorial solicitada.

### 5. Coreografía contenida y control de movimiento

Animar `transform` y `opacity` para desplazamientos y pulsos; reservar `stroke-dashoffset` para señales y trazado de aristas. Evitar blur animado y filtros pesados. Tiempos iniciales ajustables durante revisión visual:

| Escena | Secuencia |
| --- | --- |
| Hero | Flotación vertical de 4-6 px en 5-6 s; señales de 3-4 s con desfases entre nodos |
| Aislamiento | Aristas se dibujan al entrar en 700-1000 ms; cubo pulsa suavemente en 4-5 s |
| Claves | Llave se desplaza 3-4 px y aparece una señal hacia su máquina en un ciclo de 5 s |
| Almacenamiento | Capas se asientan con desfases de 100-150 ms; señal de escritura en un ciclo de 5-6 s |
| Despliegue | Cubo desciende 18-24 unidades SVG, se asienta y vuelve suavemente en un ciclo de 7-8 s |

Estado compartido: `running = visible && documentVisible && !reducedMotion && !userPaused`. `IntersectionObserver`, `visibilitychange` y `matchMedia` actualizarán clases/atributos que controlan `animation-play-state`; no usar un bucle de JavaScript por frame. El control "Pause animations" / "Resume animations" estará junto al hero, será discreto y tendrá área táctil de 44 px. La preferencia de pausa se mantiene en memoria durante la visita.

Con movimiento reducido o sin JavaScript, la composición base debe estar completa: no dejar capas transparentes ni dibujos a medio trazar. Al cambiar a movimiento reducido se eliminan las animaciones y se restaura la pose estática. Alternativa: animación de scroll continua; añade complejidad y ata la comprensión del dibujo al desplazamiento.

### 6. Interacciones locales y disponibilidad

Menú móvil con botón que informa `aria-expanded` y `aria-controls`, Escape, restauración de foco y cierre al navegar; es un desplegable dentro del flujo, no un diálogo modal. Sin JavaScript, mostrar los enlaces de sección y ocultar el botón de mejora progresiva.

Selector de facturación mediante botones con `aria-pressed` y región de actualización accesible; solo aparece cuando el script está listo. Mensual inicial: 25/49/99 USD. Anual: precio mensual por diez, total anual y equivalente dividido entre doce con dos decimales. Mantener los recursos de la referencia por plan en los datos, sin mutarlos al cambiar periodo.

Los CTA de lanzamiento apuntan a `#pricing` por defecto. Los enlaces internos usan identificadores reales. Log in, páginas no creadas, waitlist, enlaces sociales y suscripción sin destino se representan como controles no disponibles con explicación breve y accesible, nunca `href="#"` o confirmaciones simuladas. El bloque de newsletter conserva su composición visual pero no envía datos. Los destinos se podrán configurar en los datos sin cambiar componentes. Alternativa: inventar URLs externas o servicios; ampliaría el alcance y podría producir acciones engañosas.

### 7. Verificación de aceptación

Ejecutar `npm run build`. Para revisión en navegador, iniciar con `astro dev --background` usando el ejecutable local y administrar el servidor con los comandos indicados en `AGENTS.md`. Revisar a 320, 390, 768, 1024, 1440 y 1920 px; comparar capturas de las secciones de escritorio contra los paneles de referencia y revisar móviles por composición, no por encogimiento.

Validar menú con teclado, foco, selector mensual/anual, enlaces internos, disponibilidad de acciones, consola, contenido sin JavaScript, pausa voluntaria, pestaña oculta, escenas fuera de viewport y cambio dinámico de movimiento reducido. No añadir una suite que duplique estilos; conservar evidencia de la revisión y usar pruebas pequeñas solo si el comportamiento detectado lo necesita.

## Risks / Trade-offs

- [No hay vectores originales] → Reconstruir a partir de la referencia y priorizar proporciones, detalle central, trazo y acento; no prometer equivalencia geométrica exacta.
- [La animación original no está documentada] → Las secuencias anteriores son decisiones propuestas y se ajustan en revisión visual, preservando sus mensajes.
- [Detalle excesivo en móvil] → Simplificar grupos periféricos manteniendo los elementos que explican cada beneficio.
- [Cinco escenas activas pueden consumir recursos] → Pausar por visibilidad y pestaña, limitar nodos y evitar filtros complejos.
- [Contenido comercial de maqueta] → Centralizar precios y textos; no integrar cobros ni afirmar que se ha creado una cuenta o desplegado un agente.
- [Fuentes del sistema varían entre plataformas] → Ajustar tamaños y anchos con fallback; evaluar fidelidad sobre la jerarquía y el ritmo visual.

## Migration Plan

No hay migración de datos. Implementar recursos y componentes, ensamblar `/`, retirar su uso de Welcome y actualizar metadatos/favicon. Verificar el build y la página local antes de considerar el cambio terminado. No publicar en este cambio. Para revertir, restaurar la página, el layout y el favicon anteriores y retirar únicamente los recursos añadidos para la landing.
