# Proposal

## Why

La landing ya presenta nav y hero con una entrada coordinada, pero las secciones inferiores aparecen sin esa continuidad visual. Extender el lenguaje de movimiento al recorrido por scroll ayuda a introducir cada bloque y mantener la jerarquía de lectura.

## What Changes

- Incorporar entradas al entrar en el viewport para Features, Pricing, Get started y Footer, una vez por grupo y carga del documento.
- Presentar encabezados antes de los contenidos; escalonar las tarjetas visibles en escritorio y activar cada tarjeta individualmente en móvil.
- Usar aparición gradual, desplazamientos de 8–12 px y duraciones de 1600–2000 ms, con 140 ms de espera inicial y desaceleración sin rebote; la ilustración del CTA aparece solo por opacidad.
- Mantener el contenido visible sin JavaScript, con movimiento reducido y ante fallos de inicialización; conservar acceso inmediato por teclado y enlaces internos.
- Preservar la coordinación de entrada del hero, los bucles y controles de las ilustraciones, la facturación y la retícula editorial.
- Tras la revisión del usuario, sustituir la entrada del título completo del hero por un word reveal con máscaras por palabra, conservando su composición y semántica.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `landing-page`: añadir requisitos de entrada por scroll de las secciones inferiores, reproducción única, adaptación a móvil y presentación estática accesible; incorporar el word reveal del título del hero solicitado durante la revisión.

## Impact

- Componentes afectados en la implementación: `src/components/landing/Features.astro`, `Pricing.astro`, `GetStarted.astro` y `Footer.astro`, con puntos de entrada para sus grupos de contenido.
- Añadir un coordinador de scroll y estilos compartidos, integrados desde `src/layouts/Layout.astro`, sin nuevas dependencias.
- Adaptar `Hero.astro`, `Entrance.astro` y `src/scripts/entrance.ts` para el word reveal; verificar compatibilidad con `src/scripts/motion.ts` y los estilos globales de movimiento reducido.
- No cambia contenido, destinos, precios ni APIs. Quedan fuera parallax, scroll controlado, fijación de secciones, animación por palabra en secciones inferiores y cambios de las ilustraciones internas.
