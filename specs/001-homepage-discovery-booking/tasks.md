# Tasks: Homepage Discovery and Booking

**Input**: Design documents from `/specs/001-homepage-discovery-booking/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: No se generan tareas de tests automatizados. El spec no las pide y la constitución exige verificación manual (quickstart.md).

**Organization**: Tareas agrupadas por user story para implementación e prueba independientes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Puede ir en paralelo (otro archivo, sin depender de una tarea incompleta)
- **[Story]**: US1–US4 según spec.md
- Cada tarea incluye ruta de archivo

## Path Conventions

Producto solo en la raíz: `index.html`, `style.css`, `script.js`, `assets/`. No crear `src/`, `frontend/` ni `package.json`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar assets y contratos de enlace sin cambiar aún el flujo de conversión

- [x] T001 [P] Añadir o reutilizar fotos en `assets/` para destinos sin imagen propia (`compra-esmeraldas`, `playa-blanca-baru`, `volcan-totumo`, `sincelejo-monteria`); no usar una foto de otra ciudad como si fuera ese destino (research.md)
- [x] T002 [P] Añadir `rel="noopener noreferrer"` a los enlaces `wa.me` existentes (header, flotante, cards actuales) en `index.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Anclas, helper de WhatsApp y hooks JS que todas las historias van a usar

**⚠️ CRITICAL**: No empezar user stories hasta completar esta fase

- [x] T003 Implementar constante del número y `buildWhatsAppUrl(mensaje)` (`encodeURIComponent`, base `https://wa.me/573042143149`) en `script.js` según `specs/001-homepage-discovery-booking/contracts/whatsapp.md`
- [x] T004 [P] Actualizar nav: Inicio `#about`, Experiencias `#experiences`, Testimonios `#testimonials`, Preguntas frecuentes `#faq`; conservar CTA WhatsApp del header en `index.html`
- [x] T005 Registrar en `DOMContentLoaded` funciones vacías `initCatalog()`, `initSearch()`, `initFaq()` sin romper menú móvil, resize ni `.fade-in-scroll` en `script.js`

**Checkpoint**: Nav y helper listos; el sitio actual sigue funcionando

---

## Phase 3: User Story 1 - Explorar el catálogo de experiencias (Priority: P1) 🎯 MVP

**Goal**: Un catálogo de cards (11 experiencias, 4 categorías con oferta), sin grilla de iconos ni “0 experiencias”, CTA WhatsApp por card

**Independent Test**: Sin usar el buscador ni el FAQ, recorrer Experiencias, filtrar las 4 categorías, ver las 11 ofertas actuales e iniciar WhatsApp desde una card. Ver `specs/001-homepage-discovery-booking/quickstart.md` (recorrido P1 catálogo)

### Implementation for User Story 1

- [x] T006 [US1] Convertir `#services` en catálogo `#experiences` con chips de filtro (`todas`, `city-tours`, `traslados`, `barcos-islas`, `destinos-caribe`) en `index.html` según `specs/001-homepage-discovery-booking/contracts/catalog.md`
- [x] T007 [US1] Marcar las 5 cards actuales con `data-experience-id` y `data-category` (ids de data-model) en `index.html`
- [x] T008 [US1] Añadir cards (imagen, título, copy actual, CTA) para `transporte-especializado`, `compra-esmeraldas`, `playa-blanca-baru`, `volcan-totumo`, `cartagena-santa-marta`, `sincelejo-monteria` en `index.html`
- [x] T009 [US1] Eliminar la sección Destinos Nacionales de iconos (`#destinations` grilla) en `index.html`
- [x] T010 [P] [US1] Estilos de chips de filtro y cards uniformes (sin recuento “0” ni “Próximamente”) en `style.css`
- [x] T011 [US1] Filtrar cards por `data-category` (incluir “Todas”) y `aria-pressed` en el chip activo en `script.js` (`initCatalog`)
- [x] T012 [US1] Hacer que `#destinations` haga scroll a `#experiences` y active el filtro `destinos-caribe` en `script.js`
- [x] T013 [US1] CTA de cada card con `buildWhatsAppUrl` y mensaje `Hola, me interesa reservar: {title}.` en `index.html` (href o pintado al cargar en `script.js`)

**Checkpoint**: Catálogo usable solo; homepage anterior de destinos-icono ya no existe

---

## Phase 4: User Story 2 - Buscar transporte o servicio por horas (Priority: P1)

**Goal**: Buscador en el hero (Transporte / Por horas), validación, resumen de cotización junto al hero y CTA WhatsApp — sin eSIM, modal ni checkout

**Independent Test**: En el primer pantallazo completar solo ida, ida y vuelta y por horas; ver resumen en el hero; fallar fechas inválidas y origen=destino con oferta de Por horas. Quickstart recorrido P1 buscador

### Implementation for User Story 2

