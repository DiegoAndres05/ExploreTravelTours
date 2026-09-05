<!--
Sync Impact Report
- Version change: (template placeholders) → 1.0.0
- Modified principles:
  - [PRINCIPLE_1_NAME] → I. Sitio estático de conversión
  - [PRINCIPLE_2_NAME] → II. Español y SEO de agencia
  - [PRINCIPLE_3_NAME] → III. WhatsApp como canal único de reserva
  - [PRINCIPLE_4_NAME] → IV. Identidad visual y experiencia de marca
  - [PRINCIPLE_5_NAME] → V. Simplicidad vanilla (NON-NEGOTIABLE)
- Added sections:
  - Alcance comercial y contenido
  - Calidad, accesibilidad y verificación
  - Governance (filled from template)
- Removed sections: none (template structure preserved)
- Templates requiring updates:
  - .specify/templates/plan-template.md → ✅ no structural change (Constitution Check is filled at plan time)
  - .specify/templates/spec-template.md → ✅ no structural change (generic FR/user-story slots remain valid)
  - .specify/templates/tasks-template.md → ✅ no structural change (paths resolved per feature against this constitution)
  - .specify/templates/commands/*.md → N/A (commands live as Cursor skills under .cursor/skills/)
- Follow-up TODOs: none
-->

# Explore Travel Tours Constitution

## Core Principles

### I. Sitio estático de conversión
Explore Travel Tours es un landing de marketing de una sola página. El entregable
MUST permanecer como sitio estático servible sin servidor de aplicación, base de
datos ni cuenta de usuario. El código de producto MUST vivir en `index.html`,
`style.css`, `script.js`, `logo.jpeg` y `assets/`. MUST NOT introducir backend,
CMS, autenticación, carrito, pasarela de pago ni almacenamiento de datos de
visitantes en este repositorio. Cualquier captación ocurre fuera del sitio
(WhatsApp o Instagram). Rationale: el código actual no tiene build, API ni
persistencia; añadir esas capas viola el propósito del producto.

### II. Español y SEO de agencia
La interfaz y el copy MUST estar en español (`lang="es"`). Toda página pública
MUST conservar metadatos SEO: `title`, `description`, `canonical`
(`https://www.exploretours.co/`), Open Graph, `robots` indexable y JSON-LD
`TravelAgency` con nombre, teléfono, imagen y dirección en Cartagena, Bolívar,
CO. Imágenes de contenido MUST tener `alt` descriptivo. MUST NOT eliminar ni
vaciar Schema.org, canonical o meta sociales sin una enmienda. Rationale: el
sitio existe para descubrirse en buscadores como agencia del Caribe colombiano.

### III. WhatsApp como canal único de reserva
Toda llamada a la acción de reserva o contacto MUST abrir WhatsApp hacia
`https://wa.me/573042143149` con un mensaje prefijado en español y
`target="_blank"`. MUST existir el botón flotante de WhatsApp además del CTA del
header y de cada tarjeta de servicio. MUST NOT añadir formularios que envíen
datos a un servidor, ni un flujo de checkout in-site, sin enmienda de esta
constitución. El número comercial autoritativo es `+57 304 214 3149`. Rationale:
hoy el 100% de las reservas se inicia por WhatsApp; un formulario local rompería
el modelo operativo.

### IV. Identidad visual y experiencia de marca
La identidad MUST usar las fuentes Montserrat (UI) y Playfair Display (títulos
de sección), las variables CSS de marca (`--brand-blue: #1e3a8a`,
`--brand-orange: #ea580c`, `--whatsapp-green: #25D366`, `--primary: #1A1A1A`) y
el logo `logo.jpeg`. El hero MUST ocupar el viewport completo con overlay
legible sobre la fotografía. La navegación MUST ser fija, transparente al
inicio y sólida al hacer scroll. Animaciones de entrada MUST usar
`.fade-in-scroll`. Breakpoints MUST cubrir `1024px` y `768px`, incluido el menú
móvil. Instagram autoritativo: `https://www.instagram.com/exploretraveltoursco`.
Rationale: la marca se percibe como turismo de lujo en el Caribe; desviaciones
de color, tipografía o layout diluyen esa percepción.

### V. Simplicidad vanilla (NON-NEGOTIABLE)
El front MUST permanecer en HTML, CSS y JavaScript vanilla, sin bundler, npm,
framework (React, Vue, Svelte, etc.) ni preprocesador obligatorio. El JS MUST
inicializarse en `DOMContentLoaded`, no bloquear el render y degradar con
gracia si una animación no corre. Estilos MUST usar variables en `:root` y
`box-sizing: border-box`. Complejidad nueva (dependencias, build, componentes)
MUST justificarse en Complexity Tracking del plan y, si cambia el stack, en una
enmienda. Rationale: un landing de conversión no necesita toolchain; YAGNI es
la regla de arquitectura.

## Alcance comercial y contenido

El sitio MUST presentar, como mínimo, estas ofertas reales del negocio:

- City Tour Cartagena, City Tour Barranquilla, City Tour Santa Marta
- Traslados desde o hacia el aeropuerto
- Alquiler de barcos turísticos y paseo por islas
- Destinos nacionales: compra de esmeraldas, Playa Blanca y Barú, Volcán del
  Totumo, Cartagena y Santa Marta, Sincelejo y Montería, transporte
  especializado
- Testimonios de viajeros (Camila Ramírez, Daniel Vélez, Laura Castaño, salvo
  actualización explícita del negocio)

MUST NOT inventar destinos, precios, horarios, flota o alianzas que no estén
en el copy actual o en una instrucción del negocio. Secciones estructurales
MUST conservar header, hero, servicios, destinos, testimonios y footer con
copyright. Copy nuevo MUST mantener tono cercano, aspiracional y de servicio,
sin anglicismos innecesarios.

## Calidad, accesibilidad y verificación

Antes de dar por cerrada una feature, el agente MUST:

- Verificar el flujo en el navegador: scroll suave a anclas, menú móvil
  abrir/cerrar, CTA de WhatsApp y visibilidad del header al hacer scroll
- Conservar contraste legible sobre el hero (overlay + `text-shadow` existentes)
- No introducir `overflow-x` en `body` ni layout roto en 375px / 768px / 1280px
- No dejar listeners o estilos inline que rompan el reset de menú al pasar de
  móvil a desktop
- Tratar `index.html`, `style.css` y `script.js` como la superficie única de
  producto; no crear árboles `src/` o `frontend/` salvo enmienda

No hay suite de tests automatizados en el repositorio. MUST NOT fingir
cobertura ni añadir un runner de tests a menos que el spec lo pida de forma
explícita. La verificación autoritativa es el recorrido manual (o con
herramientas de navegador) del flujo de conversión.

## Governance

Esta constitución prevalece sobre convenciones ad hoc, sugerencias del modelo y
preferencias de stack no documentadas. Specs, plans y tasks MUST pasar un
Constitution Check contra los principios I–V; un conflicto se resuelve
cambiando el spec/plan/tasks, no diluyendo un principio.

Enmiendas:

1. Documentar el cambio, la razón de negocio y el impacto en templates o skills
2. Subir `CONSTITUTION_VERSION` con SemVer: MAJOR (principio eliminado o
   redefinido de forma incompatible), MINOR (principio o sección nueva o guía
   materialmente ampliada), PATCH (aclaraciones o estilo)
3. Actualizar `Last Amended` a la fecha ISO del cambio
4. Propagar el impacto al plan/spec/tasks de la feature activa cuando aplique

Cumplimiento: cada `/speckit-plan` MUST evaluar las puertas de esta
constitución; `/speckit-analyze` trata un incumplimiento de MUST como
CRITICAL. Complejidad extra MUST registrarse en Complexity Tracking. El
guidance operativo de Speckit está en `.cursor/skills/` y `.specify/`.

**Version**: 1.0.0 | **Ratified**: 2026-09-04 | **Last Amended**: 2026-09-04
