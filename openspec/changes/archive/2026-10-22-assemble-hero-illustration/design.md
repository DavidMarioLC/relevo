# Design

## Context

Ver proposal.md para la motivación. HeroIllustration.astro contiene un único elemento image de 1732 × 728 y actividad SVG superpuesta. No existen piezas independientes dentro del PNG. Los antiguos HeroAgent, HeroBlock y HeroLabel son vectoriales pero no forman parte de ese render y no equivalen por sí solos al dibujo de referencia.

La aclaración del usuario sustituye la decisión híbrida anterior: tanto la construcción como el estado final deben ser geometría vectorial real. También descarta el primer planteamiento de este cambio, basado en máscaras sobre el PNG. La referencia rasterizada sirve para comparar el dibujo, nunca como contenido de la ilustración ni como respaldo estático.

Entrance.astro y entrance.ts gobiernan una entrada de texto/nav de 1220 ms y un fade global de la ilustración. La entrada textual termina al abandonar la parte superior; reutilizar ese evento para cancelar la construcción haría que esta acabara antes de verla en móvil. motion.ts gobierna bucles, visibilidad y pausa manual; Scene.astro pausa por defecto todas las animaciones CSS descendientes hasta habilitar data-running.

## Goals / Non-Goals

**Goals:**
- Geometría SVG editable y animable por pieza, con el mismo dibujo en estados animados y estáticos.
- Reproducir composición, proporciones, detalle, etiquetas, paleta y profundidad, conservando los criterios de fidelidad vigentes.
- Construcción finita en posición, independiente del título y del bucle ambiental.
- Presentación completa por defecto y recuperación sin piezas ocultas, incluyendo el encuadre central móvil.

**Non-Goals:**
- Incluir PNG, imágenes base64, texturas rasterizadas o canvas en el SVG; recortar una imagen tampoco produce piezas vectoriales.
- Dar por válido el redibujo antiguo solo porque sus componentes ya existen.
- Mover objetos para ensamblarlos, hacer flotar el cubo, usar escala o desenfoque, o repetir la construcción en bucle.
- Cambiar las cuatro escenas restantes, entradas inferiores o tiempos del word reveal.

## Decisions

### 1. SVG inline con geometría propia

Reemplazar el elemento image de HeroIllustration.astro por grupos y primitivas SVG nativas: path, polygon, polyline, line, ellipse y circle. Conservar las coordenadas 1732 × 728 y la reserva de espacio de Scene.astro. No usar recursos rasterizados mediante elementos, CSS, filtros ni patrones.

Definir un inventario tipado específico del hero en src/data/hero-assembly.ts, con identificador estable de pieza, familia, orden visual y tiempos. Mantener la geometría legible en componentes o datos específicos y separada de su cronología. Identificar nodos animables con atributos propios para no depender del número u orden accidental de hijos del SVG.

El inventario debe cubrir:

- Plataforma y sombras centrales, aristas posteriores y frontales del recinto, tres caras del cubo, contorno superior, etiqueta, llave, salientes e indicadores.
- Ocho agentes por lado: sombra, capas de base, recinto, caras del cubo e indicador de cada uno; tres cubos naranjas y cinco claros por grupo.
- Tres placas rectangulares proyectadas de memoria con espesores, huecos, uniones y conectores.
- Carcasa, pantalla, gráfica y soporte del monitor; pedestal, varilla, collar, anillo y orificio del relay.
- Recorridos punteados y puntos de unión, más las siete etiquetas en sus planos correspondientes.

Evaluar HeroAgent, HeroBlock, HeroLabel y los contornos de hero-labels.json contra la referencia antes de reutilizarlos. Corregir o reemplazar lo que no coincida. Las etiquetas pueden usar contornos vectoriales ajustando proyección, espaciado y anclajes; no convertirlas en texturas ni depender de una fuente externa tardía. La escena conserva semántica decorativa.

Alternativas descartadas: PNG con máscaras o sprites no produce piezas vectoriales; un SVG que contiene image mantiene el problema; reutilizar el antiguo redibujo sin revisión arrastra sus diferencias de geometría y detalle. SVG inline permite animar y revisar cada parte del dibujo real.

### 2. Capas y construcción de las propias piezas

El orden de pintura expresa profundidad: sombras y plataforma, geometría posterior, caras opacas, detalles y aristas frontales. Dividir objetos que lo necesiten en grupos posteriores y frontales; no agrupar todas las aristas del recinto en una capa que atraviese las caras del cubo. Recortar u omitir segmentos ocultos de conexiones según la geometría opaca.

