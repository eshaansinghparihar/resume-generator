import dotenv from 'dotenv';
import YAML from 'yamljs';
import path from 'path';
import getJobDescription from './utils/getJobDescription.js';
import ensureDirectoriesExist from './utils/ensureDirectoriesExist.js';
import generateTailoredResume from './utils/generateTailoredResume.js';
import saveHTMLToFile from './utils/saveHTMLtoFile.js';
import saveResumeToPDF from './utils/savePDFtoResume.js';
import generateInterviewQuestions from './utils/generateInterviewQuestions.js';
import { SKILLS_INFO_FILE_PATH, JOB_DESCRIPTION_FILE_PATH, PDF_RESUME_DIRECTORY_PATH, HTML_RESUME_DIRECTORY_PATH} from './paths.js';

dotenv.config();

const resumeData = YAML.load(SKILLS_INFO_FILE_PATH);

async function main() {

    ensureDirectoriesExist();

    const companyName = await new Promise((resolve) => {
        process.stdout.write('Please enter the company name: ');
        process.stdin.on('data', (data) => {
            resolve(data.toString().trim());
        });
    });

    const jobDescription = getJobDescription(JOB_DESCRIPTION_FILE_PATH);
    const htmlContent = await generateTailoredResume(jobDescription, resumeData);
    
    if (htmlContent) {
        console.log('Generated HTML Resume:\n', htmlContent);
        
        // Save HTML to file
        const htmlFilePath = path.join(HTML_RESUME_DIRECTORY_PATH, `${companyName}_Resume.html`);
        await saveHTMLToFile(htmlContent, htmlFilePath);
        
        // Attempt to save as PDF
        const pdfFilePath = path.join(PDF_RESUME_DIRECTORY_PATH, `${companyName}_Resume.pdf`);
        try {
            await saveResumeToPDF(htmlContent, pdfFilePath);
        } catch (error) {
            console.log('Failed to generate PDF.');
            console.error(error);
        }

        await generateInterviewQuestions(htmlContent, companyName);   
    }

    process.exit(0);
}

main().catch(console.error);
