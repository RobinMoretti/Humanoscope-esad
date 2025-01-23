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
                    enum: ["up", "down", "left", "right"],
                },
                parameters: { type: "object" },
            },
            //required: ["actions", "parameters"],
        },
    },
    required: ["message", "actions"],
};

export async function initLmStudio() {
    console.log("initLmStudio is initiating.")

    lmStudio = new LMStudioClient({
        baseUrl: "ws://192.168.32.180:5678",
    });

    const loadedModels = await lmStudio.llm.listLoaded();

    console.log("initLmStudio is initiating2.")
    if (loadedModels.length === 0) {
        throw new Error("No models loaded");
    }

    client = await lmStudio.llm.get({ identifier: loadedModels[0].identifier });
    console.log("initLmStudio iniated.")
}

/// Create a text completion prediction
export async function predict(history){
    // Create a text completion prediction
    const prediction =  await client.respond(
        history,
        {
            //contextOverflowPolicy: "stopAtLimit",
            //maxPredictedTokens: 100,
            //stopStrings: ["</span>"],
            temperature: 0.7,
            inputPrefix: "<span>",
            inputSuffix: "</span>",
            structured: { type: "json", jsonSchema: schema },
        },
    );

    return (JSON.parse(prediction.content));
}


export let initialPrompt = "" +
    "Tu dois incarner un personage. Ne sors jamais de ce personnage. Exprime toi toujours avec de courtes phrases, comme des exclamations. " +
    "essaie de ne pas trop te répéter" +
    "Tu peux utiliser la direction pour te diriger sans l'espace si tu le souhaite." +
    "Si je t'envoyer un message avec avec le nom de quelqu'un, prend en considértion que je joue aussi ce personnage. (exemple, nom : message)" +
    "roi artur : je suis le roi de la table ronde." +
    "/n"
