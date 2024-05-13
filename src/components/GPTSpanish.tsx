import OpenAI from "openai";
import { Question } from "./BasicQuiz";
import { sleep } from "openai/core";

export async function isValidKey(key: string): Promise<boolean> {
  // Used GPT 3.5 to help validate the key
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });

  try {
    await openai.chat.completions.create({
      messages: [
        { role: "user", content: "In Spanish, provide output in valid JSON" },
      ],
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
    throw new Error("Error al analizar la respuesta de la API");
  }
}

const example_json = {
  CareerPath: {
    Overview:
      "Basado en las respuestas obtenidas, el estudiante muestra interés en ayudar a las personas, tiene una fuerte inclinación táctil y técnica hacia el trabajo, disfruta del entorno dinámico de una startup y prefiere el trabajo en grupo. Por lo tanto, sería recomendable explorar el campo del Diseño de Experiencia de Usuario (UX), específicamente el diseño de productos tecnológicos con un fuerte componente de servicio o vinculados a la atención médica.",
    RecommendedJob: "Diseñador UX en una Startup de Tecnología de la Salud",
    JobDescription:
      "Un diseñador UX garantiza una experiencia de usuario óptima en productos tecnológicos, navegando a través de la investigación de usuarios, pruebas, desarrollo, contenido, junto con la creación de prototipos y wireframes. En una startup de tecnología de la salud, el diseñador se enfocaría en crear interfaces fáciles de usar para servicios de atención médica, asegurando que satisfaga las necesidades de los usuarios y brinde ayuda de manera eficiente.",
    Salary: {
      Low: "$62,000",
      Median: "$85,277",
      High: "$113,000",
    },
    EducationRequired:
      "Título universitario en campos como Ciencias de la Computación, Diseño Gráfico o Diseño de Experiencia de Usuario, junto con conocimientos de diseño de servicios, psicología del usuario y habilidades de trabajo en equipo.",
    RelatesToQuiz:
      "El trabajo implica tareas creativas y técnicas, principalmente en una oficina pero con un componente práctico (táctil), y ayuda a los demás (componente de atención médica). El entorno de una startup coincide con la preferencia, y la necesidad constante de colaboración con el equipo de desarrollo y los usuarios respalda la preferencia de trabajo en grupo.",
    OtherJobsInField: [
      "Gerente de Producto",
      "Investigador de Usuarios",
      "Diseñador de Servicios de Atención Médica",
      "Desarrollador de Aplicaciones",
    ],
    RelatedAspectsOfJob: [
      "Interacción con una amplia gama de usuarios y profesionales de la salud",
      "Participación en la innovación",
      "Resolución de problemas a través de soluciones tecnológicas",
      "Sentirse satisfecho ayudando a otros a mejorar sus resultados de atención médica",
    ],
  },
};

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
      {
        role: "system",
        content:
          "In Spanish, provide output in valid JSON. The data schema should be like this: " +
          JSON.stringify(example_json),
      },
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

export async function sendBasicSpanishQuizQuery(
  questions: Question[],
  key: string
) {
  let query =
    "Act as a career counselor. These questions were asked to the student with answers provided, but aimed at being a basic career quiz. \n";
  for (let i = 0; i < questions.length; i++) {
    // Adds the question followed by the answer to the query
    query += questions[i].question + ". " + questions[i].chosenAnswer + ".\n";
  }
  query +=
    "In Spanish, provide valid JSON output for the student's career path and include an overview, recommended job, job description, salary with low, median, and high, education required, how this job relates to the quiz, other jobs in the field, and related aspects of the job.";
  return await sendChatQuery(query, key);
}

export async function sendDetailedSpanishQuizQuery(
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
    "In Spanish, Provide valid JSON output for the student's career path and include an overview, recommended job, job description, salary with low, median, and high, education required, how this job relates to the quiz, other jobs in the field, and related aspects of the job.";
  return await sendChatQuery(query, key);
}
