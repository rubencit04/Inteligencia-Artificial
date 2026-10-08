import gradio as gr

# ── 1. Define la función principal ──────────────────────────────────────────
def convert_temperature(fahrenheit, city, is_daytime):
    # Convierte °F → °C
    celsius = (fahrenheit - 32) * 5 / 9

    # Convierte °C → K
    kelvin = celsius + 273.15

    # Clasifica el clima según °C
    if celsius < 10:
        classification = f"❄️ Frío — {city} a {celsius:.1f}°C"
    elif celsius < 21:
        classification = f"⛅ Templado — {city} a {celsius:.1f}°C"
    elif celsius < 31:
        classification = f"☀️ Cálido — {city} a {celsius:.1f}°C"
    else:
        classification = f"🔥 Muy caluroso — {city} a {celsius:.1f}°C"

    # Calcula sensación térmica (número entre 0 y 100)
    # Se suma 5 si es de día por la luz solar
    base_sensation = (celsius / 50) * 100
    if is_daytime:
        base_sensation += 5
        
    sensation = min(max(int(base_sensation), 0), 100)

    return round(celsius, 2), round(kelvin, 2), classification, sensation

# ── 2. Construye la interfaz ─────────────────────────────────────────────────
demo = gr.Interface(
    fn      = convert_temperature,

    inputs  = [
        gr.Number(label="Temperatura", info="Valor en grados Fahrenheit"),
        gr.Textbox(label="Ciudad", placeholder="Nombre de la localización"),
        gr.Checkbox(label="¿Es de día?")
    ],

    outputs = [
        gr.Number(label="Temperatura en °C"),
        gr.Number(label="Temperatura en K"),
        gr.Textbox(label="Clasificación del clima"),
        gr.Slider(minimum=0, maximum=100, label="Sensación térmica (0–100)", interactive=False)
    ],

    title       = "🌡️ Conversor de Temperatura",
    description = "Convierte temperaturas entre escalas y descubre la clasificación del clima de tu ciudad.\n\nIntroduce los datos y pulsa **Ejecutar**.",
    article     = "📐 **Fórmulas utilizadas:** °C = (°F − 32) × 5/9 | K = °C + 273.15 | Sensación = clamp((°C / 50) × 100, 0, 100)",

    examples = [
        [32, "Moscú", False],      # 32°F = 0°C (Frío)
        [59, "Londres", True],     # 59°F = 15°C (Templado)
        [77, "Barcelona", True],   # 77°F = 25°C (Cálido)
        [104, "Dubai", True],      # 104°F = 40°C (Muy caluroso)
    ],

    api_name = "predict"
)

# ── 3. Lanza la app ──────────────────────────────────────────────────────────
if __name__ == "__main__":
    demo.launch()