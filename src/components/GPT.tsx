import OpenAI from "openai";

export async function sendQuery(query: string, key: string) {
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true});
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: query }],
        model: "gpt-4",
    });
    console.log(completion.choices[0].message.content);
}