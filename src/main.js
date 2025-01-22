import './style.css'

import { LMStudioClient } from "@lmstudio/sdk";

const client = new LMStudioClient();

// Load a model
const llama3 = await client.llm.load("lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF");

// Create a text completion prediction
const prediction = llama3.complete("The meaning of life is");

// Stream the response
for await (const { content } of prediction) {
    process.stdout.write(content);
}