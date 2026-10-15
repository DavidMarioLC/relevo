# Proposal

## Why

El redibujo vectorial del hero no conservaba el detalle y la nitidez de la captura original. El usuario aprobó el 2026-10-10 sustituirlo por la composición híbrida preparada en `.artifacts/exact-hero-preview/comparison.html`.

## What Changes

- Servir `/images/hero-reference.png` sin conversión ni pérdida, conservando proporciones 1732 × 728 y detalles.
- Superponer actividad SVG discreta en luces, conexiones y monitor; mantener fijo el cubo y sus etiquetas.
- Mostrar únicamente la imagen original al pausar, con movimiento reducido o sin JavaScript.
- Conservar el encuadre central móvil de 680 unidades, la semántica decorativa y el controlador compartido.
- Mantener las otras cuatro ilustraciones como escenas vectoriales.

La decisión sustituye los requisitos anteriores de redibujo, SVG puro y flotación del cubo. Las tareas de trazado completadas documentan el intento anterior; no constituyen aceptación visual de ese resultado.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `hero-illustration`: fidelidad de la imagen original, actividad superpuesta y comportamiento estático aprobado.
- `animated-illustrations`: cobertura de una escena híbrida y cuatro vectoriales; actividad del hero con cubo fijo.

## Impact

La implementación vigente está en `HeroIllustration.astro` y `/images/hero-reference.png`, integrada con `Scene.astro` y el controlador compartido. No requiere dependencias nuevas ni cambios de APIs o datos.

Las especificaciones principales se sincronizan al cerrar esta etapa el 2026-10-14. El alcance sigue siendo la landing local; no incluye pagos, autenticación, despliegue de agentes ni publicación.
