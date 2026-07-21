async function askAI(prompt) {
    const response = await fetch(
        "http://localhost:11434/api/generate",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                model:"llama3.2:3b",
                prompt:prompt,
                format:"json",
                stream:false
            })
        }
    );
    const data = await response.json();
    return data.response;
}
(async()=>{
const prompt = `
You are a Senior SDET.

Generate 3 login test cases.

Return ONLY valid JSON.

Schema:

{
 "testCases":[
   {
    "id":"",
    "title":"",
    "priority":"",
    "steps":[],
    "expected":""
   }
 ]
}
IMPORTANT RULES:

- Return ONLY JSON.
- Do not add explanations.
- Do not use markdown.
- Do not wrap JSON in ''',

Output must start with {
and end with }.`;
const result = await askAI(prompt);
const jsonData = JSON.parse(result);
console.log(jsonData.testCases);
console.log(jsonData.testCases[0].title);
})();