import 'dotenv/config';
import OpenAI from 'openai';

const client = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
});

const response = await client.responses.create({
    model: "gpt-5-nano",
    input: "Cuál fue el primer presidente de Estados Unidos",
    store: true, // No es necesario porque es el valor predeterminado 
});

console.log(response.output_text);
console.log("\n ----------------------------------- \n");

const response2 = await client.responses.create({
    model: "gpt-5-nano",
    input: "Y el segundo?",
    previous_response_id: response.id, 
});

console.log(response2.output_text);