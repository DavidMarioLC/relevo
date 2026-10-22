# Design

## Context

Ver `proposal.md` para la motivación. `Entrance.astro` coordina exclusivamente la entrada inicial mediante `data-entrance` y `src/scripts/entrance.ts`. `src/scripts/motion.ts` observa las escenas y gobierna sus bucles, visibilidad, movimiento reducido y pausa manual. Las secciones inferiores son componentes Astro estáticos sin entradas propias. `global.css` ya define `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` y la presentación con movimiento reducido. No se encontró una suite de pruebas del proyecto fuera de dependencias.

El cambio afecta cuatro componentes y un ciclo de vida compartido, por lo que requiere este diseño. Solo añade requisitos a `landing-page`; no cambia los contratos de geometría o reproducción de las ilustraciones.

## Goals / Non-Goals

**Goals:**
- Un coordinador pequeño y compartido que active cada grupo según su visibilidad real.
- Contenido estático visible por defecto, incluso si el módulo llega tarde o falla.
- Separación entre entrada de contenido, entrada inicial y reproducción ambiental.
- Mantener fijas las líneas, fondos y dimensiones de las retículas mientras entra su contenido.

**Non-Goals:**
- Sustituir el coordinador del hero o centralizar toda la animación de la landing en un nuevo sistema.
- Añadir un framework cliente, dependencia, estado persistido o bucle de eventos de scroll por frame.
- Convertir el control de pausa de bucles continuos en un control de entradas breves.

## Decisions

### 1. Coordinador compartido con observación de grupos

Añadir `src/scripts/scroll-reveal.ts` e integrarlo una vez mediante un componente `ScrollReveal.astro` desde el layout. Usar atributos `data-reveal` y variantes explícitas de grupo; mantener separados los atributos y eventos de `Entrance.astro`.

Usar `IntersectionObserver` con viewport normal y umbral cero para detectar la llegada de cada grupo. Evitar umbrales porcentuales de una sección completa: una tarjeta alta debe poder entrar aunque nunca quepa entera. Clasificar las posiciones al inicializar antes de observar: los grupos visibles o ya superados pasan directamente a final; solo los inferiores quedan pendientes. Recalcular esa clasificación al volver a la pestaña o cambiar el ancho.

Alternativa: reutilizar el observador de escenas. Se descarta porque las escenas reanudan bucles al volver y los contenidos solo entran una vez; compartir sus estados añadiría acoplamiento innecesario.

### 2. Mejora progresiva sin ocultación previa

El HTML y CSS base muestran todos los grupos en su estado final. El coordinador crea entradas finitas con `Element.animate()` únicamente cuando un grupo pendiente llega a pantalla; el estado de espera no aplica opacidad cero. Usar solo opacidad y, cuando corresponda, traslación vertical. No usar estilos de relleno persistentes: al terminar o cancelar, el estilo base vuelve a regir.

Marcar el grupo como presentado antes de crear la animación y dejar de observarlo al finalizar. Si la creación falla o faltan APIs, conservar la presentación estática. Proteger cada entrada con una salida a estado final al cumplirse su duración más el desfase y 200 ms de margen; esta salida elimina efectos activos aunque falle la coordinación, sin cortar las entradas largas. Una inicialización tardía no oculta contenido que la persona ya estaba leyendo.

Alternativa: ocultar globalmente los grupos pendientes con CSS. Se descarta porque un fallo del coordinador podría dejar contenido inaccesible durante el recorrido. La biblioteca `motion` ya figura como dependencia, pero estas entradas no requieren importarla.

### 3. Grupos y valores de movimiento

Usar la curva `--ease-out` existente. Añadir 140 ms de espera inicial a todos los grupos para que la entrada empiece cuando el scroll ya los haya desplazado hacia dentro de la pantalla, manteniendo el disparador en el borde para evitar ocultar contenido que ya se estaba leyendo. Los desfases de la tabla se suman a esa espera:

| Grupo | Duración | Traslación | Desfase |
| --- | --- | --- | --- |
| Encabezados de Features y Pricing | 1800 ms | 12 px | 0 ms |
| Selector de facturación visible | 1600 ms | 8 px | 40 ms respecto al encabezado si coinciden |
| Contenido de tarjetas de Features y Pricing | 1800 ms | 12 px | 70 ms entre tarjetas de la misma fila visible |
| Texto y botón de Get started | 1800 ms | 12 px | 0 ms |
| Ilustración de Get started | 2000 ms | 0 px | 70 ms si coincide con el texto |
| Contenido de grupos del footer | 1600 ms | 8 px | 40 ms entre grupos de la misma fila visible |
| Franja inferior del footer | 1600 ms | 8 px | 0 ms |

