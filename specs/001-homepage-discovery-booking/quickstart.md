# Quickstart: Homepage Discovery and Booking

Validación manual del flujo de conversión. No hay suite automatizada.

## Prerequisites

- Archivos de producto en la raíz del repo: `index.html`, `style.css`, `script.js`, `logo.jpeg`, `assets/`
- Un navegador actual (Chrome, Safari o Firefox)
- Servir la carpeta como estáticos (ejemplo): `python3 -m http.server 8080`

No instalar npm ni crear backend.

## Setup

1. Abrir `http://localhost:8080/` (o el archivo `index.html` si las imágenes cargan).
2. Confirmar `lang="es"` y que el título sigue siendo de agencia de turismo en el Caribe.

## Recorrido P1 — Catálogo

1. Ir a Experiencias (nav o scroll).
2. Ver 11 cards con imagen, título, texto y CTA WhatsApp (city tours ×3, aeropuerto, transporte especializado, barcos, esmeraldas, Barú, Totumo, Cartagena y Santa Marta, Sincelejo y Montería).
3. No hay grilla de destinos solo con iconos.
4. Filtrar City tours, Traslados, Barcos e islas, Destinos Caribe: cada uno muestra ≥1 card; nunca “0 experiencias” ni “Próximamente”.
5. “Todas” vuelve a mostrar las 11.
6. Un CTA de card abre WhatsApp (`wa.me/573042143149`) con el nombre de esa experiencia, en una pestaña nueva.

## Recorrido P1 — Buscador compacto

1. En **1280×800** sin scroll: h1 / subtítulo / “Ver Servicios” arriba-izquierda; sujeto de la foto (p. ej. vehículo) visible entre marca y buscador; panel **flush** al pie del hero.
2. Altura del panel notablemente menor que el widget alto de referencia (~40–60%); tabs + Solo ida/Ida y vuelta en franja baja; sin eSIM.
3. **Solo ida** desktop: Origen | Destino | Fecha | Hora | Pasajeros | botón en **una fila**; botón no es barra naranja full-width gigante; etiquetas **flotantes**.
4. Submit válido → franja slim de resumen **encima** del formulario; formulario sigue editable; CTA WhatsApp; no modal; no salta al footer.
5. **Ida y vuelta**: fecha de regreso en segunda fila compacta; no hay hora de vuelta; el resumen menciona confirmación con la agencia.
6. **Por horas**: misma densidad; campos usables.
7. Fecha pasada o regreso anterior a la ida: no hay resumen; error en español.
8. Origen = destino: aviso + “Cambiar a Por horas”; al aceptar, recogida + fecha/hora/pasajeros conservados.
9. Re-buscar actualiza el mismo resumen encima del form.

## Recorrido P1 — Móvil (375px)

1. Campos apilados compactos; completar una búsqueda.
2. Si el hero supera el viewport, el scroll es de **página**; no hay scroll interno dentro del panel blanco.
3. Menú móvil abre/cierra; al pasar a desktop no quedan estilos rotos.

## Recorrido P2 — FAQ

1. Nav “Preguntas frecuentes” o scroll tras testimonios.
2. Abrir las seis preguntas (cancelación, horarios, pagos, qué incluye, cómo reservar, contacto).
3. Las respuestas no prometen 24/7, pasarela ni eSIM; indican WhatsApp para confirmar.

## Recorrido P3 — Marca y nav

1. Logo, testimonios (Camila, Daniel, Laura), Instagram, copyright.
2. Hero: formato marca izquierda + foto legible + buscador compacto al pie (sin rediseño tipográfico global).
3. Anclas: Inicio, Experiencias, Testimonios, FAQ.
4. Confirmar que catálogo y FAQ no cambiaron en esta delta de densidad.

## Viewports

Repetir buscador + menú + una búsqueda en **375px**, **768px** y **1280px**. Sin `overflow-x` en `body`.

## Expected outcomes

| Check | Pass |
|-------|------|
| 11 experiencias, 4 categorías con oferta | |
| 0 menciones eSIM | |
| Cotización slim encima del form en el pie del hero | |
| Flush + foto visible en 1280×800 | |
| Panel ~40–60% menos alto que referencia | |
| WhatsApp con contexto | |
| FAQ usable (sin cambios de contenido en esta delta) | |
| SEO TravelAgency y canonical intactos | |

Si un check falla, no dar la feature por cerrada.
