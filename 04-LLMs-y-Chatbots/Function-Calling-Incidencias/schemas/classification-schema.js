export const classificationSchema = {
    type: "object",
    properties: {
        urgencia: {
            type: "string",
            enum: ["alta", "media", "baja"]
        },
        tema: {
            type: "string"
        },
        equipo: {
            type: "string",
            enum: ["Facturación", "Asistencia Usuarios", "Comercial"]
        }
    },
    required: ["urgencia", "tema", "equipo"],
    additionalProperties: false
}