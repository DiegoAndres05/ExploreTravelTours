# Contract: Buscador y cotización (hero)

**Surface**: `#about` (hero) → `.hero-footer` flush al borde inferior  
**Modos**: `transporte` | `por-horas`  
**Prohibido**: tab o copy eSIM / datos móviles; `method` que envíe a un servidor; modal; scroll a resultados inferiores; widget alto a media altura que tape el sujeto de la foto; scroll interno del panel en móvil.

## Layout compacto (delta)

| Regla | Desktop (~1280) | Móvil (~375) |
|-------|-----------------|--------------|
| Posición | Panel pegado al pie del hero; foto (sujeto) visible entre marca y panel | Apilado en el pie; hero MAY crecer; scroll de **página** |
| Altura panel | ~40–60% menor que widget alto de referencia | Compacto, sin padding excesivo |
| Campos Solo ida | Una fila: Origen \| Destino \| Fecha \| Hora \| Pasajeros \| CTA | Columna densa |
| Ida y vuelta | Fecha regreso en **segunda fila** compacta | Campo extra en el apilado |
| Por horas | Una fila cuando quepa | Apilado denso |
| Tabs + radios | Una franja si cabe; si no, dos micro-filas | Compacto, usable |
| CTA Buscar | Alto alineado a inputs; no barra full-width gigante | Puede ser full-width pero altura razonable |
| Etiquetas | Flotantes (visibles al escribir) | Igual |
| `#quote-summary` | Franja slim **encima** del form; form editable | Igual |

Fuera de alcance de este contrato: catálogo, FAQ, tipografía/paleta global.

## Tabs

Dos controles que alternan paneles. El modo activo es evidente (`aria-selected` en tabs). Default: Transporte.

## Transporte

| Campo | Control | Visible |
|-------|---------|---------|
| Tipo de viaje | Solo ida / Ida y vuelta | siempre |
| Origen | text + datalist | siempre |
| Destino | text + datalist | siempre |
| Fecha de ida | date | siempre |
| Fecha de regreso | date | solo ida y vuelta |
| Hora (ida) | time | siempre |
| Pasajeros | number min=1 | siempre |
| Acción | Buscar / Continuar | siempre |

Sin campo hora de regreso.

## Por horas

| Campo | Control |
|-------|---------|
| Lugar de recogida | text + datalist |
| Duración | select 1–12 horas |
| Fecha | date |
| Hora | time |
| Pasajeros | number min=1 |
| Acción | Buscar / Continuar |

## Submit

1. `event.preventDefault()`
2. Validar reglas de [data-model.md](../data-model.md)
3. Si origen y destino iguales (transporte): no pintar cotización; mostrar error + control “Cambiar a Por horas”
4. Si inválido: foco o texto de error junto al campo / resumen de errores en español
5. Si válido: mostrar `#quote-summary` encima del formulario (quitar `hidden`), rellenar líneas, href WhatsApp

## Resumen `#quote-summary`

- Posición: **antes** de los paneles de formulario en el pie (franja slim)
- Lista o definición de los campos enviados
- Si ida y vuelta: texto fijo “Hora de vuelta: por confirmar con la agencia”
- CTA primario: Continuar por WhatsApp ([whatsapp.md](./whatsapp.md))
- 0–2 sugerencias de catálogo (enlaces a `#experiences` / card); sin precio ni disponibilidad

Re-submit actualiza el mismo bloque. El formulario permanece editable (no se reemplaza por el resumen).

## Datalist de lugares (mínimo)

Cartagena, Barranquilla, Santa Marta, Aeropuerto, Playa Blanca / Barú, Volcán del Totumo, Sincelejo, Montería.

## Marca en el hero (no bullets obligatorios)

Bloque superior: h1, subtítulo, “Ver Servicios”, Instagram. No reintroducir bullets de confianza si reducen el aire sobre la foto.
