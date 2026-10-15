# Spec Delta

## ADDED Requirements

### Requirement: Consistent interface iconography
Los CTA de lanzamiento y el botón de suscripción SHALL mostrar iconos vectoriales de trazo consistente, con tamaño y color legibles sobre sus fondos. Los iconos decorativos SHALL quedar excluidos de tecnologías de asistencia y del foco; los controles SHALL conservar sus nombres, destinos y disponibilidad.

#### Scenario: Reviewing action arrows
- **WHEN** se revisan encabezado, hero, precios y CTA final
- **THEN** todos los enlaces de lanzamiento muestran una flecha diagonal hacia arriba y a la derecha, con trazo y tamaño consistentes
- **AND** las flechas mantienen contraste en los botones oscuros, claros y de contorno
- **AND** el botón de suscripción muestra una flecha hacia la derecha y conserva su estado deshabilitado

#### Scenario: Reading controls with assistive technology
- **WHEN** se recorre la landing por teclado o con tecnología de asistencia
- **THEN** cada control mantiene su nombre accesible y los iconos no generan anuncios ni puntos de foco adicionales
- **AND** las áreas táctiles de los controles disponibles mantienen un mínimo de 44 por 44 px

### Requirement: State-aware control icons
Los controles de menú móvil y de animaciones SHALL mostrar un icono correspondiente a la acción disponible y actualizarlo junto con su etiqueta y estado accesible. El icono de menú SHALL cambiar entre abrir y cerrar; el de movimiento SHALL cambiar entre pausar y reanudar conforme a la pausa solicitada por la persona.

#### Scenario: Opening and closing mobile navigation
- **WHEN** se abre el menú móvil
- **THEN** el icono de menú cambia a una cruz, la etiqueta indica cerrar y el control informa que está expandido
- **AND** al cerrar mediante el botón, Escape, un enlace de sección o un cambio a escritorio se restaura el icono de menú y el estado cerrado
- **AND** Escape devuelve el foco al botón de menú

#### Scenario: Pausing and resuming animations
- **WHEN** se activa el control de pausa con movimiento reducido desactivado
- **THEN** las escenas se pausan y el control muestra un triángulo de reproducción, la etiqueta de reanudar y el estado pulsado
- **AND** al reanudar se restauran el icono de pausa, su etiqueta y el estado no pulsado
- **AND** los iconos conservan su forma vectorial después de alternar repetidamente el control y cambiar la visibilidad de la pestaña

#### Scenario: Reduced motion preference
- **WHEN** se activa la preferencia de movimiento reducido
- **THEN** las escenas permanecen estáticas y el control de movimiento queda oculto
- **AND** al desactivar la preferencia durante la misma visita el icono y la etiqueta reflejan la pausa solicitada por la persona

### Requirement: Static icon rendering
Las flechas de los enlaces de lanzamiento y del botón de suscripción SHALL estar presentes desde el HTML inicial y conservar su forma sin JavaScript. La incorporación de iconos SHALL preservar la navegación móvil disponible sin JavaScript y mantener ocultos los controles que dependen de él.

#### Scenario: Loading icons without client scripts
- **WHEN** se abre la landing sin JavaScript
- **THEN** los enlaces de lanzamiento conservan sus flechas y navegan a precios
- **AND** la flecha de suscripción se muestra dentro del botón deshabilitado
- **AND** los enlaces de navegación móvil siguen disponibles y los botones de menú y movimiento permanecen ocultos
