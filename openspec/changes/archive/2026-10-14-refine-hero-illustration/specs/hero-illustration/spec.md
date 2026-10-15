# Spec Delta

## Purpose

Mantener una ilustración principal de Jurniti fiel a la referencia visual del usuario, con geometría isométrica coherente, detalle reconocible y movimiento contenido en escritorio y móvil.

## ADDED Requirements

### Requirement: Reference composition
El hero SHALL presentar la composición de la referencia ampliada: recinto central transparente sobre una base, cubo naranja interior, grupo de agentes a cada lado, memoria abajo a la izquierda, monitor de trazas abajo a la derecha y relay delante de la base.

#### Scenario: Static desktop comparison
- **WHEN** se compara una captura estática del hero con la referencia a igual ancho de ilustración
- **THEN** los elementos conservan su posición relativa y proporciones, con el recinto dominando el centro y los módulos inferiores claramente diferenciados
- **AND** la comparación se realiza sobre el dibujo, excluyendo títulos y márgenes de la página

### Requirement: Eight agents per side
Cada grupo lateral SHALL contener exactamente ocho agentes, dispuestos en dos filas isométricas de cuatro, con tres cubos naranjas y cinco claros por grupo. Las conexiones punteadas SHALL unir los grupos con la máquina central sin atravesar volúmenes opacos.

#### Scenario: Agent distribution review
- **WHEN** se observa la composición completa de escritorio en estado estático
- **THEN** se cuentan dieciséis agentes y seis cubos laterales naranjas en total
- **AND** se reconocen las filas diagonales y los rótulos `coding agents, 8` y `autonomous agents, 8`
- **AND** no aparecen nodos adicionales ni conexiones flotantes fuera del dibujo

### Requirement: Coherent depth and occlusion
El recinto, el cubo, la llave y los módulos SHALL respetar la profundidad de la referencia. La arista vertical frontal del recinto SHALL aparecer por delante del cubo naranja; las aristas posteriores SHALL ser más tenues y la llave SHALL conservar una separación visible del cubo.

#### Scenario: Foreground and background ordering
- **WHEN** se inspecciona el centro de la escena estática
- **THEN** la arista frontal continúa sobre las caras del cubo y llega al vértice inferior del recinto
- **AND** las líneas posteriores se distinguen de las frontales y no se dibujan por encima de superficies opacas
- **AND** la llave se apoya visualmente sobre la base sin fusionarse con el cubo

### Requirement: Reference surface details
El hero SHALL conservar las tres caras de color del cubo naranja, su contorno superior, su etiqueta, los indicadores naranjas, las sombras planas y los rótulos del recinto y módulos visibles en la referencia. Los módulos SHALL mantener volumen y detalle suficientes para reconocer memoria, trazas y relay.

#### Scenario: Detail comparison
- **WHEN** se revisa el hero a 1440 px y con movimiento reducido
- **THEN** se reconocen las placas de memoria apiladas, la pantalla oscura con gráfica naranja y el pedestal con elemento vertical del relay
- **AND** aparecen las etiquetas `firecracker microvm`, `hermes.proto`, `memory`, `traces` y `relay` siguiendo la orientación de sus superficies
- **AND** la cara derecha del cubo es más oscura que la izquierda y la superior es más clara

### Requirement: Motion preserves the drawing
Las animaciones del hero SHALL limitarse a flotación leve del cubo, señales por conexiones, indicadores y actividad del monitor. SHALL conservar la separación de elementos, la superposición del recinto y la posición de módulos y etiquetas en todos los estados del ciclo.

#### Scenario: Animated cycle review
- **WHEN** se revisa un ciclo completo con movimiento habilitado
- **THEN** el cubo se desplaza suavemente sin tocar la llave o el recinto y su etiqueta y contorno lo acompañan
- **AND** la arista frontal sigue apareciendo por delante del cubo
- **AND** memoria, monitor, relay y bases laterales no flotan ni se desmontan
- **AND** el bucle no salta ni desplaza el texto del hero

#### Scenario: Motion controls continue to work
- **WHEN** se pausa manualmente, se activa movimiento reducido o la escena deja de estar visible
- **THEN** el hero respeta los controles compartidos de movimiento de la landing
- **AND** con movimiento reducido o sin JavaScript se presenta una composición completa y estable

### Requirement: Mobile core composition
Desde 320 px la ilustración SHALL mantener visibles el recinto, el cubo, la llave y los tres módulos inferiores, conservando proporciones y separación. El encuadre móvil SHALL permitir simplificar u ocultar agentes periféricos sin crear desplazamiento horizontal.

#### Scenario: Narrow viewport review
- **WHEN** se visualiza el hero a 320 o 390 px de ancho
- **THEN** el grupo central y sus módulos caben en el encuadre y siguen siendo reconocibles
- **AND** no se recortan cubo, memoria, monitor o relay ni se invaden texto o controles

### Requirement: Isolated visual change
La mejora del hero SHALL mantener la apariencia y funcionamiento de las tres ilustraciones de funcionalidades, la grúa del CTA, la navegación, los precios y los controles de movimiento existentes.

#### Scenario: Landing regression review
- **WHEN** se recorre la landing después de actualizar el hero
- **THEN** las otras cuatro escenas conservan geometría y animaciones y el selector de facturación y menú móvil siguen funcionando
- **AND** el hero conserva semántica decorativa sin introducir foco ni anuncios de sus piezas internas
