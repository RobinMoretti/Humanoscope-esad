export let noLlmMode = false;

export async function loadLocalTextFile(filePath) {
    const response = await fetch(filePath);
    return await response.text();
}

export function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

