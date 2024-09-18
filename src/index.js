require('dotenv').config();
const axios = require('axios');
const YAML = require('yamljs');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const yamlFilePath = 'src/assets/plain_text_resume.yaml';
const resumeData = YAML.load(yamlFilePath);

const jobDescriptionFilePath = 'src/input/JD.txt';

function readJobDescription() {
    return fs.readFileSync(jobDescriptionFilePath, 'utf8');
}

async function generateTailoredResume(jobDescription) {
    const prompt = `
    You are a seasoned HR professional with expertise in crafting ATS-compliant resumes. 
    Your task is to create a tailored resume based on the following job description and my resume data. 
    Focus on highlighting relevant skills and experiences that align with the job description, ensuring that the final output is optimized for Applicant Tracking Systems (ATS).

    Job Description:
    "${jobDescription}"

    Resume Data:
    ${JSON.stringify(resumeData)}

    Please provide only the HTML resume without any additional text or explanations. 
    The resume should include the following sections:
    - Contact Information
    - Summary
    - Education
    - Experience
    - Skills
    - Projects
    - Certifications
    - Achievements

    Use the following styles:
    - Headings: 10pt
    - Body text: 9pt
    - Ensure that the resume fits a single page and does not require scrolling.

    Make sure to use clear and concise language, include relevant keywords from the job description, and ensure proper formatting for ATS compatibility.The total word count should be less than 700 words.
    `;
    
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating resume:', error.response ? error.response.data : error.message);
        return null;
    }
}


async function saveHTMLToFile(htmlContent) {
    const outputDir = 'src/output';
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }

    // Save HTML to Resume.html
    const htmlFilePath = path.join(outputDir, 'Resume.html');
    fs.writeFileSync(htmlFilePath, htmlContent);
    console.log('HTML Resume saved as Resume.html in the output folder.');
}

async function saveResumeToPDF(htmlContent) {
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Path to Chrome
        headless: false // Set to false if you want to see the browser window
    });
    
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.setViewport({ width: 1440, height: 900 }); // Fit to one page

    const outputDir = 'src/output';
    
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }

    await page.pdf({ path: `${outputDir}/Resume.pdf`, format: 'A4', printBackground: true });

    await browser.close();
    console.log('Resume saved as Resume.pdf in the output folder.');
}

async function main() {
    const jobDescription = readJobDescription();
    const htmlContent = await generateTailoredResume(jobDescription);
    
    if (htmlContent) {
        console.log('Generated HTML Resume:\n', htmlContent);
        
        // Save HTML to file
        await saveHTMLToFile(htmlContent);
        
        // Attempt to save as PDF
        try {
            await saveResumeToPDF(htmlContent);
        } catch (error) {
            console.error('Failed to generate PDF. Please check the HTML file:', error.message);
            process.exit()
        }
    }
}

main().catch(console.error);
