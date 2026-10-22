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

### Requirement: Orchestrated initial entrance
Al cargar `/` con JavaScript y movimiento permitido, la landing SHALL coordinar nav, badge, título por palabras, descripción y CTA con garantía en aproximadamente 1,3 segundos. La ilustración vectorial SHALL construir sus piezas en su posición durante aproximadamente 2,4 segundos al estar visible, sin retrasar texto o interacción. El título SHALL conservar su composición y un único nombre accesible.

#### Scenario: First presentation
- **WHEN** se presenta la parte superior de `/` con movimiento permitido
- **THEN** el nav inicia la secuencia y badge, título, descripción y CTA con garantía aparecen escalonadamente
- **AND** las piezas vectoriales de la ilustración pueden construirse mientras el texto termina su entrada si ya está visible y su geometría preparada, sin esperar la finalización de cada grupo anterior
- **AND** las palabras del título se revelan hacia arriba desde máscaras individuales con 80 ms de separación y el CTA y la garantía se presentan juntos
- **AND** la entrada no modifica el espacio ocupado por los elementos ni causa saltos de contenido
- **AND** la actividad ambiental del hero espera a que terminen o se den por terminadas tanto la última palabra como la construcción

#### Scenario: Responsive entrance
- **WHEN** se carga la página en móvil o escritorio
- **THEN** la entrada respeta el orden visual, el encuadre de la ilustración y los controles disponibles en ese ancho
- **AND** el menú móvil cerrado y los elementos ocultos por el diseño adaptable permanecen ocultos
- **AND** no aparece desplazamiento horizontal ni contenido recortado por la entrada
- **AND** el título conserva sus saltos de línea y tecnologías de asistencia lo anuncian como una sola frase
- **AND** la construcción de la ilustración no se consume mientras está fuera de pantalla

### Requirement: Single document entrance
La entrada del nav y texto del hero SHALL ejecutarse como máximo una vez por carga y comenzar sin esperar todos los recursos. Estos grupos SHALL adoptar su estado final si se inicia en una sección desplazada, se abandona la parte superior, se oculta la pestaña o se restaura desde historial. Finalizar esa entrada por scroll no SHALL cancelar una construcción de ilustración que aún no empezó.

#### Scenario: Returning to the hero
- **WHEN** se vuelve al hero mediante scroll, un enlace interno o la restauración del documento desde el historial
- **THEN** nav y texto del hero permanecen en su estado final sin repetir la entrada
- **AND** una construcción ya presentada u omitida no vuelve a ejecutarse

#### Scenario: Leaving during the entrance
- **WHEN** se hace scroll fuera de la parte superior o se oculta la pestaña antes de terminar la entrada
- **THEN** la entrada del nav y texto se da por terminada y esos grupos quedan en su estado final
- **AND** al regresar no se reproduce una secuencia atrasada
- **AND** si el desplazamiento acerca por primera vez la ilustración a pantalla, su construcción pendiente puede comenzar conforme a sus propias reglas de visibilidad

#### Scenario: Slow resources
- **WHEN** un recurso ajeno al contenido inicial tarda en cargar
- **THEN** la entrada y el acceso al mensaje y al CTA no esperan a ese recurso
- **AND** preparar la construcción del SVG no bloquea la secuencia del título ni el uso de enlaces o controles y no depende de cargar una imagen del hero

### Requirement: Entrance progressive enhancement
Con movimiento reducido o sin JavaScript, nav y hero SHALL presentarse completos en su estado final. Si falla o se retrasa la inicialización de la entrada, el contenido SHALL recuperar automáticamente su estado visible sin intervención. Activar movimiento reducido durante la secuencia SHALL finalizarla inmediatamente; desactivarlo no SHALL repetirla.

#### Scenario: Static initial presentation
- **WHEN** se carga `/` sin JavaScript o con movimiento reducido activado
- **THEN** el nav y el hero están visibles en sus posiciones finales sin entrada animada
- **AND** los enlaces y la navegación conservan el comportamiento estático existente