Los encabezados incluyen eyebrow y título como una unidad; en Pricing el texto explicativo acompaña al encabezado. El texto, título y botón del CTA forman una unidad. La nota de pago por hora usa su propio grupo al llegar a pantalla. No dividir títulos de las secciones inferiores por palabras ni animar recursos de precios individualmente; el word reveal solicitado posteriormente se limita al h1 del hero.

Aplicar efectos sobre envoltorios internos donde una tarjeta o celda es dueña de bordes o fondos; mantener los contenedores de retícula fijos. Conservar las reglas de hijos directos y `nth-child` del footer. El grupo de la ilustración queda fuera del SVG: las piezas internas mantienen sus bucles.

Calcular desfases por fila y por candidatos que llegan juntos al viewport, respetando el orden DOM. Nunca usar el índice absoluto de toda la lista. A menos de 768 px, las tarjetas apiladas no tienen desfase y se activan individualmente; el footer puede seguir escalonando celdas de una misma fila de dos columnas. Si un grupo llega sin su encabezado en pantalla, no espera una entrada ya superada.

### 4. Ciclo de vida e interacción

Cada grupo sigue `pendiente -> entrando -> final`, o pasa de pendiente directamente a final; nunca vuelve hacia atrás. Las animaciones activas mantienen una referencia para poder cancelar sus efectos y recuperar el estilo base.

- Si se hace scroll rápido y un grupo queda por encima del viewport, adoptarlo en estado final. Si un grupo sale durante su entrada, terminarla.
- Al recibir `focusin`, finalizar el grupo que contiene el control. Ante un enlace interno, resolver el destino y presentar los grupos visibles de la sección al llegar, incluso cuando el hash no cambia; atender también `hashchange`.
- Al ocultarse la pestaña, finalizar las entradas activas. Al volver, dejar completos los grupos ya visibles o superados y observar únicamente los inferiores pendientes.
- Con movimiento reducido al inicio, no activar entradas durante esa carga. Si se activa después, finalizar todas las entradas y desconectar la observación; desactivarlo no reinicia el sistema.
- En restauración del historial (`back_forward` o `pageshow.persisted`), presentar todos los grupos completos. Limpiar observador, efectos, temporizadores y listeners en la salida del documento.
- El estado de pausa manual de `motion.ts` sigue gobernando los bucles ambientales. Las entradas breves no leen ni modifican `userPaused` y no esperan eventos del hero.

Alternativa: repetir entradas al volver a una sección o vincular el progreso al scroll. Se descarta porque distrae al comparar planes y rompe el criterio de una sola presentación.

## Risks / Trade-offs

- Desfase que retrase una tarjeta móvil -> calcularlo por fila visible y usar cero en tarjetas apiladas.
- Flash por inicialización tardía -> no ocultar contenido previamente visible y omitir su entrada; se prioriza lectura estable sobre reproducir cada efecto.
- Conflictos con los bucles SVG o los botones -> animar envoltorios, sin escribir transforms de piezas internas ni controles.
- Bordes que se desplacen o cambien sus selectores -> mantener fijos los dueños de fondos y bordes y conservar la estructura exterior de la retícula.
- Destino interno o foco momentáneamente transparente -> finalizar el grupo antes de continuar la interacción y verificar enlaces al mismo hash.
- Cambio de ancho durante una entrada -> finalizar entradas activas y recalcular candidatos pendientes sin repetir grupos ya presentados.
- Validación estática insuficiente para evaluar movimiento -> revisión real en navegador, incluyendo fallos de inicialización, además de compilación.

## Migration Plan

Implementar como mejora progresiva de la ruta existente, sin cambios de datos ni configuración de servicios. Verificar los escenarios de la especificación antes de integrar. Para revertir, retirar la integración del coordinador y los atributos/envoltorios de entrada; el contenido conserva su presentación estática. No se requiere despliegue en esta fase de planificación.

## Initial Verification

Implementación verificada localmente en Chrome mediante Playwright, sin añadir dependencias ni archivos de pruebas al proyecto.

