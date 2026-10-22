# Spec Delta

## MODIFIED Requirements

### Requirement: Orchestrated initial entrance
Al cargar `/` con JavaScript y movimiento permitido, la landing SHALL coordinar nav, badge, título por palabras, descripción y CTA con garantía en aproximadamente 1,3 segundos. La ilustración vectorial SHALL construir sus piezas en su posición durante aproximadamente 2,4 segundos al estar visible, sin retrasar texto o interacción. El título SHALL conservar su composición y un único nombre accesible.

#### Scenario: First presentation
- **WHEN** se presenta la parte superior de `/` con movimiento permitido
- **THEN** el nav inicia la secuencia y badge, título, descripción y CTA con garantía aparecen escalonadamente
- **AND** las piezas vectoriales de la ilustración pueden construirse mientras el texto termina su entrada si ya está visible y su geometría preparada, sin esperar la finalización de cada grupo anterior
- **AND** las palabras del título se revelan hacia arriba desde máscaras individuales con 80 ms de separación y el CTA y la garantía se presentan juntos
- **AND** la entrada no modifica el espacio ocupado por los elementos ni causa saltos de contenido
- **AND** la actividad ambiental del hero espera a que terminen o se den por terminadas tanto la última palabra como la construcción

#### Scenario: Responsive entrance
- **WHEN** se carga la página en móvil o escritorio
- **THEN** la entrada respeta el orden visual, el encuadre de la ilustración y los controles disponibles en ese ancho
- **AND** el menú móvil cerrado y los elementos ocultos por el diseño adaptable permanecen ocultos
- **AND** no aparece desplazamiento horizontal ni contenido recortado por la entrada
- **AND** el título conserva sus saltos de línea y tecnologías de asistencia lo anuncian como una sola frase
- **AND** la construcción de la ilustración no se consume mientras está fuera de pantalla

### Requirement: Single document entrance
La entrada del nav y texto del hero SHALL ejecutarse como máximo una vez por carga y comenzar sin esperar todos los recursos. Estos grupos SHALL adoptar su estado final si se inicia en una sección desplazada, se abandona la parte superior, se oculta la pestaña o se restaura desde historial. Finalizar esa entrada por scroll no SHALL cancelar una construcción de ilustración que aún no empezó.

#### Scenario: Returning to the hero
- **WHEN** se vuelve al hero mediante scroll, un enlace interno o la restauración del documento desde el historial
- **THEN** nav y texto del hero permanecen en su estado final sin repetir la entrada
- **AND** una construcción ya presentada u omitida no vuelve a ejecutarse

#### Scenario: Leaving during the entrance
- **WHEN** se hace scroll fuera de la parte superior o se oculta la pestaña antes de terminar la entrada
- **THEN** la entrada del nav y texto se da por terminada y esos grupos quedan en su estado final
- **AND** al regresar no se reproduce una secuencia atrasada
- **AND** si el desplazamiento acerca por primera vez la ilustración a pantalla, su construcción pendiente puede comenzar conforme a sus propias reglas de visibilidad

#### Scenario: Slow resources
- **WHEN** un recurso ajeno al contenido inicial tarda en cargar
- **THEN** la entrada y el acceso al mensaje y al CTA no esperan a ese recurso
- **AND** preparar la construcción del SVG no bloquea la secuencia del título ni el uso de enlaces o controles y no depende de cargar una imagen del hero
