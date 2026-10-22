# Relevo

Landing page responsive para una plataforma ficticia de ejecución de agentes de IA en la nube. Un proyecto de aprendizaje centrado en composición visual, componentes reutilizables, ilustraciones SVG e interacciones accesibles, construido con Astro y TypeScript.

La interfaz está en inglés e incluye navegación, presentación del producto, funcionalidades, comparación de planes, una llamada final a la acción y footer. La identidad combina fondos marfil, una retícula de líneas finas, tipografía serif y acentos naranjas.

## Qué incluye

- Diseño adaptable a escritorio, tablet y móvil, con navegación entre secciones y menú móvil operable por teclado.
- Cinco escenas isométricas en SVG, con una secuencia de construcción de la ilustración del hero y actividad visual en conexiones, luces y equipos.
- Comparador de planes Starter, Pro y Max con selección mensual o anual: el anual aplica dos meses gratis y muestra el total junto al equivalente mensual.
- Entradas coordinadas en el hero y animaciones de aparición al hacer scroll.
- Efectos de relleno pixelado en botones y desplazamiento de texto en enlaces al pasar el cursor.
- Control para pausar y reanudar las ilustraciones, con gestión de visibilidad y soporte para movimiento reducido.
- Indicadores de foco, enlace para saltar al contenido, nombres accesibles y estados comunicados en los controles.
- Contenido, precios mensuales, ilustraciones estáticas y navegación disponibles sin JavaScript.
- Metadata educativa para el documento, Open Graph y Twitter/X, con exclusión permanente de buscadores mediante `noindex, follow`.

## Alcance de la demo

Relevo es una demostración educativa. Los precios, recursos, garantías y promesas comerciales forman parte de la presentación; no representan un servicio disponible. Las menciones a herramientas y proveedores no implican integraciones ni afiliaciones.

El selector de facturación y el menú funcionan en el navegador. Los botones de lanzamiento llevan a la sección de precios; no crean máquinas ni ejecutan agentes. El acceso no autentica usuarios, no se procesan pagos y los controles de suscripción y lista de espera están deshabilitados. Los enlaces con destino `#` son marcadores y no llevan a páginas adicionales.

El proyecto no requiere backend, base de datos, cuentas de servicios externos ni claves de API para ejecutarse.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| Astro 7 | Componentes `.astro`, composición de la página y generación estática |
| TypeScript | Datos y scripts de las interacciones |
| CSS | Tokens visuales, retícula, diseño responsive y animaciones |
| SVG | Ilustraciones isométricas y elementos gráficos |
| Lucide Astro | Iconos de acciones, navegación y control de movimiento |
| pnpm | Gestión de dependencias y ejecución de comandos |
| OpenSpec | Especificaciones de comportamiento y seguimiento de cambios |

La página se genera como HTML estático. Los scripts del navegador mejoran las interacciones sin una integración de React, Vue o Svelte.

## Desarrollo local

Necesitas **Node.js >=22.12.0** y pnpm. Desde la raíz del repositorio:

```bash
pnpm install --frozen-lockfile
pnpm exec astro dev --background
```

