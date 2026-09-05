# Feature Specification: Homepage Discovery and Booking

**Feature Branch**: `001-homepage-discovery-booking`

**Created**: 2026-09-04

**Status**: Draft

**Input**: User description: "Mejora la homepage y el flujo de descubrimiento/reserva de Explore Tours… Alcance: catálogo, FAQ, buscador en el hero (Transporte y Por horas, sin eSIM). **Enmienda 1**: formato del hero original (h1, subtítulo y botón a la izquierda); buscador en el pie. **Enmienda 2**: buscador compacto (~40–60% menos alto), flush al borde inferior del hero, una fila en desktop, etiquetas dentro del campo; no tocar catálogo/FAQ ni tipografía/marca global."

## Clarifications

### Session 2026-09-04

- Q: ¿Qué ocurre al pulsar Buscar/Continuar en el hero? → A: Resumen de cotización en la homepage cerca del hero, con los datos de la búsqueda y CTA a WhatsApp; experiencias relacionadas opcionales (no WhatsApp inmediato, no zona de resultados más abajo, no modal).
- Q: ¿Cómo se tratan las categorías sin oferta? → A: En este alcance solo se muestran categorías con experiencias actuales de Explore (city tours, traslados, barcos/islas, destinos Caribe); ninguna etiqueta “Próximamente” ni recuento en cero.
- Q: ¿Cómo se presentan los destinos nacionales actuales? → A: Cada destino actual entra al catálogo como card (imagen, descripción, CTA WhatsApp) en la categoría Destinos Caribe; se elimina la sección de iconos Destinos Nacionales.
- Q: ¿Qué ocurre en Transporte si origen y destino son el mismo? → A: No avanza la búsqueda; aviso en español y sugerencia explícita de pasar a Por horas con ese lugar como recogida (el visitante debe aceptar el cambio; no es automático).
- Q: ¿Qué hora se pide en ida y vuelta? → A: Fecha de ida, fecha de regreso y una sola hora (la de ida). La hora de vuelta se confirma en la cotización por WhatsApp; el formulario no pide un segundo horario.
- Q: ¿Cómo debe distribuirse el hero con el buscador? → A: Conservar el formato original: bloque superior con `h1`, subtítulo y botón CTA alineados a la izquierda (más Instagram debajo); el buscador y el resumen de cotización van en el **pie del hero**, anclados abajo, sin tapar la fotografía donde vive el mensaje de marca.
- Q: ¿Cómo debe verse el widget del buscador respecto a la foto? → A: Compacto y **flush al borde inferior** del hero/viewport. Debe dejar visible el sujeto principal de la foto (p. ej. vehículo / calle colonial) entre el bloque de marca y el buscador. La altura visual del panel blanco MUST reducirse de forma notable (~40–60% respecto al panel alto actual), sin perder legibilidad ni usabilidad táctil. Funcionalidad idéntica (Transporte / Por horas, Solo ida | Ida y vuelta, campos y CTA); sin eSIM. Este cambio no rediseña tipografía/marca global ni toca catálogo ni FAQ.
- Q: ¿Dónde va el resumen de cotización en el panel compacto? → A: Franja slim **encima** del formulario; el formulario sigue visible y editable para re-buscar. No reemplaza los campos ni empuja el buscador al centro del hero.
- Q: ¿Qué altura tiene el hero en móvil con campos apilados? → A: El hero MAY crecer más allá de un viewport; el visitante hace scroll de página normal. MUST NOT haber scroll interno dentro del panel del buscador.
- Q: ¿Etiqueta flotante o solo placeholder? → A: Etiquetas flotantes (visibles también al escribir); no solo placeholder que desaparece.
- Q: ¿Cómo entra la fecha de regreso en desktop? → A: Segunda fila compacta (reflow); no forzar seis+ controles en una sola fila.
- Q: ¿Tabs y radios en una o dos filas? → A: Una franja cuando quepa; si no, dos micro-filas sin volver al widget alto.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explorar el catálogo de experiencias (Priority: P1)

Un visitante llega a Explore Tours para decidir qué hacer en el Caribe colombiano. En la homepage ve un único catálogo de experiencias en cards (imagen, título, descripción breve y CTA): incluye el portafolio de servicios y los destinos que hoy son bloques con icono. No hay una sección paralela de destinos solo con iconos. Puede filtrar por categorías con oferta real (city tours, traslados, barcos/islas, destinos Caribe). Desde una tarjeta puede pedir la experiencia sin abandonar el modelo de contacto actual de la agencia.

