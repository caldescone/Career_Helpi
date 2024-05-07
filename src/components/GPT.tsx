import OpenAI from "openai";
import { Question } from "./BasicQuiz";
import { sleep } from "openai/core";

export async function isValidKey(key: string): Promise<boolean> {
  // Used GPT 3.5 to help validate the key
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });

  try {
    await openai.chat.completions.create({
      messages: [{ role: "user", content: "Provide output in valid JSON" }],
      model: "gpt-4",
    });
    return true;
  } catch (error) {
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
  otherJobs: string[];
  relatedAspects: string[];
}

function parseCareerRecommendation(apiResponse: string): CareerRecommendation {
  try {
    const parsedResponse = JSON.parse(apiResponse);
    return {
      overview: parsedResponse.CareerPath.Overview,
      jobTitle: parsedResponse.CareerPath.RecommendedJob,
      jobDescription: parsedResponse.CareerPath.JobDescription,
      averageSalary: [
        parsedResponse.CareerPath.Salary.Low,
        parsedResponse.CareerPath.Salary.Median,
        parsedResponse.CareerPath.Salary.High,
      ],
      requirements: parsedResponse.CareerPath.EducationRequired,
      applicationToCareer: parsedResponse.CareerPath.RelatesToQuiz,
      otherJobs: parsedResponse.CareerPath.OtherJobsInField,
      relatedAspects: parsedResponse.CareerPath.RelatedAspectsOfJob,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to parse API response");
  }
}

const example_json = {
  "CareerPath": {
    "Overview": "Based on the responses obtained, the student shows interest in helping people, has a strong tactile and technical inclination towards work, enjoys the dynamic environment of a startup, and prefers group work. Therefore, it would be advisable to explore the field of User Experience (UX) Design, specifically the design of technology products with a strong service component or linked to healthcare.",
    "RecommendedJob": "UX Designer in a Healthcare Tech Startup",
    "JobDescription": "A UX Designer ensures optimal user experience in technology products, navigating through user research, testing, development, content, along with prototyping and wireframing. In a healthcare tech startup, the designer would focus on creating user-friendly interfaces for healthcare offerings, ensuring it caters to the users' needs and providing aid efficiently.",
    "Salary": {
      "Low": "$62,000",
      "Median": "$85,277",
      "High": "$113,000"
    },
    "EducationRequired": "College degree in fields such as Computer Science, Graphic Design, or User Experience Design along with knowledge of service design, user psychology, and teamwork abilities.",
    "RelatesToQuiz": "The job involves creative and technical tasks, primarily in an office but with a hands-on component (tactile), and aids others (healthcare component). The startup environment matches the preference, and the constant need for collaboration with the development team and users underpins the group working preference.",
    "OtherJobsInField": [
      "Product Manager",
      "User Researcher",
      "Healthcare Service Designer",
      "App Developer"
    ],
    "RelatedAspectsOfJob": [
      "Interaction with a wide range of users and healthcare professionals",
      "Engagement in Innovation",
      "Problem-solving through technological solutions",
      "Feel fulfilled by helping others improve their healthcare outcomes"
    ]
  }
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
    model: "gpt-4", // The model to use, with minimim being gpt-4
    messages: [
      { role: "system", content: "Provide output in valid JSON. The data schema should be like this: " + JSON.stringify(example_json) },
      { role: "user", content: query },
    ],
  });

  const apiResponse = completion.choices[0]?.message?.content ?? null; // Get the response from the API if it exists
  console.log(apiResponse);
  sleep(1000);
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
    "Provide valid JSON output for the student's career path and include an overview, recommended job, job description, salary with low, median, and high, education required, how this job relates to the quiz, other jobs in the field, and related aspects of the job.";
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
    "Provide valid JSON output for the student's career path and include an overview, recommended job, job description, salary with low, median, and high, education required, how this job relates to the quiz, other jobs in the field, and related aspects of the job.";
  return await sendChatQuery(query, key);
}
