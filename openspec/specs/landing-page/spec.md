# landing-page Specification

## Purpose

Presentar la propuesta pública de Relevo mediante una landing editorial accesible, con navegación, funcionalidades y comparación de planes que se adapten a móviles y escritorio.

## Requirements

### Requirement: Continuous landing composition
La ruta `/` SHALL presentar una página continua en inglés con navegación, hero, funcionalidades, precios, CTA final y footer, en ese orden, reemplazando la bienvenida de Astro.

#### Scenario: Visiting the homepage
- **WHEN** una persona abre `/`
- **THEN** ve la marca Relevo y el título "Your agents run while you sleep."
- **AND** puede recorrer todas las secciones en una misma página, sin una cuadrícula de cuatro capturas
- **AND** no aparece contenido de bienvenida ni identidad visual de Astro

### Requirement: Reference visual identity
La landing SHALL conservar la identidad de la referencia: fondo marfil, bordes rectos y líneas grises finas, títulos serif, texto sans serif, etiquetas monoespaciadas y acentos naranjas; el plan Pro SHALL destacarse con fondo negro.

#### Scenario: Desktop visual review
- **WHEN** se revisa la página en un viewport de 1440 px
- **THEN** el hero está centrado, la ilustración principal se extiende debajo del texto y las tarjetas de funcionalidades y precios forman grupos de tres columnas
- **AND** la retícula del footer y los márgenes mantienen alineación con el contenido principal
- **AND** Pro se distingue de Starter y Max por su fondo negro y acento naranja

### Requirement: Responsive content layout
La landing SHALL funcionar desde 320 px de ancho sin desplazamiento horizontal ni contenido o controles recortados. En móvil las tarjetas SHALL apilarse y las ilustraciones SHALL conservar su motivo principal legible.

#### Scenario: Narrow mobile viewport
- **WHEN** la página se visualiza a 320 o 390 px de ancho
- **THEN** funcionalidades y precios se presentan en una columna y el footer reorganiza sus bloques
- **AND** ningún texto, campo, control o tarjeta excede el ancho disponible
- **AND** el título, el CTA y el cubo central permanecen visibles y legibles

#### Scenario: Tablet and large desktop
- **WHEN** la página se visualiza a 768, 1024 o 1920 px de ancho
- **THEN** las columnas y los espacios se adaptan al ancho disponible sin superposiciones
- **AND** el contenido permanece dentro de un contenedor centrado en pantallas amplias

### Requirement: Accessible mobile navigation
La navegación SHALL ofrecer enlaces internos a secciones existentes y, en pantallas estrechas, un menú desplegable operable por teclado con estado abierto/cerrado comunicado a tecnologías de asistencia.

#### Scenario: Opening and closing the menu
- **WHEN** una persona activa el botón de menú usando teclado o toque
- **THEN** puede acceder a sus enlaces y el control informa que está expandido
- **AND** al presionar Escape el menú se cierra y el foco vuelve al botón

#### Scenario: Selecting a section
- **WHEN** se activa el enlace interno de precios o funcionalidades desde el menú móvil
- **THEN** la página muestra la sección correspondiente y cierra el menú
- **AND** los controles ocultos del menú cerrado no reciben foco

### Requirement: Billing period comparison
La sección de precios SHALL mostrar Starter, Pro y Max a $25, $49 y $99 mensuales inicialmente. El selector mensual/anual SHALL actualizar importes y comunicar el periodo; el anual SHALL aplicar dos meses gratis y mostrar el total anual junto al equivalente mensual.

#### Scenario: Switching to yearly billing
- **WHEN** se selecciona facturación anual
- **THEN** Starter muestra $250/año y $20.83/mes equivalente, Pro $490/año y $40.83/mes equivalente, y Max $990/año y $82.50/mes equivalente
- **AND** el estado seleccionado es reconocible visualmente y por tecnologías de asistencia
- **AND** los recursos de cada plan no cambian

#### Scenario: Returning to monthly billing
- **WHEN** se vuelve a seleccionar facturación mensual
- **THEN** se restauran $25, $49 y $99 por mes y desaparece el total anual

### Requirement: Honest action availability
Los CTA de lanzamiento SHALL llevar a la sección local de precios mientras no exista un destino de lanzamiento configurado. Las acciones de autenticación, espera, suscripción y enlaces externos sin destino SHALL mostrarse como no disponibles, sin navegación falsa ni confirmaciones de éxito ficticias.

#### Scenario: Launching from the hero
- **WHEN** una persona activa "Launch your agent" sin un destino externo configurado
- **THEN** llega a la sección de precios mediante un enlace interno válido

