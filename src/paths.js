import path from 'path';

const SKILLS_INFO_FILE_PATH = 'src/config/plain_text_resume.yaml';
const JOB_DESCRIPTION_FILE_PATH = 'src/input/JD.txt';
const OUTPUT_DIRECTORY_PATH = path.join('src', 'output');
const INTERVIEW_DIRECTORY_PATH = path.join('src', 'interview');
const HTML_RESUME_DIRECTORY_PATH = path.join(OUTPUT_DIRECTORY_PATH, 'htmlResume');
const PDF_RESUME_DIRECTORY_PATH = path.join(OUTPUT_DIRECTORY_PATH, 'pdfResume');


export {
    SKILLS_INFO_FILE_PATH,
    JOB_DESCRIPTION_FILE_PATH,
    OUTPUT_DIRECTORY_PATH,
    INTERVIEW_DIRECTORY_PATH,
    HTML_RESUME_DIRECTORY_PATH,
    PDF_RESUME_DIRECTORY_PATH
};