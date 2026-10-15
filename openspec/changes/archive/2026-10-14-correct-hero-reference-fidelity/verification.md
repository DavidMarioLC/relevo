# Verificación del hero híbrido

## Estado aprobado

Se aplicó la alternativa aprobada el 2026-10-10: PNG original intacto con luces, señales y monitor en una capa SVG; cubo fijo. Las tareas de trazado anteriores corresponden al intento sustituido.

## Evidencia de implementación

La evidencia local en `.artifacts/exact-hero-preview/landing-verification.json` y `landing-review.md` registra:

- Recurso servido idéntico al original: SHA-256 `3830e02ebf5a0d724c67d20a040510765bd45e6b4f7366ba4d6ba261d2ce4f8d`.
- Render pausado idéntico al render de la imagen sin superposición, a escala nativa y a 1160 px.
- Cuatro animaciones superpuestas; pausa, reanudación y salida del viewport verificadas.
- Movimiento reducido y carga sin JavaScript muestran el original estático.
- Anchos 320, 390, 768, 1024, 1440 y 1920 px sin desbordamiento horizontal.
- Menú móvil, facturación y las otras cuatro escenas verificados sin errores de página.

Estas son comprobaciones registradas durante la implementación; no se presentan como una nueva ejecución de navegador durante el cierre documental. Las capturas y resultados detallados permanecen locales y excluidos de Git en `.artifacts/`.

## Límites

El hero conserva resolución 1732 × 728. Los resultados del redibujo previo no acreditan igualdad visual. La comprobación física de ocultación de pestaña tuvo la limitación documentada en el cambio anterior; su manejador se verificó mediante simulación.