**Why this priority**: Si el visitante no encuentra ofertas reales de forma clara, el buscador y el FAQ no convierten. El catálogo es el corazón del descubrimiento y debe existir aunque el resto aún no esté.

**Independent Test**: Con el catálogo solo (sin buscador ni FAQ), un visitante puede recorrer todas las experiencias actuales de Explore, cambiar de categoría sin ver vacíos, y iniciar una reserva desde una tarjeta.

**Acceptance Scenarios**:

1. **Given** un visitante en la homepage, **When** llega a la sección de experiencias, **Then** ve cards con imagen, título, descripción breve y un CTA de reserva para cada experiencia publicada.
2. **Given** el portafolio y destinos actuales de Explore, **When** el visitante recorre el catálogo, **Then** están presentes como cards al menos: City Tour Cartagena, City Tour Barranquilla, City Tour Santa Marta, traslados aeropuerto, alquiler de barcos/paseo por islas, compra de esmeraldas, Playa Blanca y Barú, Volcán del Totumo, Cartagena y Santa Marta, Sincelejo y Montería, y transporte especializado; no existe una grilla aparte de destinos solo con iconos.
3. **Given** categorías visibles (city tours, traslados, barcos/islas, destinos Caribe u otras equivalentes con oferta real), **When** el visitante elige una categoría, **Then** ve solo experiencias de esa categoría y el recuento o el listado nunca muestra “0 experiencias”.
4. **Given** una categoría sin oferta real de Explore (p. ej. tipos copiados de un competidor), **When** se construye la navegación, **Then** esa categoría no aparece en absoluto: no hay “Próximamente” ni “0 experiencias” en este alcance.
5. **Given** un visitante interesado en una experiencia, **When** usa el CTA de la card, **Then** inicia el contacto de reserva hacia WhatsApp con un mensaje que identifica esa experiencia, sin pasar por un checkout de pago en el sitio.

---

### User Story 2 - Buscar transporte o servicio por horas desde el hero (Priority: P1)

Un visitante con intención de traslado o de vehículo por horas no quiere primero leer el catálogo. En el hero conserva el formato de marca original: título `h1`, subtítulo y botón de exploración alineados a la izquierda, con aire visual y la fotografía visible (incluido el sujeto principal de la imagen, p. ej. el vehículo). En el **pie del hero**, **flush al borde inferior** del viewport/hero, encuentra un **buscador compacto** (panel notablemente menos alto que el widget blanco actual) con dos modos: **Transporte** y **Por horas**. En pantallas anchas los campos van en **una sola fila** con el CTA al final; en móvil se apilan de forma densa. Completa campos esenciales y pulsa Buscar/Continuar. El resumen de cotización aparece en ese mismo pie, con CTA a WhatsApp; no hay pago en el sitio. No existe ningún modo ni mención de eSIM o planes de datos.

**Why this priority**: Es el patrón de conversión de la referencia y el camino más corto para quien ya sabe que necesita moverse. Si el widget tapa la foto o ocupa media pantalla, la marca pierde fuerza y el hero deja de ser aspiracional.

**Independent Test**: Sin usar el catálogo, un visitante ve el hero con h1/subtítulo/botón arriba y el buscador compacto flush al pie (foto visible entre ambos); completa Transporte (ida o ida y vuelta) y Por horas, y ve el resumen de cotización en el pie del hero.

**Acceptance Scenarios**:

