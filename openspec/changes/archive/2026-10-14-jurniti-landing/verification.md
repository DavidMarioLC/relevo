# Verification

## Resultado

Las 23 tareas de implementación están completadas. `npm run build` finaliza correctamente y las comprobaciones de navegador no registran errores de JavaScript ni respuestas de recursos con estado HTTP 400 o superior.

## Comprobaciones realizadas

- Anchos de 320, 390, 768, 1024, 1440 y 1920 px: el ancho del documento coincide con el viewport; títulos, tarjetas, campos y botones no desbordan. Revisión visual adicional de precios a 768 px y página completa en escritorio/móvil.
- Menú móvil: apertura por Enter, navegación con Tab, cierre con Escape, retorno de foco y cierre al seguir un enlace interno.
- Facturación mensual/anual: ida y vuelta con los importes especificados y estado accesible; sin cambios en recursos.
- Cinco escenas con animaciones activas al entrar al viewport, pausa fuera de pantalla y pausa manual que persiste al desplazarse.
- Preferencia de movimiento reducido: cambio dinámico, escenas estáticas completas y ausencia de animaciones activas.
- Control de pestaña oculta: handler verificado con `document.hidden` y `visibilitychange` simulados; el navegador de pruebas no reproduce por sí mismo la ocultación real de pestañas.
- Sin JavaScript: navegación interna disponible, precios mensuales visibles, selector oculto y cinco escenas presentes.
- Controles táctiles activos: áreas de al menos 44 por 44 px en móvil.
- Contraste de tokens: texto principal 14.74:1, texto secundario 5.11:1, encabezado gris grande 3.36:1, etiquetas naranjas 5.13:1, badge anual 4.69:1 y texto secundario sobre Pro 8.12:1.
- Un único h1, documento en inglés, siete SVG decorativos sin elementos enfocables y ausencia de identificadores duplicados.

## Evidencia

Capturas de página completa y resultados estructurados en `.artifacts/jurniti-landing/`: `desktop.png`, `mobile.png` y `verification.json`. Las capturas usan movimiento reducido para obtener composiciones estables; las animaciones se verificaron por separado.

## Límites del alcance

Los dibujos se reconstruyeron como SVG a partir del JPEG. Login, waitlist, suscripciones y páginas externas sin destino están indicados como no disponibles. Los CTA de lanzamiento llevan a precios. No se integraron pagos ni despliegue de agentes ni se publicó el sitio.
