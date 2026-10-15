# Design

## Context

Relevo usa Astro 7 y componentes `.astro`, sin integración React ni librería de iconos. Ver `proposal.md` para la motivación y `specs/landing-page/spec.md` para el contrato visual nuevo.

Las flechas de lanzamiento son caracteres `↗` en cuatro componentes; Footer usa `→`. Header dibuja el menú con dos elementos `i` y centraliza todos sus cierres en `setOpen`. El script de movimiento reemplaza el contenido de `.motion-symbol` con `textContent`, por lo que una sustitución directa del símbolo por SVG perdería el icono en la primera actualización. El reset global ya establece `[hidden] { display: none !important; }`.

Este cambio merece diseño por incorporar una dependencia externa y coordinar iconos con dos controles interactivos. No se han ejecutado todavía instalación ni pruebas de compatibilidad del paquete: se verificarán durante la aplicación.

## Goals / Non-Goals

**Goals:**
- Renderizar únicamente los iconos necesarios desde Astro y sincronizar los pares de iconos con las fuentes de estado existentes.
- Mantener dimensiones estables al alternar iconos y conservar los nombres accesibles de botones y enlaces.
- Dar al agente de implementación una ruta concreta que preserve la degradación sin JavaScript.

**Non-Goals:**
- Crear un catálogo dinámico, un sistema de iconos genérico o un componente interactivo con otro framework.
- Modificar el diseño de marca, las escenas, las políticas de reproducción o las integraciones pendientes.

## Decisions

### 1. Integración nativa y selección estática

Instalar `@lucide/astro` mediante `pnpm add @lucide/astro`, actualizar el lockfile e importar por nombre `ArrowUpRight`, `ArrowRight`, `Menu`, `X`, `Pause` y `Play` en los componentes que los usan. La [guía oficial](https://lucide.dev/guide/astro/getting-started) documenta estas importaciones como componentes que generan SVG y excluyen iconos no utilizados. Consultar también la [estructura de componentes Astro](https://docs.astro.build/en/basics/astro-components/).

Se descartan `lucide-react`, una fuente de iconos y la generación de SVG en el cliente: añadirían infraestructura o trabajo en ejecución innecesarios para esta landing. No crear un wrapper dinámico ni importar el catálogo completo; la escala actual permite importaciones directas.

### 2. Convención visual pequeña

Usar 16 px, `stroke-width={1.5}`, `currentColor`, `aria-hidden="true"` y `focusable="false"` de forma explícita. Aplicar una clase global pequeña, por ejemplo `.ui-icon`, para impedir encogimiento en flex y asegurar dimensiones uniformes; conservar contenedores de 16 px para los pares alternables. El trazo de 1.5 encaja con las líneas finas existentes. Las dimensiones son el valor inicial de implementación; cualquier ajuste visual debe aplicarse de forma consistente al conjunto.

Actualizar las reglas que hoy dependen de `font-size` en `.arrow` y `.motion-symbol`, eliminar el dibujo `.menu-icon i` y centrar el icono en el botón de suscripción. El color se hereda de cada control, incluyendo el plan Pro y las variantes claras y de contorno.

La alternativa de mantener caracteres y cambiar su tipografía conservaría diferencias entre plataformas y no integraría la biblioteca solicitada.

### 3. Pares de iconos presentes en el HTML

Renderizar ambos iconos de cada control dentro de envoltorios HTML decorativos y alternar `hidden` en esos envoltorios. No reconstruir SVG, usar `innerHTML` ni asignar `textContent` al contenedor de iconos. Es válido seguir actualizando el texto de las etiquetas que tienen sus propios selectores.

En Header, `setOpen` actualizará `Menu`/`X` junto a `aria-expanded`, `data-open` y la etiqueta. Esta función ya cubre clic, Escape, selección de sección y cambio de breakpoint; centralizar aquí la alternancia evita estados divergentes. Inicialmente aparece `Menu` y `X` está oculto, dentro del botón inicialmente oculto hasta que JavaScript mejora la navegación.

En Hero y `motion.ts`, preparar envoltorios identificables para `Pause` y `Play`. `updateMotion` mostrará `Play` si `userPaused` es verdadero y `Pause` en caso contrario, a la vez que actualiza etiqueta y `aria-pressed`. La salida del viewport o el ocultamiento de la pestaña no cambia `userPaused` y, por tanto, tampoco cambia la acción disponible. Con movimiento reducido el botón completo sigue oculto.

La alternativa de alternar un único SVG mutando sus trazados acoplaría el script al dibujo interno de la biblioteca; los pares estáticos necesitan solo los manejadores existentes.

### 4. Accesibilidad y verificación proporcional

Los iconos son decorativos: las etiquetas visibles `Menu`, `Close`, `Pause animations` y `Resume animations`, y el `aria-label` existente de suscripción, siguen proporcionando los nombres. Las dimensiones pertenecen al icono; las superficies de interacción conservan sus áreas actuales. Las flechas diagonales no alteran el destino interno `#pricing`.

Verificar `pnpm build`, el HTML estático y las interacciones en navegador; no introducir un runner de pruebas para esta sustitución visual. Revisar móvil a 320 y 390 px y escritorio a 1440 px, especialmente menú, pares de estado, contraste y ausencia de desbordamiento. Con JavaScript desactivado, los SVG de flechas están presentes y los controles de menú y movimiento permanecen ocultos según su contrato actual.

## Risks / Trade-offs

- El paquete debe ser compatible con Astro y Node instalados → revisar la resolución de dependencias y completar la compilación antes de dar por aplicada la integración.
- `textContent` puede destruir el SVG → sustituir esa operación exclusivamente en el contenedor de iconos y comprobar varias alternancias de pausa/reanudación.
- Dos iconos podrían mostrarse a la vez o provocar saltos → usar envoltorios con `hidden`, dimensiones reservadas y comprobar cada vía de cierre del menú.
- Los estilos locales de Astro pueden no alcanzar nodos generados por componentes hijos → aplicar propiedades SVG explícitas y una utilidad global acotada, verificando el resultado compilado.
- El repositorio ya tiene cambios sin commit del renombrado a Relevo → preservar esos cambios y acotar los nuevos a los archivos de la propuesta.

## Migration Plan

1. Instalar la dependencia, actualizar los cinco componentes, el script de movimiento y los estilos.
2. Compilar y verificar los escenarios del delta antes de cerrar tareas.
3. Integrar mediante el flujo habitual del proyecto; este cambio no requiere despliegue ni migración de datos.
4. Si hiciera falta revertir, deshacer únicamente las modificaciones de Lucide en componentes, script, estilos, manifiesto y lockfile, conservando el renombrado a Relevo.
