# Spec Delta

## MODIFIED Requirements

### Requirement: Accessible semantic document
La landing SHALL incluir idioma inglés declarado, título y descripción que identifiquen Relevo como proyecto de aprendizaje, un único h1, regiones semánticas, foco visible y controles con nombres accesibles. Los controles táctiles SHALL ofrecer un área de interacción mínima de 44 por 44 px.

#### Scenario: Keyboard and assistive technology review
- **WHEN** se recorre la página con Tab y se inspecciona su estructura accesible
- **THEN** los controles disponibles tienen nombre y foco visible, y el orden de navegación sigue el contenido
- **AND** los títulos y regiones permiten identificar hero, funcionalidades, precios y footer

#### Scenario: Reading the educational document identity
- **WHEN** se inspecciona el HTML inicial de `/`, incluso sin JavaScript
- **THEN** existe un único título `Relevo — Astro Learning Project`
- **AND** existe una única descripción `An educational landing page built with Astro to practice responsive design, accessible interfaces, and web animations. Not a commercial service.`
- **AND** el documento conserva el idioma inglés y un único h1 con el contenido existente del hero

## ADDED Requirements

### Requirement: Learning project search exclusion
Toda página que use el layout compartido SHALL incluir una única directiva `robots` con valor `noindex, follow` en el HTML inicial, independientemente del entorno o la URL pública configurada. El sitio no SHALL bloquear mediante `robots.txt` el rastreo necesario para leer esa directiva ni publicar directivas de indexación contradictorias.

#### Scenario: Inspecting a production build
- **WHEN** se compila y se inspecciona el HTML de `/`
- **THEN** el head incluye `<meta name="robots" content="noindex, follow">` o su equivalente HTML autocerrado
- **AND** no existe otra directiva robots o googlebot que autorice la indexación
- **AND** el recurso `/` no está bloqueado para los rastreadores por un archivo `robots.txt` generado por el proyecto

#### Scenario: Configuring a public address
- **WHEN** se compila el proyecto con una URL pública configurada
- **THEN** el HTML conserva `noindex, follow`
- **AND** configurar el dominio no habilita la indexación

### Requirement: Educational social metadata
El HTML inicial SHALL incluir `og:type` con valor `website`, `og:site_name` con valor `Relevo`, `og:title`, `og:description`, `twitter:card` con valor `summary`, `twitter:title` y `twitter:description`. Los títulos y descripciones sociales SHALL coincidir con los educativos del documento. No SHALL publicarse datos estructurados que presenten los planes de demostración como ofertas comerciales.

#### Scenario: Inspecting social sharing tags
- **WHEN** un consumidor de metadata lee el HTML inicial sin ejecutar JavaScript
- **THEN** encuentra una única instancia de cada etiqueta social requerida
- **AND** el título y la descripción del documento coinciden con sus equivalentes Open Graph y Twitter/X
- **AND** no encuentra datos estructurados de productos, precios u ofertas de un servicio activo

### Requirement: Explicit public metadata URLs
El canonical y `og:url` SHALL emitirse únicamente cuando se configure explícitamente una URL pública absoluta válida. Ambos SHALL apuntar a la URL de la página en ese sitio, sin query ni fragmento. Sin configuración SHALL omitirse ambos, sin sustituirlos por localhost, dominios de ejemplo ni una URL inferida de la petición.

#### Scenario: Building without a public address
- **WHEN** se compila sin URL pública configurada
- **THEN** no se emiten canonical ni `og:url`
- **AND** las demás etiquetas educativas, sociales y de exclusión siguen presentes

#### Scenario: Building with a public address
- **WHEN** se compila con la URL pública configurada
- **THEN** canonical y `og:url` son URLs absolutas iguales para `/`, pertenecientes al sitio configurado y sin query ni fragmento
- **AND** el documento conserva la exclusión de buscadores

#### Scenario: Invalid configured address
- **WHEN** se configura un valor no vacío que no es una URL pública absoluta HTTP o HTTPS válida
- **THEN** la compilación falla con un error de configuración comprensible en lugar de publicar URLs engañosas
