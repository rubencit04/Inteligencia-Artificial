export const tools = [
    {
        type: "function",
        name: "get_subscription_reload",
        description: "Consulta la fecha en la que se renovará la subscripción del usuario",
        parameters: {
            type: "object",
            properties: {
                email: {type: "string"}
            },
            required: ["email"],
            additionalProperties: false
        },
        strict: true
    }
]