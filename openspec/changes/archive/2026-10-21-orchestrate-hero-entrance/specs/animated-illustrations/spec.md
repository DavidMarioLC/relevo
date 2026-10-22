# Spec Delta

## MODIFIED Requirements

### Requirement: Contextual scene animation
Con movimiento habilitado, cada escena visible SHALL animar elementos relacionados con su mensaje sin desplazar el contenido de la página ni reducir la legibilidad del texto. La actividad ambiental del hero SHALL comenzar después de finalizar o dar por terminada su entrada inicial, siempre que su escena esté visible, la pestaña activa y no exista pausa manual.

#### Scenario: Hero activity
- **WHEN** el hero está visible con movimiento habilitado después de su entrada inicial
- **THEN** luces, conexiones y monitor muestran actividad naranja discreta sobre la imagen original
- **AND** el cubo central, sus etiquetas y los módulos permanecen fijos
- **AND** la escena no mueve el título ni el CTA

#### Scenario: Feature activity
- **WHEN** las funcionalidades están visibles con movimiento habilitado
- **THEN** aislamiento anima el recinto y su cubo, claves anima la llave y su conexión, y almacenamiento anima el ensamblaje de capas y una señal de escritura

#### Scenario: Deployment activity
- **WHEN** el CTA final está visible con movimiento habilitado
- **THEN** la grúa baja el cubo hacia la plataforma y la secuencia regresa suavemente a su inicio

#### Scenario: Hero entrance handoff
- **WHEN** se reproduce la entrada inicial del hero
- **THEN** la capa de actividad ambiental permanece oculta
- **AND** al finalizar la entrada puede comenzar la actividad únicamente si están permitidas reproducción, visibilidad y preferencia de movimiento

#### Scenario: Pausing before the handoff
- **WHEN** se solicita pausa manual antes de terminar la entrada
- **THEN** al finalizar la entrada la ilustración queda completamente visible y su actividad ambiental permanece detenida
- **AND** la actividad solo puede comenzar al reanudar con movimiento permitido y la escena visible en una pestaña activa

## ADDED Requirements

### Requirement: Entrance independent scene playback
La entrada del nav y hero no SHALL retrasar la reproducción de otras escenas visibles. Terminar, omitir o cancelar la entrada no SHALL borrar la pausa manual, ignorar movimiento reducido ni activar escenas fuera del viewport o de una pestaña activa.

#### Scenario: Skipping to another section
- **WHEN** se accede directamente a una sección inferior o se abandona el hero durante su entrada
- **THEN** las escenas de esa sección siguen las reglas compartidas de reproducción sin esperar la entrada del hero
- **AND** volver al hero no repite la entrada ni restablece una pausa solicitada
