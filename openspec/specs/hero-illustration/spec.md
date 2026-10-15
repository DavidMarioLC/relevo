# hero-illustration Specification

## Purpose

Mantener una ilustración principal de Relevo fiel a la referencia visual del usuario, con geometría isométrica coherente, detalle reconocible y movimiento contenido en escritorio y móvil.

## Requirements

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
La actividad del hero SHALL limitarse a luces, señales por conexiones y actividad del monitor superpuestas a la imagen original. El cubo, su etiqueta, el recinto y los módulos SHALL permanecer fijos, conservando la separación y superposición de la referencia.

#### Scenario: Animated cycle review
- **WHEN** se revisa un ciclo completo con movimiento habilitado
- **THEN** las luces, señales y monitor muestran actividad discreta sin mover el cubo ni su etiqueta
- **AND** la arista frontal sigue apareciendo por delante del cubo
- **AND** memoria, monitor, relay y bases laterales no flotan ni se desmontan
- **AND** el bucle no salta ni desplaza el texto del hero

#### Scenario: Motion controls continue to work
- **WHEN** se pausa manualmente, se activa movimiento reducido o la escena deja de estar visible
- **THEN** el hero respeta los controles compartidos de movimiento de la landing
- **AND** la capa de actividad queda oculta y se muestra únicamente la imagen original
- **AND** sin JavaScript se presenta la misma composición completa y estable

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

### Requirement: Agent drawing fidelity
Los dieciséis agentes SHALL reproducir posiciones, siluetas, jaulas, bases, indicadores y contraste de la referencia. Los ocho agentes de cada lado SHALL mantener sus tres cubos naranjas y cinco claros, con separación tonal entre caras y contornos interiores reconocibles.

#### Scenario: Native agent detail comparison
- **WHEN** se comparan ambos grupos con la referencia a 1732 × 728 y sin movimiento
- **THEN** los vértices y centros representativos difieren como máximo 2 px nativos, considerando el centro del trazo
- **AND** jaulas, cubos claros y capas de las bases conservan el contraste y los detalles visibles del original
- **AND** permanecen ocho agentes por lado y seis cubos laterales naranjas en total

### Requirement: Connection topology fidelity
La red del hero SHALL reproducir los recorridos, cruces, puntos de unión y patrón punteado de la referencia. Sus segmentos visibles SHALL respetar la profundidad del dibujo, sin atravesar cubos o bases opacos ni introducir extremos o puntos aislados ausentes del original.

#### Scenario: Network overlay comparison
- **WHEN** se revisan los grupos laterales y sus conexiones a la máquina a escala nativa
- **THEN** los recorridos y puntos corresponden a los observados en la referencia
- **AND** los cruces visibles dentro de las jaulas transparentes permanecen presentes
- **AND** no aparecen las diagonales adicionales ni los puntos flotantes identificados en la auditoría

### Requirement: Memory plate geometry fidelity
Las tres placas de memoria SHALL reproducir la planta rectangular proyectada, esquinas, espesores, huecos, uniones y conectores de la referencia. Sus dos direcciones de arista SHALL conservar las longitudes distintas del original.

#### Scenario: Memory close comparison
- **WHEN** se comparan las placas ampliadas con la referencia
- **THEN** sus esquinas representativas difieren como máximo 2 px nativos
- **AND** el apilado muestra tres placas rectangulares proyectadas y conectores unidos a los volúmenes correspondientes
- **AND** no aparecen rombos simétricos ni líneas adicionales que alteren la lectura de las capas

### Requirement: Equipment detail fidelity
Monitor, relay, llave y plinto SHALL reproducir los detalles identificados en la auditoría: tamaño y borde de pantalla, picos de la gráfica, collar y orificio del anillo, dientes de llave, ranuras e indicadores. Los conectores SHALL mantener su forma y unión con los módulos.

