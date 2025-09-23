export class FileTextExtractor {
    static extract(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    }
}

// This variable will be set after file selection
export let fileText = "";

// Helper to set fileText after reading
export async function setFileTextFromFile(file) {
    fileText = await FileTextExtractor.extract(file);
    return fileText;
}