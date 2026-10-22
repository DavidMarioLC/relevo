# Spec Delta

## ADDED Requirements

### Requirement: Orchestrated initial entrance
Al cargar `/` con JavaScript y movimiento permitido, la landing SHALL presentar una entrada coordinada y solapada del nav, badge, título completo, descripción, CTA con garantía e ilustración. La secuencia SHALL durar menos de un segundo desde su inicio, con desplazamientos pequeños, aparición gradual y desaceleración sin rebote.

#### Scenario: First presentation
- **WHEN** se presenta la parte superior de `/` con movimiento permitido
- **THEN** el nav inicia la secuencia y badge, título, descripción y CTA con garantía aparecen escalonadamente
- **AND** la ilustración aparece mientras el texto termina su entrada, sin esperar a que finalice cada grupo anterior
- **AND** el título aparece como una unidad y el CTA y la garantía se presentan juntos
- **AND** la entrada no modifica el espacio ocupado por los elementos ni causa saltos de contenido

#### Scenario: Responsive entrance
- **WHEN** se carga la página en móvil o escritorio
- **THEN** la entrada respeta el orden visual, el encuadre de la ilustración y los controles disponibles en ese ancho
- **AND** el menú móvil cerrado y los elementos ocultos por el diseño adaptable permanecen ocultos
- **AND** no aparece desplazamiento horizontal ni contenido recortado por la entrada

### Requirement: Single document entrance
La entrada SHALL ejecutarse como máximo una vez por carga del documento y comenzar sin esperar la carga de todos los recursos. La página SHALL adoptar el estado final si se carga en una sección desplazada, se abandona la parte superior durante la entrada, se oculta la pestaña o se restaura el documento desde el historial.

#### Scenario: Returning to the hero
- **WHEN** se vuelve al hero mediante scroll, un enlace interno o la restauración del documento desde el historial
- **THEN** nav y hero permanecen en su estado final sin repetir la entrada

#### Scenario: Leaving during the entrance
- **WHEN** se hace scroll fuera de la parte superior o se oculta la pestaña antes de terminar la entrada
- **THEN** la entrada se da por terminada y el contenido queda en su estado final
- **AND** al regresar no se reproduce una secuencia atrasada

#### Scenario: Slow resources
- **WHEN** un recurso ajeno al contenido inicial tarda en cargar
- **THEN** la entrada y el acceso al mensaje y al CTA no esperan a ese recurso

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
