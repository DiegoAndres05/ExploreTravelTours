#!/usr/bin/env python3
"""
Generate emerald image using Google Nano Banana (AI Image Generation)
Saves to ./assets/generated-images/emerald.jpg
"""

import os
from pathlib import Path
from google import genai
from google.genai import types

# Initialize the client with GEMINI_API_KEY from the environment.
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY no está configurada en el entorno.")
client = genai.Client(api_key=api_key)

# Ensure output directory exists
output_dir = Path("./assets/generated-images")
output_dir.mkdir(parents=True, exist_ok=True)

# Prompt for the emerald image
prompt = (
    "Fotografía macro ultra realista de una esmeralda natural colombiana de color verde intenso, "
    "tallada en forma octagonal con facetas precisas, inclusiones internas sutiles, refracción "
    "de luz físicamente correcta, destellos especulares y pequeñas imperfecciones naturales. "
    "La gema está centrada sobre un fondo del mismo tono verde esmeralda, con un degradado "
    "suave y profundo hacia los bordes, iluminación de estudio de joyería, lente macro, "
    "profundidad de campo cinematográfica, texturas realistas, 8K, sin texto, sin personas."
)

print(f"🎨 Generando imagen con Nano Banana...")
print(f"✨ Prompt: {prompt}")
print(f"📁 Guardando en: {output_dir}")

# Generate image using Nano Banana
try:
    response = client.models.generate_content(
        model="gemini-3.1-flash-image",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE"],
            image_config=types.ImageConfig(aspect_ratio="1:1"),
        ),
    )
    
    # Save the generated image
    output_path = output_dir / "emerald.jpg"
    
    image_part = next(
        (part for part in response.parts if part.inline_data is not None),
        None,
    )
    if image_part is None:
        raise RuntimeError(f"No se generó ninguna imagen. Respuesta: {response}")

    image_part.as_image().save(output_path)

    print(f"✅ ¡Imagen generada exitosamente!")
    print(f"   📍 Ubicación: {output_path}")
    print(f"   📊 Tamaño: {output_path.stat().st_size / 1024:.1f} KB")
        
except Exception as e:
    print(f"❌ Error durante la generación: {e}")
    import traceback
    traceback.print_exc()
    exit(1)
