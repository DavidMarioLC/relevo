# Spec Delta

## MODIFIED Requirements

### Requirement: Motion preserves the drawing
La actividad ambiental del hero SHALL limitarse a luces, señales por conexiones y actividad del monitor superpuestas a la imagen original. Durante la entrada inicial SHALL permitirse únicamente una aparición por opacidad de la composición completa. El cubo, su etiqueta, el recinto y los módulos SHALL permanecer fijos, conservando la separación y superposición de la referencia.

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

#### Scenario: Whole illustration entrance
- **WHEN** aparece la ilustración durante la secuencia inicial
- **THEN** la composición aumenta su opacidad como una sola unidad, sin traslación, escala, desenfoque ni movimiento independiente de piezas
- **AND** se mantienen el archivo original, sus proporciones, su encuadre adaptable y el espacio reservado en la página
- **AND** con movimiento reducido la ilustración se presenta directamente completa
