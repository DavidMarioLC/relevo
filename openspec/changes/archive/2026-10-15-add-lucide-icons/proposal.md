# Proposal

## Why

La landing de Relevo combina flechas y símbolos de reproducción tipográficos con un menú dibujado en CSS. Integrar Lucide permitirá darles un trazo consistente y mostrar visualmente la acción disponible en los controles de menú y animaciones.

## What Changes

- Incorporar `@lucide/astro` como dependencia e importar exclusivamente los iconos utilizados como componentes Astro que generan SVG.
- Sustituir las flechas de lanzamiento en Header, Hero, Pricing y GetStarted por `ArrowUpRight`, y la flecha de suscripción en Footer por `ArrowRight`.
- Mostrar `Menu` con el menú móvil cerrado y `X` cuando está abierto.
- Mostrar `Pause` mientras las animaciones pueden pausarse y `Play` cuando la persona ha solicitado pausa; adaptar `src/scripts/motion.ts` para alternar SVG sin sustituirlos por texto.
- Unificar tamaño, color y trazo de estos iconos conservando nombres accesibles, áreas táctiles y presentación estática sin JavaScript.
- Conservar la marca, favicon, ilustraciones isométricas, precios, destinos y disponibilidad de las acciones existentes. No añadir iconos a enlaces sociales ni nuevas funciones.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `landing-page`: incorporar iconografía de interfaz consistente y estados visuales de menú y animaciones que correspondan a la acción disponible, conservando accesibilidad y navegación estática.

## Impact

- Dependencias: `package.json` y `pnpm-lock.yaml`.
- Interfaz: `src/components/landing/{Header,Hero,Pricing,GetStarted,Footer}.astro`.
- Estados de movimiento: `src/scripts/motion.ts`.
- Estilos: `src/styles/global.css` y estilos locales de Header y Hero.
- Especificaciones: delta de `landing-page`. Los contratos de animación e ilustraciones existentes continúan vigentes.
- Verificación prevista: compilación, revisión del HTML generado y comprobación en navegador de los estados y tamaños móviles/escritorio. No requiere servicios externos, hidratación adicional ni migraciones de datos.
