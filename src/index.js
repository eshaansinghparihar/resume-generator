require('dotenv').config();
const axios = require('axios');
const YAML = require('yamljs');
const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

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

    Please provide the final resume in plain text format, including the following sections:
    - Contact Information
    - Summary
    - Education
    - Experience
    - Skills
    - Projects
    - Certifications
    - Achievements

    Make sure to use clear and concise language, include relevant keywords from the job description, and ensure proper formatting for ATS compatibility.The total word count should be less than 700 words, and the resume should not exceed one page in length.
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


async function saveResumeToPDF(resumeText) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    // Set font size and color
    const { width, height } = page.getSize();
    page.drawText(resumeText, {
        x: 50,
        y: height - 50,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: 14,
    });

    // Save the PDF to the output folder
    const pdfBytes = await pdfDoc.save();
    const outputDir = 'src/output';
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }

    fs.writeFileSync(`${outputDir}/Resume.pdf`, pdfBytes);
    console.log('Resume saved as Resume.pdf in the output folder.');
}

async function main() {
    const jobDescription = readJobDescription();
    const tailoredResume = await generateTailoredResume(jobDescription);
    
    if (tailoredResume) {
        console.log('Generated Resume:\n', tailoredResume);
        await saveResumeToPDF(tailoredResume);
    }
}

// Run the main function
main().catch(console.error);
