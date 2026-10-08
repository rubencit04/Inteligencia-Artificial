import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function obtenerObjetoBatch (batchId){
    const batch = await client.batches.retrieve(batchId);
    return batch;
}