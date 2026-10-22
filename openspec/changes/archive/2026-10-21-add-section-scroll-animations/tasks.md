# Tasks

## 1. Coordinador compartido y mejora progresiva

- [x] 1.1 Crear `src/scripts/scroll-reveal.ts` y `src/components/landing/ScrollReveal.astro`, e integrar el componente una vez desde `src/layouts/Layout.astro`; verificar con `npm run build` y confirmar que no se añadieron dependencias ni se modificó la coordinación del hero.
- [x] 1.2 Implementar estados por grupo, observación con umbral cero, clasificación inicial de grupos visibles/superados y entradas finitas con los valores de `design.md`; verificar en navegador que un grupo inferior entra una sola vez, una tarjeta más alta que la pantalla se activa y un grupo inicialmente visible nunca se oculta.
- [x] 1.3 Implementar finalización al salir de pantalla, al cambiar el ancho y ante scroll rápido, además de manejo de errores y salida de seguridad según duración y desfase de cada entrada; verificar que al interrumpir una entrada o simular fallo de creación no quedan efectos persistentes ni se reproduce al regresar.

## 2. Grupos de contenido y ritmo adaptable

- [x] 2.1 Marcar y envolver los contenidos de Features y Pricing, incluyendo encabezados, selector, tarjetas y nota de pago por hora, preservando contenedores de bordes y fondos; verificar en escritorio el orden de presentación, el desfase de 70 ms por fila y la retícula fija, y en 320/390 px la activación individual sin desfase de lista.
- [x] 2.2 Incorporar los grupos de Get started, con texto y botón juntos e ilustración por opacidad, y los grupos del Footer con su franja inferior; verificar los valores de `design.md`, el orden DOM y que las reglas de hijos directos y `nth-child` del footer conservan su aspecto a 390, 768 y 1440 px.
- [x] 2.3 Calcular los desfases solo entre candidatos de una misma fila que llegan juntos al viewport y finalizar entradas activas al cambiar de ancho; verificar que una tarjeta que llega sola no espera por otra fuera de pantalla y que redimensionar no repite grupos presentados.

## 3. Accesibilidad, navegación y ciclo del documento

- [x] 3.1 Aplicar movimiento reducido al inicio y durante la visita, conservando estáticos todos los grupos durante el resto de esa carga; verificar en navegador la preferencia inicial, su activación durante una entrada y su posterior desactivación sin nuevas entradas.
- [x] 3.2 Finalizar inmediatamente el grupo que recibe foco y presentar los grupos visibles de destinos internos al llegar, incluyendo clics al mismo hash; verificar Tab durante la entrada, enlaces a Features y Pricing, foco visible y selector de facturación utilizable sin esperar.
- [x] 3.3 Finalizar entradas activas al ocultar la pestaña, clasificar grupos al volver y adoptar estado final al restaurar desde historial; verificar cambio de pestaña, navegación atrás/adelante y limpieza de observador, listeners, temporizadores y efectos al salir del documento.
- [x] 3.4 Verificar el documento completo sin JavaScript, con el módulo de scroll bloqueado y con inicialización retrasada; confirmar contenido visible, navegación estática disponible, precios mensuales legibles y ausencia de ocultación tardía del contenido ya visible.

## 4. Integración y aceptación visual

- [x] 4.1 Revisar la landing en 320, 390, 768, 1024, 1440 y 1920 px, recorriendo todas las secciones y regresando; registrar en `design.md` la evidencia de entradas únicas, curvas y tiempos acordados, retícula estable y ausencia de desbordamiento o recortes.
- [x] 4.2 Verificar conjuntamente entrada del hero, salto temprano hacia una sección inferior, pausa/reanudación de ilustraciones, menú móvil y facturación mensual/anual; confirmar que las entradas no reinician el hero ni reactivan escenas pausadas y registrar los resultados en `design.md`.
- [x] 4.3 Ejecutar `npm run build` y `openspec validate add-section-scroll-animations --strict`; resolver errores de la implementación o incoherencias de los artefactos y registrar comandos y resultados antes de dar el cambio por terminado.

## 5. Ajuste de perceptibilidad durante el scroll

- [x] 5.1 Alargar las entradas a 1600–2000 ms, añadir 140 ms de espera inicial y adaptar la salida de seguridad; verificar en escritorio y móvil que continúan activas después de 700 ms y terminan sin ser cortadas por el límite anterior.
- [x] 5.2 Verificar que el movimiento reducido y el foco siguen finalizando las entradas inmediatamente; ejecutar compilación y validación estricta y registrar los resultados del ajuste en `design.md`.

## 6. Word reveal del título del hero

- [x] 6.1 Sustituir la entrada unitaria del h1 por palabras con máscara y 80 ms de desfase, adaptando el coordinador para esperar la última palabra; verificar la secuencia CSS, el anuncio único del título y su geometría en móvil y escritorio.
- [x] 6.2 Comprobar movimiento reducido, ausencia de JavaScript, interrupción por scroll/foco y fallback ante inicialización fallida; ejecutar compilación y validación estricta y registrar la evidencia en `design.md`.
