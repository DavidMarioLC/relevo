# Tasks

## 1. Base visual y contenido

- [x] 1.1 Crear tokens, estilos globales, contenedor y jerarquía tipográfica en `src/styles/global.css`, y actualizar el layout con metadatos/idioma de Jurniti; verificar con `npm run build` y comprobar que el documento declara inglés, título propio y viewport.
- [x] 1.2 Centralizar contenido inglés, recursos y precios de Starter/Pro/Max y destinos opcionales en `src/data/landing.ts`; verificar valores mensuales 25/49/99 y coincidencia de recursos con la referencia.
- [x] 1.3 Crear la marca vectorial y actualizar favicon; verificar que header, footer y pestaña usan la identidad Jurniti y no recursos de Astro.

## 2. Estructura de la landing y navegación

- [x] 2.1 Crear componentes Header, Hero, Features, Pricing, GetStarted y Footer y ensamblarlos en `src/pages/index.astro`; verificar orden continuo, un único h1 y ausencia de la bienvenida de Astro en `/`.
- [x] 2.2 Reproducir retícula, márgenes, bordes, títulos, tarjetas y plan Pro oscuro; verificar visualmente cada sección a 1440 px contra el panel correspondiente de la referencia.
- [x] 2.3 Adaptar secciones y footer a móvil/tablet mediante layouts fluidos; verificar a 320, 390, 768 y 1024 px que no hay superposición, texto recortado ni desplazamiento horizontal.
- [x] 2.4 Implementar menú móvil con mejora progresiva, estado expandido, Escape, retorno de foco y cierre al seleccionar sección; verificar por teclado/toque y comprobar que sin JavaScript los enlaces siguen disponibles.

## 3. Precios y acciones locales

- [x] 3.1 Implementar el selector accesible mensual/anual y sus etiquetas; verificar ida y vuelta entre 25/49/99 mensuales y 250/490/990 anuales con equivalentes 20.83/40.83/82.50, sin cambiar recursos ni acumular errores al alternar.
- [x] 3.2 Conectar enlaces internos y CTA de lanzamiento a destinos configurados o `#pricing`, y presentar estados no disponibles para acciones sin servicio/destino; verificar que no hay enlaces vacíos, navegación ficticia ni envío o éxito simulado en newsletter.
- [x] 3.3 Garantizar precios mensuales legibles sin JavaScript y ocultar el selector hasta que pueda funcionar; verificar carga con JavaScript deshabilitado y estado seleccionado anunciado con JavaScript activo.

## 4. Ilustraciones vectoriales

- [x] 4.1 Crear primitivas SVG de cubos, bases, conexiones y sombras con identificadores únicos por instancia; verificar que múltiples escenas se renderizan juntas sin colisiones de referencias ni pérdida de nitidez al ampliar.
- [x] 4.2 Construir la escena del hero con máquina central, cubo naranja, nodos laterales y módulos auxiliares; verificar composición contra la referencia a 1440 px y motivo central reconocible a 320 y 390 px.
- [x] 4.3 Construir las escenas de aislamiento, propiedad de claves y almacenamiento; verificar correspondencia con cada beneficio, consistencia del trazo y legibilidad en tarjetas apiladas.
- [x] 4.4 Construir la grúa de despliegue para el CTA final; verificar proporción, plataforma y cubo en composición de dos columnas y apilada.
- [x] 4.5 Configurar proporciones reservadas, adaptación de grupos periféricos y semántica decorativa; verificar que ninguna escena causa saltos de layout, invade controles o añade elementos de foco/anuncios internos.

## 5. Movimiento y preferencias

- [x] 5.1 Implementar flotación y señales del hero, trazado/pulso de aislamiento, llave, ensamblaje de almacenamiento y descenso de grúa según `design.md`; verificar las cinco secuencias completas y bucles sin saltos visibles ni desplazamiento de texto.
- [x] 5.2 Implementar control compartido por visibilidad de escena, pestaña activa y pausa voluntaria; verificar que las escenas fuera del viewport o en pestaña oculta no avanzan y que la pausa del usuario persiste al volver.
- [x] 5.3 Aplicar preferencia de movimiento reducido desde la primera carga y sus cambios dinámicos; verificar escenas completas y estáticas, sin estados transparentes o dibujos incompletos.
- [x] 5.4 Añadir control accesible de pausa/reanudación y fallback estático sin JavaScript; verificar nombre/estado por teclado, área táctil mínima de 44 px y que reanudar no sobreescribe movimiento reducido.

## 6. Verificación integrada

- [x] 6.1 Ejecutar `npm run build` y revisar la landing en navegador usando el servidor `astro dev --background`; verificar build correcto y ausencia de errores de consola o recursos faltantes durante navegación, facturación y animaciones.
- [x] 6.2 Revisar la página completa a 320, 390, 768, 1024, 1440 y 1920 px; guardar evidencia visual de escritorio y móvil y verificar las composiciones y ausencia de overflow definidas en ambas especificaciones.
- [x] 6.3 Realizar un recorrido completo con teclado y revisar estructura accesible, foco, contraste de texto y controles táctiles; verificar que menú, precios, CTA y control de movimiento mantienen nombres y estados comprensibles.
- [x] 6.4 Comprobar conjuntamente carga sin JavaScript, movimiento reducido, pausa voluntaria y cambio de pestaña; documentar resultados y cualquier limitación real en la entrega, verificando que todas las secciones permanecen útiles y legibles.