Animar trazos continuos con stroke-dashoffset y longitudes normalizadas o medidas una sola vez al preparar. Animar opacidad de caras, sombras, indicadores y etiquetas como piezas independientes. Si contorno y relleno necesitan tiempos distintos, emitir nodos distintos sin duplicar el borde final. Conservar el patrón punteado de las conexiones: su revelado puede usar recorte vectorial local sobre sus propios trazos, sin sustituirlo por una línea continua.

No animar coordenadas ni transformaciones geométricas; las transformaciones estáticas de posicionamiento y proyección sí forman parte del dibujo. No sustituir la secuencia por un fade global. Al terminar, el SVG coincide con su estado estático completo, sin añadir de golpe geometría omitida en la cronología.

### 3. Cronología solapada de 2400 ms

Usar --ease-out para superficies y detalles y progreso lineal para trazos. La construcción procede de aristas que se trazan y superficies y detalles que aparecen en su posición.

| Tiempo desde el inicio | Contenido |
| --- | --- |
| 0–420 ms | Plataforma central y sombras |
| 180–900 ms | Aristas y recinto central |
| 600–1250 ms | Tres caras y contorno del cubo central |
| 600–1900 ms | Agentes laterales y sus componentes en onda |
| 850–1850 ms | Placas de memoria, monitor, relay y llave |
| 1700–2250 ms | Conexiones y puntos de unión |
| 2050–2400 ms | Etiquetas e indicadores finales |

Los ocho pares de agentes, uno por lado, empiezan con 80 ms de separación; dentro de cada agente se ordenan base, recinto y cubo. Memoria construye tres placas sucesivamente; monitor completa carcasa antes de pantalla/gráfica; relay, pedestal antes de varilla/anillo. Las etiquetas aparecen por rótulo, sin efecto por carácter.

En móvil conservar la ventana de 680 unidades desde x=520. El grupo central inicia sin esperar a los laterales recortados; su construcción sigue siendo perceptible dentro de los 2400 ms. No cambiar proporciones ni reserva de altura.

### 4. Estados separados y activación visible

Añadir src/scripts/hero-assembly.ts con estados boot -> waiting -> running -> complete y salida directa a complete desde cualquier estado. Una sola ejecución, sin transición inversa.

El HTML generado en servidor contiene todas las piezas visibles por defecto. En Entrance.astro, un opt-in temprano independiente del estado textual activa la presentación inicial de construcción antes del primer paint solo para cargas normales con movimiento permitido. Un watchdog de inicialización de 1500 ms libera el SVG completo y bloquea el inicio tardío si el coordinador no confirma preparación. Sin opt-in no se ocultan piezas. Instalar listeners, validar nodos y preparar la salida de seguridad antes de confirmar waiting.

La geometría inline llega con el documento: no hay espera de carga o decodificación de imagen ni plazo de 3000 ms para un recurso rasterizado. Validar nodos y longitudes una vez; si falta alguno o la preparación falla, omitir la construcción y mostrar el SVG completo. Si el módulo llega después de haberse mostrado el dibujo, no volver a ocultarlo.

Waiting no consume tiempo de animación. Usar IntersectionObserver y comprobar intersectionRect.height >= min(96px, 0.2 * min(alto de escena, alto de viewport)), recalculando al cambiar de tamaño. No exigir un porcentaje de una escena que nunca cabe entera ni usar un listener de scroll por frame.

Separar .hero-art del atributo data-entrance="art" y retirar su fade genérico. Conservar la entrada textual de 1220 ms, máscaras por palabra e interrupciones. Un scroll que termina el texto puede acercar la ilustración e iniciar su construcción; solo perder visibilidad de la propia ilustración finaliza una construcción activa.

Carga directa con hash inferior, posición restaurada y navegación desde historial omiten la construcción. Regresar al SVG completo no vuelve a prepararlo.

### 5. Reproducción y salida segura

Usar WAAPI para efectos finitos sobre trazos, superficies y detalles vectoriales. Evita el bloqueo circular de las reglas .scene * de animación CSS: siguen gobernando los bucles ambientales, que aún no pueden correr durante la construcción. No añadir biblioteca ni alterar primitivas de otras escenas. Separar nodos de construcción y actividad para evitar que ambos controlen simultáneamente la misma propiedad.

