# Verificación de la ilustración principal

## Base

- Referencia: `/Users/davidmariolc/Desktop/Screenshot 2026-10-10 at 8.09.47 AM.png` (1732 × 728).
- Estado previo: `.artifacts/refine-hero-illustration/before-{hero,sealed,key,storage,deploy}.png` y `before-section.png`, capturados a 1440 × 1100 con movimiento reducido.
- El hero previo ocupa 1160 px de ancho. Comparar el nuevo dibujo y la referencia a ese mismo ancho, conservando sus respectivas proporciones; el nuevo encuadre completo usa 1732 × 728.
- Se conserva `before-scenes.json` para contrastar el contenido de las otras escenas.

## Resultados

- Extracción: `extract-*.png` coincide byte por byte con las cinco capturas iniciales. `npm run build` correcto.
- Composición estática: `static-hero.png`, `static-section.png` y `static-1920-hero.png`, a 1440 y 1920 px. Comparación visual con la referencia a 1160 px de dibujo: se conservaron las anclas del recinto, proporciones del cubo y módulos, dieciséis agentes (seis naranjas), etiquetas y profundidad.
- Se corrigió el trazo heredado en las etiquetas durante la revisión estática; se conservó texto fino. `npm run build` correcto antes de añadir animación.
- Responsive: revisión visual y límites comprobados a 320, 390, 768, 1024, 1440 y 1920 px. Recinto, cubo, llave, memoria, monitor y relay dentro del encuadre, sin desbordamiento horizontal. Evidencia: `responsive-{ancho}.png` y límites registrados en `verification.json`.
- Movimiento: nueve muestras de un ciclo de 6 s (0–6000 ms), flotación entre 0 y −3 unidades y retorno continuo a la pose inicial. Memoria, monitor, relay y recinto conservan transformación `none`. Etiqueta y contorno pertenecen al grupo del cubo, y las aristas frontales se pintan después. Las señales recorren conexiones rectas en 4 s mediante transformaciones; indicadores y gráfica usan opacidad.
- Pausa manual y reanudación: estado del controlador, estado de todas las animaciones y estabilidad del cubo durante pausa comprobados. Al sacar el hero de pantalla se detiene y al volver se reanuda.
- Movimiento reducido: cero animaciones activas y cubo sin transformación. Sin JavaScript: dibujo completo, dieciséis agentes y módulos presentes, pose estable. Evidencia: `no-javascript.png`.
- Visibilidad del documento: la sesión automatizada mantiene `document.hidden=false` incluso al cambiar de ventana y minimizar. Se verificó el manejador compartido con estado oculto simulado y evento `visibilitychange`: todas las animaciones pausadas, y reanudación al restaurar el estado. Esta comprobación no equivale a una prueba física de cambio de pestaña; el controlador existente no se modificó.
- Regresión: contenido SVG de las otras cuatro escenas idéntico al inicial. Capturas normalizadas al mismo origen con colores RGB idénticos (se admite redondeo de un nivel en alfa en bordes SVG); los recortes de página pueden diferir por el nuevo alto del hero. Menú móvil, Escape, cierre al navegar y facturación mensual/anual comprobados. SVG decorativo sin elementos enfocables.
- Integración: `npm run build` y `openspec validate refine-hero-illustration --strict` correctos. Vista local disponible en `http://127.0.0.1:4321/`, iniciada con `astro dev --background`.
- Comprobación repetible: `.artifacts/refine-hero-illustration/verify.cjs` usa Playwright del runtime local; ejecutar `node .artifacts/refine-hero-illustration/verify.cjs final` con la vista local activa. Resultados detallados en `verification.json`.

## Cobertura de requisitos

| Requisito | Evidencia |
| --- | --- |
| Reference composition | `static-hero.png`, `final-hero.png`, comparación visual con la fuente |
| Eight agents per side | `verification.json`: 16 agentes, 6 activos y etiquetas exactas |
| Coherent depth and occlusion | Captura estática, orden de pintura y separación de llave durante el ciclo |
| Reference surface details | Capturas de escritorio y etiquetas verificadas; tres placas, gráfica y relay completos |
| Motion preserves the drawing | Nueve muestras del ciclo, controles y estados registrados en `verification.json` |
| Mobile core composition | Seis anchos, límites de cada módulo y capturas responsive |
| Isolated visual change | SVG y capturas normalizadas de las otras escenas; navegación, facturación y semántica |

## Límites de la comparación

La geometría reproduce los elementos y proporciones observables de una fuente rasterizada; no se exige identidad de píxeles entre una captura y el SVG. La imagen no describe una secuencia de movimiento: la animación es una interpretación sutil y conserva la composición de referencia. La limitación de la prueba física de visibilidad se detalla arriba.
