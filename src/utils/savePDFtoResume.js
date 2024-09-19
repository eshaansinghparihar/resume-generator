import puppeteer from "puppeteer";

export default async function saveResumeToPDF(htmlContent, filePath) {
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Path to Chrome
        headless: false // Set to false if you want to see the browser window
    });
    
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.setViewport({ width: 1440, height: 900 }); // Fit to one page

    await page.pdf({ path: filePath, format: 'A4', printBackground: true });

    await browser.close();
    console.log('Resume saved as Resume.pdf in the output folder.');
}
