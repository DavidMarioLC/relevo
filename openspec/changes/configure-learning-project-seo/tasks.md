# Tasks

## 1. Identidad educativa y exclusión de buscadores

- [x] 1.1 Crear `src/data/site.ts` con nombre, título y descripción definidos en el diseño, y consumir esos valores desde `src/layouts/Layout.astro` para reemplazar las etiquetas actuales y añadir Open Graph y Twitter/X. Ejecutar `pnpm build` e inspeccionar el head de `dist/index.html`: etiquetas únicas, contenido educativo coherente y metadata presente sin ejecutar JavaScript.
- [x] 1.2 Añadir una única etiqueta `robots` con `noindex, follow` al layout sin condición de entorno. Inspeccionar la salida de producción para confirmar su presencia, ausencia de directivas contradictorias y ausencia de un `robots.txt` generado que bloquee `/`; conservar idioma, favicon, viewport y color de tema.
- [x] 1.3 Documentar en `README.md` el propósito educativo, la metadata social textual y la exclusión de buscadores. Verificar que la explicación coincide con las etiquetas generadas y no describe el proyecto como un servicio comercial activo ni promete privacidad.

## 2. URL pública opcional

- [x] 2.1 Leer `SITE_URL` desde el entorno del proceso en `astro.config.mjs`, tratar valores vacíos como ausencia y validar los no vacíos según el diseño antes de asignar `site`. Verificar compilación correcta sin variable y con una URL pública de prueba; comprobar fallos comprensibles sin exponer credenciales ante URL relativa, protocolo inválido, host local, credenciales, query o fragmento.
- [x] 2.2 Derivar canonical y `og:url` desde `Astro.site` y el pathname en el layout, conservando el path base cuando exista y omitiendo ambas etiquetas sin sitio configurado. Compilar con y sin `SITE_URL` y comparar el head: URLs absolutas iguales, sin query ni fragmento cuando corresponda, y `noindex, follow` presente en ambos casos.
- [x] 2.3 Añadir `.env.example` con `SITE_URL` vacío y documentar en `README.md` cómo proporcionar una URL real al proceso de compilación, aclarando que no habilita indexación. Verificar el comando documentado con una URL de prueba temporal y confirmar que ningún dominio de ejemplo queda configurado como valor predeterminado.

## 3. Verificación de integración

- [x] 3.1 Revisar conjuntamente los escenarios del delta: metadata educativa y social coherente, exclusión activa con y sin URL pública, ausencia de sitemap y datos estructurados comerciales, y ningún cambio en dependencias o contenido e interacciones del body. Registrar comandos y resultados de la verificación al completar las tareas; no instalar un runner para comprobaciones de etiquetas estáticas.
- [x] 3.2 Ejecutar una compilación final sin `SITE_URL` de prueba y comprobar en `dist/index.html` que no quedan canonical ni `og:url` temporales y que sigue presente `noindex, follow`. Ejecutar `openspec validate configure-learning-project-seo --strict` y revisar el diff para confirmar que todos los cambios pertenecen al alcance aprobado.

## Verificación realizada

- `env -u SITE_URL pnpm build`: compilación correcta; inspección del HTML inicial con el parser HTML de Python confirma etiquetas educativas y sociales únicas, `noindex, follow`, idioma, viewport, favicon y un único h1. Sin canonical, `og:url`, sitemap, bloqueo robots ni datos estructurados comerciales.
- `SITE_URL=https://learning.example.com pnpm build`: compilación correcta; canonical y `og:url` coinciden en `https://learning.example.com/` y se mantiene `noindex, follow`. Dominio reservado usado únicamente como entrada temporal de verificación.
- `SITE_URL=https://learning.example.com pnpm exec astro build --base /learning`: canonical y `og:url` conservan `/learning/`; exclusión activa.
- `SITE_URL='   ' pnpm build`: compilación correcta; variable vacía tratada como ausencia, sin canonical ni `og:url`.
- Matriz de 16 compilaciones con configuración inválida: se rechazaron URL relativa, esquema sin barras, FTP, localhost y subdominio localhost, loopback IPv4 normal y abreviado, IPv4 no especificada, loopback e IP no especificada IPv6 y sus equivalentes IPv4 mapeados, credenciales, query, query vacía y fragmento. Los errores identifican `SITE_URL` y no exponen la credencial ficticia de prueba.
- Comprobación adicional de la configuración importada: HTTP válido y valores vacíos aceptados; loopback rechazado sin confundir un dominio público con prefijo numérico (`127.example.com`) con una IP local.
- El body compilado sin `base` adicional coincide byte a byte con la compilación previa al cambio. `git diff --exit-code -- package.json pnpm-lock.yaml src/pages src/components src/scripts src/styles` confirma que dependencias, composición, estilos e interacciones no cambiaron.
- `git diff --check` y `openspec validate configure-learning-project-seo --strict`: correctos.
