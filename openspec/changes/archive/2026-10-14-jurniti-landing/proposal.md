# Proposal

## Why

Jurniti muestra actualmente la bienvenida de Astro y necesita una landing que comunique su propuesta de agentes siempre activos. La referencia aportada define una identidad visual clara que debe mantenerse en móviles y enriquecerse con ilustraciones vectoriales animadas.

## What Changes

- Sustituir la bienvenida de `/` por una página continua con navegación, hero, funcionalidades, precios, CTA final y footer, siguiendo los cuatro paneles de la referencia en orden de lectura.
- Reproducir el fondo marfil, la retícula de líneas finas, la tipografía editorial y los acentos naranjas; conservar inicialmente el contenido en inglés.
- Recrear como SVG las cinco escenas isométricas: máquina central, aislamiento, propiedad de claves, almacenamiento y despliegue con grúa.
- Incorporar movimiento sutil, pausa fuera de pantalla y versión estática para preferencias de movimiento reducido.
- Adaptar navegación, ilustraciones, tarjetas y footer desde 320 px hasta escritorio, sin desbordamiento horizontal.
- Añadir menú móvil y selector de facturación accesibles. Mostrar explícitamente los estados no disponibles de acciones que carezcan de destino o servicio configurado.
- Limitar este cambio al frontend: no incluye autenticación, cobros, despliegue real de agentes, servicio de newsletter ni publicación del sitio.

## Capabilities

### New Capabilities

- `landing-page`: Presentación pública de Jurniti, navegación, precios, interacciones locales y adaptación responsive accesible.
- `animated-illustrations`: Escenas vectoriales isométricas con movimiento contextual, adaptación móvil y control según visibilidad y preferencias de movimiento.

### Modified Capabilities

Ninguna; el proyecto no tiene especificaciones previas.

## Impact

- Se modificarán `src/pages/index.astro` y `src/layouts/Layout.astro` durante implementación.
- Se añadirán componentes de landing e ilustraciones, estilos compartidos y datos de contenido/precios dentro de `src/`; se actualizará la identidad del favicon en `public/`.
- Astro es la única dependencia actual. Se propone mantener componentes Astro, SVG, CSS y JavaScript nativo sin añadir un framework de interfaz o motor 3D.
- La referencia es un JPEG local, no contiene SVG originales ni especifica tiempos de animación; las escenas se reconstruirán y sus movimientos serán una interpretación de diseño.
- Los importes y mensajes comerciales de la referencia son contenido de maqueta, no una integración comercial operativa.
