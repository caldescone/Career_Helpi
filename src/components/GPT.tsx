import OpenAI from "openai";

export async function sendChatQuery(query: string, key: string) {
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true});
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: query }],
        model: "gpt-4",
    });
    console.log(completion.choices[0].message.content);
}

export async function sendBasicQuizQuery(quiz: string[], key: string) {

}

export async function sendDetailedQuizQuery(quiz: string[], key: string) {

}