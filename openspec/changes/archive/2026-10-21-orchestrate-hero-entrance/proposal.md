# Proposal

## Why

El nav y el hero aparecen sin una entrada coordinada. Una secuencia breve puede establecer la identidad de Relevo y guiar la lectura desde la navegación hasta el mensaje y el CTA, antes de dar paso a la actividad ambiental de la ilustración.

## What Changes

- Añadir una entrada editorial al cargar `/`, con apariciones solapadas de nav, badge, título, descripción, CTA con garantía e ilustración; la primera versión termina aproximadamente a los 780 ms.
- Usar desplazamientos pequeños y desaceleración suave para el contenido, y solo opacidad para la ilustración completa.
- Iniciar la actividad ambiental del hero después de su entrada, respetando pausa manual, visibilidad y movimiento reducido.
- Ejecutar la entrada una vez por carga del documento, conservar interacción inmediata y mostrar el estado final con movimiento reducido o sin JavaScript.
- Mantener el encuadre móvil y la imagen original aprobada del hero.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `landing-page`: entrada orquestada del nav y del contenido del hero, con comportamiento accesible y degradación segura.
- `animated-illustrations`: transición entre la aparición del hero y su actividad ambiental, conservando las reglas de reproducción existentes.
- `hero-illustration`: permitir una aparición inicial por opacidad de la composición completa, preservando la imagen original y las posiciones de sus piezas.

## Impact

Se prevén cambios en `src/components/landing/Header.astro`, `src/components/landing/Hero.astro`, `src/scripts/motion.ts` y, si es necesario para el arranque antes del primer pintado, `src/layouts/Layout.astro` y `src/styles/global.css`. La orquestación podrá residir en un módulo específico de entrada. No requiere nuevas dependencias ni cambios de contenido, destinos de enlaces o geometría de ilustraciones.

El alcance se limita a la entrada inicial del nav y hero. La apertura del menú móvil, las entradas por scroll de otras secciones y una variante más expresiva quedan fuera de esta primera versión.