#### Scenario: Equipment close comparison
- **WHEN** se inspeccionan los recortes de monitor, relay, llave y plataforma a escala nativa
- **THEN** se reconocen todos los detalles enumerados con sus proporciones y posiciones de referencia
- **AND** la pantalla conserva la altura del original y el anillo muestra profundidad interior y collar de unión
- **AND** no hay conectores separados, uniones imposibles ni salientes genéricos con otra silueta

### Requirement: Label appearance fidelity
Las siete etiquetas del dibujo SHALL conservar texto, apariencia de caracteres, proyección, tamaño, espaciado y ubicación de la referencia. SHALL seguir su plano sin compresión artificial visible, exceso de anchura o desplazamiento sobre caras adyacentes.

#### Scenario: Label close comparison
- **WHEN** se comparan los rótulos laterales, del recinto, cubo y módulos con la fuente
- **THEN** coinciden sus puntos de inicio, orientación y extensión visual, con un desvío máximo de 2 px nativos en los extremos medidos
- **AND** se conserva la inclinación aparente de los caracteres y ninguna etiqueta rebasa su superficie
- **AND** el contorno superior y la etiqueta del cubo permanecen fijos en la imagen original durante la actividad superpuesta

### Requirement: Surface and shadow fidelity
Las superficies, fondo del hero, pesos de línea y sombras SHALL reproducir la paleta, contraste, silueta y superposición de la referencia. El ajuste SHALL conservar la diferencia entre caras del cubo, contornos frontales y posteriores, y profundidad del suelo y módulos.

#### Scenario: Native finish comparison
- **WHEN** se comparan las superficies y sombras con el dibujo original a la misma escala
- **THEN** las caras naranjas, blancos, grises y pantalla conservan los tonos observables de la referencia
- **AND** se corrigen los grandes planos de sombra y las diagonales que cambian la lectura del suelo
- **AND** las muestras interiores representativas quedan dentro de 5 niveles RGB por canal respecto a la mediana de referencia, excluyendo texto, bordes y reflejos

### Requirement: Detail based visual acceptance
La aceptación visual SHALL comprobar todas las observaciones de la auditoría mediante comparación completa y ampliaciones del centro, agentes, memoria y equipo inferior a escala 1:1. SHALL distinguir coincidencias verificadas de diferencias pendientes y limitaciones de rasterización.

#### Scenario: Correction acceptance review
- **WHEN** se declara terminado el ajuste visual
- **THEN** cada observación de `visual-review.md` tiene evidencia de coincidencia conservada o diferencia corregida
- **AND** no queda una diferencia visual conocida sin resolver entre las enumeradas por esta corrección
- **AND** un recuento de elementos o una compilación correcta por sí solos no se presentan como prueba de fidelidad

### Requirement: Existing hero behavior compatibility
El ajuste SHALL conservar los controles compartidos de movimiento, la arista frontal sobre el cubo y la separación de la llave. El cubo SHALL permanecer fijo y la actividad SHALL limitarse a luces, conexiones y monitor. Desde 320 px SHALL mantener visibles el recinto y los tres módulos inferiores, sin desbordamiento, y conservar la semántica decorativa.

#### Scenario: Motion and responsive regression
- **WHEN** se revisa un ciclo y los anchos 320, 390, 768, 1024, 1440 y 1920 px
- **THEN** el cubo no colisiona, los módulos permanecen fijos y el grupo central cabe en el encuadre
- **AND** pausa manual, visibilidad, movimiento reducido y versión sin JavaScript conservan su comportamiento
- **AND** las otras cuatro escenas, navegación y facturación siguen funcionando y conservan su apariencia

### Requirement: Approved hybrid reference rendering
El hero SHALL conservar el archivo original sin alteración y superponer únicamente actividad vectorial discreta. Esta decisión SHALL sustituir el redibujo y la flotación del cubo descritos en los requisitos anteriores.

#### Scenario: Static reference and motion controls
- **WHEN** se pausa el hero, se activa movimiento reducido o se carga sin JavaScript
- **THEN** se muestra la imagen original sin superposición visible
- **AND** el archivo servido conserva el hash del archivo fuente
- **AND** el encuadre central cabe desde 320 px sin desbordamiento horizontal