- [x] T014 [US2] Añadir en el hero tabs Transporte / Por horas, campos del contrato, `#place-suggestions`, `#quote-summary` oculto y botón Buscar/Continuar en `index.html` según `specs/001-homepage-discovery-booking/contracts/search-quote.md`
- [x] T015 [P] [US2] Estilos del buscador, tabs, errores y resumen de cotización (legible sobre overlay, sin `overflow-x`) en `style.css`
- [x] T016 [US2] Alternar modos, mostrar fecha de regreso solo en ida y vuelta, `preventDefault` en submit en `script.js` (`initSearch`)
- [x] T017 [US2] Validar requeridos, pasajeros ≥1, fecha ≥ hoy, regreso ≥ ida, origen ≠ destino; mensajes en español junto al formulario en `script.js`
- [x] T018 [US2] Pintar `#quote-summary` en el hero (no modal, no scroll al footer) y CTA WhatsApp con datos; en ida y vuelta incluir “Hora de vuelta: por confirmar con la agencia” en `script.js`
- [x] T019 [US2] Si origen=destino: no cotizar; aviso + control “Cambiar a Por horas” que copia el lugar a recogida y conserva fecha/hora/pasajeros en `script.js`
- [x] T020 [US2] Sugerir 0–2 experiencias relacionadas (aeropuerto → traslados; isla/barco/barú → barcos-islas) sin precios en `#quote-summary` vía `script.js`
- [x] T021 [US2] Dejar el buscador como CTA principal del hero; “Ver servicios” / explorar catálogo como acción secundaria en `index.html`

**Checkpoint**: US1 y US2 funcionan por separado (catálogo sin búsqueda, búsqueda sin FAQ)

---

## Phase 5: User Story 3 - Resolver dudas de reserva en el FAQ (Priority: P2)

**Goal**: Seis preguntas desplegables tras testimonios, copy del contrato FAQ (sin políticas de competidores)

**Independent Test**: Llegar a `#faq`, abrir las 6 preguntas, ver contacto WhatsApp. Quickstart recorrido P2

### Implementation for User Story 3

- [x] T022 [US3] Añadir sección `#faq` con seis `<details>`/`<summary>` y el copy canónico de `specs/001-homepage-discovery-booking/contracts/faq.md` en `index.html`
- [x] T023 [P] [US3] Estilos del FAQ (desplegable claro, contraste, spacing antes del footer) en `style.css`

**Checkpoint**: FAQ visible sin depender del buscador

---

## Phase 6: User Story 4 - Confiar y orientarse en la homepage (Priority: P3)

**Goal**: Hero con propuesta Caribe + bullets de confianza reales; nav completa; testimonios, Instagram y WA flotante intactos

**Independent Test**: Reconocer logo, Camila/Daniel/Laura, Instagram; bullets sin 24/7; anclas Inicio / Experiencias / Testimonios / FAQ. Quickstart recorrido P3

### Implementation for User Story 4

- [x] T024 [US4] Ajustar título y subtítulo del hero (transporte privado y experiencias en el Caribe, voz Explore) y 3–4 bullets de confianza del copy/testimonios actuales en `index.html`
- [x] T025 [P] [US4] Estilos de bullets de confianza en el hero (legibles sobre overlay) en `style.css`
- [x] T026 [US4] Conservar testimonios, footer, Instagram y botón flotante; comprobar anclas del nav en `index.html`

**Checkpoint**: Las cuatro historias son demostrables en una sola página

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accesibilidad visual, SEO, eSIM-zero y verificación en viewports

- [x] T027 Aplicar `.fade-in-scroll` a cards nuevas y bloques FAQ/filtros en `index.html`
- [x] T028 Ajustar layout del hero+buscador y catálogo en 375px / 768px / 1024px / 1280px en `style.css`
- [x] T029 Comprobar que el menú móvil abre/cierra y el resize a desktop limpia estilos inline con los nuevos enlaces en `script.js`
- [x] T030 Verificar 0 menciones de eSIM, planes de datos o roaming en `index.html`
- [x] T031 Conservar `lang="es"`, canonical, Open Graph, robots y JSON-LD `TravelAgency` en `index.html`
- [x] T032 Ejecutar el recorrido de `specs/001-homepage-discovery-booking/quickstart.md` en el navegador contra `index.html`

---

## Phase 8: Hero layout enmienda (spec 2026-09-04)

**Purpose**: Alinear hero con FR-006 / FR-022 — formato original arriba-izquierda, buscador en el pie

- [x] T033 Reestructurar hero: `h1`, subtítulo y botón a la izquierda en `index.html`; buscador y cotización en `.hero-footer` al pie del hero en `index.html` y `style.css`

---

## Phase 9: User Story 2 delta — Buscador compacto (Priority: P1)

**Goal**: Reducir ~40–60% la altura del panel blanco, flush al pie del hero, una fila en desktop, etiquetas flotantes, CTA alineado a inputs; resumen slim encima del form. Sin tocar catálogo, FAQ ni tipografía/marca global (FR-023–FR-027, SC-011–SC-013).

