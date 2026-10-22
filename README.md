# Relevo

Proyecto de aprendizaje construido con Astro que representa una landing de demostración de Relevo. Incluye navegación adaptable, funcionalidades, comparación mensual/anual de planes y controles accesibles de movimiento; no es un servicio comercial activo.

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

## SEO y metadata educativa

El título `Relevo — Astro Learning Project` y la descripción en inglés identifican el propósito educativo. Open Graph y Twitter/X comparten esos textos desde el HTML inicial; las etiquetas sociales son textuales y no incluyen una imagen propia.

Todas las páginas que usan el layout incluyen `noindex, follow`, también al compilar para producción. Los buscadores compatibles pueden rastrear el documento para leer la directiva y excluirlo de sus resultados. No se bloquea ese acceso mediante `robots.txt` ni se genera un sitemap. Esta directiva no hace privado el sitio ni garantiza la retirada inmediata de una URL que ya estuviera indexada.

### URL pública opcional

Sin `SITE_URL`, se omiten canonical y `og:url`. Cuando tengas una dirección pública real, puedes exportar `SITE_URL` en el entorno de compilación o ejecutar:

```sh
SITE_URL='https://<tu-dominio-publico>' pnpm build
```

Sustituye el marcador por tu dominio real. La URL debe ser absoluta HTTP o HTTPS, sin credenciales, query ni fragmento; se rechazan localhost y direcciones de loopback o no especificadas. Una variable vacía se trata como no configurada. Si publicas bajo un subdirectorio, configura también `base` en Astro para que las rutas y el canonical conserven ese prefijo.

`.env.example` documenta la variable, pero esta configuración la lee desde `process.env`: copiar el archivo a `.env` no basta para suministrarla a `astro.config.mjs`. Usa el entorno del proceso o de tu plataforma de compilación.

Configurar la URL solo permite generar canonical y `og:url`; **`noindex, follow` permanece activo**. Las vistas previas de enlaces dependen de cada plataforma y pueden ser incompletas sin una imagen social propia.

## Estructura

- `src/pages/index.astro`: composición de la landing.
- `src/components/landing/`: navegación, hero, funcionalidades, precios, CTA y footer.
- `src/components/illustrations/`: escenas isométricas y actividad visual.
- `src/data/landing.ts`: contenido, recursos, precios y destinos de enlaces.
- `src/data/site.ts`: nombre, título y descripción educativos compartidos.
- `src/scripts/motion.ts`: pausa, visibilidad y preferencia de movimiento reducido.
- `src/styles/global.css`: estilos y tokens compartidos.
- `public/images/hero-reference.png`: imagen original del hero; debe conservarse.
- `openspec/specs/`: contratos vigentes del comportamiento implementado.
- `openspec/changes/archive/`: historial de los cambios completados.

## Estado actual

La etapa visual de la landing está completada. Los iconos de interfaz usan Lucide y los botones con fondo negro incorporan un hover naranja pixelado de medio segundo al entrar y salir; los botones claros y de contorno conservan su hover habitual. El hero usa la imagen original de 1732 × 728 con actividad SVG en luces, conexiones y monitor; el cubo permanece fijo. Las cuatro escenas restantes son vectoriales. Pausa, movimiento reducido y ausencia de JavaScript conservan una presentación estática útil.

Los CTA de lanzamiento llevan a precios. Autenticación, pagos, despliegue de agentes, newsletter, lista de espera y enlaces sin destino aparecen como no disponibles. Estas integraciones y la publicación del sitio quedan fuera de la etapa cerrada; no son servicios activos.

## Especificaciones y evidencia

Con OpenSpec instalado, valida los contratos actuales con:

```sh
openspec validate --specs --strict
```

Los tres cambios visuales iniciales se archivaron el 2026-10-14 y `add-lucide-icons` el 2026-10-15, después de sincronizar sus especificaciones. Los documentos archivados describen decisiones históricas; `openspec/specs/` recoge el comportamiento vigente.

`.artifacts/` contiene capturas, comparaciones y resultados locales de verificación. Está excluida de Git y no es necesaria para ejecutar o compilar el sitio. Puedes eliminarla si no necesitas esas referencias; los enlaces históricos a esa evidencia dejarán de estar disponibles.
