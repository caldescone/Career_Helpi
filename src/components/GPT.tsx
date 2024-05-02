import OpenAI from "openai";
import { Question } from "./BasicQuiz";

export async function isValidKey(key: string): Promise<boolean> {
  // Used GPT 3.5 to help validate the key
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });

  try {
    await openai.chat.completions.create({
      messages: [{ role: "user", content: "test" }],
      model: "gpt-4",
    });
    return true;
  } catch (error) {
    // If the key is invalid, the API will throw an error
    console.error(error);
    return false;
  }
}

export interface CareerRecommendation {
  overview: string;
  jobTitle: string;
  jobDescription: string;
  averageSalary: string[];
  requirements: string;
  applicationToCareer: string;
  otherJobs: string;
  relatedAspects: string;
}

function parseCareerRecommendation(apiResponse: string): CareerRecommendation {
  const matches =
    apiResponse.match(/\{(.*?)\}/g)?.map((match) => match.slice(1, -1)) ?? []; // Get the matches from the response

  return {
    overview: matches[0],
    jobTitle: matches[1],
    jobDescription: matches[2],
    averageSalary: matches[3]?.split(", ") ?? [],
    requirements: matches[4],
    applicationToCareer: matches[5],
    otherJobs: matches[6],
    relatedAspects: matches[7],
  };
}

async function sendChatQuery(
  query: string,
  key: string
): Promise<CareerRecommendation | null> {
  if (key === "") {
    // If the key is empty, return null
    return null;
  }
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true }); // Create an instance of the OpenAI class
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: query }],
    model: "gpt-4", // The model to use, with minimim being gpt-4
  });
  const apiResponse = completion.choices[0]?.message?.content ?? null; // Get the response from the API if it exists
  console.log(apiResponse);
  if (apiResponse) {
    // If the response exists, parse it
    return parseCareerRecommendation(apiResponse);
  }
  return null;
}

export async function sendBasicQuizQuery(questions: Question[], key: string) {
  let query =
    "Act as a career counselor. These questions were asked to the student with answers provided, but aimed at being a basic career quiz. \n";
  for (let i = 0; i < questions.length; i++) {
    // Adds the question followed by the answer to the query
    query += questions[i].question + ". " + questions[i].chosenAnswer + ".\n";
  }
  query +=
    "Please provide a report on the student's career path using this template with the answers inside the curly brackets replacing what is currently there, {overview}, {reccomended job}, {job description}, {lower salary, median salary, upper salary}, {education required}, {how this job relates to the quiz}, {other jobs in the field}, {related aspects of the job}.";
  return await sendChatQuery(query, key);
}

export async function sendDetailedQuizQuery(
  questions: string[],
  answers: string[],
  key: string
) {
  let query =
    "Act as a career counselor. These questions were asked to the student with answers provided, but aimed at being a detailed career quiz. \n";
  for (let i = 0; i < questions.length; i++) {
    query += questions[i] + ". " + answers[i] + ".\n";
  }
  query +=
    "Please provide a report on the student's career path using this template with the answers inside the curly brackets replacing what is currently there, {overview}, {reccomended job}, {job description}, {lower salary, median salary, upper salary}, {education required}, {how this job relates to the quiz}, {other jobs in the field}, {related aspects of the job}.";
  return await sendChatQuery(query, key);
}
