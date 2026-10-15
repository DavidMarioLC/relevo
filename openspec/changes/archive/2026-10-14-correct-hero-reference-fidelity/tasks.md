# Tasks

## 1. Evidencia y medición de referencia

- [x] 1.1 Conservar en `.artifacts/correct-hero-reference-fidelity/` la referencia nativa, la captura previa y los recortes de auditoría; crear una matriz con todas las filas de `visual-review.md`. Verificar resolución 1732 × 728, presencia de cada fila y vínculo con su evidencia inicial.
- [x] 1.2 Registrar anclas de agentes, esquinas de placas y pantalla, extremos de etiquetas y muestras interiores de color con sus coordenadas. Verificar que las mediciones se obtienen de la fuente a escala nativa y documentan las tolerancias de 2 px y 5 niveles RGB por canal.

## 2. Agentes y red

- [x] 2.1 Corregir geometría, jaulas, tonos, capas, indicadores y trazos de un agente claro y uno naranja. Verificar sus detalles con recortes 1:1 y medidas de vértices, y actualizar las filas correspondientes de la matriz antes de propagar el ajuste.
- [x] 2.2 Aplicar la geometría calibrada a ambos grupos y ajustar sus posiciones. Verificar dieciséis agentes, seis naranjas, centros y siluetas dentro de tolerancia; guardar comparación de ambos lados y documentar el cierre de sus filas.
- [x] 2.3 Trazar de nuevo conexiones, cruces y puntos, separando segmentos por profundidad y ocultaciones. Verificar cada recorrido contra la fuente, sin diagonales adicionales, extremos aislados o cruces sobre volúmenes opacos; guardar recortes y cerrar las filas de red y puntos de unión.
- [x] 2.4 Adaptar las señales a los recorridos corregidos manteniendo sus ciclos y desfases. Verificar un ciclo completo de 4 s, continuidad de extremos y ausencia de señales fuera de la red, y registrar la comprobación junto a la evidencia de conexiones.

## 3. Memoria, equipo y detalles centrales

- [x] 3.1 Sustituir las placas simétricas por tres prismas de planta rectangular proyectada y corregir espesores, huecos y conectores. Verificar esquinas dentro de 2 px nativos y detalle de capas con el recorte de memoria; actualizar las filas del módulo en la matriz.
- [x] 3.2 Corregir pantalla, marco, gráfica y uniones del monitor conservando la carcasa ya próxima. Verificar las cuatro esquinas, altura, picos y conexión con la plataforma a escala 1:1; guardar evidencia y actualizar sus filas.
- [x] 3.3 Completar orificio, aro, collar, vástago y unión del relay; trazar el conector izquierdo con su forma específica. Verificar profundidad interior, continuidad de uniones y silueta contra el recorte de referencia, y documentar las filas corregidas.
- [x] 3.4 Afinar llave, ranuras, indicadores, salientes y aristas secundarias del recinto y plinto, conservando las anclas centrales y la arista frontal sobre el cubo. Verificar el recorte central y ausencia de diagonales extra; guardar evidencia para cada fila afectada.

## 4. Etiquetas, paleta y sombras

- [x] 4.1 Aplicar la alternativa híbrida aprobada: conservar el PNG original intacto, incluyendo etiquetas, y superponer luces, conexiones y monitor. Verificar hash del recurso e imagen pausada sin alteraciones.
- [x] 4.2 Calibrar caras naranjas, neutros, pantalla, transparencias, pesos de línea y fondo local del hero. Verificar las muestras interiores dentro de 5 niveles RGB por canal y contraste de los contornos; registrar coordenadas, valores y evidencia sin alterar los fondos de otras secciones.
- [x] 4.3 Trazar sombras de agentes, cubo, plinto y módulos según la fuente, ajustando siluetas, opacidad y solapes. Verificar el suelo completo y los recortes de cada módulo, sin planos amplios ajenos a la referencia; cerrar sus filas con capturas antes/después.

## 5. Aceptación e integración

- [x] 5.1 Verificar la composición híbrida a escala nativa y a 1160 px, con capturas y comparación exacta del render pausado frente a la imagen original sin superposiciones. Registrar la sustitución del redibujo sin presentar las mediciones previas como prueba de fidelidad.
- [x] 5.2 Comprobar actividad superpuesta, pausa y reanudación, salida del viewport, movimiento reducido, versión sin JavaScript y anchos 320, 390, 768, 1024, 1440 y 1920 px; conservar todos los módulos centrales y evitar desbordamiento.
- [x] 5.3 Contrastar las otras cuatro escenas, navegación, facturación y semántica decorativa; ejecutar `npm run build` y `openspec validate correct-hero-reference-fidelity --strict`. Guardar evidencia de integración y mantener disponible la vista local.

## Historial: revisión del redibujo rechazada

El usuario rechazó el redibujo por falta de detalle y apariencia borrosa. Sus comprobaciones de coordenadas y colores no acreditaban aceptación visual. Se preparó la alternativa híbrida en `.artifacts/exact-hero-preview/`, que posteriormente fue aprobada y aplicada como se registra a continuación. Esta revisión histórica no representa una tarea pendiente.

## Aplicación autorizada

El usuario respondió «sí» a aplicar la composición híbrida. Las tareas históricas de trazado permanecen como registro del intento sustituido, no como aceptación del SVG anterior. Las tareas 4.1 y 5.1–5.3 registran la implementación y verificación vigentes.

## Cierre de etapa (2026-10-14)

Las 16 tareas están completas. Los requisitos vigentes recogen el hero híbrido con cubo fijo y cuatro escenas vectoriales adicionales. Se sincronizan las especificaciones principales y se archiva el cambio; las integraciones de producto permanecen fuera de este alcance.