1. **Given** un visitante en la homepage en escritorio (~1280×800), **When** ve el hero sin hacer scroll, **Then** el bloque superior muestra h1, subtítulo y botón CTA alineados a la izquierda; entre ese bloque y el buscador se ve claramente el sujeto principal de la foto de fondo; el panel del buscador está pegado al pie del hero (flush al borde inferior), no flotando a media altura ni tapando el título.
2. **Given** el pie del hero, **When** el visitante lo usa, **Then** ve modos Transporte y Por horas, sin tab ni copy de eSIM, datos móviles o similares.
3. **Given** el modo Transporte, **When** el visitante elige “solo ida”, **Then** ve origen, destino, fecha, hora y pasajeros, y no se le exige fecha de regreso.
4. **Given** el modo Transporte, **When** el visitante elige “ida y vuelta”, **Then** debe indicar origen, destino, fecha de ida, fecha de regreso, una sola hora (la de ida) y pasajeros; no aparece un campo de hora de regreso.
5. **Given** el modo Por horas, **When** el visitante completa el formulario, **Then** indica lugar de recogida, duración del recorrido, fecha, hora y pasajeros (no origen/destino de trayecto puntual como en Transporte).
6. **Given** un viewport de escritorio amplio, **When** mira el formulario de Transporte (solo ida), **Then** los campos Origen, Destino, Fecha, Hora, Pasajeros y el botón Buscar/Continuar se presentan en **una sola fila** (o el botón al final de esa fila); el botón no es una barra naranja a ancho completo de altura desproporcionada respecto a los campos.
7. **Given** un viewport móvil, **When** mira el buscador, **Then** los campos se apilan de forma compacta (sin padding excesivo); el hero puede crecer más allá de un viewport y el visitante hace scroll de página; MUST NOT haber scroll interno dentro del panel; tabs y tipo de viaje siguen usables.
8. **Given** cualquier viewport, **When** mira las etiquetas de los campos, **Then** no hay una etiqueta apilada encima de un input alto: usa **etiquetas flotantes** (visibles también al escribir), no solo un placeholder que desaparece.
9. **Given** el panel del buscador, **When** un revisor lo compara con el widget alto previo (captura de referencia), **Then** la altura total del panel es **notablemente menor** (orden de magnitud ~40–60% menos), con tabs y radios en una franja baja (idealmente una línea si cabe) y densidad interior reducida sin perder usabilidad táctil.
10. **Given** un formulario válido, **When** pulsa Buscar/Continuar, **Then** ve en el pie del hero una franja slim de resumen de cotización **encima** del formulario (formulario sigue visible y editable) con los datos enviados y un CTA para continuar por WhatsApp; no se abre WhatsApp solo, no aparece un modal, no se desplaza a una zona de resultados más abajo de la página y el buscador no se mueve al centro del hero. No introduce tarjeta ni pasarela.
11. **Given** campos incompletos o incoherentes (fecha pasada, regreso antes de la ida, duración o pasajeros vacíos, origen y destino iguales), **When** intenta buscar, **Then** no avanza y recibe una indicación clara de qué corregir, en español.
12. **Given** modo Transporte con origen y destino iguales, **When** pulsa Buscar/Continuar, **Then** no se genera el resumen de cotización; ve un aviso de que el traslado necesita origen y destino distintos y una opción explícita para pasar a Por horas usando ese lugar como recogida. El modo no cambia hasta que el visitante acepta.

---

### User Story 3 - Resolver dudas de reserva en el FAQ (Priority: P2)

Un visitante casi convencido duda por cancelación, horarios, pagos, qué incluye, cómo reservar o cómo contactar. Cerca del cierre de la página (después de experiencias/confianza y antes del pie) encuentra preguntas frecuentes en formato desplegable, en el mismo tono cercano del sitio. Lee la respuesta sin salir de la homepage y, si aún quiere hablar con alguien, el camino de contacto sigue siendo WhatsApp.

**Why this priority**: Reduce fricción y objeciones, pero no sustituye el catálogo ni el buscador. Aporta valor en cuanto existan experiencias y un CTA de reserva.

**Independent Test**: Un visitante que no usa el buscador puede abrir cada pregunta del FAQ, leer una respuesta útil y localizar cómo contactar.

**Acceptance Scenarios**:

1. **Given** un visitante que recorre la homepage hacia el cierre, **When** llega al FAQ, **Then** ve una sección de preguntas frecuentes desplegables, visible sin buscar en otra página.
2. **Given** las objeciones típicas de reserva, **When** revisa el FAQ, **Then** hay ítems que cubren al menos: cancelación, horarios/disponibilidad, pagos, qué incluye, cómo reservar y contacto.
3. **Given** una pregunta cerrada, **When** el visitante la abre, **Then** se despliega la respuesta y puede cerrarla de nuevo. Abrir otra puede colapsar la anterior o permitir varias abiertas, siempre que el comportamiento sea evidente.
4. **Given** el tono de Explore Tours, **When** lee las respuestas, **Then** están en español claro y cercano, alineadas con el modelo real (reserva por WhatsApp, sin pago en el sitio) y no copian políticas de otra agencia como si fueran de Explore.

---