#### Scenario: Initialization failure
- **WHEN** no se completa la inicialización de la entrada
- **THEN** el contenido no permanece oculto y recupera automáticamente su presentación final

#### Scenario: Preference changes during entrance
- **WHEN** se activa movimiento reducido mientras se reproduce la entrada
- **THEN** todos los grupos adoptan inmediatamente su estado final
- **AND** al desactivar la preferencia no se repite la entrada

### Requirement: Entrance interaction availability
La entrada SHALL conservar semántica, orden de foco y acceso inmediato a los enlaces y controles. Si un elemento recibe foco durante la entrada, SHALL quedar visible en su posición final antes de continuar la interacción. La animación no SHALL bloquear clics, teclado o desplazamiento.

#### Scenario: Early keyboard interaction
- **WHEN** se accede mediante teclado a un control del nav o del hero durante la entrada
- **THEN** el control y su indicador de foco son visibles en su posición final y se pueden activar inmediatamente

#### Scenario: Early pointer interaction
- **WHEN** se activa el CTA o el menú durante la entrada
- **THEN** la acción se ejecuta inmediatamente y conserva su destino o estado accesible existente

### Requirement: Lower section scroll entrances
Con movimiento permitido y JavaScript disponible, Features, Pricing, Get started y Footer SHALL introducir sus grupos de contenido al entrar en el viewport, siguiendo el orden visual de lectura. Los encabezados SHALL preceder a los contenidos de su sección cuando ambos entren juntos, sin exigir que termine una animación para iniciar la siguiente.

#### Scenario: Reading features and pricing on desktop
- **WHEN** se baja desde el hero hacia Features y Pricing en escritorio
- **THEN** cada encabezado aparece antes que sus tarjetas cuando llegan juntos a pantalla
- **AND** las tres tarjetas de cada fila aparecen con un desfase de 70 ms entre tarjetas visibles
- **AND** el selector de facturación acompaña la presentación del encabezado de precios

#### Scenario: Reaching the closing sections
- **WHEN** Get started y Footer entran en el viewport
- **THEN** el texto y el botón del CTA se presentan juntos y su ilustración aparece gradualmente como una unidad
- **AND** los grupos del footer y su franja inferior aparecen conforme llegan a pantalla, conservando el orden de lectura

### Requirement: Responsive bounded scroll motion
Las entradas por scroll SHALL usar opacidad y desplazamientos verticales de hasta 12 px, con duraciones individuales de 1600–2000 ms, 140 ms de espera inicial y desaceleración sin rebote. La ilustración del CTA SHALL entrar solo por opacidad. Las tarjetas apiladas SHALL activarse individualmente al llegar al viewport, sin retrasos heredados de tarjetas fuera de pantalla.

#### Scenario: Reviewing motion and layout
- **WHEN** se observa la entrada de una sección inferior
- **THEN** la animación no altera el espacio reservado, las líneas de la retícula ni el tamaño de las tarjetas
- **AND** no aparecen escala, desenfoque, desplazamientos horizontales o saltos de contenido

#### Scenario: Reading stacked cards
- **WHEN** se recorren funcionalidades y precios a 320 o 390 px de ancho
- **THEN** cada tarjeta aparece al llegar a pantalla sin esperar que se muestre la sección completa
- **AND** no existe desfase acumulado por su posición en la lista ni desbordamiento horizontal

### Requirement: Single presentation of scroll groups
Cada grupo inferior SHALL animarse como máximo una vez por carga del documento. Los grupos ya visibles al inicializar, situados por encima de la posición inicial o recuperados desde el historial SHALL adoptar su estado final. Un grupo que abandona la pantalla durante su entrada SHALL finalizarla, sin reproducirla al regresar.

