# Tasks

## 1. Dibujo vectorial y fidelidad estática

- [x] 1.1 Registrar capturas de referencia a escala nativa, 1160 px y móvil; definir el inventario tipado de piezas en src/data/hero-assembly.ts y evaluar las primitivas existentes. Verificar cobertura de todos los elementos de design.md y documentar qué geometría se reutiliza, corrige o reemplaza.
- [x] 1.2 Construir plataforma, sombras, recinto central, tres caras del cubo, contorno, llave e indicadores con geometría SVG propia. Comparar recortes con la referencia para verificar proporciones, detalles, separación de la llave y arista frontal sobre el cubo.
- [x] 1.3 Dibujar los ocho agentes de cada lado con bases, sombras, recintos, caras e indicadores independientes. Verificar posiciones y detalles a escala nativa, con tres cubos naranjas y cinco claros por lado y sin adoptar diferencias del redibujo antiguo.
- [x] 1.4 Dibujar tres placas de memoria con conectores, monitor con pantalla/gráfica, relay con pedestal/varilla/anillo, conexiones, puntos y siete etiquetas vectoriales. Verificar geometría, profundidad, tipografía y detalles mediante recortes por familia y registrar diferencias corregidas en design.md.
- [x] 1.5 Sustituir el elemento image de HeroIllustration.astro por el SVG completo y visible por defecto. Inspeccionar DOM y solicitudes para descartar mapas de bits y dependencia del PNG, comprobar nitidez al 200 %/400 %, y verificar fidelidad estática y encuadre móvil antes de animar.

## 2. Cronología y ciclo de construcción

- [x] 2.1 Implementar opt-in temprano independiente y coordinador src/scripts/hero-assembly.ts con estados boot/waiting/running/complete. Verificar SVG completo sin JavaScript y al bloquear o retrasar el módulo más allá de 1500 ms, sin ocultación tardía.
- [x] 2.2 Implementar efectos WAAPI sobre trazos, caras y detalles vectoriales según la cronología de 2400 ms, con onda de pares de agentes y orden interno por componente. Verificar frames a 0, 400, 900, 1500, 2100 y 2400 ms, conservando punteado, profundidad y posición de cada pieza.
- [x] 2.3 Preparar y validar nodos inline sin esperar imágenes; activar solo con la altura visible definida en design.md, recalculada al redimensionar. Verificar espera fuera de pantalla, inicio al hacer scroll y estado completo ante preparación fallida, sin bloquear título o CTA.
- [x] 2.4 Implementar finalización idempotente y limpieza por pausa, movimiento reducido, pérdida de visibilidad, cambio de ancho, error y watchdog de 2700 ms. Verificar el mismo SVG completo, sin efectos ni estilos temporales residuales, sin repetición y con recuperación ante efectos detenidos artificialmente.
- [x] 2.5 Aplicar omisión por historial, posición restaurada y hash inferior. Verificar regreso al hero y BFCache sin reconstrucción; registrar estados, plazos y resultados del coordinador en design.md.

## 3. Integración con entrada y movimiento existentes

- [x] 3.1 Separar .hero-art del fade genérico y de la cancelación textual por scroll, manteniendo el word reveal de 1220 ms. Verificar que bajar desde el título en móvil inicia una construcción pendiente y que el foco temprano sigue dejando el texto completo.
- [x] 3.2 Actualizar motion.ts para esperar tanto finalización textual como construcción y comunicar pausa al coordinador. Verificar ausencia de actividad ambiental durante la construcción, inicio posterior correcto y pausa antes/durante sin reinicio al reanudar.
- [x] 3.3 Verificar que las reglas CSS globales no detienen la construcción vectorial y que las otras cuatro escenas, entradas inferiores, menú y facturación mantienen su comportamiento y apariencia. Registrar evidencia de compatibilidad en design.md.

## 4. Aceptación integrada

- [x] 4.1 Revisar secuencia y resultado final en 320, 390, 768, 1024, 1440 y 1920 px, incluyendo el gráfico inicialmente fuera de pantalla. Verificar construcción perceptible por piezas, encuadre central, reserva de altura y ausencia de desbordamiento; registrar capturas y diferencias resueltas.
- [x] 4.2 Comparar el último frame animado con el mismo SVG estático sin JavaScript o con movimiento reducido y con la referencia a escala nativa y 1160 px. Confirmar detalle, geometría y colores según las tolerancias vigentes, sin piezas olvidadas, dependencia rasterizada ni actividad residual; documentar evidencia visual sin usar hashes o build como prueba de fidelidad.
- [x] 4.3 Recorrer inicialización fallida o tardía, interrupciones, preferencias en vivo, foco/teclado e historial. Verificar dibujo vectorial completo y controles disponibles en cada salida, sin respaldo rasterizado; registrar limitaciones reales del entorno de pruebas.
- [x] 4.4 Inspeccionar trabajo de animación durante construcción, fuera del viewport y al terminar. Comprobar que la secuencia finita no sigue avanzando ni mantiene efectos/temporizadores activos y registrar la observación de rendimiento.
- [x] 4.5 Ejecutar npm run build, openspec validate assemble-hero-illustration --strict y git diff --check. Resolver errores del cambio y registrar comandos y resultados de aceptación.
