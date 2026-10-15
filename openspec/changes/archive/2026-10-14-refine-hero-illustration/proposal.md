# Proposal

## Why

El hero implementado reproduce el concepto general, pero simplifica la distribución, los módulos y el orden de superposición de la ilustración original. La referencia ampliada aportada por el usuario permite corregir esas diferencias con criterios visuales concretos.

## What Changes

- Reconstruir la composición del hero a partir de la referencia ampliada: recinto transparente central, cubo naranja, ocho agentes por lado y módulos inferiores de memoria, trazas y relay.
- Corregir la geometría isométrica y las superposiciones, incluyendo la arista frontal por delante del cubo y la llave separada de su volumen.
- Recuperar conectores, indicadores, contornos superiores, etiquetas y sombras con mayor fidelidad.
- Ajustar el movimiento del hero sobre una composición estática de referencia, conservando pausa manual, pausa por visibilidad y movimiento reducido.
- Mantener un encuadre legible y sin desbordamiento desde 320 px; conservar el motivo central y sus módulos en móvil.
- Limitar los cambios visuales al hero; las otras escenas, textos, navegación y precios no forman parte de este ajuste.

## Capabilities

### New Capabilities

- `hero-illustration`: Composición, geometría, detalle y fidelidad visual de la ilustración principal, incluyendo su encuadre y movimiento contenido.

### Modified Capabilities

Ninguna especificación principal: `openspec/specs/` está vacío. `jurniti-landing` ya está implementado pero aún no archivado; sus deltas de animación constituyen el contexto de compatibilidad. Esta capacidad acota el contrato visual del hero y añade precisión sin redefinir el control compartido de las cinco escenas.

## Impact

- El ajuste se implementará en la rama hero de `src/components/illustrations/Scene.astro`, preferiblemente extraída a un componente específico, y en los estilos de encuadre de `src/components/landing/Hero.astro` si son necesarios.
- Las primitivas `Cube.astro` y `Node.astro` se reutilizarán únicamente cuando permitan conservar la geometría de referencia; cualquier extensión deberá mantener sus valores actuales por defecto para las demás escenas.
- Se conserva `src/scripts/motion.ts` como controlador compartido. No se añaden dependencias, canvas, motor 3D ni imágenes rasterizadas como sustituto del SVG.
- Referencia principal: `/Users/davidmariolc/Desktop/Screenshot 2026-10-10 at 8.09.47 AM.png`, la captura ampliada del hero proporcionada en este chat. La imagen no contiene una línea temporal de animación; el movimiento seguirá siendo una interpretación contenida.
