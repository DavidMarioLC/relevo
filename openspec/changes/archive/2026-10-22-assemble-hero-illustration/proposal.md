# Proposal

## Why

La ilustración principal usa una imagen rasterizada con luces y señales superpuestas. El usuario quiere una ilustración vectorial real cuyas piezas se construyan en su posición, conservando la composición de referencia y acompañando la entrada del título por palabras.

## What Changes

- Sustituir el render rasterizado del hero por un SVG inline con geometría vectorial independiente para cada elemento: bases, sombras, aristas, caras de cubos, agentes, módulos, conexiones y etiquetas.
- Construir las piezas en su posición mediante trazado de aristas y aparición de superficies y detalles en fases solapadas de aproximadamente 2400 ms, sin trasladarlas, escalarlas ni deformarlas.
- Incluir el recinto y cubo centrales, llave, los 16 agentes laterales, las tres placas de memoria, monitor, relay y detalles asociados. En móvil animar el grupo central dentro del encuadre existente.
- Iniciar la construcción una sola vez cuando la ilustración esté suficientemente visible y su geometría preparada, sin consumirla antes de llegar a pantalla.
- Separar el ciclo de construcción del word reveal del título. Al finalizar, mostrar el SVG completo y permitir actividad ambiental discreta conforme a los controles compartidos.
- Mostrar el mismo SVG completo sin JavaScript, con movimiento reducido, al omitir o cancelar la construcción y ante fallos de inicialización. El PNG servirá únicamente de referencia visual, sin formar parte del render ni del estado estático.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `hero-illustration`: dibujo vectorial nativo, construcción inicial por piezas, fidelidad de composición y profundidad, estado final vectorial y encuadre móvil; sustituye la decisión híbrida anterior.
- `animated-illustrations`: cinco escenas vectoriales y coordinación entre construcción, actividad ambiental, visibilidad y controles de movimiento.
- `landing-page`: separar la entrada de texto/nav de la construcción visible de la ilustración, conservando el word reveal y acceso inmediato a los controles.

## Impact

- Afecta `HeroIllustration.astro`, `Scene.astro`, `Hero.astro`, `Entrance.astro`, `src/scripts/entrance.ts` y `src/scripts/motion.ts`.
- Crear geometría SVG propia y un coordinador de construcción, evaluando las primitivas vectoriales existentes antes de reutilizarlas y sin dependencias nuevas. La ilustración no contendrá `<image>`, `<img>`, canvas ni texturas rasterizadas.
- Sustituir las reglas anteriores de imagen original intacta y fade global por dibujo y construcción vectoriales. La actividad ambiental posterior conserva luces, señales y monitor sin desplazamientos de piezas.
- La aceptación comprobará geometría, detalle, profundidad y nitidez al ampliar; la igualdad de píxeles o el hash del PNG no acreditan el resultado vectorial.
- Quedan fuera desplazar piezas para encajarlas, repetir el ensamblaje en bucle y modificar ilustraciones de funcionalidades, precios o footer.
