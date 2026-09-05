# Implementation Plan: Homepage Discovery and Booking

**Branch**: `001-homepage-discovery-booking` | **Date**: 2026-09-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-homepage-discovery-booking/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Mejorar la homepage de Explore Tours para descubrimiento, confianza y cotización sin fricción sobre el landing estático (`index.html`, `style.css`, `script.js`, `assets/`). Catálogo filtrable (11 cards / 4 categorías), FAQ, CTAs solo WhatsApp. Hero con bloque de marca izquierda y **buscador compacto flush al pie** (~40–60% menos alto que el widget alto de referencia): una fila en desktop, etiquetas flotantes, CTA alineado a inputs; resumen slim encima del formulario. Sin backend, eSIM, checkout ni dependencias nuevas. Esta iteración de plan **no** rediseña tipografía/marca global ni toca catálogo/FAQ.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript ES2015+ (vanilla)

**Primary Dependencies**: Google Fonts (Montserrat, Playfair Display) y Unicons ya en uso; enlaces `https://wa.me/573042143149`. Sin npm, bundler ni frameworks.

**Storage**: N/A. El catálogo y el FAQ viven en el HTML. El estado del buscador y del filtro queda en el DOM (sin `localStorage` de datos de reserva).

**Testing**: Verificación manual en navegador (constitución: no hay runner; no se añade suite). Recorrido definido en [quickstart.md](./quickstart.md), con foco visual en 1280×800 (flush + foto visible) y 375px (apilado sin scroll interno del panel).

**Target Platform**: Sitio estático en `https://www.exploretours.co/`. Navegadores actuales; viewports 375px, 768px, 1024px y 1280px.

**Project Type**: Landing de una sola página (marketing / conversión)

**Performance Goals**: JS no bloquea el render (`DOMContentLoaded`); filtro de catálogo percibido como instantáneo (<100 ms en ~11 cards); hero usable en el primer pantallazo en desktop (marca + foto + buscador compacto).

**Constraints**: Constitución v1.0.0 — sin servidor, CMS, auth, carrito ni pasarela; formulario sin `POST`; español; WhatsApp único; identidad intacta; archivos solo en raíz y `assets/`. Layout del buscador: densificar CSS/HTML del pie del hero **sin** cambiar catálogo, FAQ ni tipografía global (FR-027).

**Scale/Scope**: 1 página; 4 categorías; 11 experiencias; 6 FAQ; 2 modos de búsqueda; 3 testimonios. Delta de esta plan: compactación del widget de búsqueda (FR-023–FR-026, SC-011–SC-013).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Principle | Verdict | Notes |
|------|-----------|---------|-------|
| G1 | I. Sitio estático | PASS | Sin API/DB. `preventDefault`; captación por `wa.me`. |
| G2 | II. Español y SEO | PASS | Se conservan `lang="es"`, meta, canonical, OG, robots, JSON-LD `TravelAgency`, `alt`. |
| G3 | III. WhatsApp único | PASS | Cards, header, flotante y cotización → WhatsApp; formulario no POST. |
| G4 | IV. Identidad | PASS | Montserrat / Playfair, variables, logo, hero a viewport con overlay, nav fija, breakpoints. Compactar el pie **revela** más foto; no cambia paleta ni tipografía global. En móvil el hero MAY crecer (scroll de página); desktop mantiene flush al pie del viewport. |
| G5 | V. Vanilla | PASS | Sin npm/framework. Etiquetas flotantes vía HTML/CSS (sin librería). |
| G6 | Alcance comercial | PASS | 11 ofertas intactas; esta delta no toca catálogo/FAQ. |
| G7 | Destinos como sección | PASS | `#destinations` → catálogo Destinos Caribe (ya planificado/implementado). |
| G8 | Verificación | PASS | Cierre = [quickstart.md](./quickstart.md) en 375 / 768 / 1280, más check visual 1280×800 de foto + altura del panel. |

**Post-design (Phase 1):** Gates G1–G8 siguen en PASS. Contratos de layout del buscador no introducen backend ni dependencias. Floating labels = CSS/HTML nativo.

## Project Structure

### Documentation (this feature)

```text
specs/001-homepage-discovery-booking/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── catalog.md
│   ├── search-quote.md   # + layout compacto del pie
│   ├── faq.md
│   └── whatsapp.md
└── tasks.md              # Phase 2 (/speckit-tasks)
```

### Source Code (repository root)

```text
index.html          # Hero (marca + hero-footer compacto), catálogo, FAQ — no tocar catálogo/FAQ en esta delta
style.css           # Densidad del .hero-search: fila desktop, floating labels, flush pie
script.js           # Lógica de búsqueda/cotización existente; ajustes mínimos si el DOM de labels cambia
logo.jpeg
assets/
└── fondoexploretours.png   # foto hero (sujeto visible entre marca y buscador)
```

**Structure Decision**: Superficie única en la raíz. Delta de implementación previsto: `style.css` (prioridad), markup de campos en `index.html` (floating labels), `script.js` solo si el DOM del quote/form requiere reordenar nodos (`#quote-summary` encima del form). Catálogo y FAQ fuera de alcance de esta delta.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

Ninguna violación.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
