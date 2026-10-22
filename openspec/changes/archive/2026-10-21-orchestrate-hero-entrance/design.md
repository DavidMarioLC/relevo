# Design

## Context

Ver `proposal.md` para la motivación. `Header.astro` y `Hero.astro` son componentes Astro estáticos. `src/scripts/motion.ts` coordina las escenas mediante visibilidad, preferencia de movimiento y pausa manual. La ilustración combina una imagen original dentro de un SVG y actividad vectorial; `Scene.astro` pausa todas las animaciones de sus descendientes. Ya existe `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` y una regla global que elimina animaciones con movimiento reducido.

Este diseño aplica porque la entrada atraviesa header, hero, arranque del documento y control compartido de escenas.

## Goals / Non-Goals

**Goals:** usar un único origen temporal, mantener el HTML estático útil y aislar la entrada de las animaciones internas y de las transformaciones de los botones al pulsarlos.

**Non-Goals:** añadir hidratación de componentes, una dependencia nueva, esperas de red como requisito de arranque o un sistema genérico de animaciones para toda la landing.

## Decisions

### 1. CSS para la animación y un coordinador pequeño para el ciclo de vida

Usar keyframes CSS de opacidad y transformación con retrasos relativos al mismo inicio. Un módulo de entrada administra los estados pendiente, reproduciendo y terminado; la transición a terminado es idempotente. La duración total y los retrasos quedan centralizados para ajustar la prueba visual. No hay necesidad de incorporar React ni una nueva librería; `motion` ya está instalado, pero esta secuencia fija no necesita sus APIs.

Alternativas: Motion o WAAPI permitirían control programático por elemento, a costa de más lógica para esta primera secuencia. Animaciones independientes disparadas por cada componente harían más difícil garantizar un origen temporal común.

### 2. Partitura inicial acordada

Todos los grupos usan la curva `--ease-out`, sin rebote. El desplazamiento indicado es el estado inicial respecto a la posición final; todos terminan con opacidad 1 y sin transformación.

| Grupo | Inicio | Duración | Estado inicial |
| --- | --- | --- | --- |
| Header completo | 0 ms | 320 ms | opacidad 0, Y = -6 px |
| Badge | 60 ms | 360 ms | opacidad 0, Y = 8 px |
| Título completo | 120 ms | 480 ms | opacidad 0, Y = 12 px |
| Descripción | 200 ms | 400 ms | opacidad 0, Y = 8 px |
| CTA y garantía juntos | 280 ms | 400 ms | opacidad 0, Y = 8 px |
| Ilustración completa | 180 ms | 600 ms | opacidad 0, sin transformación |

La entrada termina a los 780 ms. La fila de estado y el control de pausa quedan disponibles desde el principio, sin escalón adicional. Mantener el mismo ritmo en móvil y animar únicamente elementos visibles según sus breakpoints; abrir el menú no crea una segunda entrada.

Usar envoltorios mínimos para agrupar CTA y garantía y para animar la ilustración por fuera de `.scene`. Esto evita interferir con el estado pulsado del botón y con las reglas que pausan los descendientes de las escenas. El título conserva su estructura y sus saltos adaptables; no se divide en palabras o letras.

### 3. Mejora progresiva y arranque sin destellos

El HTML y CSS base representan siempre el estado final. Un arranque inline pequeño, antes del primer pintado, habilita el estado pendiente solo si JavaScript funciona, no hay movimiento reducido, la página está arriba y la pestaña está activa. Sin esa habilitación no se oculta contenido.

El coordinador inicia la secuencia cuando está disponible el DOM inicial; no espera `window.load`, recursos de secciones inferiores ni decodificación de la ilustración. Se conserva su espacio mediante la proporción existente. Una imagen lenta aparece cuando esté disponible sin volver a iniciar la secuencia ni bloquear el texto.

La fase pendiente debe tener salida automática al estado visible, con un límite de 1500 ms desde su habilitación y una salvaguarda CSS que no dependa del módulo de entrada. Si el coordinador llega después de ese límite, omite la animación. También debe existir un límite de recuperación para una ejecución que no comunique su final; el contenido no depende exclusivamente de `animationend` para quedar visible. Se verifica el bloqueo deliberado del módulo, además del caso sin JavaScript.

Al terminar, eliminar los estilos temporales para no retener transformaciones ni contextos de apilamiento en el header. La alternativa de ocultar por defecto y mostrar desde JavaScript se descarta porque puede dejar la página invisible; iniciar sobre contenido ya pintado puede provocar un destello y una desaparición.

### 4. Conectar el final con la actividad ambiental

El estado compartido de entrada empieza explícitamente pendiente cuando el arranque ha habilitado la secuencia; si no, se considera terminado. El cálculo de reproducción de `motion.ts` añade esa condición exclusivamente a la escena del hero. Así, su orden de inicialización respecto al coordinador no puede activar señales antes de tiempo.

Al completar, omitir o cancelar la entrada se comunica el estado terminado y se recalculan las condiciones existentes: visible, pestaña activa, movimiento permitido y ausencia de pausa manual. Las otras escenas siguen su lógica actual. La entrada no escribe ni reinicia `userPaused` y no usa el control de escenas para reproducirse.

### 5. Interrupciones y acceso inmediato

Finalizar la entrada si se activa movimiento reducido, se oculta la pestaña, se abandona la parte superior, se restaura el documento desde bfcache o el foco alcanza un elemento animado. Un cambio posterior a movimiento permitido no repite la entrada. Una navegación inicial con hash de sección o posición restaurada adopta directamente el estado final.

No se añaden bloqueos de puntero, `inert`, cambios de semántica ni esperas para activar controles. El foco finaliza la entrada antes de que un control pueda quedar visualmente oculto. Los eventos de cancelación usan la misma salida idempotente que el final normal. El controlador de escenas sigue decidiendo qué actividad ambiental puede reanudarse.

## Risks / Trade-offs

- [Ocultación permanente o destello si el módulo llega tarde] → Estado base visible, habilitación antes del pintado, recuperación automática acotada y omisión de la entrada tardía.
- [Imagen lenta o empeoramiento de la percepción de carga] → No bloquear el mensaje por la imagen, conservar su proporción y revisar con caché fría y red lenta; los 780 ms son tiempo de animación, no una promesa de carga de recursos.
- [Conflicto con las reglas de pausa de `.scene`] → Animar el envoltorio exterior y aplicar la condición de entrada solo a la actividad del hero.
- [Botón o menú afectados por transformaciones persistentes] → Animar grupos y retirar estilos temporales al terminar; verificar interacción durante y después de la secuencia.
- [El ritmo puede necesitar ajuste visual] → Centralizar la partitura y revisar a velocidad normal y reducida antes de valorar una variante más expresiva.

## Migration Plan

Implementar la entrada dentro de la landing existente, ejecutar la compilación y verificar los escenarios de las tres delta specs. Comparar el estado final con la composición actual y conservar el hash de la imagen fuente. Para revertir, retirar los ganchos y el coordinador de entrada y restaurar la condición original de reproducción del hero; no hay migración de datos ni servicios externos.
