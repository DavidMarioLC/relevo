# Spec Delta

## MODIFIED Requirements

### Requirement: Vector scene coverage
La landing SHALL incluir cinco escenas isométricas: el hero con la imagen original y actividad vectorial superpuesta, y cuatro escenas vectoriales de máquina aislada, propiedad de claves, almacenamiento persistente y despliegue mediante grúa. Las escenas SHALL conservar líneas finas grises, plataformas isométricas y acentos naranjas coherentes con la referencia.

#### Scenario: Reviewing illustration placement
- **WHEN** se recorren hero, funcionalidades y CTA final
- **THEN** el hero contiene la máquina central, cada una de las tres funcionalidades contiene su escena y el CTA contiene la grúa
- **AND** las cuatro escenas vectoriales conservan bordes definidos al ampliar la página
- **AND** el hero conserva el detalle de la imagen original de 1732 × 728 sin exigir resolución vectorial infinita

### Requirement: Contextual scene animation
Con movimiento habilitado, cada escena visible SHALL animar elementos relacionados con su mensaje sin desplazar el contenido de la página ni reducir la legibilidad del texto.

#### Scenario: Hero activity
- **WHEN** el hero está visible con movimiento habilitado
- **THEN** luces, conexiones y monitor muestran actividad naranja discreta sobre la imagen original
- **AND** el cubo central, sus etiquetas y los módulos permanecen fijos
- **AND** la escena no mueve el título ni el CTA

#### Scenario: Feature activity
- **WHEN** las funcionalidades están visibles con movimiento habilitado
- **THEN** aislamiento anima el recinto y su cubo, claves anima la llave y su conexión, y almacenamiento anima el ensamblaje de capas y una señal de escritura

#### Scenario: Deployment activity
- **WHEN** el CTA final está visible con movimiento habilitado
- **THEN** la grúa baja el cubo hacia la plataforma y la secuencia regresa suavemente a su inicio
