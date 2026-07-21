async function askOllamawithoutstreamingresponse(prompt) {
    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama3.2:3b",
            prompt: prompt,
            stream: false
        })
    });

    const data = await response.json();
    return data.response;
}

// (async () => {
//     const answer = await askOllamawithoutstreamingresponse("Explain Playwright in simple words.");
//     console.log(answer);
// })();
async function askOllamabystreamingresponse(prompt) {
    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama3.2:3b",
            prompt,
            stream: true
        })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.trim().split("\n");
        for (const line of lines) {
            if (!line) continue;
            const json = JSON.parse(line);
            process.stdout.write(json.response || "");
        }
    }
    console.log("\nFinished.");
}
(async () => {
    const answer = await askOllamabystreamingresponse(`You are a Senior SDET.

Generate 10 login test cases.

Include:
- Positive
- Negative
- Boundary

Return as a markdown table.`);
    console.log(answer);
})();