**Independent Test**: En 1280×800, marca arriba + sujeto de la foto visible + panel flush abajo; Solo ida en una fila; submit muestra quote encima del form; en 375px apilado sin scroll interno del panel. Contratos: [contracts/search-quote.md](./contracts/search-quote.md).

- [x] T034 [US2] Reordenar `#quote-summary` **encima** de los formularios dentro de `#hero-search` / `.hero-footer` en `index.html` (formulario permanece debajo y editable)
- [x] T035 [US2] Convertir labels de campos del buscador a patrón de **etiqueta flotante** (label dentro del campo; placeholders no-vacíos para el truco CSS) en ambos formularios de `index.html`
- [x] T036 [P] [US2] Densificar `.hero-search` / `.hero-footer` en `style.css`: menos padding/gaps; flush al borde inferior del hero; tabs + radios en franja baja (una línea o dos micro-filas)
- [x] T037 [US2] Layout desktop en `style.css`: Solo ida en **una fila** (Origen | Destino | Fecha | Hora | Pasajeros | CTA); botón alto alineado a inputs (no barra full-width gigante); ida y vuelta con fecha de regreso en **segunda fila** compacta
- [x] T038 [US2] Estilos de etiquetas flotantes y campos densos (inputs/selects) en `style.css` para Transporte y Por horas
- [x] T039 [US2] Apilado móvil compacto en `style.css` (~375px): sin padding excesivo; sin `overflow` interno del panel; hero MAY crecer (scroll de página)
- [x] T040 [US2] Estilos slim de `#quote-summary` encima del form en `style.css` (no modal; no empujar el buscador al centro del hero)
- [x] T041 [US2] Ajustar `script.js` solo si el reorden de DOM lo exige: mostrar/ocultar quote, return-date row, y validación siguen funcionando con floating labels
- [x] T042 Verificar que catálogo (`#experiences`) y FAQ (`#faq`) no cambiaron en esta delta en `index.html`
- [x] T043 Ejecutar recorrido “Buscador compacto” + móvil de `specs/001-homepage-discovery-booking/quickstart.md` en 375 / 768 / 1280 (incl. check visual 1280×800 foto + altura panel)

**Checkpoint**: SC-011–SC-013 y FR-023–FR-026 cumplidos; US1/US3 intactos

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup–Polish (Phases 1–8)**: Completadas ([x] T001–T033)
- **Phase 9 (US2 compact)**: Completada ([x] T034–T043). Hero footer, floating labels, denisdad visual y layout desktop/móvil entregados.
- **Catálogo / FAQ**: Fuera de alcance de Phase 9 (solo verificación T042)

### User Story Dependencies (delta)

- **US2 compact**: Unico foco activo. US1/US3/US4 ya entregados; no reabrir salvo regresión

### Within Phase 9

- Markup (`index.html`) antes de CSS que asume floating labels / quote arriba
- CSS de densidad puede paralelizarse parcialmente (T036 [P] tras T034 si las clases ya existen)
- `script.js` solo al final si el DOM cambió
- Sin TDD

### Parallel Opportunities (Phase 9)

- Tras T034: T036 puede avanzar en `style.css` mientras T035 termina labels en `index.html` (mismo archivo T035 → no paralelo con T034)
- T036 [P] respecto a trabajo solo en `index.html` ya cerrado
- T037–T040 tocan el mismo `style.css` → **serie**, no paralelo

---

## Parallel Example: Phase 9

```bash
# Serie en index.html:
Task: "T034 quote encima del form en index.html"
Task: "T035 floating labels en index.html"

# Luego CSS (serie en style.css):
Task: "T036 densidad + flush"
Task: "T037 fila desktop + return row"
Task: "T038 floating label CSS"
Task: "T039 móvil"
Task: "T040 quote slim"

# Cierre:
Task: "T041 script.js si hace falta"
Task: "T042–T043 verificación"
```

---

## Implementation Strategy

### MVP Already Delivered

Phases 1–9 (catálogo, buscador funcional, FAQ, hero flush, buscador compacto) están [x]. **Feature completa.**

### Next increment (Phase 9)

1. T034–T035 markup
2. T036–T040 CSS compacto
3. T041 JS mínimo
4. T042–T043 quickstart compacto
5. **STOP**: validar SC-011–SC-013 en navegador

### Parallel Team Strategy

Un implementador: `index.html` → `style.css` → `script.js`. No dividir Phase 9 entre dos personas en el mismo CSS.

---

## Notes

- [P] solo si el archivo no está bloqueado por otra tarea incompleta
- Verificación = navegador, no runner
- No inventar precios, eSIM ni políticas 24/7
- No tocar tipografía/paleta global ni catálogo/FAQ en Phase 9
- Commit por grupo lógico cuando el usuario lo pida