### User Story 4 - Confiar y orientarse en la homepage (Priority: P3)

Un visitante nuevo necesita sentir que Explore es una agencia real del Caribe, no un buscador genérico. El hero conserva la voz y el **formato visual previo**: `h1` “Explore Travel Tours”, subtítulo aspiracional, botón hacia experiencias y enlace a Instagram, alineados a la izquierda sobre la fotografía. El buscador vive en el pie del hero y no reemplaza ese bloque. Conserva testimonios actuales e identidad visual. Puede mostrar señales de confianza discretas (derivadas del copy existente) solo si no desplazan ni tapan h1/subtítulo/botón. La navegación permite saltar a experiencias, testimonios y FAQ.

**Why this priority**: Sostiene conversión y marca, pero el valor nuevo medible está en catálogo, búsqueda y FAQ.

**Independent Test**: Un visitante reconoce el hero original (h1, subtítulo, botón a la izquierda) con buscador en el pie; testimonios, Instagram y WhatsApp siguen visibles; sin eSIM.

**Acceptance Scenarios**:

1. **Given** la homepage actualizada, **When** un visitante que ya conocía Explore la recorre, **Then** siguen visibles el logo, testimonios de Camila Ramírez, Daniel Vélez y Laura Castaño, el enlace de Instagram y el contacto WhatsApp (header y botón flotante).
2. **Given** el hero, **When** el visitante lo mira, **Then** ve el `h1`, subtítulo y botón CTA alineados a la izquierda como antes, la foto de fondo legible (sujeto principal visible) entre el bloque de marca y un buscador compacto flush al pie.
3. **Given** la navegación, **When** elige Inicio, Experiencias/Servicios, Testimonios o Preguntas frecuentes, **Then** llega a esa sección en la misma página.

---

### Edge Cases

