# Data Model: Homepage Discovery and Booking

Modelo de contenido estático (marcado HTML + estado de UI). No hay persistencia ni identificadores de servidor.

## Experiencia

Oferta visible en el catálogo.

| Field | Type | Rules |
|-------|------|--------|
| `id` | slug | Único; `data-experience-id`. Ej. `city-tour-cartagena` |
| `title` | string | Título de la card, en español |
| `description` | string | Copy breve; reutilizar o adaptar el texto actual, no inventar precios |
| `imageSrc` | path | `assets/…`; `alt` descriptivo obligatorio |
| `category` | enum | Exactamente uno de: `city-tours` \| `traslados` \| `barcos-islas` \| `destinos-caribe` |
| `whatsappMessage` | string | Mensaje prefijado que nombra esta experiencia |

### Catálogo canónico (este alcance)

| id | title | category |
|----|-------|----------|
| `city-tour-cartagena` | City Tour en la ciudad de Cartagena | `city-tours` |
| `city-tour-barranquilla` | City Tour en la ciudad de Barranquilla | `city-tours` |
| `city-tour-santa-marta` | City Tour en la ciudad de Santa Marta | `city-tours` |
| `traslado-aeropuerto` | Traslados desde o hacia el aeropuerto | `traslados` |
| `transporte-especializado` | Transporte especializado | `traslados` |
| `barcos-islas` | Alquiler de barcos turísticos y paseo por islas | `barcos-islas` |
| `compra-esmeraldas` | Compra de esmeraldas | `destinos-caribe` |
| `playa-blanca-baru` | Playa Blanca y Barú | `destinos-caribe` |
| `volcan-totumo` | Volcán del Totumo | `destinos-caribe` |
| `cartagena-santa-marta` | Cartagena y Santa Marta | `destinos-caribe` |
| `sincelejo-monteria` | Sincelejo y Montería | `destinos-caribe` |

**Invariants**: Toda categoría publicada tiene ≥1 fila. No existen categorías `proximamente`. No se listan eSIM ni productos ajenos.

## Categoría

| Field | Type | Rules |
|-------|------|--------|
| `id` | enum | `city-tours` \| `traslados` \| `barcos-islas` \| `destinos-caribe` |
| `label` | string | City tours / Traslados / Barcos e islas / Destinos Caribe |
| `filter` | UI | Chip; más el filtro `todas` (no es categoría de datos) |

**Estado de filtro**: `todas` \| uno de los `id`. Valor inicial: `todas`.

## Solicitud de Transporte

Estado del modo Transporte (solo en memoria / DOM).

| Field | Type | Rules |
|-------|------|--------|
| `tripType` | enum | `solo-ida` \| `ida-vuelta` |
| `origin` | string | Requerido; trim; distinto de `destination` (comparación case-insensitive) |
| `destination` | string | Requerido |
| `departDate` | date | Requerido; no anterior a hoy (calendario local) |
| `returnDate` | date | Requerido si `ida-vuelta`; ≥ `departDate`; oculto si `solo-ida` |
| `departTime` | time | Requerido; es la hora de ida |
| `passengers` | integer | ≥ 1 |

No hay campo `returnTime`.

## Solicitud por Horas

| Field | Type | Rules |
|-------|------|--------|
| `pickup` | string | Requerido |
| `durationHours` | integer | 1–12 |
| `date` | date | Requerido; no anterior a hoy |
| `time` | time | Requerido |
| `passengers` | integer | ≥ 1 |

## Paso de cotización

| Field | Type | Rules |
|-------|------|--------|
| `visible` | boolean | `false` hasta submit válido |
| `mode` | enum | `transporte` \| `por-horas` |
| `placement` | UI | Franja slim **encima** del formulario en `.hero-footer`; no modal; no reemplaza campos |
| `summaryLines` | string[] | Eco de los campos válidos; si ida-vuelta, incluir “Hora de vuelta: por confirmar con la agencia” |
| `whatsappHref` | url | `wa.me` con mensaje prefijado |
| `relatedIds` | slug[] | 0–2 ids de Experiencia; nunca precios ni cupos |

**Transiciones**:

```text
oculto --[submit válido]--> visible encima del form (actualiza resumen)
visible --[submit válido de nuevo]--> visible (reemplaza resumen; form sigue editable)
visible --[submit inválido]--> visible o oculto (no avanza; errores en el form)
oculto --[origen=destino]--> oculto + oferta cambiar a por-horas
```

## Pregunta frecuente

| Field | Type | Rules |
|-------|------|--------|
| `id` | slug | Único |
| `question` | string | Español |
| `answer` | string | Español; modelo WhatsApp; sin políticas de terceros |

Ítems mínimos: `cancelacion`, `horarios`, `pagos`, `que-incluye`, `como-reservar`, `contacto`. Copy canónico en [contracts/faq.md](./contracts/faq.md).

## Señal de confianza

| Field | Type | Rules |
|-------|------|--------|
| `text` | string | Frase corta derivada del sitio actual |

Opcional en el hero. En el layout compacto actual **no** son requeridas; no reintroducir si restan aire a la foto.

## Testimonio

Sin cambio de modelo: Camila Ramírez, Daniel Vélez, Laura Castaño (copy actual).

## Layout del buscador (estado UI, no persistido)

| Field | Type | Rules |
|-------|------|--------|
| `density` | enum | `compact` (objetivo de esta delta) |
| `desktopRow` | boolean | Solo ida: campos + CTA en una fila |
| `returnDateRow` | boolean | Ida y vuelta: segunda fila compacta |
| `labelMode` | enum | `floating` |
| `mobileScroll` | enum | `page` (no `panel-inner`) |

## Validation summary

| Rule | Applies to | On failure |
|------|------------|------------|
| Campos requeridos | ambas solicitudes | No cotizar; mensaje en español |
| Pasajeros ≥ 1 | ambas | No cotizar |
| Fecha no pasada | ambas | No cotizar |
| Regreso ≥ ida | transporte ida-vuelta | No cotizar |
| Origen ≠ destino | transporte | No cotizar; ofrecer Por horas |
| Duración 1–12 | por horas | No cotizar |
