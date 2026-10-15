## 1. Base de comparación y aislamiento

- [x] 1.1 Capturar el hero actual y las otras cuatro escenas con movimiento reducido, y guardar la referencia y los anchos de captura en la documentación de verificación del cambio. Verificar que las capturas permiten comparar los dibujos a igual ancho.
- [x] 1.2 Extraer la geometría del hero a `HeroIllustration.astro`, manteniendo un único SVG, los atributos del controlador y los valores por defecto de las primitivas compartidas. Verificar con `npm run build` y una captura que la extracción conserva inicialmente la composición anterior y las otras escenas.

## 2. Reconstrucción estática de la referencia

- [x] 2.1 Reconstruir recinto, plataforma, cubo y llave sobre el plano 1732 × 728, con caras, sombras, etiqueta y arista frontal en el orden de pintura definido. Verificar mediante comparación estática que el recinto domina el centro, la arista pasa por delante del cubo y la llave queda separada.
- [x] 2.2 Rehacer los dos grupos laterales con ocho agentes por lado, dos filas de cuatro, tres cubos naranjas por grupo, conexiones punteadas y rótulos correctos. Verificar el recuento de dieciséis agentes y seis cubos naranjas, y revisar visualmente conexiones y posiciones contra la referencia.
- [x] 2.3 Reconstruir las tres placas de memoria, el monitor de trazas, el relay, sus conectores e indicadores; orientar las etiquetas según sus superficies. Verificar en una captura de escritorio la presencia, volumen y separación de los tres módulos y de todas las etiquetas exigidas.
- [x] 2.4 Guardar la comparación estática a igual ancho de ilustración, revisar proporciones, siluetas, profundidad y sombras, y documentar los ajustes finales. Verificar el resultado a 1440 y 1920 px y ejecutar `npm run build` antes de añadir el movimiento específico.

## 3. Animación y encuadre adaptable

- [x] 3.1 Aplicar al hero la flotación de hasta 3 unidades en 6 s, con etiqueta y contorno unidos al cubo; añadir señales de 4 s, indicadores y actividad del monitor mediante estilos exclusivos de la escena. Verificar un ciclo completo y sus extremos: sin colisiones, saltos, cambios de superposición ni desplazamiento de módulos o texto.
- [x] 3.2 Integrar las nuevas animaciones con el controlador existente y comprobar pausa manual, reanudación, escena fuera de pantalla, pestaña oculta y movimiento reducido. Verificar que todas las animaciones nuevas se detienen según esos estados y que sin JavaScript se muestra el dibujo completo y estable; registrar los resultados.
- [x] 3.3 Definir el encuadre del grupo central en móvil, incluyendo llave, memoria, monitor y relay, y conservar la composición completa en escritorio. Verificar a 320, 390, 768, 1024, 1440 y 1920 px que se mantienen proporciones, no hay desbordamiento horizontal ni recortes del grupo central, y guardar capturas representativas.

## 4. Validación integrada

- [x] 4.1 Comparar las otras cuatro escenas con las capturas iniciales y comprobar navegación, menú móvil, selector de facturación y control de movimiento. Verificar que las piezas internas del SVG no reciben foco ni anuncios y registrar cualquier regresión resuelta.
- [x] 4.2 Ejecutar `npm run build`, revisar la landing con `astro dev --background` y completar la documentación de verificación con capturas, controles de movimiento, anchos revisados y limitaciones observadas. Verificar que todos los requisitos de `hero-illustration` tienen evidencia antes de marcar las tareas completas.
