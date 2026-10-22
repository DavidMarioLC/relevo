# Spec Delta

## ADDED Requirements

### Requirement: Native vector hero rendering
El hero SHALL ser una ilustración SVG inline formada por geometría vectorial independiente para sus piezas y etiquetas. Su presentación animada y estática SHALL usar el mismo dibujo vectorial. No SHALL contener imágenes rasterizadas, ni siquiera incrustadas en un SVG, recortadas por máscaras o usadas como respaldo estático.

#### Scenario: Inspecting the vector illustration
- **WHEN** se inspecciona y amplía el hero en estado completo
- **THEN** bases, sombras, recintos, caras, agentes, equipo, conexiones y etiquetas están representados por geometría vectorial con bordes definidos al ampliar
- **AND** sus piezas se pueden identificar y animar individualmente
- **AND** no hay elementos `<image>` o `<img>`, canvas, texturas rasterizadas ni referencias a mapas de bits dentro de la ilustración

#### Scenario: Complete static vector rendering
- **WHEN** se carga sin JavaScript, se pausa o se activa movimiento reducido
- **THEN** se muestra el mismo dibujo SVG completo y estable, sin sustituirlo por el PNG de referencia
- **AND** se conservan composición, detalle, profundidad y encuadre móvil

### Requirement: In-place assembly coverage
La ilustración SHALL construirse en su posición animando sus propias piezas vectoriales: bases y sombras, trazado de aristas, caras de cubos, módulos, conexiones y etiquetas en fases solapadas de aproximadamente 2400 ms. Las piezas SHALL conservar sus coordenadas y profundidad; no SHALL trasladarse, escalarse ni deformarse durante la construcción.

#### Scenario: Constructing the central machine
- **WHEN** se reproduce la construcción del hero
- **THEN** se distinguen la aparición de la base y sombras, el trazado de las aristas vectoriales del recinto y la aparición de las tres caras independientes del cubo naranja
- **AND** la llave, indicadores, contorno y etiquetas del grupo central se completan en su posición original
- **AND** la arista frontal conserva su superposición sobre el cubo y la llave mantiene su separación

#### Scenario: Constructing agents and equipment
- **WHEN** la construcción se observa en escritorio
- **THEN** los ocho agentes de cada lado se revelan progresivamente con sus bases, recintos y cubos, manteniendo tres naranjas y cinco claros por lado
- **AND** las tres placas de memoria se revelan sucesivamente y se completan carcasa, pantalla, gráfica y componentes del relay
- **AND** las conexiones y etiquetas vectoriales se completan después de los elementos que identifican, sin reducir toda la escena a un único fade o barrido rectangular

#### Scenario: Mobile assembly
- **WHEN** la ilustración se presenta a 320 o 390 px de ancho
- **THEN** la construcción del recinto, cubo, llave, memoria, monitor y relay se aprecia dentro del encuadre central existente
- **AND** la secuencia no espera a que se vean agentes recortados por ese encuadre
- **AND** no cambia el espacio reservado ni aparece desplazamiento horizontal

### Requirement: Visible single assembly
La construcción SHALL comenzar como máximo una vez por carga del documento, cuando una franja apreciable de la ilustración esté en pantalla y su geometría esté preparada. Esperar a la ilustración no SHALL bloquear texto o controles. La restauración del historial y la carga directa en una sección inferior SHALL mostrar el dibujo completo sin reproducir una construcción atrasada.

#### Scenario: Reaching the illustration after the title
- **WHEN** en móvil se termina el word reveal mientras la ilustración sigue fuera de pantalla
- **THEN** la construcción aún no ha empezado
- **AND** comienza al llegar la ilustración a pantalla con su geometría preparada, sin depender de cargar o decodificar una imagen

#### Scenario: Returning to the illustration
- **WHEN** se vuelve al hero después de presentar o dar por terminada su construcción
- **THEN** la composición permanece completa sin reconstruirse

#### Scenario: History or lower section entry
- **WHEN** se restaura el documento desde historial o se inicia en una sección inferior
- **THEN** el hero conserva la composición completa y no inicia una construcción diferida al regresar

