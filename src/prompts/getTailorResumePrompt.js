export default function getTailorResumePrompt(jobDescription, resumeData) {
    const prompt = `
You are a seasoned HR professional with expertise in crafting ATS-compliant resumes. 
Your task is to create a tailored resume based on the following job description and my resume data. 
Focus on highlighting relevant skills, experiences, and soft skills that align with the job description, ensuring that the final output is optimized for Applicant Tracking Systems (ATS).

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

Ensure that the entire resume fits exactly one page without scrolling. Use clear and concise language, incorporating relevant keywords from the job description, and ensure proper formatting for ATS compatibility. The total word count should not exceed 700 words, but aim to utilize the full page effectively.

Use the following styles:
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;  
        padding: 20px;      
        max-width: 800px;
        color: #333;
        background-color: #fff;
        line-height: 1.4;   
    }
    h1 {
        font-size: 12pt;    
        margin-bottom: 8px;
        border-bottom: 2px solid #000;
        padding-bottom: 4px; 
    }
    h2 {
        font-size: 10pt;     
        margin: 10px 0 6px; 
        border-bottom: 1px solid #000;
        padding-bottom: 3px;
    }
    h3 {
        font-size: 9pt;     
        margin: 6px 0;      
        font-weight: normal;
    }
    p, ul {
        margin: 6px 0 14px;
        font-size: 9pt; 
    }
    ul {
        list-style: disc;
        padding-left: 15px; 
    }
    a {
        color: #000;
        text-decoration: none;
        border-bottom: 1px solid #000;
        transition: color 0.3s;
    }
    a:hover {
        color: #555;
        border-bottom: 1px solid #555;
    }
    .contact-info {
        margin-bottom: 20px; 
        font-size: 8pt;      
    }
    .contact-info p {
        margin: 2px 0;      
    }
    section {
        margin-bottom: 20px; 
    }
</style>

- Ensure each section contains sufficient details and examples to effectively fill the page, particularly in Experience and Projects. Use bullet points to provide clarity and increase content volume.
`;
    return prompt;
}
