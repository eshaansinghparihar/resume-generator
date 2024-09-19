import axios from "axios";
export default async function getOpenAIResponse(prompt){
    try{
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
        return response;
    }
    catch(error){
        console.error('Error while querying OpenAI:')
        throw new Error(error)
    }
}