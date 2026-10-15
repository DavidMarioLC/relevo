# Tasks

## 1. Dependencia y flechas de acciones

- [x] 1.1 Instalar `@lucide/astro` con pnpm y actualizar `package.json` y `pnpm-lock.yaml`; verificar la resolución para la versión de Astro/Node del proyecto y que `pnpm build` termina correctamente sin añadir un framework cliente.
- [x] 1.2 Importar `ArrowUpRight` en Header, Hero, Pricing y GetStarted, y `ArrowRight` en Footer; reemplazar las flechas tipográficas y aplicar tamaño 16 px, trazo 1.5 y atributos decorativos. Verificar el HTML compilado, nombres accesibles, destino `#pricing` y estado deshabilitado de suscripción.
- [x] 1.3 Adaptar `.arrow` y añadir la utilidad visual acotada en `src/styles/global.css`; centrar la flecha del botón de suscripción y reservar dimensiones estables para iconos. Verificar en navegador contraste y alineación en variantes oscuras, claras y de contorno, sin desbordamiento a 320, 390 y 1440 px.

## 2. Iconos de controles interactivos

- [x] 2.1 Renderizar `Menu` y `X` en envoltorios HTML dentro de Header, sustituir el dibujo de dos líneas y alternar `hidden` desde `setOpen` junto a su etiqueta y `aria-expanded`. Verificar apertura y cierre por botón, Escape con devolución de foco, enlaces de sección y cambio de breakpoint, con un único icono visible y superficie táctil de al menos 44 por 44 px.
- [x] 2.2 Renderizar `Pause` y `Play` en envoltorios HTML dentro de Hero y adaptar `src/scripts/motion.ts` para alternarlos según `userPaused`, retirando la escritura de texto sobre el contenedor de iconos y ajustando sus estilos locales. Verificar varias alternancias, etiquetas, `aria-pressed`, pausa efectiva de escenas y ausencia de saltos de tamaño o desaparición de SVG.
- [x] 2.3 Verificar en navegador la integración del control de movimiento con salida y retorno al viewport, ocultamiento y retorno a la pestaña, y cambios de movimiento reducido durante la visita; confirmar que se conserva la pausa solicitada y que icono, etiqueta y visibilidad del botón concuerdan con ella.

## 3. Verificación de la integración completa

- [x] 3.1 Ejecutar `pnpm build` con todos los cambios y revisar el HTML de producción y la navegación por teclado; comprobar SVG decorativos sin focos o anuncios adicionales, dimensiones táctiles y ausencia de flechas/símbolos tipográficos sustituidos en los controles del alcance. Comprobar en móvil y escritorio que marca, escenas, precios y acciones conservan su comportamiento y guardar evidencia visual local.
- [x] 3.2 Comprobar la landing sin JavaScript: flechas vectoriales presentes desde el HTML inicial, enlaces a precios operativos, navegación móvil disponible y controles dependientes de JavaScript ocultos; ejecutar `openspec validate add-lucide-icons --strict` y registrar los resultados de verificación al completar las tareas.