### Requirement: Complete assembly fallback
Sin JavaScript, con movimiento reducido o ante fallos de inicialización, el hero SHALL mostrar el SVG completo. Pausar manualmente, ocultar la pestaña o sacar la ilustración de pantalla durante su construcción SHALL finalizarla en su estado completo. Reanudar el movimiento no SHALL repetirla ni borrar la pausa voluntaria.

#### Scenario: Static or failed presentation
- **WHEN** se abre la página sin JavaScript, con movimiento reducido, con el coordinador bloqueado o con inicialización tardía después de presentar el SVG
- **THEN** ninguna pieza queda oculta y se muestra la composición vectorial completa y estable

#### Scenario: Interrupting construction
- **WHEN** se solicita pausa, se activa movimiento reducido, se oculta la pestaña o la escena sale completamente del viewport durante la construcción
- **THEN** todas las piezas adoptan inmediatamente su estado final
- **AND** volver o reanudar no repite la construcción y conserva las reglas de actividad ambiental

#### Scenario: Failed or stalled coordination
- **WHEN** falla la preparación del coordinador o la coordinación de una construcción activa
- **THEN** texto, CTA y navegación siguen disponibles
- **AND** el SVG se presenta completo sin piezas ocultas ni efectos temporales residuales

## MODIFIED Requirements

### Requirement: Motion preserves the drawing
La actividad ambiental del hero SHALL limitarse a luces, señales por conexiones y actividad del monitor del dibujo vectorial. La entrada inicial SHALL construir sus piezas vectoriales en posición, sin mover el cubo, su etiqueta, recinto o módulos. Al terminar u omitir la construcción SHALL conservarse la separación y superposición de la referencia.

#### Scenario: Animated cycle review
- **WHEN** se revisa un ciclo completo con movimiento habilitado después de la construcción
- **THEN** las luces, señales y monitor muestran actividad discreta sin mover el cubo ni su etiqueta
- **AND** la arista frontal sigue apareciendo por delante del cubo
- **AND** memoria, monitor, relay y bases laterales no flotan ni se desmontan
- **AND** el bucle no salta ni desplaza el texto del hero

#### Scenario: Motion controls continue to work
- **WHEN** se pausa manualmente, se activa movimiento reducido o la escena deja de estar visible
- **THEN** el hero respeta los controles compartidos de movimiento de la landing
- **AND** la construcción, si estaba activa, queda completa, se oculta la actividad y se muestra el dibujo SVG completo
- **AND** sin JavaScript se presenta la misma composición completa y estable

#### Scenario: Whole illustration entrance
- **WHEN** aparece la ilustración durante su secuencia inicial
- **THEN** sus propias aristas, superficies y detalles vectoriales se construyen por fases en su posición, sin traslación, escala ni desenfoque
- **AND** se mantienen las proporciones de referencia, el encuadre adaptable y el espacio reservado en la página
- **AND** con movimiento reducido la ilustración se presenta directamente completa

### Requirement: Label appearance fidelity
Las siete etiquetas del dibujo SHALL conservar texto, apariencia de caracteres, proyección, tamaño, espaciado y ubicación de la referencia. SHALL seguir su plano sin compresión artificial visible, exceso de anchura o desplazamiento sobre caras adyacentes.

#### Scenario: Label close comparison
- **WHEN** se comparan los rótulos laterales, del recinto, cubo y módulos con la fuente
- **THEN** coinciden sus puntos de inicio, orientación y extensión visual, con un desvío máximo de 2 px nativos en los extremos medidos
- **AND** se conserva la inclinación aparente de los caracteres y ninguna etiqueta rebasa su superficie
- **AND** el contorno superior y la etiqueta vectorial del cubo permanecen fijos durante la actividad ambiental

## REMOVED Requirements

### Requirement: Approved hybrid reference rendering
**Reason**: El usuario sustituye explícitamente el render híbrido por una ilustración vectorial real que se construye pieza por pieza.
**Migration**: Reemplazar la imagen rasterizada y su actividad superpuesta por geometría SVG inline con piezas independientes. Mostrar ese mismo SVG completo en el estado final, sin JavaScript y con movimiento reducido; conservar el PNG únicamente como referencia visual.
