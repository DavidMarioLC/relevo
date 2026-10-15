# Design

## Context

Ver `proposal.md` para la motivación y `specs/hero-illustration/spec.md` para el contrato visual. La escena actual está dentro de `Scene.astro`, usa `Cube.astro` y `Node.astro` compartidos, un `viewBox` de 1120 × 490 y una lista de 18 nodos. Las aristas frontales se pintan antes del cubo, la memoria tiene poco volumen y las etiquetas difieren de la referencia. En móvil se amplía el SVG al 165 % y se atenúan los laterales, sin un encuadre definido para todos los módulos inferiores.

El controlador `src/scripts/motion.ts` ya combina intersección, visibilidad de documento, preferencia del sistema y pausa manual. Las otras cuatro escenas comparten primitivas y reglas de animación, por lo que modificar sus valores globales puede alterar secciones fuera del alcance.

El proyecto no tiene especificaciones principales archivadas. Se usa como contexto compatible el delta `animated-illustrations` de `jurniti-landing`, leído durante la exploración; la nueva capacidad `hero-illustration` detalla el dibujo principal sin sustituir esos contratos generales.

## Goals / Non-Goals

**Goals:**
- Obtener una composición estática comparable directamente con la captura ampliada.
- Separar profundidad y movimiento para que animar el cubo no rompa las superposiciones.
- Aislar los ajustes visuales del hero para evitar regresiones en las otras escenas.

**Non-Goals:**
- Rediseñar títulos, botones, precios o secciones de la landing.
- Sustituir el dibujo por el PNG o añadir un motor de renderizado.
- Inferir o prometer la animación original a partir de una imagen estática.

## Decisions

### 1. Referencia y sistema de coordenadas

La fuente principal es `/Users/davidmariolc/Desktop/Screenshot 2026-10-10 at 8.09.47 AM.png`, cuya resolución nativa verificada es 1732 × 728. Usar ese plano como sistema de coordenadas inicial. Mantener ese encuadre y relación de aspecto en escritorio, en lugar de deformar la referencia para conservar el `viewBox` anterior.

Anclas visuales orientativas medidas sobre la vista compartida, a ajustar al trazar:

| Elemento | Referencia aproximada |
| --- | --- |
| Vértice superior del recinto | (856, 66) |
| Extremos superiores izquierdo/derecho | (650, 184) / (1064, 184) |
| Vértice inferior frontal del recinto | (856, 517) |
| Vértice superior del cubo naranja | (856, 258) |
| Vértice inferior frontal del cubo | (856, 443) |
| Grupo central con módulos | De x ≈ 564 a 1157; hasta y ≈ 666 |

Estas anclas guían la composición, no sustituyen la revisión visual ni constituyen una medición de precisión subpíxel. Alternativa descartada: ajustar tamaños sueltos sobre las coordenadas existentes, porque mantendría errores de distribución y profundidad.

### 2. Componente específico y primitivas compatibles

Extraer la geometría del hero a `src/components/illustrations/HeroIllustration.astro`, manteniendo en `Scene.astro` el contenedor `data-scene` y el SVG o adaptando el componente para emitir únicamente su contenido gráfico. Debe existir un único SVG raíz y un único controlador de movimiento por escena.

Reutilizar las primitivas comunes donde encajen. Para caras, conectores y módulos de geometría particular, usar grupos SVG locales. Si una primitiva necesita parámetros de color o detalle, añadirlos de forma opcional sin cambiar sus valores por defecto. Toda regla nueva de animación o encuadre debe estar restringida a `.scene-hero` o a clases propias del hero. Alternativa descartada: alterar globalmente Cube, Node y sus colores, que también afectan funcionalidades y grúa.

### 3. Profundidad explícita

Orden de pintura previsto:

1. Sombras proyectadas y conexiones de fondo.
2. Bases laterales y cuerpo de la plataforma central.
3. Caras y aristas posteriores del recinto, con líneas tenues/discontinuas.
4. Sombra interior y cubo naranja con contorno superior y etiqueta en el mismo grupo animado.
5. Llave sobre la base y aristas frontales continuas, incluida la vertical que pasa por delante del cubo.
6. Módulos y conectores delanteros, ordenados según su profundidad.

Evitar caras transparentes completas pintadas después del cubo cuando alteren su color. Dibujar el trazo frontal por separado, de modo que continúe sobre el cubo durante todo el movimiento. Reposicionar la llave por debajo de la silueta inferior del cubo y preservar una distancia visible incluso en el extremo de la flotación. Alternativa descartada: subir todo el cubo al último plano para evitar líneas sobre él, porque contradice la referencia.

### 4. Grupos laterales y módulos completos