- Categoría o filtro que dejaría el catálogo vacío: no se ofrece como filtro; el visitante solo ve las categorías con oferta actual. No existe “Próximamente” ni “0 experiencias” en este alcance.
- Búsqueda con origen y destino iguales en Transporte: no se trata como traslado válido ni se cambia de modo solo; el visitante ve un aviso en español y puede aceptar pasar a Por horas con ese lugar como recogida (fecha, hora y pasajeros ya indicados se conservan).
- Fecha de ida en el pasado, o fecha de regreso anterior a la ida: no se envía la búsqueda; el visitante corrige las fechas.
- Ida y vuelta: el formulario no pide hora de regreso; el resumen y el mensaje a WhatsApp dejan claro que la hora de vuelta se confirma con la agencia.
- Pasajeros en 0, vacío o un valor no numérico: no se avanza hasta indicar al menos 1 pasajero.
- Duración de Por horas no seleccionada: no se avanza.
- Visitante completa el buscador en el pie del hero: puede seguir editando el formulario; el resumen se actualiza al volver a Buscar/Continuar dentro del mismo pie, sin perder de vista el bloque superior del hero.
- Hero en móvil: h1/subtítulo/botón siguen legibles a la izquierda; el buscador compacto apila campos; el hero MAY superar un viewport (scroll de página). MUST NOT usar scroll interno dentro del panel del buscador ni tapar el título.
- Ida y vuelta en layout compacto: la fecha de regreso entra en una **segunda fila compacta** en desktop; en móvil el apilado sigue denso. MUST NOT forzar seis+ controles en una sola fila.
- Por horas en layout compacto: misma densidad y franja de tabs; campos en una fila en desktop cuando quepan, apilados compactos en móvil.
- Tabs y radios: una franja cuando quepa; si el viewport no alcanza, dos micro-filas sin recuperar la altura del widget alto de referencia.
- Resumen de cotización tras Buscar: franja slim **encima** del formulario en el pie; el formulario permanece editable. MUST NOT reemplazar los campos por el resumen, MUST NOT empujar el buscador al centro del hero ni ocultar de forma permanente el sujeto principal de la foto.
- Visitante llega desde el móvil: el buscador, las categorías, las cards y el FAQ siguen usables (campos visibles, menú no tapa el CTA, desplegables se pueden abrir).
- Experiencia del catálogo vs. búsqueda de transporte: ambos caminos pueden coexistir; elegir una card no borra de forma destructiva una búsqueda a medias salvo que el visitante inicie otra acción de forma explícita.
- No hay disponibilidad “en vivo”: el sitio no inventa cupos, precios ni vehículos concretos; el siguiente paso es cotizar/reservar con la agencia.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La homepage MUST presentar un catálogo navegable de experiencias, cada una con imagen, título, descripción breve y CTA de reserva visible.
- **FR-002**: El catálogo MUST incluir, como cards con imagen, título, descripción y CTA, todas las ofertas ya publicadas: city tours de Cartagena, Barranquilla y Santa Marta (categoría City tours); traslados aeropuerto y transporte especializado (categoría Traslados); alquiler de barcos turísticos y paseo por islas (categoría Barcos/islas); compra de esmeraldas, Playa Blanca y Barú, Volcán del Totumo, Cartagena y Santa Marta, y Sincelejo y Montería (categoría Destinos Caribe). MUST NOT conservarse la sección de destinos solo con iconos.
- **FR-003**: El visitante MUST poder organizar o filtrar el catálogo por categorías alineadas a Explore (como mínimo: city tours, traslados, barcos/islas, destinos Caribe). Cada categoría mostrada como disponible MUST tener al menos una experiencia real.
- **FR-004**: El sitio MUST mostrar únicamente categorías con al menos una experiencia real de Explore (city tours, traslados, barcos/islas, destinos Caribe). MUST NOT mostrar categorías vacías, recuentos “0 experiencias” ni etiquetas “Próximamente” en este alcance.
- **FR-005**: El CTA de cada experiencia MUST iniciar la reserva por WhatsApp hacia el número comercial de Explore (`+57 304 214 3149`) con un mensaje en español que identifique la experiencia, abriendo en una nueva vista. MUST NOT añadir checkout, pasarela ni captura de pago en el sitio.
- **FR-006**: El hero MUST conservar el formato de marca previo en la zona superior: `h1` con el nombre Explore Travel Tours, subtítulo y botón CTA hacia experiencias, alineados a la izquierda, con overlay legible sobre la fotografía. MUST incluir en el **pie del hero** un buscador de reserva con exactamente dos modos: Transporte y Por horas. El panel del buscador MUST quedar **flush al borde inferior** del hero/viewport. El buscador MUST NOT reemplazar ni tapar el bloque h1/subtítulo/botón; MUST dejar visible el sujeto principal de la foto entre el bloque de marca y el panel.
- **FR-007**: El flujo nuevo MUST NOT mencionar ni ofrecer eSIM, planes de datos, roaming ni productos de conectividad móvil.
- **FR-008**: En Transporte, el visitante MUST poder elegir solo ida o ida y vuelta. Campos: origen, destino, fecha de ida, hora de ida y pasajeros; si es ida y vuelta, también fecha de regreso. MUST NOT pedir hora de regreso en el formulario; esa hora se confirma en la cotización por WhatsApp. El resumen y el mensaje prefijado MUST indicar que la hora de vuelta queda pendiente de confirmación.
- **FR-009**: En Por horas, el visitante MUST indicar lugar de recogida, duración, fecha, hora y número de pasajeros.
- **FR-010**: La acción Buscar/Continuar MUST mostrar, en el pie del hero, una franja slim de resumen de cotización **encima** del formulario (misma sección `#about`), con los datos de la búsqueda y un CTA para continuar por WhatsApp (mensaje prefijado). El formulario MUST permanecer visible y editable. MUST NOT abrir WhatsApp de inmediato como único resultado, MUST NOT usar un overlay/modal, MUST NOT desplazar al visitante a una zona de resultados más abajo de la página, MUST NOT reemplazar los campos por el resumen, y MUST NOT cobrar ni pedir datos de tarjeta.
- **FR-022**: El layout del hero MUST separar dos zonas: (1) **bloque de marca** arriba/izquierda con h1, subtítulo, botón e Instagram y aire suficiente; (2) **pie transaccional** flush al borde inferior con buscador compacto y, tras búsqueda válida, franja de cotización encima del formulario. La fotografía del hero MUST permanecer visible y dominante entre ambas zonas (incluido el sujeto principal de la imagen). El pie puede usar panel legible sin volver a un widget que ocupe la mitad del hero.
- **FR-023**: El panel del buscador MUST ser **compacto**: altura total notablemente menor que el widget alto de referencia (~40–60% menos), con menos aire vertical interno (menos espacio entre tabs, radios y campos) sin perder legibilidad ni áreas táctiles usables.
- **FR-024**: En viewport de escritorio amplio, el formulario de Transporte (solo ida) MUST presentar Origen | Destino | Fecha | Hora | Pasajeros | botón Buscar/Continuar en **una sola fila** (botón al final de la fila). El botón MUST NOT ser una barra a ancho completo de altura desproporcionada; su altura MUST alinearse visualmente a la de los campos. Tabs Transporte/Por horas y radios Solo ida | Ida y vuelta MUST ocupar una franja cuando quepa; si no, dos micro-filas. En ida y vuelta, la fecha de regreso MUST entrar en una **segunda fila compacta**, no forzar todos los campos en una sola fila.
- **FR-025**: En viewport móvil, los campos MUST apilarse de forma compacta (sin padding excesivo). El hero MAY crecer más allá de un viewport; el scroll MUST ser de página, no interno al panel. Tabs y Solo ida / Ida y vuelta / Por horas MUST seguir funcionando.
- **FR-026**: Las etiquetas de campo MUST NOT apilarse encima de inputs altos. MUST usarse **etiquetas flotantes** (visibles también cuando el campo tiene valor). MUST NOT depender solo de un placeholder que desaparece al escribir.
- **FR-027**: Este cambio de layout del buscador MUST NOT rediseñar tipografía ni identidad visual global de la marca, MUST NOT alterar el catálogo de experiencias ni el FAQ.
- **FR-011**: El buscador MUST validar lo esencial antes de continuar: campos requeridos presentes, al menos un pasajero, fecha de ida no pasada, fecha de regreso no anterior a la ida cuando aplique, y en Transporte origen distinto de destino. Los mensajes de error MUST estar en español y ser accionables.
- **FR-021**: Si en Transporte origen y destino coinciden, el sitio MUST NOT mostrar el resumen de cotización. MUST informar que se necesitan lugares distintos y MUST ofrecer pasar a Por horas con ese lugar como recogida; el cambio de modo MUST ocurrir solo si el visitante lo acepta. Fecha, hora y pasajeros ya capturados MUST conservarse al aceptar.
- **FR-012**: MUST existir una sección de preguntas frecuentes en formato desplegable, ubicada cerca del cierre de conversión (después de catálogo y/o testimonios, antes del pie).
- **FR-013**: El FAQ MUST responder, en ítems distintos, al menos: cancelación, horarios/disponibilidad, pagos, qué incluye un servicio, cómo reservar y cómo contactar.
- **FR-014**: Las respuestas del FAQ MUST estar en español, tono cercano, y MUST reflejar el modelo operativo de Explore (contacto y reserva por WhatsApp; el sitio no procesa pagos). MUST NOT atribuir a Explore políticas de otra agencia (p. ej. cancelación gratuita a 24 h, listado de tarjetas o disponibilidad 24/7) salvo que el negocio las confirme.
- **FR-015**: La homepage MUST conservar header con navegación, testimonios actuales, pie con copyright, Instagram de la marca y botón flotante de WhatsApp, además del CTA de contacto del header.
- **FR-016**: La interfaz pública MUST permanecer en español, con metadatos de agencia de turismo en Cartagena (título, descripción, indexación y datos estructurados de TravelAgency) y sin vaciar la identidad de marca existente.
- **FR-017**: El sitio MUST NOT crear cuentas de usuario, carrito persistente, ni almacenar datos del visitante en un servidor de esta aplicación para completar la reserva.
- **FR-018**: El contenido nuevo MUST NOT inventar destinos, precios, horarios publicados, flota concreta o alianzas que no estén en el copy actual o en una instrucción explícita del negocio.
- **FR-019**: La navegación MUST permitir ir al menos a inicio (hero), catálogo de experiencias, testimonios y FAQ.
- **FR-020**: En el paso de cotización tras buscar, si hay experiencias del catálogo claramente relacionadas (p. ej. traslado aeropuerto cuando origen o destino lo sugiere), el sitio MAY mostrarlas como sugerencias; MUST NOT mostrar resultados inventados de disponibilidad o precio.

