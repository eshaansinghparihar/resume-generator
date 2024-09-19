import fs from "fs";

export default async function saveHTMLToFile(htmlContent, filePath) {
    // Save HTML to specified file path
    fs.writeFileSync(filePath, htmlContent);
    console.log(`HTML Resume saved as ${filePath}.`);
}