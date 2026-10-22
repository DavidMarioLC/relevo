# Design

## Context

Ver `proposal.md` para la motivación y `specs/landing-page/spec.md` para los criterios observables. La ruta `/` usa `src/layouts/Layout.astro`, que ya declara idioma inglés, título, descripción, viewport, color de tema y favicon. El título y la descripción actuales son comerciales; no hay metadata social, directivas robots, canonical ni configuración `site` en `astro.config.mjs`.

El README confirma que las integraciones no son servicios activos. No se encontró una URL pública configurada ni un runner de pruebas. El diseño se incluye porque la política de exclusión debe permanecer coherente al añadir una URL pública y al compartir metadata entre varias etiquetas.

## Goals / Non-Goals

**Goals:**
- Generar todas las etiquetas desde Astro en el HTML inicial, sin trabajo en el cliente.
- Mantener una sola fuente de título y descripción para evitar divergencias entre pestaña, buscadores y consumidores sociales.
- Separar la URL pública opcional de la decisión permanente de excluir este proyecto de aprendizaje de los buscadores.

**Non-Goals:**
- Añadir una librería SEO, un sistema genérico de propiedades por página o un interruptor para habilitar indexación.
- Rediseñar el contenido visible, producir recursos gráficos sociales o publicar el proyecto.

## Decisions

### 1. Metadata pequeña y compartida

Crear `src/data/site.ts` con valores estáticos para nombre, título y descripción. Usarlos directamente desde el head del layout existente. Con una sola ruta no se justifica un componente SEO independiente ni una API de props para futuras páginas.

Valores propuestos:
- Nombre: `Relevo`.
- Título: `Relevo — Astro Learning Project`.
- Descripción: `An educational landing page built with Astro to practice responsive design, accessible interfaces, and web animations. Not a commercial service.`

Actualizar las etiquetas existentes en lugar de duplicarlas. Conservar idioma, favicon, viewport, color de tema y scripts actuales. La [documentación de componentes Astro](https://docs.astro.build/en/basics/astro-components/) permite resolver estos valores durante la generación del HTML; no se necesita hidratación.

### 2. Exclusión incondicional en el layout

Emitir `<meta name="robots" content="noindex, follow">` sin condiciones de entorno, dominio ni modo de compilación. No exponer un flag `indexable`: el usuario ya decidió que este proyecto debe quedar excluido.

No crear `robots.txt` con `Disallow: /`. [Google documenta](https://developers.google.com/search/docs/crawling-indexing/block-indexing) que el rastreador necesita acceder al documento para leer `noindex`. Tampoco añadir sitemap, etiquetas `googlebot` redundantes o datos estructurados de ofertas.

Alternativas descartadas: bloquear solo el rastreo puede dejar la URL en los resultados; usar `noindex` únicamente en desarrollo permitiría indexar accidentalmente la compilación publicada.

### 3. Metadata social textual

Añadir `og:type=website`, `og:site_name`, `og:title`, `og:description`, `twitter:card=summary`, `twitter:title` y `twitter:description`. Usar `property` para Open Graph y `name` para las etiquetas Twitter. No inventar cuentas de autor o de marca.

El alcance es metadata textual básica: no se garantiza una tarjeta visual completa en cada plataforma. El [protocolo Open Graph](https://ogp.me/) incluye `og:image` y `og:url` entre sus propiedades básicas; este cambio omite la imagen y pospone `og:url` hasta disponer de una dirección real. Se elige esa limitación explícita antes que fabricar una URL o reutilizar automáticamente la imagen de referencia del hero. El resultado visual final depende de cada consumidor.

### 4. URL pública opcional y explícita

Leer `SITE_URL` del entorno del proceso de compilación en `astro.config.mjs` y, cuando tenga un valor no vacío válido, asignarlo a `site`. Documentar la variable en `.env.example` sin un dominio de ejemplo activo. El README explicará cómo suministrarla mediante el entorno o con `SITE_URL=<URL-publica-real> pnpm build`; no debe prometer que la configuración lee automáticamente un archivo `.env`.

Tratar valores vacíos o compuestos de espacios como ausencia de configuración. Para valores no vacíos, usar la API URL y rechazar protocolos ajenos a HTTP/HTTPS, credenciales, query, fragmento y hosts locales (`localhost`, loopback o direcciones no especificadas). Un error debe identificar `SITE_URL` sin reproducir posibles credenciales. Esta validación comprueba formato y evita direcciones locales; no requiere DNS, peticiones de red ni acreditar propiedad de un dominio.

En el layout, derivar la URL de la página únicamente de `Astro.site` y del pathname, conservando el path base si se configura. Emitir canonical y `og:url` juntos, solo cuando exista `Astro.site`, y nunca usar el origen de la petición como sustituto. Ambos deben carecer de query y fragmento. La [referencia de Astro](https://docs.astro.build/en/reference/configuration-reference/#site) define `site` como la URL final desplegada que sirve de base para canonical.

El canonical identifica la URL preferida y no cambia `noindex`. Se descarta inferir un dominio del nombre Relevo, de una URL de preview o de localhost.

### 5. Verificación proporcional

No instalar un runner ni añadir pruebas que solo repitan los valores del objeto de metadata. Durante la aplicación, ejecutar compilaciones e inspeccionar el HTML generado, usando las herramientas locales disponibles:

1. Sin `SITE_URL`: título y descripción educativos únicos, robots y etiquetas sociales presentes; canonical y `og:url` ausentes.
2. Con una URL pública de prueba explícita: canonical y `og:url` absolutos y coincidentes; `noindex, follow` permanece presente.
3. Con valores inválidos, incluidos URL relativa, protocolo ajeno a HTTP/HTTPS y localhost: fallo de configuración comprensible.
4. Confirmar que no se añade un bloqueo de rastreo, sitemap o datos estructurados comerciales, y que no cambian las dependencias ni el contenido visible del body.

Un dominio reservado puede usarse exclusivamente como entrada de verificación temporal, nunca como valor publicado o predeterminado del proyecto. Terminar con una compilación sin URL de prueba para que esa entrada no quede en `dist/`.

## Risks / Trade-offs

- `noindex` depende de que el buscador respete y haya leído la directiva → documentar su función como exclusión de resultados, sin prometer privacidad o retirada inmediata de URLs que ya se hubieran indexado.
- Un alojamiento podría añadir cabeceras robots o bloquear el acceso → revisar la respuesta real cuando se publique; el despliegue está fuera de este cambio.
- Las vistas previas sociales pueden ser incompletas sin imagen y sin URL pública → aceptar esa limitación para el alcance educativo y conservar metadata textual coherente.
- Una URL temporal de prueba podría quedar en la salida local → terminar la verificación regenerando la salida sin esa configuración.
- La nueva descripción no coincide literalmente con el discurso comercial del body → es deliberado: identifica la naturaleza de la demostración sin rediseñar la landing.

## Migration Plan

1. Incorporar los valores compartidos y las etiquetas al layout.
2. Añadir la URL pública opcional y su documentación, manteniendo `noindex` incondicional.
3. Ejecutar la matriz de compilaciones y revisar el HTML. No se requiere servidor de desarrollo para validar estas etiquetas estáticas.
4. Para revertir, deshacer únicamente los archivos de implementación de este cambio; no hay migraciones de datos ni acciones externas.