### Key Entities

- **Experiencia**: Oferta vendible o destacada (tour, traslado, barco, destino-experiencia). Atributos: título, descripción breve, imagen, categoría, CTA de reserva. Fuente: portafolio y destinos actuales de Explore.
- **Categoría**: Agrupación de experiencias con oferta actual (city tours, traslados, barcos/islas, destinos Caribe). No se publica una categoría sin experiencias ni un estado “Próximamente”.
- **Solicitud de Transporte**: Intención de traslado. Atributos: tipo de viaje (solo ida / ida y vuelta), origen, destino, fecha de ida, fecha de regreso (si ida y vuelta), hora de ida, número de pasajeros. No incluye hora de regreso.
- **Solicitud por Horas**: Intención de vehículo/recorrido por tiempo. Atributos: lugar de recogida, duración, fecha, hora, número de pasajeros.
- **Paso de cotización**: Franja slim de resumen visible **encima** del formulario en el pie del hero tras una búsqueda válida, más el CTA WhatsApp. El formulario permanece editable. Puede incluir experiencias relacionadas del catálogo; no es un modal, no reemplaza los campos ni es una sección inferior fuera del hero.
- **Pregunta frecuente**: Par pregunta/respuesta sobre objeciones de reserva, visible en desplegable.
- **Señal de confianza**: Mensaje corto de marca (p. ej. atención personalizada, vehículos cómodos, coordinación por WhatsApp) derivado del contenido y testimonios existentes.
- **Testimonio**: Opinión ya publicada (Camila Ramírez, Daniel Vélez, Laura Castaño) que se conserva.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un visitante nuevo localiza y comprende al menos una experiencia del catálogo actual de Explore en menos de 1 minuto de recorrido por la homepage (sin instrucciones previas).
- **SC-002**: El 100% de las categorías visibles contienen al menos una experiencia; un revisor no encuentra “0 experiencias” ni “Próximamente” en el catálogo de este alcance.
- **SC-003**: El 100% de las experiencias ya publicadas de Explore siguen descubribles en el catálogo (ninguna oferta actual desaparece).
- **SC-004**: Un visitante completa una búsqueda válida de Transporte o Por horas y ve el resumen de cotización en el pie del hero (con CTA a WhatsApp) en menos de 2 minutos desde que carga la página, sin abandonar la sección hero.
- **SC-010**: Un revisor confirma que el h1, subtítulo y botón del hero están alineados a la izquierda como el formato original, y que el buscador no tapa la fotografía en la zona superior del mensaje de marca.
- **SC-011**: En escritorio ~1280×800, un revisor confirma que el panel del buscador está pegado al pie del hero y que el sujeto principal de la foto de fondo (p. ej. vehículo) se ve claramente entre el bloque de marca y el buscador.
- **SC-012**: Un revisor confirma que la altura del panel del buscador es notablemente menor que la captura/referencia del widget alto (~40–60% menos), con campos usables y sin romper Solo ida / Ida y vuelta ni el tab Por horas.
- **SC-013**: En móvil, un visitante completa una búsqueda válida con campos apilados compactos; si el hero supera un viewport, el scroll es de página (no interno al panel) y el panel sigue táctilmente usable.
- **SC-005**: Al menos el 90% de los intentos de búsqueda con campos vacíos, fechas incoherentes u origen igual a destino reciben una corrección comprensible y no avanzan a cotización; en origen=destino, el visitante puede aceptar pasar a Por horas.
- **SC-006**: Un visitante que recorre hasta el pie ve el FAQ y puede abrir respuestas a las seis objeciones de reserva (cancelación, horarios, pagos, qué incluye, cómo reservar, contacto) sin salir de la homepage.
- **SC-007**: En una revisión del flujo nuevo (hero, catálogo, cotización, FAQ, navegación) hay 0 menciones de eSIM, planes de datos o conectividad móvil.
- **SC-008**: Desde cualquier CTA de reserva del catálogo o del paso de cotización, el visitante inicia conversación con Explore por WhatsApp con el contexto de lo que pidió, sin introducir datos de pago en el sitio.
- **SC-009**: Un visitante que ya conocía la marca reconoce testimonios, Instagram y tono de Explore; no percibe un cambio de identidad visual (colores, tipografías de marca, logo) como un rediseño total.

