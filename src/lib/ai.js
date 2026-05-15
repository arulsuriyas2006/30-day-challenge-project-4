export async function explainExpression(expr,result){
    if(!expr || !result) return "Please provide an expression and result,press=,then click ASK AI to explain.";

    const key =import.meta.env.VITE_SECRET_KEY;

    if(!key) return "OpenAI API key is not set. Please set the key to use this feature.";

    const systemPrompt="You are a kind math tutor.For absolute beginners.Explain like to a 10 years old.Use 3-7 short bullet steps.Prefer every words,Do not Invent new numbers.Explain the order of operations.If relevent,End with one line recap."
    const userPrompt=`Explain in simply In steps without extra Symbols\nExpression: ${expr}\nResult: ${result}`;
    
    const body = {
       model: "openai/gpt-3.5-turbo",
        messages:[
            {role:"system",content:systemPrompt},
            {role:"user",content:userPrompt}
        ]
    }
 try{
    console.log("Sending request to AI with body:",body)
   const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
                        "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "Math AI App"
  },
  body: JSON.stringify(body),
});
 
if (!res.ok) {

    const errorData = await res.json();

    console.log("OPENROUTER ERROR:", errorData);

    return JSON.stringify(errorData);
}
const data = await res.json();
const text = data?.choices?.[0]?.message?.content?.trim();
return text || "AI did not return a valid response.";
console.log(data)
 }catch(err){
 console.log(err);
 return "An error occurred while communicating with the AI.";
 }
}