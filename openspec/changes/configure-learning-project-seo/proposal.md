# Proposal

## Why

La metadata actual presenta Relevo como un servicio comercial, aunque el sitio es un proyecto de aprendizaje sin servicios activos. El usuario ha decidido excluirlo de los buscadores; hace falta expresar ese propósito en el HTML y en las vistas previas de enlaces compartidos.

## What Changes

- Declarar `noindex, follow` en el HTML inicial de toda página que use el layout, también en compilaciones de producción y cuando se configure una URL pública.
- Sustituir el título y la descripción comerciales por metadata en inglés que identifique Relevo como proyecto educativo con Astro.
- Incorporar Open Graph y una tarjeta de resumen para Twitter/X, coherentes con el título y la descripción educativos.
- Emitir canonical y `og:url` únicamente cuando exista una URL pública explícitamente configurada; omitirlos mientras no exista.
- Documentar el propósito educativo, la exclusión de buscadores y la configuración opcional de la URL pública.
- Mantener la presentación y las interacciones de la landing. No añadir sitemap, datos estructurados de productos/ofertas, analítica, servicios externos, nuevas dependencias ni una imagen social en este cambio.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `landing-page`: actualizar la identidad del documento para reconocer su propósito educativo y añadir los contratos de exclusión de buscadores, metadata social y URLs públicas opcionales.

## Impact

- Metadata: `src/layouts/Layout.astro` y una fuente de valores pequeña en `src/data/site.ts`.
- URL pública opcional: `astro.config.mjs` y `.env.example`.
- Documentación: `README.md`.
- Especificaciones: delta de `landing-page`; se conservan los contratos de ilustraciones y movimiento.
- Verificación prevista: compilaciones con y sin URL pública, inspección del HTML generado y validación estricta de OpenSpec. No se publicará el sitio ni se gestionarán cuentas externas.
