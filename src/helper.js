export async function loadLocalTextFile(filePath) {
    const response = await fetch(filePath);
    return await response.text();
}