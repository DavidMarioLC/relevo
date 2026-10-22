# animated-illustrations Specification

## Purpose

Explicar visualmente el funcionamiento de Relevo mediante escenas vectoriales isométricas animadas que mantengan su claridad en distintos tamaños de pantalla y respeten las preferencias de movimiento.

## Requirements

### Requirement: Vector scene coverage
La landing SHALL incluir cinco escenas isométricas vectoriales: máquina central del hero, máquina aislada, propiedad de claves, almacenamiento persistente y despliegue mediante grúa. Las escenas SHALL conservar líneas finas grises, plataformas isométricas y acentos naranjas coherentes con la referencia. El hero SHALL usar geometría SVG propia para cada pieza, también en su estado estático.

#### Scenario: Reviewing illustration placement
- **WHEN** se recorren hero, funcionalidades y CTA final
- **THEN** el hero contiene la máquina central, cada una de las tres funcionalidades contiene su escena y el CTA contiene la grúa
- **AND** las cinco escenas conservan bordes definidos al ampliar la página
- **AND** el hero reproduce la composición de referencia de 1732 × 728 mediante piezas vectoriales sin incluir una imagen rasterizada

### Requirement: Contextual scene animation
Con movimiento habilitado, cada escena visible SHALL animar elementos relacionados con su mensaje sin desplazar contenido ni reducir legibilidad. La actividad ambiental del hero SHALL comenzar cuando hayan finalizado o se hayan dado por terminadas tanto la entrada de texto/nav como la construcción de la ilustración, con escena visible, pestaña activa y sin pausa manual.

#### Scenario: Hero activity
- **WHEN** el hero está visible con movimiento habilitado después de su entrada de texto y construcción
- **THEN** luces, conexiones y monitor muestran actividad naranja discreta en la composición vectorial completa
- **AND** el cubo central, sus etiquetas y los módulos permanecen fijos
- **AND** la escena no mueve el título ni el CTA

#### Scenario: Feature activity
- **WHEN** las funcionalidades están visibles con movimiento habilitado
- **THEN** aislamiento anima el recinto y su cubo, claves anima la llave y su conexión, y almacenamiento anima el ensamblaje de capas y una señal de escritura

#### Scenario: Deployment activity
- **WHEN** el CTA final está visible con movimiento habilitado
- **THEN** la grúa baja el cubo hacia la plataforma y la secuencia regresa suavemente a su inicio

#### Scenario: Hero entrance handoff
- **WHEN** se reproduce la entrada de texto del hero o la ilustración espera o ejecuta su construcción
- **THEN** la capa de actividad ambiental permanece oculta
- **AND** al finalizar ambas secuencias puede comenzar la actividad únicamente si están permitidas reproducción, visibilidad y preferencia de movimiento

#### Scenario: Pausing before the handoff
- **WHEN** se solicita pausa manual antes de terminar la entrada o la construcción
- **THEN** la ilustración queda completamente visible y su actividad ambiental permanece detenida
- **AND** la actividad solo puede comenzar al reanudar con movimiento permitido y la escena visible en una pestaña activa

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
Las animaciones continuas SHALL pausarse cuando su escena sale del viewport o la pestaña queda oculta y reanudarse únicamente con visibilidad y movimiento permitido. La construcción inicial del hero SHALL permanecer pendiente fuera de pantalla si aún no empezó y SHALL darse por terminada si se pierde la visibilidad durante su reproducción.

#### Scenario: Scrolling past a scene
- **WHEN** una escena sale por completo del viewport
- **THEN** su actividad continua deja de avanzar y una construcción activa del hero adopta su estado final
- **AND** al regresar la actividad continua puede reanudarse sin modificar el contenido circundante ni repetir la construcción

#### Scenario: Switching browser tabs
- **WHEN** la pestaña de la landing queda oculta
- **THEN** todas las escenas pausan su actividad continua y la construcción activa del hero queda completa
- **AND** al volver solo se reanudan las escenas visibles con movimiento permitido

#### Scenario: Construction outside the viewport
- **WHEN** la entrada del título termina pero la ilustración del hero todavía está fuera de pantalla
- **THEN** el tiempo de construcción no avanza
- **AND** las otras escenas visibles siguen sus reglas de reproducción sin esperar al hero

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

### Requirement: Entrance independent scene playback
La entrada del nav y hero no SHALL retrasar la reproducción de otras escenas visibles. Terminar, omitir o cancelar la entrada no SHALL borrar la pausa manual, ignorar movimiento reducido ni activar escenas fuera del viewport o de una pestaña activa.

#### Scenario: Skipping to another section
- **WHEN** se accede directamente a una sección inferior o se abandona el hero durante su entrada
- **THEN** las escenas de esa sección siguen las reglas compartidas de reproducción sin esperar la entrada del hero
- **AND** volver al hero no repite la entrada ni restablece una pausa solicitada
