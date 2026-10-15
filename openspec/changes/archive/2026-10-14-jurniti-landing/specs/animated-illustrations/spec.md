# Spec Delta

## Purpose

Explicar visualmente el funcionamiento de Jurniti mediante escenas vectoriales isométricas animadas que mantengan su claridad en distintos tamaños de pantalla y respeten las preferencias de movimiento.

## ADDED Requirements

### Requirement: Vector scene coverage
La landing SHALL incluir cinco escenas vectoriales: máquina central conectada a agentes, máquina aislada, propiedad de claves, almacenamiento persistente y despliegue mediante grúa. Las escenas SHALL usar líneas finas grises, plataformas isométricas y acentos naranjas coherentes con la referencia.

#### Scenario: Reviewing illustration placement
- **WHEN** se recorren hero, funcionalidades y CTA final
- **THEN** el hero contiene la máquina central, cada una de las tres funcionalidades contiene su escena y el CTA contiene la grúa
- **AND** las ilustraciones conservan bordes definidos al ampliar la página

### Requirement: Contextual scene animation
Con movimiento habilitado, cada escena visible SHALL animar elementos relacionados con su mensaje sin desplazar el contenido de la página ni reducir la legibilidad del texto.

#### Scenario: Hero activity
- **WHEN** el hero está visible con movimiento habilitado
- **THEN** el cubo central se mueve suavemente y las conexiones y agentes muestran actividad naranja escalonada
- **AND** la escena no mueve el título ni el CTA

#### Scenario: Feature activity
- **WHEN** las funcionalidades están visibles con movimiento habilitado
- **THEN** aislamiento anima el recinto y su cubo, claves anima la llave y su conexión, y almacenamiento anima el ensamblaje de capas y una señal de escritura

#### Scenario: Deployment activity
- **WHEN** el CTA final está visible con movimiento habilitado
- **THEN** la grúa baja el cubo hacia la plataforma y la secuencia regresa suavemente a su inicio

### Requirement: Responsive illustration composition
Las escenas SHALL adaptarse al espacio disponible preservando proporción y motivos principales. En móvil la escena del hero SHALL mantener el cubo y la máquina central con un tamaño reconocible, permitiendo simplificar elementos periféricos decorativos.

#### Scenario: Mobile illustration review
- **WHEN** el ancho del viewport es 320 o 390 px
- **THEN** el cubo central, la llave, las capas y la grúa siguen siendo reconocibles en sus respectivas secciones
- **AND** ninguna escena invade textos o controles ni produce desplazamiento horizontal

### Requirement: Reduced motion preference
Si está activa la preferencia de movimiento reducido, las ilustraciones SHALL mostrar una composición estática completa sin flotación, recorridos, ensamblajes ni entradas animadas. Los cambios de preferencia durante la visita SHALL aplicarse sin recargar la página.

#### Scenario: Reduced motion at load
- **WHEN** se abre la página con movimiento reducido activado
- **THEN** las cinco escenas están completas y estáticas desde su presentación
- **AND** ninguna información depende de que se ejecute una animación

#### Scenario: Preference changes during a visit
- **WHEN** se activa movimiento reducido con una escena animándose
- **THEN** la escena pasa a una composición estática estable

### Requirement: Visibility controlled playback
Las animaciones SHALL pausarse cuando su escena sale del viewport o la pestaña queda oculta. Solo SHALL reanudarse cuando la escena vuelva a estar visible en una pestaña activa y el movimiento esté permitido.

#### Scenario: Scrolling past a scene
- **WHEN** una escena sale por completo del viewport
- **THEN** su animación deja de avanzar
- **AND** al regresar continúa sin modificar la posición del contenido circundante

#### Scenario: Switching browser tabs
- **WHEN** la pestaña de la landing queda oculta
- **THEN** todas las escenas se pausan
- **AND** al volver solo se reanudan las escenas visibles con movimiento permitido

### Requirement: Illustration accessibility
Las ilustraciones SHALL evitar controles o texto esencial dentro del dibujo. Las escenas decorativas asociadas a una explicación textual SHALL quedar fuera de la navegación por teclado y no SHALL producir anuncios repetidos de elementos internos.

#### Scenario: Reading a feature with a screen reader
- **WHEN** se lee la sección de funcionalidades con tecnología de asistencia
- **THEN** el título y la descripción comunican el beneficio sin depender del dibujo
- **AND** las piezas internas de la ilustración no generan una lista de anuncios ni puntos de foco

### Requirement: Continuous motion control
La página SHALL ofrecer un control accesible para pausar y reanudar las animaciones continuas. La pausa solicitada por el usuario SHALL mantenerse durante la visita y prevalecer al cambiar de sección o volver a la pestaña.

#### Scenario: User pauses motion
- **WHEN** se activa el control de pausa
- **THEN** se detienen todas las escenas y el control comunica el estado pausado
- **AND** desplazarse o cambiar de pestaña no las reactiva

#### Scenario: User requests playback
- **WHEN** se activa reanudar con movimiento reducido desactivado
- **THEN** solo se animan las escenas visibles en la pestaña activa
- **AND** la preferencia de movimiento reducido, si se activa, mantiene las escenas estáticas
