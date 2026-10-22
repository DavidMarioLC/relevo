# Verificación

## Resultado

Implementada la entrada inicial del nav y hero, con seis grupos solapados y una partitura de 780 ms. La actividad ambiental del hero comienza después de terminar la entrada y conserva las condiciones compartidas de reproducción. El HTML base sigue siendo visible sin JavaScript.

La revisión se realizó sobre `dist/` servido por un servidor HTTP temporal local con Playwright y navegadores aislados. También se recargó la landing en el navegador integrado en `http://localhost:4321/`.

## Compilación y validación

- `npm run build`: correcto, una página estática generada.
- `git diff --check`: correcto.
- `openspec validate orchestrate-hero-entrance --strict`: correcto.
- La compilación no se utilizó como sustituto de la revisión visual y de comportamiento descrita a continuación.

## Secuencia observada

En Chromium, los seis grupos compartieron el mismo `startTime` de animación. El muestreo por frame registró aproximadamente 794 ms entre la primera muestra en reproducción y la primera muestra terminada; la duración CSS prevista es 780 ms y la diferencia corresponde a la resolución del muestreo.

| Grupo | Retraso CSS | Duración CSS | Estado inicial |
| --- | --- | --- | --- |
| Header | 0 ms | 320 ms | Y = -6 px, opacidad 0 |
| Badge | 60 ms | 360 ms | Y = 8 px, opacidad 0 |
| Título | 120 ms | 480 ms | Y = 12 px, opacidad 0 |
| Descripción | 200 ms | 400 ms | Y = 8 px, opacidad 0 |
| CTA y garantía | 280 ms | 400 ms | Y = 8 px, opacidad 0 |
| Ilustración | 180 ms | 600 ms | Solo opacidad 0 |

- Los keyframes de los seis grupos usan `cubic-bezier(0.23, 1, 0.32, 1)`.
- La ilustración no tuvo transformación en ninguna muestra de su entrada.
- Los tamaños y posiciones de layout permanecieron iguales durante la secuencia.
- La opacidad aumentó de forma monótona en las muestras: no se observó contenido visible que luego se ocultara para empezar la animación.
- El estado final tiene opacidad 1, transformación `none` y ninguna animación de entrada persistente.
- Se revisaron capturas al principio y a mitad de la secuencia con reproducción a un cuarto de velocidad mediante instrumentación exclusiva de prueba. No se modificó la partitura de producción.

## Comportamiento

| Escenario | Evidencia / resultado |
| --- | --- |
| Carga inicial arriba | Arranque pendiente, reproducción y estado final en ese orden; sin errores JavaScript registrados. |
| Señales durante la entrada | Ninguna muestra pendiente o en reproducción tuvo actividad ambiental del hero habilitada. |
| Inicialización invertida | Se ejecutó el controlador ambiental antes del coordinador de entrada; tampoco activó señales anticipadas. |
| Pausa antes del final | La pausa manual permaneció activa después del final; reanudar activó el hero visible. |
| Movimiento reducido inicial | Todos los grupos estáticos y completos, escenas detenidas. |
| Cambio de preferencia durante la entrada | Adoptó el estado final al recibir el cambio; desactivar la preferencia no repitió la entrada. |
| Foco por teclado durante la entrada | El CTA y todos los grupos quedaron visibles inmediatamente en su posición final. |
| CTA activado durante la entrada | Navegó a `#pricing` y terminó la entrada. |
| Scroll durante la entrada | Terminó la secuencia; volver arriba no la repitió. |
| Acceso inicial a `#features` | Omitió la entrada y las escenas visibles de funcionalidades se reprodujeron de forma independiente. |
| Documento inicialmente oculto | La rama de inicialización omitió la entrada; comprobado simulando `document.hidden`. |
| Ocultación durante la entrada | El controlador terminó la entrada y detuvo las escenas; comprobado con cambio simulado de visibilidad y su evento. |
| Eventos de ciclo de vida | `pagehide` y `pageshow` con restauración finalizaron la entrada; además una navegación real seguida de volver desde historial no la repitió. |
| Coordinador bloqueado | Se retiró solo el módulo compilado de entrada de la respuesta de prueba; el arranque inline recuperó la visibilidad automáticamente. |
| Coordinador tardío | Ejecutarlo después de la recuperación no volvió a ocultar ni animar contenido. |
| Salvaguarda CSS | Retirados el coordinador y el temporizador inicial, el CSS recuperó por sí solo la presentación completa. |
| Red lenta y caché fría | Se limitó la red a 90 000 bytes/s y 120 ms de latencia, con caché deshabilitada y la imagen del hero retenida. Mensaje y CTA quedaron en su estado final antes de liberar la imagen. |
| Sin JavaScript | Contenido visible, navegación móvil desplegada y controles dependientes de JavaScript ocultos. |
| Controles existentes | Menú: abrir, Escape y cierre con foco. Precios: anual y mensual actualizan los tres importes correctos. La escena del CTA final sigue reproduciéndose al ser visible. |

## Adaptación y revisión visual

Se verificaron 320, 390, 768, 1024, 1440 y 1920 px en Chromium: sin desbordamiento horizontal, con estado final visible, menú cerrado oculto en móvil y CTA del header oculto hasta 480 px como antes. Se activó el menú durante la entrada en los anchos móviles.

En WebKit a 390 px se comprobó la entrada, el menú, Escape y movimiento reducido. Esto verifica un motor adicional, no constituye una prueba en un teléfono físico.

La inspección de las capturas de escritorio y móvil confirmó que el título conserva su unidad, el cubo y los módulos mantienen su encuadre y la fila de pausa está disponible. Se revisaron también funcionalidades, precios y CTA final. Al retirar en una respuesta de prueba el nuevo envoltorio del CTA, las medidas finales de header, badge, título, descripción, botón, garantía, ilustración y fila de estado coincidieron exactamente.

SHA-256 de la imagen, idéntico antes y después:

`3830e02ebf5a0d724c67d20a040510765bd45e6b4f7366ba4d6ba261d2ce4f8d`

## Evidencia local

Los siguientes archivos son temporales de esta sesión; las comprobaciones y resultados duraderos quedan descritos en este documento:

- `/private/tmp/jurniti-entrance-qa/check.cjs`: comprobaciones principales.
- `/private/tmp/jurniti-entrance-qa/more.cjs`: orden de inicialización, carga lenta, historial, revisión ralentizada, controles y WebKit.
- `/private/tmp/jurniti-entrance-qa/results.json` y `more-results.json`: resultados de ambos recorridos.
- `/private/tmp/jurniti-entrance-qa/normal-frames.json`: estados y animaciones muestreados por frame.
- `/private/tmp/jurniti-entrance-qa/desktop.png`, `mobile.png`, `no-js.png`, `entrance-early.png`, `entrance-middle.png`, `pricing.png` y `footer.png`: capturas revisadas.

La calidad expresiva del movimiento queda abierta a la valoración del usuario sobre esta primera variante discreta. No se probó una variante de mayor desplazamiento ni se introdujeron animaciones adicionales.
