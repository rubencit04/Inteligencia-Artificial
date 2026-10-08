# Plan de pruebas y resultados

Fecha: 12/05/2026

## Pruebas de estructura
- Verificación de existencia de `SKILL.md` en 12 skills.
- Verificación de jerarquía por bloques (manual, modelo, terceros, anthropic).

## Pruebas de validación de formato
Comando usado:
`python C:\Users\tteru\.codex\skills\.system\skill-creator\scripts\quick_validate.py <path_skill>`

Resultado:
- 9/9 skills creadas localmente: `Skill is valid!`

## Pruebas funcionales (ejemplos)

### Casos normales
- Discovery con notas incompletas -> `sales-discovery-brief` devuelve hipótesis marcadas.
- Revisión de propuesta estándar -> `proposal-risk-check` clasifica riesgo alto/medio/bajo.
- Seguimiento de piloto -> `pilot-kpi-tracker` exige baseline y umbral go/no-go.

### Casos críticos
- Propuesta con promesa "100% garantizado" -> se marca como riesgo crítico.
- KPI sin fuente de datos -> se rechaza y pide medición previa.
- Seguimiento comercial sin CTA -> se corrige para incluir acción concreta.

### Casos de fallo potencial
- Falta de responsable/fecha en siguientes pasos.
- Notas de reunión con opiniones mezcladas con hechos.
- Tareas bloqueadas mal ubicadas en columna Now.

## Skills de terceros integradas
Instalación real ejecutada con:
`install-skill-from-github.py --repo openai/skills --path skills/.curated/notion-meeting-intelligence skills/.curated/notion-research-documentation skills/.curated/pdf --dest <03_terceros>`

Skills integradas:
- notion-meeting-intelligence
- notion-research-documentation
- pdf