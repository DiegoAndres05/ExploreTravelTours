# Contract: Catálogo de experiencias

**Surface**: homepage `#experiences`  
**Consumers**: visitante (filtro y cards); `script.js` (mostrar/ocultar)

## Markup

Cada card:

```html
<article class="service-card" data-experience-id="{id}" data-category="{category}">
```

Filtros: controles con `data-filter="todas|city-tours|traslados|barcos-islas|destinos-caribe"`. El activo tiene `aria-pressed="true"` (si son botones) o `aria-current` equivalente.

Ancla `#destinations`: al activarse, mismo efecto que `data-filter="destinos-caribe"` + scroll a `#experiences`.

## Categorías visibles

Solo las cuatro del [data-model.md](../data-model.md). Prohibido renderizar “0 experiencias”, “Próximamente” o categorías de competidores.

## Card mínima

- Imagen con `alt` no vacío
- `h3` título
- Párrafo descripción
- Enlace CTA que cumple [whatsapp.md](./whatsapp.md) con el mensaje de esa experiencia

## Filtro

| Input | Output |
|-------|--------|
| `todas` | Las 11 cards visibles |
| un `category` | Solo cards con ese `data-category`; recuento ≥ 1 |

Cards ocultas: `hidden` o clase que no las deja en el flujo; no se elimina el nodo (el CTA sigue en el DOM para accesibilidad de “todas”).

## Inventario requerido

Los 11 `id` de data-model deben existir en el HTML. No falta ninguna oferta actual. No hay sección de destinos solo con iconos.