## Assumptions

- El visitante típico es un viajero o anfitrión que planea Cartagena u otro destino Caribe de la oferta actual; reserva hablando con la agencia, no pagando en la web.
- “Resultados” no implica motor de disponibilidad en tiempo real ni tarifas calculadas: el valor es capturar la intención y pasar a cotización humana por WhatsApp.
- Origen, destino y recogida pueden ser texto libre con sugerencias de lugares que ya existen en la oferta (Cartagena, Barranquilla, Santa Marta, aeropuerto, Barú, etc.), sin exigir un mapa ni un catálogo cerrado de rutas.
- Duración de Por horas se ofrece en horas enteras (p. ej. 1 a 12), como convención de mercado; no implica una tarifa publicada.
- El número de pasajeros es al menos 1; no se publica capacidad máxima de flota porque Explore no la documenta en el sitio actual.
- Por horas representa transporte privado por tiempo (alineado a transporte especializado / city tours), no un producto nuevo con precios o flota inventados.
- Las políticas detalladas de cancelación, pagos y horarios 24/7 no están publicadas hoy; el FAQ dirá que se confirman al cotizar por WhatsApp y que el sitio no cobra, en lugar de copiar las políticas de Cartagena Tours & Viajes.
- “Qué incluye” en el FAQ puede describir el tipo de servicio a alto nivel (traslado, tour, barco) y remitir el detalle de cada experiencia a la card y a la cotización.
- Los destinos nacionales que hoy son bloques con icono se publican como cards: los destinos geográficos en Destinos Caribe y transporte especializado en Traslados; la grilla de iconos Destinos Nacionales no se conserva.
- Testimonios, logo, Instagram (`exploretraveltoursco`) y número WhatsApp (`+57 304 214 3149`) no cambian.
- B2B / transporte empresarial no se rediseña como vertical; la keyword y la oferta de transporte especializado se conservan dentro de traslados.
- Referencia UX de Cartagena Tours (hero transaccional, bullets de confianza, grid, FAQ): inspiración de comportamiento, no copia literal de copy, categorías vacías, eSIM ni políticas.
- Fuera de alcance: eSIM, rediseño total de marca, portal B2B, pagos reales, cuentas de usuario, páginas de detalle largas fuera de la homepage, y cualquier backend de reservas.
- La homepage sigue siendo una sola página; el paso de cotización vive en el pie del hero (no checkout, no modal, no resultados más abajo).
- El hero tiene dos capas: bloque de marca (h1, subtítulo, botón, Instagram) alineado a la izquierda arriba; buscador compacto + cotización flush al pie, inspiración Cartagena Tours pero sin copiar su copy ni eSIM.
- En ida y vuelta el sitio captura una sola hora (ida); la hora de regreso no se publica ni se inventa, se acuerda al cotizar por WhatsApp.
- “~40–60% menos alto” se valida por comparación visual con la captura del widget actual (referencia del negocio), no con una métrica de píxeles publicada en el sitio.
- Las etiquetas de campo son **flotantes** (permanecen visibles al escribir); no se usa solo placeholder como etiqueta.
- En escritorio, “una sola fila” aplica al caso Solo ida (cinco campos + botón). Ida y vuelta añade la fecha de regreso en una **segunda fila compacta**. Por horas sigue la misma lógica de densidad.
- Tabs y radios: una franja cuando quepa; dos micro-filas si el viewport no alcanza, sin recuperar la altura del widget alto.
- Tras Buscar, el resumen es una franja slim encima del formulario; el visitante puede editar y re-enviar sin un modo “Editar búsqueda” obligatorio.
- En móvil, el hero puede crecer más allá del primer viewport; el criterio anti-scroll absurdo se refiere a **no** scroll interno del panel.
- Esta enmienda de densidad del buscador no implica tocar catálogo, FAQ, tipografía global ni paleta de marca.

## Out of Scope

- Productos o copy de eSIM / planes de datos.
- Rediseño total de marca (nueva paleta, nuevo logo, nueva tipografía global, nueva voz).
- Cambios al catálogo de experiencias o al FAQ en esta enmienda de densidad del buscador.
- Experiencia B2B completa (cotizador empresarial, contratos, login).
- Pagos reales, pasarela, carrito o confirmación de cobro en el sitio.
- Inventar categorías o destinos solo porque existen en un competidor.
- Categorías “Próximamente” o recuentos de oferta vacía.
- Conservar la sección Destinos Nacionales solo con iconos (queda absorbida por el catálogo).
- Campo de hora de regreso en el buscador (se confirma por WhatsApp).
- Motor de inventario, asignación de conductores o precios dinámicos.
- Reemplazar el bloque h1/subtítulo/botón del hero por un buscador centrado que tape la imagen.
- Widget de buscador alto a media altura del hero que oculte el sujeto principal de la foto.
- Multimoneda o selector de idioma.