motion.ts debe exigir texto/nav finalizados u omitidos y construcción completa u omitida. La ausencia de opt-in cuenta como omisión. Notificar la finalización mediante un evento propio y actualizar actividad sin tocar la pausa voluntaria; las demás escenas mantienen sus condiciones.

Comunicar pausa manual al coordinador. Solicitar pausa, activar movimiento reducido, ocultar la pestaña o salir del viewport durante running ejecuta una finalización idempotente: fijar primero el estado completo y retirar las reglas iniciales de ocultación; después cancelar efectos y limpiar estilos temporales. Pausar mientras espera también omite la construcción. Reanudar solo permite los bucles ambientales cuando corresponda.

Watchdog de 2700 ms desde running, además de resolver/rechazar los efectos. Cambiar el ancho durante la construcción la finaliza sin reiniciarla. Limpiar observador, listeners, temporizadores y efectos al salir del documento; preservar el estado final al recuperar BFCache. Ninguna salida cambia a un render rasterizado.

### 6. Aceptación visual y vectorial

Comparar el SVG completo pausado con la referencia a escala nativa y a 1160 px. Revisar vértices, siluetas, conexiones, profundidad, etiquetas, colores y detalles según los requisitos vigentes, con recortes del centro, ambos grupos laterales, memoria y equipo inferior. No exigir igualdad exacta de píxeles entre renderizadores; conservar las tolerancias geométricas y cromáticas especificadas. El hash del PNG no acredita el redibujo.

Inspeccionar DOM y solicitudes de recursos: no habrá mapas de bits mediante image, img, canvas, URL de datos, CSS, filtros o patrones, ni dependencia del PNG para presentar la escena. Ampliar al 200 % y 400 % para comprobar bordes vectoriales, etiquetas y detalles. Comparar el resultado animado con el mismo SVG cargado estáticamente: deben coincidir piezas, estilos y encuadre.

Inspeccionar frames a 0, 400, 900, 1500, 2100 y 2400 ms. Revisar cobertura, profundidad y avance perceptible por objeto, incluidos los 16 agentes. Un build correcto, una extensión SVG o un recuento de nodos no acreditan esta revisión.

Verificar 320, 390, 768, 1024, 1440 y 1920 px; módulos bloqueados o tardíos, error durante ejecución, pausa antes/durante, movimiento reducido inicial/en vivo, scroll de entrada/salida, foco temprano e historial. Comparar las otras cuatro escenas y entradas inferiores; comprobar menú, precios y word reveal. La secuencia finita deja de producir trabajo al completarse y no avanza fuera de pantalla.

## Risks / Trade-offs

- El redibujo pierde fidelidad -> revisar el SVG estático a escala nativa y corregir diferencias antes de animar; no aceptar componentes antiguos sin comparación.
- Aristas o conexiones atraviesan caras opacas -> separar grupos posteriores/frontales y revisar frames intermedios.
- El estado final revela piezas olvidadas -> inventario completo y comparación del último frame con el SVG estático.
- La animación se consume antes de verla -> espera sin progreso y umbral de altura realmente visible.
- Confundir cancelación textual y gráfica -> estados y eventos separados.
- Bloqueo por .scene * -> efectos WAAPI independientes del control CSS ambiental.
- Un fallo deja piezas ocultas -> geometría completa por defecto, opt-in acotado y finalización idempotente con watchdog.
- Coste de pintar muchos trazos -> geometría acotada sin filtros ni bucle JS por frame; medir en navegador.

## Migration Plan

Sin migración de datos, servicios ni nuevas dependencias. Implementar primero el SVG estático y su revisión visual, después cronología y coordinación con entrada y movimiento. El PNG puede permanecer como referencia en el repositorio, sin uso en el hero. Revertir solo la animación mantiene el SVG completo; revertir el cambio entero recuperaría el render anterior, que no satisface el nuevo contrato vectorial. Esta actualización de planificación no modifica código del sitio.

## Implementation evidence

### Static construction inventory

Baseline screenshots were captured before changing the render in .artifacts/hero-assembly/before-native.png, before-1440.png and before-390.png. The reference remains available at public/images/hero-reference.png only for comparison. The active development preview is available on ports 4322 and 4323.

HeroBlock's three-face construction and HeroAgent's dimensions can be reused after calibrating coordinates, rear/front layering and timing. HeroLabel's local glyph outlines preserve all seven projected labels and can be retained. The center, memory, monitor, relay, key, connection topology and shadows need explicit geometry; there is no reusable whole-scene vector in the current renderer. The inventory in src/data/hero-assembly.ts defines stable IDs, phases and the sixteen agent placements; render nodes carry individual construction metadata.

