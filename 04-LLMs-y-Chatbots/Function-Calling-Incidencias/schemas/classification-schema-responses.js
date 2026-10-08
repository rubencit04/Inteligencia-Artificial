export const classificationSchemaResponses = {
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
        },
        respuesta_usuario: {
            type: "string",
            description: "Una respuesta profesional, clara y amable para el usuario final."
        },
        respuesta_en_revision: {
            type: "string",
            description: "Una respuesta que indique estamos revisando su problema e informa de un tiempo medio de respuesta."
        }
    },
    required: ["urgencia", "tema", "equipo", "respuesta_usuario", "respuesta_en_revision"],
    additionalProperties: false
}