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
            required: ["actions", "parameters"],
        },
    },
    required: ["message", "actions"],
};

export async function initLmStudio() {
    console.log("initLmStudio is initiating.")

    lmStudio = new LMStudioClient({
        baseUrl: "wss://169.254.165.204:1234",
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
            stopStrings: ["\n"],
            temperature: 0.7,
            //inputPrefix: "Q: ",
            //inputSuffix: "\nA:",
            structured: { type: "json", jsonSchema: schema },
        },
    );

    return (JSON.parse(prediction.content));
}


export let initialPrompt = "" +
    "Tu dois incarner un personage. Ne sors jamais de ce personnage."
