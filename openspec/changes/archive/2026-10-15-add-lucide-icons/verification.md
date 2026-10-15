# Verificación

Fecha: 2026-10-15. Cambio: `add-lucide-icons`.

## Compilación e integración

- Instalado `@lucide/astro` 1.57.0, compatible con Astro 7 según sus peer dependencies; lockfile actualizado.
- `pnpm build`: correcto después de integrar los cinco componentes, el script de movimiento y los estilos.
- HTML generado: 10 SVG de interfaz (6 flechas y 4 iconos de estado), todos con 16 px, trazo 1.5, `aria-hidden="true"` y `focusable="false"`. Sin los símbolos tipográficos sustituidos y sin nuevas islas de hidratación.
- `openspec validate add-lucide-icons --strict`: correcto.
- `git diff --check`: correcto.

## Navegador

- Viewports móviles de 320 y 390 px con emulación táctil: sin desbordamiento horizontal; iconos visibles de 16 × 16 px. Escritorio de 1440 px: dimensiones y alineación correctas. Los controles del alcance mantienen áreas de al menos 44 × 44 px.
- Flechas con color heredado en botones oscuros, claros y de contorno; botón de suscripción centrado y deshabilitado.
- Menú: alterna Menu/X y las etiquetas y `aria-expanded`; se comprobó cierre mediante botón, Escape con retorno de foco, enlaces a precios y funcionalidades, y cambio a escritorio.
- Teclado: Enter abre el menú; Tab lleva al enlace Pricing con foco visible; Escape devuelve el foco al botón. SVG excluidos del foco y del árbol accesible.
- Movimiento: seis alternancias consecutivas conservan ambos SVG, muestran solo el correspondiente y actualizan etiqueta y `aria-pressed`. Pausa mantenida al salir y volver al viewport.
- Preferencia de movimiento reducido y visibilidad: se inyectaron estados y eventos controlados en una pestaña de prueba aislada. Al reducir movimiento el control se oculta y todas las escenas se detienen; al restaurarlo mantiene la pausa solicitada. Al simular pestaña oculta las escenas se detienen y al volver se respeta la pausa. Esta comprobación valida el manejador con estados simulados, no cambia preferencias del sistema operativo.
- Facturación: se conservan $25/$49/$99 mensuales y $20.83/$40.83/$82.50 de equivalente mensual anual. Los cinco enlaces de lanzamiento conservan `#pricing`; lista de espera y suscripción siguen deshabilitadas; se conservan marca Relevo y cinco escenas.
- Consola de la página normal: sin errores ni advertencias.

## Presentación sin scripts

Se abrió en el navegador una copia del HTML de producción con una política CSP que bloquea scripts; las rutas de recursos se adaptaron únicamente para cargar los archivos locales. Se verificó que los scripts de la aplicación no se ejecutaron: sin `data-enhanced`, botones de menú y movimiento ocultos, selector de facturación oculto, navegación móvil disponible, 10 SVG presentes, precios mensuales y suscripción deshabilitada. Activar el CTA del hero navegó a `#pricing` sin ejecutar scripts.

## Evidencia local

- `.artifacts/lucide/desktop.png`: vista de escritorio.
- `.artifacts/lucide/mobile.png`: vista móvil con iconos de menú, lanzamiento y pausa.
- `.artifacts/lucide/no-js.html`: copia local de producción con scripts bloqueados por CSP.

Los archivos de `.artifacts/` son evidencia local excluida de Git. La integración conserva los cambios previos sin commit del renombrado a Relevo. Las verificaciones se realizaron antes del archivo del cambio; no se ha desplegado el sitio.

## Ajustes posteriores de la landing

Se incorporó el componente compartido `PixelFill.astro` para un hover naranja pixelado de aproximadamente 500 ms al entrar y salir. El alcance final son los CTA negros de encabezado, hero y cierre, más el periodo de facturación seleccionado con fondo negro. Los botones claros, de contorno, menú y pausa conservan su presentación habitual. Se verificó la selección mensual/anual, el alcance de la clase de animación y la compilación final. La evidencia local adicional está en `.artifacts/pixel-hover/`.
