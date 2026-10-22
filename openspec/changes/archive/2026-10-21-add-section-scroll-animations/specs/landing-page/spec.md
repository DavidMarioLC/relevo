# Spec Delta

## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: Orchestrated initial entrance
Al cargar `/` con JavaScript y movimiento permitido, la landing SHALL presentar una entrada coordinada y solapada del nav, badge, título por palabras, descripción, CTA con garantía e ilustración. La secuencia SHALL durar aproximadamente 1,3 segundos desde su inicio, con aparición gradual y desaceleración sin rebote. El título SHALL conservar su composición y un único nombre accesible.

#### Scenario: First presentation
- **WHEN** se presenta la parte superior de `/` con movimiento permitido
- **THEN** el nav inicia la secuencia y badge, título, descripción y CTA con garantía aparecen escalonadamente
- **AND** la ilustración aparece mientras el texto termina su entrada, sin esperar a que finalice cada grupo anterior
- **AND** las palabras del título se revelan hacia arriba desde máscaras individuales con 80 ms de separación y el CTA y la garantía se presentan juntos
- **AND** la entrada no modifica el espacio ocupado por los elementos ni causa saltos de contenido
- **AND** la actividad ambiental del hero espera a que termine o se dé por terminada la última palabra

#### Scenario: Responsive entrance
- **WHEN** se carga la página en móvil o escritorio
- **THEN** la entrada respeta el orden visual, el encuadre de la ilustración y los controles disponibles en ese ancho
- **AND** el menú móvil cerrado y los elementos ocultos por el diseño adaptable permanecen ocultos
- **AND** no aparece desplazamiento horizontal ni contenido recortado por la entrada
- **AND** el título conserva sus saltos de línea y tecnologías de asistencia lo anuncian como una sola frase