#### Scenario: Revisiting a section
- **WHEN** se regresa a una sección ya presentada mediante scroll o un enlace interno
- **THEN** sus grupos permanecen visibles en su estado final sin repetir su entrada

#### Scenario: Loading below the hero
- **WHEN** el documento se inicia con una posición desplazada o un enlace directo a una sección inferior
- **THEN** el contenido ya visible y los grupos que quedaron por encima se muestran completos
- **AND** los grupos aún no presentados más abajo pueden entrar al llegar a pantalla

#### Scenario: Fast scrolling past a group
- **WHEN** se supera un grupo antes de terminar o iniciar su entrada
- **THEN** el grupo adopta su estado final y no reproduce una animación atrasada al regresar

#### Scenario: Restoring from history
- **WHEN** se restaura el documento desde el historial
- **THEN** todos los grupos inferiores se presentan en su estado final sin una nueva secuencia

### Requirement: Scroll entrance progressive enhancement
Sin JavaScript, con movimiento reducido o si falla la inicialización, las secciones inferiores SHALL estar completas y visibles. Activar movimiento reducido SHALL finalizar las entradas y mantener estáticos todos los grupos durante el resto de esa carga. Ocultar la pestaña SHALL finalizar las entradas activas; al volver, los grupos visibles SHALL mostrarse completos.

#### Scenario: Static and failed initialization
- **WHEN** se abre la página sin JavaScript, con movimiento reducido o sin inicialización funcional de las entradas
- **THEN** textos, ilustraciones y controles conservan su presentación estática y no queda contenido oculto esperando scroll

#### Scenario: Changing preferences during an entrance
- **WHEN** se activa movimiento reducido durante una entrada inferior
- **THEN** todos los grupos quedan en su estado final inmediatamente
- **AND** desactivar la preferencia no vuelve a animarlos durante esa carga

#### Scenario: Leaving the tab during an entrance
- **WHEN** se oculta la pestaña mientras se presenta un grupo
- **THEN** la entrada activa finaliza
- **AND** al regresar no se reproduce una secuencia atrasada de los grupos visibles

### Requirement: Scroll entrance interaction availability
Las entradas inferiores SHALL conservar semántica, orden de foco y acceso inmediato a controles y destinos internos. Recibir foco o ser destino de navegación interna SHALL presentar inmediatamente el grupo afectado en su estado final. Ninguna entrada SHALL bloquear scroll, teclado, clics o interacción con precios.

#### Scenario: Focusing a control during its entrance
- **WHEN** un enlace o botón recibe foco dentro de un grupo que está entrando
- **THEN** el grupo y su foco quedan visibles en su posición final antes de continuar la interacción
- **AND** el control funciona inmediatamente sin esperar la animación

#### Scenario: Jumping to pricing
- **WHEN** se activa un enlace interno hacia precios mientras su contenido todavía no se ha presentado
- **THEN** el encabezado y los controles visibles del destino se muestran completos al llegar
- **AND** el selector mensual/anual conserva sus importes y estados accesibles

### Requirement: Scroll entrance compatibility with existing motion
Las entradas inferiores SHALL conservar la entrada inicial del nav y hero, la geometría y reproducción de las ilustraciones y su control de pausa. Las entradas por scroll SHALL ser independientes de los bucles continuos y no SHALL esperar la finalización de la entrada del hero ni alterar una pausa manual solicitada.

#### Scenario: Scrolling away from the initial entrance
- **WHEN** se abandona el hero durante su entrada y se llega a una sección inferior
- **THEN** la entrada inicial termina según sus reglas existentes y la sección inferior puede presentarse
- **AND** volver al hero no repite su secuencia

#### Scenario: Continuous illustrations remain paused
- **WHEN** se solicita pausa manual y luego se recorren las secciones inferiores
- **THEN** sus entradas breves pueden presentarse una vez y las ilustraciones conservan la pausa solicitada
- **AND** reanudar los bucles no repite las entradas ya presentadas

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
