import fs from "fs";
export default function getJobDescription(jobDescription) {
    return fs.readFileSync(jobDescription, 'utf8');
}