- Recorrido completo en 320, 390, 768, 1024, 1440 y 1920 px: 24 grupos presentados una vez por recorrido, sin repetición al volver y sin desplazamiento horizontal. Tarjetas apiladas con desfase cero; footer con dos columnas hasta 1023 px y cuatro desde 1024 px.
- Captura de opciones reales de las animaciones: duraciones de 400–500 ms y la curva `--ease-out` existente. En Features, cuando encabezado y tarjetas llegan juntos, los desfases fueron 0 ms para el encabezado y 70/140/210 ms para las tarjetas. La ilustración del CTA usa únicamente opacidad.
- Comparación de 21 rectángulos de secciones, tarjetas y celdas antes y después de retirar las nuevas envolturas en el navegador, a 390, 768 y 1440 px: diferencia máxima de 0 px. Inspección visual de las capturas completas de escritorio y de precios/footer móvil; los bordes exteriores no se transforman durante las entradas.
- Tarjeta de 1300 px de altura en viewport de 650 px: inicia la entrada sin exigir un porcentaje de visibilidad. Saltos rápidos, salida durante la entrada y cambio de ancho dejan el contenido completo sin repetición posterior.
- Movimiento reducido inicial y cambio de preferencia en plena entrada: presentación estática, cancelación inmediata y ninguna nueva entrada al desactivar la preferencia durante esa carga.
- Foco y activación con teclado durante la entrada del selector: presentación inmediata y controles operativos. Facturación anual muestra $20.83/$40.83/$82.50 y mensual restaura $25/$49/$99. Enlaces hacia precios, incluido el mismo hash, llegan sin entradas pendientes del destino visible.
- Sin JavaScript: grupos visibles, precios mensuales, navegación y enlace a precios disponibles. Módulo de scroll bloqueado o retrasado 1400 ms: contenido visible; los grupos que ya están en pantalla al inicializar no se ocultan.
- Fallo simulado de `Element.animate()` y animación detenida artificialmente: contenido estático y liberación del efecto mediante el límite de 1000 ms, respectivamente, sin excepciones no controladas.
- Salida del hero durante su estado `running`, menú móvil con Escape/enlace de sección y pausa/reanudación de escenas: mantienen su comportamiento y el hero no repite la entrada. Volver desde historial deja los grupos completos.
- Se verificó la finalización por `visibilitychange` con un estado oculto simulado: cero entradas activas y escenas pausadas, conservando la pausa manual al volver. Limitación del entorno: Chrome automatizado mantuvo `document.hidden` en falso al cambiar de pestaña, incluso en modo con ventana; esta comprobación valida el manejador del evento, no una transición nativa de visibilidad.
- `npm run build`: correcto. `openspec validate add-section-scroll-animations --strict`: correcto. `git diff --check`: correcto.

Las capturas y los programas de comprobación se guardaron temporalmente en `/private/tmp/jurniti-*`; no forman parte del código entregado.

## Duration Adjustment Verification

Tras la revisión del usuario, las entradas pasan a 1800 ms para encabezados, tarjetas y texto del CTA, 2000 ms para la ilustración y 1600 ms para los grupos discretos. Se suman 140 ms de espera inicial para que el contenido avance hacia dentro del viewport antes de empezar a aparecer. La salida de seguridad se calcula como duración + desfase + 200 ms.

Comprobado en Chrome a 390 y 1440 px: el encabezado continúa animándose a los 700 ms, con opacidad aproximada de 0.87, y supera el anterior límite de 1000 ms sin ser cortado; después termina con opacidad 1 y sin efectos activos. El foco y movimiento reducido siguen finalizando inmediatamente. `npm run build`, validación estricta de OpenSpec y `git diff --check` correctos.

## Hero Word Reveal

Por petición posterior del usuario, el h1 pasa de una entrada unitaria a seis palabras con máscaras independientes. `Hero.astro` genera los spans desde el servidor, conserva los espacios y el salto de escritorio antes de «you» y expone la frase completa como nombre accesible del h1; las palabras visuales son decorativas para tecnologías de asistencia.

La animación CSS `entrance-word` dura 700 ms por palabra, con la curva `--ease-out`, 120 ms de inicio y 80 ms de separación. Cada palabra sube desde `translateY(110%)` con aparición por opacidad. Las máscaras reservan margen para descendentes tipográficos sin cambiar el alto del título. La última palabra termina a los 1220 ms; el resto de los grupos conserva sus tiempos anteriores.

`entrance.ts` recoge también las animaciones de palabras antes de emitir la finalización. `--entrance-total` se actualiza a 1220 para que la salida de seguridad y el inicio de actividad ambiental incluyan la última palabra. Sin JavaScript, con movimiento reducido o cuando la entrada se cancela, todas las palabras adoptan su presentación final mediante los mismos estados existentes del documento.

Verificado en Chrome: seis animaciones `entrance-word` de 700 ms, con desfases 120/200/280/360/440/520 ms; el h1 no recibe la anterior traslación de bloque. A los 850 ms el documento sigue en entrada y la escena permanece detenida hasta terminar la última palabra. El árbol accesible expone un único h1 con la frase completa. Comparada la geometría contra el marcado anterior en 320, 390, 768 y 1440 px, la diferencia máxima es 0 px, sin desbordamiento; se revisaron capturas de escritorio y móvil para comprobar descendentes y saltos de línea.

Sin JavaScript, con movimiento reducido inicial o activado durante la entrada, al desplazar la página, al enfocar el CTA y al bloquear el coordinador: el título queda completo y visible sin repetir la animación. Compilación, validación estricta de OpenSpec y revisión de espacios correctas. Las comprobaciones y capturas temporales están en `/private/tmp/jurniti-word-*`.
