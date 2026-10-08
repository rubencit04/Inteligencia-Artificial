import { traductorSchema } from '../schema/traductor-Schema.js'

const developerMessage = {
    role: "developer",
    content: "Eres un traductor profesional. Traduce el título y la descripción del producto al español manteniendo el tono promocional",
}

export function generarJsonl(products) {
    const lines = products.map((product, index) => {
        const line = {
            custom_id: `product-${index}`,
            method: "POST",
            url: "/v1/responses",
            body: {
                model: "gpt-5-nano",
                input: [

                    developerMessage,
                    {
                        role: 'user',
                        content: JSON.stringify({
                            title: product.title,
                            description: product.description
                        }),
                    },

                ],
                text: {
                    format: {
                        type: 'json_schema',
                        name: "translated_product",
                        schema: traductorSchema,
                        strict: true
                    }
                }
            }
        }
        return JSON.stringify(line);
    });
    return lines.join("\n");
}