Abre [localhost:4321](http://localhost:4321). Si el puerto está ocupado, consulta la dirección asignada en los logs.

Gestiona el servidor en segundo plano con:

```bash
pnpm exec astro dev status
pnpm exec astro dev logs
pnpm exec astro dev stop
```

No necesitas configurar variables de entorno para probar la landing localmente.

## Comandos

| Comando | Descripción |
| --- | --- |
| `pnpm exec astro dev --background` | Inicia el servidor de desarrollo en segundo plano |
| `pnpm exec astro dev status` | Consulta el estado del servidor |
| `pnpm exec astro dev logs` | Muestra los logs del servidor |
| `pnpm exec astro dev stop` | Detiene el servidor de desarrollo |
| `pnpm build` | Genera la versión estática de producción en `dist/` |
| `pnpm preview` | Sirve localmente la compilación de producción; requiere un build previo |
| `openspec validate --specs --strict` | Valida las especificaciones; requiere la CLI de OpenSpec |

Para revisar la compilación de producción:

```bash
pnpm build
pnpm preview
```

El repositorio no define comandos de lint, formato ni un runner de pruebas automatizadas.

## Estructura

```text
src/
  pages/
    index.astro             Composición de la landing
  layouts/
    Layout.astro            Documento HTML y metadata
  components/
    landing/                Secciones, navegación y efectos de interfaz
    illustrations/          Escenas y piezas SVG reutilizables
  data/
    landing.ts              Textos, planes, recursos y destinos de enlaces
    site.ts                 Nombre, título y descripción educativos
    hero-assembly.ts         Datos de construcción del hero
  scripts/
    entrance.ts             Entrada inicial de navegación y texto
    hero-assembly.ts         Construcción de la ilustración principal
    scroll-reveal.ts         Entradas de secciones al hacer scroll
    motion.ts               Reproducción, pausa y visibilidad de escenas
  styles/
    global.css              Tokens visuales, estilos y reglas responsive
public/
  favicon.svg               Icono del sitio
  images/
    hero-reference.png      Referencia visual original del hero
openspec/
  specs/                    Contratos vigentes del comportamiento
  changes/                  Cambios y su historial de archivo
.env.example                Variable opcional de URL pública
astro.config.mjs            Configuración de Astro y validación de la URL
```

Las escenas actuales se renderizan en SVG. `public/images/hero-reference.png` se conserva como referencia visual original.

## Personalización

- **Contenido y orden de secciones:** edita `src/pages/index.astro`, los componentes de `src/components/landing/` y los textos de `src/data/landing.ts`.
- **Colores, tipografía y espaciado:** modifica los tokens de `src/styles/global.css` y los estilos locales de cada componente.
- **Planes y precios:** actualiza `plans` y `resourceLabels` en `src/data/landing.ts`. El cálculo anual y su presentación están en `src/components/landing/Pricing.astro`.
- **Navegación y destinos:** revisa `navigation`, `footerGroups` y `launchUrl` en `src/data/landing.ts`, junto con los enlaces propios de Header y Footer.
- **Ilustraciones:** edita `src/components/illustrations/`; los datos de montaje del hero están en `src/data/hero-assembly.ts`.
- **Animaciones:** revisa `src/scripts/`, `Entrance.astro`, `ScrollReveal.astro`, `PixelFill.astro` y `RollingText.astro`, manteniendo el comportamiento sin JavaScript y con movimiento reducido.
- **Identidad y metadata:** actualiza `src/data/site.ts`, `src/layouts/Layout.astro`, `src/components/landing/Brand.astro` y `public/favicon.svg`.

## URL pública y SEO

El título `Relevo — Astro Learning Project` y la descripción en inglés identifican el propósito educativo. Open Graph y Twitter/X utilizan esos mismos textos desde el HTML inicial. No se incluye una imagen social propia.

**La exclusión de buscadores permanece activa en todos los entornos**, incluso en producción y cuando se configura un dominio público:

```html
<meta name="robots" content="noindex, follow">
```

No se genera un sitemap ni un archivo `robots.txt` que bloquee el rastreo: los buscadores compatibles necesitan acceder al documento para leer `noindex`. Esta directiva no hace privado el sitio ni garantiza la retirada inmediata de una URL ya indexada.

### Configurar la URL pública

Sin `SITE_URL`, se omiten canonical y `og:url`. Cuando dispongas de una dirección pública real, configura la variable en el entorno del proceso antes del build:

```bash
export SITE_URL='https://tu-dominio.com'
pnpm build
```

Sustituye el dominio de ejemplo por el tuyo. También puedes pasar la variable solo a una compilación:

```bash
SITE_URL='https://tu-dominio.com' pnpm build
```

- La URL debe ser absoluta HTTP o HTTPS, sin credenciales, query ni fragmento.
- Se rechazan localhost y direcciones de loopback o no especificadas; los valores vacíos se tratan como ausencia de configuración.
- `.env.example` documenta la variable. Copiarlo a `.env` no basta: `astro.config.mjs` lee `SITE_URL` desde `process.env`.
- Si publicas bajo un subdirectorio, configura también `base` en Astro para conservar el prefijo de las rutas.
- Al cambiar el dominio, vuelve a compilar para actualizar canonical y `og:url`.
- Configurar la URL **no habilita la indexación**. Las vistas previas al compartir enlaces dependen de cada plataforma y pueden ser incompletas sin una imagen social.

## Producción

Genera los archivos estáticos con:

```bash
pnpm install --frozen-lockfile
pnpm build
```

La carpeta `dist/` puede publicarse en un hosting estático. Configura `SITE_URL` en el entorno de compilación si ya tienes una dirección pública; no se necesita un servidor Node.js para servir la salida generada.

Antes de publicar, revisa la navegación, el selector mensual/anual, el menú móvil y los controles de movimiento. Comprueba también la página sin JavaScript, con movimiento reducido y el HTML generado para confirmar que se mantiene `noindex, follow`.

## Especificaciones y evidencia

`openspec/specs/` recoge los contratos vigentes. `openspec/changes/` contiene las propuestas, diseños y tareas; `openspec/changes/archive/` conserva el historial de los cambios archivados.

Con la CLI de OpenSpec instalada, puedes validar las especificaciones con:

```bash
openspec validate --specs --strict
```

`.artifacts/` almacena evidencia local de verificaciones y está excluida de Git. No es necesaria para ejecutar ni compilar el sitio.
