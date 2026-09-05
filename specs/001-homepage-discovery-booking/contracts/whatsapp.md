# Contract: WhatsApp

**Número**: `573042143149` (display `+57 304 214 3149`)  
**Base URL**: `https://wa.me/573042143149?text={encodeURIComponent(mensaje)}`  
**Link**: `target="_blank"` `rel="noopener noreferrer"`

## Superficies

| Origen | Mensaje (español, una intención clara) |
|--------|----------------------------------------|
| Header “Contactar Ya” | Conservar el texto actual de contacto/reserva general |
| Botón flotante | Conservar el texto actual de asesoría |
| Card de experiencia | `Hola, me interesa reservar: {title}.` |
| Cotización Transporte solo ida | Incluir origen, destino, fecha, hora, pasajeros |
| Cotización Transporte ida y vuelta | Igual + fecha de regreso + “Hora de vuelta: por confirmar con la agencia” |
| Cotización Por horas | Recogida, duración (N horas), fecha, hora, pasajeros |

## Ejemplo transporte (solo ida)

```text
Hola, quiero cotizar un traslado.
Origen: Aeropuerto
Destino: Cartagena
Fecha: 2026-09-10
Hora: 14:00
Pasajeros: 3
```

## Ejemplo ida y vuelta (cierre obligatorio)

```text
Tipo: ida y vuelta
Fecha de regreso: 2026-09-12
Hora de vuelta: por confirmar con la agencia
```

## No hacer

- Abrir WhatsApp en el `submit` del buscador (el visitante pulsa el CTA del resumen)
- Incluir precios, números de tarjeta o eSIM
- Cambiar el número comercial