Definir dos listas de ocho agentes con dos filas de cuatro y activaciones según la imagen. Cada grupo tendrá tres cubos naranjas. Reconstruir la red punteada y sus puntos de unión, con señales de actividad contenidas en los mismos recorridos. Sustituir los rótulos por `coding agents, 8` y `autonomous agents, 8`.

La memoria tendrá tres placas claramente separadas, mayor presencia y conectores hacia la base. El monitor tendrá cuerpo, pantalla lateral oscura y gráfica naranja. El relay tendrá pedestal volumétrico, elemento vertical y anillo superior. Recuperar los pequeños salientes e indicadores naranjas de la plataforma. Usar `memory`, `traces`, `relay`, `firecracker microvm` y `hermes.proto` orientados con sus planos isométricos.

Trazos frontales más definidos que los posteriores; sombras planas translúcidas desplazadas de forma coherente. En el cubo naranja conservar cara superior clara, cara izquierda media y derecha más oscura, ajustadas localmente al hero. Alternativa descartada: añadir detalle con filtros o degradados complejos; la referencia usa geometría y caras planas.

### 5. Movimiento sobre una pose de referencia

La pose base sin animación debe corresponder a la referencia y contener todos los elementos. Usar flotación vertical de hasta 3 unidades del plano de 1732 × 728, en un ciclo de 6 s; el contorno y etiqueta del cubo se mueven juntos. Esta amplitud menor sustituye la anterior de 6 unidades sobre un plano más pequeño y favorece la fidelidad visual.

Conexiones: señales de 4 s con desfases, por los recorridos corregidos. Indicadores: pulsos de opacidad escalonados, sin apagar por completo los cubos laterales. Monitor: una actividad breve de opacidad o señal sobre la gráfica, sin mover su carcasa. Memoria, relay, recinto y bases permanecen fijos. Mantener las curvas y tokens existentes; no instalar una librería.

Integrarse en `data-running` y `data-motion`, conservar el botón de pausa y la pose completa para movimiento reducido o JavaScript ausente. No modificar el controlador compartido salvo una corrección necesaria y compatible. La secuencia se evaluará también en sus extremos para detectar colisiones y errores de orden de pintura.

### 6. Encuadre móvil del grupo central

En escritorio se muestra el dibujo completo. En tablet se conserva completo siempre que el grupo central sea legible. En móvil usar un encuadre propio del SVG o un contenedor ajustado a los límites del grupo central con un margen pequeño, preservando la proporción de todas sus piezas. Puede ocultarse la periferia; no aumentar simplemente el SVG al 165 % sin calcular qué queda recortado.

La memoria izquierda y monitor/relay derechos definen los límites junto al recinto: deben permanecer visibles a 320 y 390 px. Mantener etiquetas como detalle decorativo, con significado ya expresado por el contenido HTML de la landing. No añadir elementos de foco dentro del dibujo.

### 7. Comparación y aceptación

Capturar la escena anterior antes de editar para tener una base de regresión. Comparar la nueva escena estática con la referencia a igual ancho y encuadre: silueta central, centros de agentes, módulos, superposiciones, etiquetas y sombras. La comparación puede usar superposición de capturas para detectar desplazamientos; no usar un porcentaje automático de píxeles como sustituto de la revisión, debido a diferencias de rasterización y tipografía.

Revisar escritorio a 1440 y 1920 px; tablet a 768 y 1024 px; móvil a 320 y 390 px. Capturar el dibujo estático y revisar un ciclo de 6 s junto con las señales. Comprobar pausa manual, escena fuera de pantalla, pestaña oculta, movimiento reducido y versión sin JavaScript. Comparar las otras cuatro escenas antes/después y verificar menú y precios como regresión integrada. Ejecutar `npm run build` y usar `astro dev --background` para revisión local.

## Risks / Trade-offs

- [La fuente es rasterizada] → Trazar proporciones y detalles observables en SVG; evaluar la fidelidad a escala de uso, sin prometer identidad subpíxel.
- [Líneas frontales pueden ocultar partes del cubo] → Mantener el orden de pintura de la referencia y comprobar la pose completa y extremos de animación.
- [La reutilización de primitivas puede limitar el detalle] → Añadir geometría específica del hero conservando las primitivas compartidas por defecto.
- [El nuevo volumen inferior puede quedar fuera del encuadre móvil] → Calcular límites con todos los módulos y verificar los dos anchos mínimos.
- [La referencia no documenta el movimiento] → Mantener actividad leve como interpretación; la composición estática determina la aceptación visual.

## Migration Plan

No hay migración de datos ni dependencias nuevas. Implementar el componente específico, conectarlo a Scene, ajustar el encuadre y validar. Preservar los controles de movimiento existentes y no publicar como parte de este cambio. La reversión consiste en restaurar la rama hero y sus estilos anteriores y retirar solamente el componente o geometría añadida.
