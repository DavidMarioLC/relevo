# Jurniti

Landing pública de Jurniti construida con Astro. Incluye navegación adaptable, funcionalidades, comparación mensual/anual de planes y controles accesibles de movimiento.

## Desarrollo

Requiere Node.js >=22.12.0. Instala las dependencias con `pnpm install`.

Inicia el servidor en segundo plano:

```sh
pnpm exec astro dev --background
```

La vista local está disponible normalmente en `http://localhost:4321/`. Gestiona el servidor con:

```sh
pnpm exec astro dev status
pnpm exec astro dev logs
pnpm exec astro dev stop
```

Compila y revisa la versión de producción con:

```sh
pnpm build
pnpm preview
```

## Estructura

- `src/pages/index.astro`: composición de la landing.
- `src/components/landing/`: navegación, hero, funcionalidades, precios, CTA y footer.
- `src/components/illustrations/`: escenas isométricas y actividad visual.
- `src/data/landing.ts`: contenido, recursos, precios y destinos de enlaces.
- `src/scripts/motion.ts`: pausa, visibilidad y preferencia de movimiento reducido.
- `src/styles/global.css`: estilos y tokens compartidos.
- `public/images/hero-reference.png`: imagen original del hero; debe conservarse.
- `openspec/specs/`: contratos vigentes del comportamiento implementado.
- `openspec/changes/archive/`: historial de los cambios completados.

## Estado actual

La etapa visual de la landing está completada. El hero usa la imagen original de 1732 × 728 con actividad SVG en luces, conexiones y monitor; el cubo permanece fijo. Las cuatro escenas restantes son vectoriales. Pausa, movimiento reducido y ausencia de JavaScript conservan una presentación estática útil.

Los CTA de lanzamiento llevan a precios. Autenticación, pagos, despliegue de agentes, newsletter, lista de espera y enlaces sin destino aparecen como no disponibles. Estas integraciones y la publicación del sitio quedan fuera de la etapa cerrada; no son servicios activos.

## Especificaciones y evidencia

Con OpenSpec instalado, valida los contratos actuales con:

```sh
openspec validate --specs --strict
```

Los tres cambios de esta etapa se archivaron con fecha 2026-10-14 después de sincronizar sus especificaciones. Los documentos archivados describen decisiones históricas; `openspec/specs/` recoge el comportamiento vigente.

`.artifacts/` contiene capturas, comparaciones y resultados locales de verificación. Está excluida de Git y no es necesaria para ejecutar o compilar el sitio. Puedes eliminarla si no necesitas esas referencias; los enlaces históricos a esa evidencia dejarán de estar disponibles.
