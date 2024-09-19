import fs from 'fs';
import { OUTPUT_DIRECTORY_PATH, INTERVIEW_DIRECTORY_PATH, HTML_RESUME_DIRECTORY_PATH, PDF_RESUME_DIRECTORY_PATH } from '../paths.js';

export default function ensureDirectoriesExist() {

    if (!fs.existsSync(OUTPUT_DIRECTORY_PATH)) {
        fs.mkdirSync(OUTPUT_DIRECTORY_PATH, { recursive: true });
        console.log(`Created directory: ${OUTPUT_DIRECTORY_PATH}`);
    }

    if (!fs.existsSync(INTERVIEW_DIRECTORY_PATH)) {
        fs.mkdirSync(INTERVIEW_DIRECTORY_PATH, { recursive: true });
        console.log(`Created directory: ${INTERVIEW_DIRECTORY_PATH}`);
    }

    if (!fs.existsSync(HTML_RESUME_DIRECTORY_PATH)) {
        fs.mkdirSync(HTML_RESUME_DIRECTORY_PATH, { recursive: true });
        console.log(`Created directory: ${HTML_RESUME_DIRECTORY_PATH}`);
    }

    if (!fs.existsSync(PDF_RESUME_DIRECTORY_PATH)) {
        fs.mkdirSync(PDF_RESUME_DIRECTORY_PATH, { recursive: true });
        console.log(`Created directory: ${PDF_RESUME_DIRECTORY_PATH}`);
    }
}