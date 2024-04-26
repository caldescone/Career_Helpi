import OpenAI from "openai";

async function sendChatQuery(query: string, key: string) {
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true }); // Create an instance of the OpenAI class
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: query }],
    model: "gpt-4", // The model to use, with minimim being gpt-4
  });
  console.log(key); // For development purposes
  console.log(completion.choices[0].message.content); // For development purposes
  return completion;
}

export async function sendBasicQuizQuery(
  questions: string[],
  answers: string[],
  key: string
) {
  let query =
    "Act as a career counselor. These questions were asked to the student with answers provided, but aimed at being a basic career quiz. Please provide a report on the student's career path including potential jobs, industries, and possible salaries. \n";
  for (let i = 0; i < questions.length; i++) {
    // Adds the question followed by the answer to the query
    query += questions[i] + ". " + answers[i] + ".\n";
  }
  return await sendChatQuery(query, key);
}

export async function sendDetailedQuizQuery(questions: string[], answers: string[], key: string) {
  let query =
  "Act as a career counselor. These questions were asked to the student with answers provided, but aimed at being a detailed career quiz. Please provide a report on the student's career path including potential jobs, industries, and possible salaries. \n";
  for (let i = 0; i < questions.length; i++) {
    query += questions[i] + ". " + answers[i] + ".\n";
  }
  return await sendChatQuery(query, key);
}
