# Design

## Context

El usuario rechazó el redibujo vectorial del hero por diferencias de detalle y apariencia borrosa. El 2026-10-10 aprobó aplicar la imagen original con actividad vectorial superpuesta. Los cambios anteriores archivados conservan el contexto del redibujo; este documento describe la solución vigente.

## Goals / Non-Goals

Conservar el detalle del original, mantener actividad discreta y respetar los controles de movimiento y la composición móvil. La fidelidad se limita a la resolución rasterizada original; no se exige ampliación vectorial infinita ni movimiento independiente de los elementos de la imagen.

No se modifica el contenido de la landing, las cuatro escenas restantes ni las integraciones de producto.

## Decisions

### 1. Imagen original intacta

`HeroIllustration.astro` muestra `/images/hero-reference.png` dentro del SVG del hero, con dimensiones 1732 × 728. Se mantienen los píxeles, etiquetas, colores, sombras y superposiciones de la fuente sin conversión ni recompresión. El cubo permanece fijo.

### 2. Actividad SVG superpuesta

La capa de actividad contiene luces, dos señales por las conexiones y una traza del monitor. Usa las coordenadas de la vista aprobada. No mueve geometría, etiquetas o módulos de la imagen. Las primitivas antiguas del redibujo pueden permanecer como material de trabajo, pero no forman parte del render actual del hero.

### 3. Controles y fallback

Se conserva `motion.ts`: visibilidad de escena, pestaña activa, pausa voluntaria y preferencia de movimiento reducido. Cuando la escena no está activa se oculta la capa superpuesta, por lo que pausa, movimiento reducido y ausencia de JavaScript muestran únicamente la referencia original. El SVG conserva semántica decorativa.

### 4. Encuadre adaptable

En escritorio se muestra la composición completa. Por debajo de 768 px se usa una ventana de 680 unidades desde x=520, preservando recinto, cubo, llave, memoria, monitor y relay. Los agentes periféricos pueden quedar recortados sin crear desbordamiento horizontal.

## Verification

La verificación de la implementación aplicada se resume en `verification.md`. El recurso original tiene SHA-256 `3830e02ebf5a0d724c67d20a040510765bd45e6b4f7366ba4d6ba261d2ce4f8d`. La evidencia local incluye comparación del render pausado con la imagen sin capa superpuesta, a escala nativa y a 1160 px.

Las mediciones del redibujo anterior se conservan únicamente como historial del intento sustituido. No prueban la fidelidad de la implementación vigente.

## Risks / Trade-offs

La imagen conserva su resolución original; ampliarla por encima de ella puede mostrar límites de rasterización. La actividad superpuesta no permite animar piezas internas del bitmap. Son las condiciones de la alternativa aprobada.

## Migration Plan

No hay migración de datos ni dependencias. La entrega permanece local. El cierre de etapa sincroniza los requisitos vigentes y archiva los tres cambios completados sin alterar el aspecto del sitio.