### Static SVG review

The native SVG contains 243 individually timed pieces, sixteen agents (six orange cubes), and all seven outlined labels. It contains no image, img, canvas or foreignObject element and requests no hero-reference resource. The SVG is saved for inspection at .artifacts/hero-assembly/vector.svg, with native, 1160px, 200% and 400% captures in the same directory. Native comparison crops cover center, agents and equipment. The cage/cube, memory and screen retain the measured reference anchors; the twelve left network junctions were measured from the source and mirrored for the right group. Front/rear cage layers are distinct; the key, monitor border, memory connectors and relay collar/hole are explicit geometry. The labels reuse the existing projected vector outlines; their measured bounds are recorded in static-review.json. The label ink and front cage contrast were adjusted after comparison.

All seventeen representative sRGB patches were compared after converting the source ICC profile: sixteen match exactly and the page background differs by one level per channel. These samples do not imply pixel identity between the raster reference and the native SVG. Results are in .artifacts/hero-assembly/colors.json.

### Initial motion review

Chromium verified 243 WAAPI effects during construction and zero remaining construction effects afterward, with all pieces visible. The environmental scene remains stopped while text or construction is pending and starts after both finish. Exact timeline samples at 0, 400, 900, 1500, 2100 and 2400 ms are captured as frame-*.png and recorded in motion-review.json. At 400 ms the cube is still hidden; at 900 ms the center and first agents are forming; at 1500 ms the equipment and remaining agents are forming; labels and connections complete later. Strokes use dash progress and solid geometry stays in place. Native opacity values are retained on completion. No per-frame scroll animation handler is used; the visibility observer uses a threshold derived from the visible-height requirement.

### Integration and failure recovery

The automated Chromium run in .artifacts/hero-assembly/integration.mjs passed 22 checks with no page errors; results are in integration.json. It covers a 390 × 420 viewport with construction still waiting after the text finishes, visible arrival by scroll, manual pause while waiting, pause persistence across preference changes, and interruptions while running (pause, reduced motion, tab visibility, resize and leaving the viewport). A deliberately stalled sequence is released by the 2700ms watchdog; injected effect failure, an aborted module and a module delayed beyond the 1500ms initialization deadline all leave the SVG visible without late reconstruction. Missing construction metadata and invalid timing were additionally injected and both safely skip construction.

Initial reduced motion, no JavaScript, direct lower hash, actual browser back navigation, persisted pageshow, early focus and a single accessible title were checked. The six widths 320, 390, 768, 1024, 1440 and 1920 retain every core module within the frame and have no horizontal overflow. Each has a saved responsive-*.png. The other four scenes' SVG markup matches the static integration baseline; their source files are unchanged. Mobile menu open/Escape close and monthly/yearly billing controls pass.

Tab visibility and the persisted BFCache pageshow handler were exercised by event simulation; browser back navigation was exercised normally. These results do not claim physical background-tab or guaranteed BFCache residency testing. All checks ran in local Chromium, without a physical mobile-device check.

### Complete-state comparison and runtime cleanup

The final verification also ran against http://localhost:4322/, the user's existing preview. Screenshots of the completed paused sequence, no-JavaScript render and initial reduced-motion render are byte-identical at the same viewport: final-animated.png, final-static.png and final-reduced.png. This compares the three presentations of the same SVG, not the vector redraw against the source raster.

During construction there are 243 finite effects and the four environmental effects are paused. After completion there are zero finite effects. After the shared pause settles, the environmental effects' current times remain unchanged across samples; the build coordinator clears its watchdog, disconnects its observer and aborts its listeners. No per-frame JS animation loop remains. Details are recorded in final-check.json. Six timeline captures and responsive renders were visually inspected for piece order, stable positions, foreground occlusion and the complete mobile composition.

Final commands: npm run build, openspec validate assemble-hero-illustration --strict and git diff --check all pass. No dependencies were added. The PNG remains a reference file and is absent from the rendered hero and its network requests.

The final label pass uses one existing vector contour per label rather than overlapping coverage layers, so the browser antialiases the outline once. This improves small-size lettering without adding a font or bitmap dependency. The updated bounds and zoom captures were rechecked in static-review.json; the animated/no-JavaScript/reduced-motion screenshot comparison was rerun successfully after this adjustment, followed by the production build and strict validation.