#### Scenario: Unconfigured subscription service
- **WHEN** se visualiza el bloque de suscripción sin un servicio configurado
- **THEN** se indica que la suscripción no está disponible y no se permite enviar datos
- **AND** la página no anuncia una suscripción exitosa

### Requirement: Accessible semantic document
La landing SHALL incluir idioma inglés declarado, título y descripción de Relevo, un único h1, regiones semánticas, foco visible y controles con nombres accesibles. Los controles táctiles SHALL ofrecer un área de interacción mínima de 44 por 44 px.

#### Scenario: Keyboard and assistive technology review
- **WHEN** se recorre la página con Tab y se inspecciona su estructura accesible
- **THEN** los controles disponibles tienen nombre y foco visible, y el orden de navegación sigue el contenido
- **AND** los títulos y regiones permiten identificar hero, funcionalidades, precios y footer

### Requirement: Useful static fallback
Con JavaScript deshabilitado, la landing SHALL mantener visibles los textos, precios mensuales, ilustraciones estáticas y enlaces internos; la navegación móvil SHALL seguir siendo accesible y el selector de precios no SHALL aparentar funcionamiento.

#### Scenario: Loading without JavaScript
- **WHEN** se abre `/` sin ejecutar JavaScript
- **THEN** se puede leer toda la página y navegar a precios y funcionalidades
- **AND** se muestran los precios mensuales sin controles de facturación inoperantes

### Requirement: Consistent interface iconography
Los CTA de lanzamiento y el botón de suscripción SHALL mostrar iconos vectoriales de trazo consistente, con tamaño y color legibles sobre sus fondos. Los iconos decorativos SHALL quedar excluidos de tecnologías de asistencia y del foco; los controles SHALL conservar sus nombres, destinos y disponibilidad.

#### Scenario: Reviewing action arrows
- **WHEN** se revisan encabezado, hero, precios y CTA final
- **THEN** todos los enlaces de lanzamiento muestran una flecha diagonal hacia arriba y a la derecha, con trazo y tamaño consistentes
- **AND** las flechas mantienen contraste en los botones oscuros, claros y de contorno
- **AND** el botón de suscripción muestra una flecha hacia la derecha y conserva su estado deshabilitado

#### Scenario: Reading controls with assistive technology
- **WHEN** se recorre la landing por teclado o con tecnología de asistencia
- **THEN** cada control mantiene su nombre accesible y los iconos no generan anuncios ni puntos de foco adicionales
- **AND** las áreas táctiles de los controles disponibles mantienen un mínimo de 44 por 44 px

### Requirement: State-aware control icons
Los controles de menú móvil y de animaciones SHALL mostrar un icono correspondiente a la acción disponible y actualizarlo junto con su etiqueta y estado accesible. El icono de menú SHALL cambiar entre abrir y cerrar; el de movimiento SHALL cambiar entre pausar y reanudar conforme a la pausa solicitada por la persona.

#### Scenario: Opening and closing mobile navigation
- **WHEN** se abre el menú móvil
- **THEN** el icono de menú cambia a una cruz, la etiqueta indica cerrar y el control informa que está expandido
- **AND** al cerrar mediante el botón, Escape, un enlace de sección o un cambio a escritorio se restaura el icono de menú y el estado cerrado
- **AND** Escape devuelve el foco al botón de menú

#### Scenario: Pausing and resuming animations
- **WHEN** se activa el control de pausa con movimiento reducido desactivado
- **THEN** las escenas se pausan y el control muestra un triángulo de reproducción, la etiqueta de reanudar y el estado pulsado
- **AND** al reanudar se restauran el icono de pausa, su etiqueta y el estado no pulsado
- **AND** los iconos conservan su forma vectorial después de alternar repetidamente el control y cambiar la visibilidad de la pestaña

#### Scenario: Reduced motion preference
- **WHEN** se activa la preferencia de movimiento reducido
- **THEN** las escenas permanecen estáticas y el control de movimiento queda oculto
- **AND** al desactivar la preferencia durante la misma visita el icono y la etiqueta reflejan la pausa solicitada por la persona

### Requirement: Static icon rendering
Las flechas de los enlaces de lanzamiento y del botón de suscripción SHALL estar presentes desde el HTML inicial y conservar su forma sin JavaScript. La incorporación de iconos SHALL preservar la navegación móvil disponible sin JavaScript y mantener ocultos los controles que dependen de él.

#### Scenario: Loading icons without client scripts
- **WHEN** se abre la landing sin JavaScript
- **THEN** los enlaces de lanzamiento conservan sus flechas y navegan a precios
- **AND** la flecha de suscripción se muestra dentro del botón deshabilitado
- **AND** los enlaces de navegación móvil siguen disponibles y los botones de menú y movimiento permanecen ocultos
