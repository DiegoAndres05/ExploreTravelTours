# Research: Homepage Discovery and Booking

## 1. Representación del catálogo

**Decision**: Cards en HTML estático con `data-category` y `data-experience-id`. Un filtro “Todas” más las cuatro categorías con oferta. Sin JSON remoto ni CMS.

**Rationale**: El catálogo es pequeño (~11 ítems) y debe verse aunque JS falle. Cumple constitución V y el spec (sin “0 experiencias”).

**Alternatives considered**: Array JS que pinta el DOM (rompe el contenido sin JS); `catalog.json` (archivo extra innecesario).

## 2. Destinos nacionales vs grilla de iconos

**Decision**: Eliminar `#destinations` como grilla de iconos. Cada destino geográfico es una card en Destinos Caribe. Transporte especializado es card en Traslados. El ancla `#destinations` hace scroll a `#experiences` y activa el filtro Destinos Caribe.

**Rationale**: Spec Q3. Conserva el contenido exigido por la constitución sin el patrón de iconos.

**Alternatives considered**: Conservar iconos + cards (duplica UI); dejar destinos sin CTA (incumple catálogo navegable).

## 3. Imágenes de destinos sin foto hoy

**Decision**: Reutilizar `assets/` existente solo cuando la foto ya corresponde al lugar (p. ej. `cartagena.png` / `santamarta.png` / `boat.png` / `airport.png`). Para Esmeraldas, Totumo, Playa Blanca y Barú, Sincelejo y Montería: añadir archivos en `assets/` con `alt` descriptivo, o un panel de marca con el título (sin foto de otra ciudad).

**Rationale**: FR-018 / constitución: no inventar destinos ni usar una foto de Cartagena como si fuera Totumo.

**Alternatives considered**: Unsplash genérico mal etiquetado (rechazado); dejar solo iconos (rechazado por spec).

## 4. Hero transaccional y resumen de cotización

**Decision**: Buscador en el **pie del hero** (`.hero-footer`), flush al borde inferior. Resumen `#quote-summary` es una franja slim **encima** del formulario (hermano anterior en el DOM o insertado arriba), oculto hasta submit válido; no modal; no resultados más abajo; formulario permanece editable.

**Rationale**: Spec Q1 + clarificaciones de layout compacto (2026-09-04).

**Alternatives considered**: WhatsApp inmediato; modal; resultados bajo el fold; quote reemplaza el form (rechazado en clarify).

## 11. Bullets de confianza en el hero

**Decision**: No son obligatorios en el layout actual. El bloque de marca es h1 + subtítulo + “Ver Servicios” + Instagram. No reintroducir bullets si reducen el aire entre marca y foto o compiten con el buscador compacto.

**Rationale**: Enmienda de hero (formato original) + FR-027 (no inflar el hero). US4 permite señales discretas solo si no tapan el mensaje.

**Alternatives considered**: Restaurar 3–4 bullets (rechazado para esta densidad).

## 16. Buscador compacto (delta layout)

**Decision**:
1. Panel `.hero-search` **flush** al borde inferior del hero en desktop (~1280×800); sujeto de la foto (vehículo) visible entre marca y panel.
2. Altura del panel ~40–60% menor que el widget alto de referencia: menos padding/gaps; tabs + radios en una franja (o dos micro-filas); botón CTA altura alineada a inputs, no full-width gigante en desktop.
3. Desktop Solo ida: **una fila** Origen | Destino | Fecha | Hora | Pasajeros | Buscar.
4. Ida y vuelta: fecha de regreso en **segunda fila compacta**.
5. Por horas: misma densidad; una fila cuando quepa.
6. Móvil: apilado compacto; hero MAY crecer; **scroll de página**, no scroll interno del panel.
7. **Etiquetas flotantes** (label dentro del campo, visible al escribir); no label apilado encima ni solo placeholder.
8. Sin cambios a catálogo, FAQ, tipografía global ni paleta.

**Rationale**: FR-023–FR-027, SC-011–SC-013, clarificaciones batch recommended.

**Alternatives considered**: Placeholder-only (a11y peor); quote reemplaza form; forzar 6+ campos en una fila; scroll interno del panel en móvil.

## 17. Implementación CSS sin librerías

**Decision**: Floating labels con `label.field` + `input`/`select` y CSS (`:placeholder-shown` / `:focus` / `:not(:placeholder-shown)` o patrón equivalente vanilla). Grid/flex para la fila desktop; media query ~768px para apilar. Ajuste de `padding` del `.hero-section` / `.hero-footer` para flush real (sin margen inferior grande).

