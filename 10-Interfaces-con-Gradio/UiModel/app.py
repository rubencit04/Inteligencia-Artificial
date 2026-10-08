import streamlit as st
import random # Lo usamos solo para simular el resultado de la predicción

# Configuración básica de la página
st.set_page_config(page_title="Titanic UI", layout="wide")
st.title("Predicción de Supervivencia - Titanic")

# Crear las dos columnas (izquierda y derecha)
col_izq, col_der = st.columns(2)

# ==========================================
# COLUMNA IZQUIERDA: INPUTS
# ==========================================
with col_izq:
    st.markdown("### Inputs")
    
    clase = st.selectbox("Clase", [1, 2, 3])
    sexo = st.radio("Sexo", ["male", "female"], horizontal=True)
    edad = st.slider("Edad", min_value=0, max_value=100, value=30)
    sibsp = st.number_input("SibSp", min_value=0, step=1)
    parch = st.number_input("Parch", min_value=0, step=1)
    fare = st.slider("Fare", min_value=0.0, max_value=600.0, value=32.0)
    embarked = st.selectbox("Embarked", ["S", "C", "Q"])
    title = st.selectbox("Title", ["Mr", "Mrs", "Miss", "Master", "Other"])
    
    # Botón Predecir
    boton_predecir = st.button("Predecir", type="primary")

# ==========================================
# COLUMNA DERECHA: OUTPUTS
# ==========================================
with col_der:
    st.markdown("### Outputs")
    
    if boton_predecir:
        # AQUÍ CONECTARÍAS TU MODELO REAL:
        # features = [[clase, sexo, edad...]]
        # probabilidad = modelo.predict_proba(features)[0][1]
        
        # Simulamos una probabilidad aleatoria para probar la UI
        probabilidad = random.uniform(0, 1)
        
        # Lógica para mostrar el texto con los iconos solicitados
        if probabilidad >= 0.5:
            st.success("✅ Probable SUPERVIVIENTE")
        else:
            st.error("❌ NO superviviente")
            
        # Mostrar la probabilidad numérica (0-1)
        st.write(f"**Probabilidad numérica:** {probabilidad:.2f}")
        
    else:
        # Mensaje por defecto antes de pulsar el botón
        st.info("Rellena los datos a la izquierda y haz clic en **Predecir**.")