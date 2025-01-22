import './style.css'

import { LMStudioClient } from "@lmstudio/sdk";

const client = new LMStudioClient({
    baseUrl: "ws://192.168.33.81:1234",
});

const downloadedModels = await client.system.listDownloadedModels();

let llamaModelPath = downloadedModels[0].path;
const llama3 = await client.llm.get({ path: llamaModelPath});
console.log(llama3)

const prediction = llama3.respond([
    { role: "system", content: "Answer the following questions shortly." },
    { role: "user", content: "What is the capital of france" },
]);

let messageElement = document.getElementById("message");

for await (const { content } of prediction) {
    messageElement.innerText += content;
}