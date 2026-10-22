# Tasks

## 1. Arranque y ciclo de vida de la entrada

- [x] 1.1 Añadir el arranque antes del primer pintado y el coordinador de estados según `design.md`; verificar que una carga arriba habilita la entrada y que movimiento reducido, sección inicial desplazada y pestaña oculta adoptan el estado final sin reproducirla.
- [x] 1.2 Implementar la recuperación acotada de inicialización y la salida idempotente para final, scroll, foco, visibilidad, movimiento reducido y restauración desde bfcache; verificar con el módulo bloqueado, inicialización tardía, preferencia cambiada durante la entrada y regreso desde otra página que nunca queda contenido oculto ni se repite la secuencia.

## 2. Grupos visuales y partitura

- [x] 2.1 Incorporar los ganchos y envoltorios mínimos en header y hero y los keyframes de entrada con la partitura de `design.md`; verificar en una reproducción normal y ralentizada que nav, badge, título completo, descripción, CTA con garantía e ilustración comparten inicio temporal y terminan aproximadamente a los 780 ms.
- [x] 2.2 Mantener la ilustración animada únicamente por opacidad desde un envoltorio exterior a `.scene` y retirar estilos temporales al terminar; verificar ausencia de saltos de layout, transformaciones persistentes, cambios en el hash de `public/images/hero-reference.png` o alteraciones de posición de sus piezas.
- [x] 2.3 Verificar los grupos a 320, 390, 768, 1024, 1440 y 1920 px, con foco y clic durante la entrada; comprobar que CTA, menú móvil, foco visible, estado pulsado, fila de pausa y encuadre mantienen su funcionamiento, sin desbordamiento ni revelación de controles ocultos por breakpoints.

## 3. Conexión con la actividad ambiental

- [x] 3.1 Añadir en `motion.ts` la condición de entrada terminada solo para la escena del hero y recalcularla al completar u omitir la entrada; verificar que sus señales permanecen ocultas hasta el final y que inicializar los controladores en distinto orden no las activa anticipadamente.
- [x] 3.2 Conservar pausa manual, movimiento reducido y visibilidad como condiciones de reproducción; verificar pausa antes de los 780 ms, reanudación posterior, salida y regreso al viewport, cambio de pestaña y acceso directo a una sección inferior, comprobando también que las otras cuatro escenas no esperan la entrada del hero.

## 4. Verificación de integración

- [x] 4.1 Ejecutar `npm run build` y revisar la landing compilada con caché fría y red lenta, sin JavaScript y con movimiento reducido; verificar estado final visible, acceso inmediato al contenido, ausencia de destellos de ocultación y ausencia de esperas por recursos inferiores.
- [x] 4.2 Revisar visualmente el flujo completo de la landing y sus controles tras la entrada y registrar la evidencia en `verification.md` dentro del cambio; incluir la partitura observada, interrupciones, fallback, anchos revisados y cualquier limitación pendiente, sin presentar la compilación como prueba de calidad visual.
