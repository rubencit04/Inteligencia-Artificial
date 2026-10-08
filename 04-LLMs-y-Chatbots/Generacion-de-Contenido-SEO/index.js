import 'dotenv/config';
import OpenAI from 'openai';

const client = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
});

const response = await client.responses.create({
    model: "gpt-5-nano",
    input: "Dime en una frase qué es un ornitorrinco"
});

console.log(response.output_text);