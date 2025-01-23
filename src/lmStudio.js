let answerDiv = document.getElementById('answer');

import { LMStudioClient } from "@lmstudio/sdk";

let lmstudio;
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
    lmstudio = new LMStudioClient({
        baseUrl: "ws://192.168.33.81:1234",
    });

    const loadedModels = await lmstudio.llm.listLoaded();

    if (loadedModels.length === 0) {
        throw new Error("No models loaded");
    }

    client = await lmstudio.llm.get({ identifier: loadedModels[0].identifier });
}

/// Create a text completion prediction
export async function predict(history){
    console.log(history);

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
