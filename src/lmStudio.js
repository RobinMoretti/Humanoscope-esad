import {noLlmMode} from "./helper.js";

let answerDiv = document.getElementById('answer');

import { LMStudioClient } from "@lmstudio/sdk";

let lmStudio;
let client;

const schema = {
    type: "object",
    properties: {
        message: { type: "string" },
        actions: {
            type: "object",
            properties: {
                move: {
                    type: "string",
                    enum: ["null", "up", "down", "left", "right"],
                },
                parameters: { type: "object" },
            },
        },
    },
    required: ["message", "actions"],
};

export async function initLmStudio() {
    if(noLlmMode) return;
    console.log("initLmStudio is initiating.")

    lmStudio = new LMStudioClient({
        baseUrl: "ws://192.168.33.211:5678",
    });

    const loadedModels = await lmStudio.llm.listLoaded();

    if (loadedModels.length === 0) {
        throw new Error("No models loaded");
    }

    client = await lmStudio.llm.get({ identifier: loadedModels[0].identifier });
}

export async function predict(history){
    const prediction =  await client.respond(
        history,
        {
            stopStrings: ["/n"],
            temperature: 0.7,
            structured: { type: "json", jsonSchema: schema },
        },
    );

    return (JSON.parse(prediction.content));
}


export let initialPrompt = "" +
    "Tu dois incarner un personage. Ne sors jamais de ce personnage. Exprime toi toujours avec de courtes phrases, comme des exclamations. " +
    "essaie de ne pas te répéter" +
    "Tu peux utiliser la direction pour te diriger dans l'espace si tu le souhaite, si tu ne le souhaite pas, defini le en null." +
    "Si je t'envoyer un message avec un nom, prend en considértion que je joue aussi ce personnage. (exemple, nom : message)" +
    "/n"
