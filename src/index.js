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
        const model = process.env.OPENAI_MODEL;
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: model,
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

async function generateInterviewQuestions(resumeContent, companyName) {
    const prompt = `
    Based on the following resume content and my skills, generate a list of potential technical and HR interview questions that an interviewer might ask for a job at ${companyName}.

    Resume Content:
    ${resumeContent}

    In addition to this also get the most commonly asked questions related to all the technologies mentioned in the resume.
    Please return a list of questions in plain text format.
    `;

    try {
        const model = process.env.OPENAI_MODEL;
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: model,
            messages: [{ role: 'user', content: prompt }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const questions = response.data.choices[0].message.content;
        const questionsFilePath = path.join('src/interview', `${companyName}_InterviewQuestions.txt`);
        fs.writeFileSync(questionsFilePath, questions);
        console.log(`Interview questions saved as ${questionsFilePath}.`);
    } catch (error) {
        console.error('Error generating interview questions:', error.response ? error.response.data : error.message);
    }
}


async function saveHTMLToFile(htmlContent, filePath) {
    // Save HTML to specified file path
    fs.writeFileSync(filePath, htmlContent);
    console.log(`HTML Resume saved as ${filePath}.`);
}

async function saveResumeToPDF(htmlContent, filePath) {
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

async function main() {

    const companyName = await new Promise((resolve) => {
        process.stdout.write('Please enter the company name: ');
        process.stdin.on('data', (data) => {
            resolve(data.toString().trim());
        });
    });

    const jobDescription = readJobDescription();
    const htmlContent = await generateTailoredResume(jobDescription);
    
    if (htmlContent) {
        console.log('Generated HTML Resume:\n', htmlContent);
        
        // Save HTML to file
        const htmlFilePath = path.join('src/output', `${companyName}_Resume.html`);
        await saveHTMLToFile(htmlContent, htmlFilePath);
        
        // Attempt to save as PDF
        const pdfFilePath = path.join('src/output', `${companyName}_Resume.pdf`);
        try {
            await saveResumeToPDF(htmlContent, pdfFilePath);
        } catch (error) {
            console.error('Failed to generate PDF.', error.message);
        }

        await generateInterviewQuestions(htmlContent, companyName);
    }
}

main().catch(console.error);
