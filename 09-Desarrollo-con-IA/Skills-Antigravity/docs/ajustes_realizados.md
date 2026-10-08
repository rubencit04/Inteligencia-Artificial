# Ajustes realizados en SKILL.md

Fecha: 12/05/2026

## Ajustes globales
- Se normalizó el frontmatter para cumplir estándar: solo `name` y `description`.
- Se revisó nomenclatura en minúsculas con guiones.
- Se reescribieron archivos sin BOM UTF-8 para pasar validación automática.

## Ajustes por bloques

### 01_manual
- Se añadió sección de "Validaciones críticas" en las 3 skills.
- Se reforzó salida mínima obligatoria para evitar respuestas ambiguas.

### 02_modelo
- Se mantuvo creación asistida por modelo y se añadieron notas de trazabilidad.
- Se simplificaron controles de calidad para ejecución repetible.

### 03_terceros
- Se instalaron 3 skills reales desde `openai/skills`.
- Se documentó fuente y ruta de integración local.

### 04_anthropic
- Se aclaró que la creación fue asistida por la skill de Anthropic vista en clase.
- Se añadieron reglas anti-fallo por cada caso de uso.

## Incidencia y corrección técnica
- Incidencia: `quick_validate.py` devolvía "No YAML frontmatter found".
- Causa: archivos con BOM UTF-8.
- Corrección: reescritura en UTF-8 sin BOM.
- Estado final: validación correcta en las 9 skills creadas.