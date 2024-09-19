# Resume Generator

A powerful Resume Generator application built with Node.js and Puppeteer that takes user details in YAML format to produce tailored, ATS-compliant resumes in a single-page PDF. Additionally, the application analyzes the job description (JD) provided by recruiters to generate potential interview questions based on the user's skills.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
<!--- [How It Works](#how-it-works)-->
<!--- [Contributing](#contributing)-->
- [License](#license)
- [Disclaimer](#disclaimer)

## Features

- **ATS-Compliant Resume**: Generates a single-page PDF resume that is compliant with Applicant Tracking Systems (ATS).
- **YAML Input**: Accepts user details in a simple YAML format for easy customization.
- **Job Description Analysis**: Compares user skills against job descriptions to provide tailored interview questions.
- **Tailored Design**: Offers a clean and professional resume design.
- **Cross-Platform**: Works on any platform that supports Node.js.

## Technologies Used

- **Node.js**: JavaScript runtime for building the application.
- **Puppeteer**: Headless browser automation library used for generating PDFs.
- **YAML**: Format for user input data.
- **Express**: Web framework for handling requests.
- **dotenv**: For managing environment variables.

## Installation

To get started with the Resume Generator, follow these steps:

0. Make sure NodeJS ( version >= 20.0) is installed and latest Google Chrome is running on your system.

1. Clone the repository:

   ```bash
   git clone https://github.com/eshaansinghparihar/resume-generator.git
   cd resume-generator
   
2. Installation:
    
    ```bash
    npm install

3. Set up environment variables
    
    ```bash
    OPENAI_API_KEY= your_api_key_here
    OPENAI_MODEL= your_prefered_model
    
 PS : Suggested model : gpt-4o-mini 

 As it is the most Cost Effective, Was F*cked in face while using gpt-4
 
## Configuration

 Copy and paste the below attached plain_text_resume.yaml file and modify it with your information. For example refer: [Resume Example](https://github.com/eshaansinghparihar/resume-generator/blob/main/src/assets/plain_text_resume.yaml)

    ### plain_text_resume.yaml
    ```bash
    personal_information:
      name: "[Your Name]"
      surname: "[Your Surname]"
      date_of_birth: "[Your Date of Birth]"
      country: "[Your Country]"
      city: "[Your City]"
      address: "[Your Address]"
      phone_prefix: "[Your Phone Prefix]"
      phone: "[Your Phone Number]"
      email: "[Your Email Address]"
      github: "[Your GitHub Profile URL]"
      linkedin: "[Your LinkedIn Profile URL]"
    
    education_details:
      - education_level: "[Your Education Level]"
        institution: "[Your Institution]"
        field_of_study: "[Your Field of Study]"
        final_evaluation_grade: "[Your Final Evaluation Grade]"
        start_date: "[Start Date]"
        year_of_completion: "[Year of Completion]"
        exam:
          exam_name_1: "[Grade]"
          exam_name_2: "[Grade]"
          exam_name_3: "[Grade]"
          exam_name_4: "[Grade]"
          exam_name_5: "[Grade]"
          exam_name_6: "[Grade]"
    
    experience_details:
      - position: "[Your Position]"
        company: "[Company Name]"
        employment_period: "[Employment Period]"
        location: "[Location]"
        industry: "[Industry]"
        key_responsibilities:
          - responsibility_1: "[Responsibility Description]"
          - responsibility_2: "[Responsibility Description]"
          - responsibility_3: "[Responsibility Description]"
        skills_acquired:
          - "[Skill]"
          - "[Skill]"
          - "[Skill]"
    
      - position: "[Your Position]"
        company: "[Company Name]"
        employment_period: "[Employment Period]"
        location: "[Location]"
        industry: "[Industry]"
        key_responsibilities:
          - responsibility_1: "[Responsibility Description]"
          - responsibility_2: "[Responsibility Description]"
          - responsibility_3: "[Responsibility Description]"
        skills_acquired:
          - "[Skill]"
          - "[Skill]"
          - "[Skill]"
    
    projects:
      - name: "[Project Name]"
        description: "[Project Description]"
        link: "[Project Link]"
    
      - name: "[Project Name]"
        description: "[Project Description]"
        link: "[Project Link]"
    
    achievements:
      - name: "[Achievement Name]"
        description: "[Achievement Description]"
      - name: "[Achievement Name]"
        description: "[Achievement Description]"
    
    certifications:
      - name: "[Certification Name]"
        description: "[Certification Description]"
      - name: "[Certification Name]"
        description: "[Certification Description]"
    
    languages:
      - language: "[Language]"
        proficiency: "[Proficiency Level]"
      - language: "[Language]"
        proficiency: "[Proficiency Level]"
    
    interests:
      - "[Interest]"
      - "[Interest]"
      - "[Interest]"
    
    availability:
      notice_period: "[Notice Period]"
    
    salary_expectations:
      salary_range_usd: "[Salary Range]"
    
    self_identification:
      gender: "[Gender]"
      pronouns: "[Pronouns]"
      veteran: "[Yes/No]"
      disability: "[Yes/No]"
      ethnicity: "[Ethnicity]"
    
    legal_authorization:
      eu_work_authorization: "[Yes/No]"
      us_work_authorization: "[Yes/No]"
      requires_us_visa: "[Yes/No]"
      requires_us_sponsorship: "[Yes/No]"
      requires_eu_visa: "[Yes/No]"
      legally_allowed_to_work_in_eu: "[Yes/No]"
      legally_allowed_to_work_in_us: "[Yes/No]"
      requires_eu_sponsorship: "[Yes/No]"
    
    work_preferences:
      remote_work: "[Yes/No]"
      in_person_work: "[Yes/No]"
      open_to_relocation: "[Yes/No]"
      willing_to_complete_assessments: "[Yes/No]"
      willing_to_undergo_drug_tests: "[Yes/No]"
      willing_to_undergo_background_checks: "[Yes/No]"

    
## Usage

To use the Resume Generator, follow these steps:

1. **Prepare the Job Description**: Place the job description (JD) of the position you wish to apply for into the `src/input/JD.txt` file.

2. **Set Up OpenAI Credentials**: Purchase credits for the OpenAI project and paste your API key into the environment variables. Also, specify the OpenAI model you wish to use.

3. **Generate Your Resume**: Run the following command in your terminal to create your ATS-friendly PDF resume based on the provided JD:
   ```bash
   npm run createResume

4. **Apply with Confidence**: Use the generated resume in the `src/output/pdfResume` to apply for the position and wait for the recruiter's call! Good luck! xD.

5. **Prepare for Interviews**: While you're waiting for the recruiter's call, please don't forget to go and take a look at the generated potential interview questions in `src/interview`.

## Licenses

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

Resume Generator is developed for educational purposes only. The creator does not assume any responsibility for its use. Users should ensure they comply with hiring platforms' terms of service, any applicable laws and regulations, and ethical considerations when using this tool. 

The use of automated tools for job applications may have implications for user accounts, and caution is advised.