**Rationale**: Constitución V; no Material UI ni componentes externos.

**Alternatives considered**: Librería de form UI (rechazada).

## 5. Validación del buscador

**Decision**: Validación nativa (`required`, `min`, `type="date"|"time"|"number"`) más comprobaciones en `submit`: fecha de ida ≥ hoy (zona local del visitante), regreso ≥ ida, pasajeros ≥ 1, origen ≠ destino (normalizado: trim + minúsculas). Errores en un contenedor visible junto al formulario, en español.

**Rationale**: Sin servidor. FR-011 y FR-021.

**Alternatives considered**: Enviar siempre a WhatsApp y que la agencia corrija (más fricción y mensajes basura).

## 6. Origen = destino → Por horas

**Decision**: No mostrar resumen. Mensaje + botón o enlace “Cambiar a Por horas”. Al aceptar: modo Por horas, recogida = el lugar, fecha/hora/pasajeros conservados, origen/destino de transporte se limpian de la UI de ese modo.

**Rationale**: Spec Q4.

**Alternatives considered**: Cambio automático (rechazado); solo error (peor UX).

## 7. Ida y vuelta: una hora

**Decision**: Un `input type="time"` de ida. Campo fecha de regreso visible solo en ida y vuelta. El resumen y el texto de WhatsApp incluyen la frase: “Hora de vuelta: por confirmar con la agencia”.

**Rationale**: Spec Q5.

**Alternatives considered**: Segundo time picker (fuera de alcance).

## 8. Lugares de origen / destino / recogida

**Decision**: `input` de texto + `datalist` con lugares de la oferta actual (Cartagena, Barranquilla, Santa Marta, Aeropuerto, Playa Blanca / Barú, Volcán del Totumo, Sincelejo, Montería). El visitante puede escribir otro texto.

**Rationale**: Asunción del spec; HTML nativo, sin mapas ni API.

**Alternatives considered**: Lista cerrada (rechaza rutas reales no listadas); Google Places (dependencia y posible costo).

## 9. Experiencias relacionadas en la cotización

**Decision**: Opcional y limitado: si el texto de origen o destino contiene “aeropuerto”, sugerir la card de traslados; si contiene “isla”, “barco”, “barú” o “rosario”, sugerir barcos/islas. Máximo 2 enlaces internos al catálogo. Sin precios ni “disponible ahora”.

**Rationale**: FR-020 es MAY; evita simular inventario.

**Alternatives considered**: Motor de matching amplio (sobreingeniería).

## 10. FAQ markup

**Decision**: `<details>` / `<summary>` nativos (varias abiertas permitidas). Sin JS obligatorio. Ubicación: después de testimonios, antes del footer. Copy alineado a WhatsApp, sin políticas de competidores.

**Rationale**: Accesible, vanilla, resuelve el punto diferido del clarify (uno vs varios) con el default más simple.

**Alternatives considered**: Acordeón JS exclusivo (más código); copiar FAQ de Cartagena Tours (constitución / FR-014).

## 12. Navegación

**Decision**: Inicio → `#about` (hero). Experiencias → `#experiences`. Testimonios → `#testimonials`. Preguntas frecuentes → `#faq`. El enlace Destinos, si se conserva, apunta a `#destinations` (comportamiento del punto 2).

**Rationale**: FR-019.

## 13. WhatsApp URL

**Decision**: Helper en `script.js`: `https://wa.me/573042143149?text=` + `encodeURIComponent(mensaje)`. Mensajes en español, un párrafo, incluyen nombre de experiencia o datos de la búsqueda. `target="_blank"` y `rel="noopener noreferrer"`.

**Rationale**: Constitución III. Detalle en [contracts/whatsapp.md](./contracts/whatsapp.md).

**Alternatives considered**: `api.whatsapp.com` (equivalente; se unifica en `wa.me` ya usado).

## 14. eSIM y copy competidor

**Decision**: No hay tab, enlace, meta ni texto de eSIM, planes de datos o roaming. No se copian categorías vacías del sitio de referencia.

**Rationale**: FR-007, SC-007.

## 15. Testing

**Decision**: No añadir Jest/Playwright/npm. La prueba de aceptación es el recorrido de [quickstart.md](./quickstart.md).

**Rationale**: Constitución: no fingir cobertura ni añadir runner.

**Alternatives considered**: Suite automatizada (fuera de spec y de constitución).
