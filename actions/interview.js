"use server"
import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model=genAI.getGenerativeModel({model:"gemini-1.5-flash"})
export async function generateQuiz() {
     const{userId}=await auth()
        if(!userId) throw new Error("Unauthorized")
        const user= await db.user.findUnique({
        where:{
            clerkUserId:userId,
        },
        select:{
          industry:true,
          skills:true,
        },
    })
    if(!user) throw new Error("User not found")
    const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;
  try {
    const result= await model.generateContent(prompt)
    const response=result.response
    const text= response.text()
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const quiz= JSON.parse(cleanedText)
    return quiz.questions
  } catch (error) {
    console.error("Error generating quiz",error)
    throw new Error("Failed to genetrate quiz questions")
  }
}
export async function saveQuizResult(questions,answers,score) {
    const {userId}=await auth()
    if(!userId) throw new Error("Unsuthorized")
    const user=await db.user.findUnique({
        where:{clerkUserId:userId},
    })
    if(!user) throw new Error("User not found")
    const questionResults=questions.map((q,index)=>({
    question:q.question,
    answer:q.correctAnswer,
    userAnswer:answers[index],
    isCorrect:q.correctAnswer===answers[index],
    explanation:q.explanation,
}))
const wrongAnswers=questionResults.filter((q)=>!q.isCorrect)
let improvementTip=null
if(wrongAnswers.length>0){
    const wrongQuestionsText=wrongAnswers.map((q)=>
    `Question:"${q.question}"\nCorrect Answer:"${q.answer}\nUser Answer:"${q.userAnswer}"`
    ).join("\n\n")
    const improvementPrompt = `
    The user got the following ${user.industry} technical interview questions wrong:
    ${wrongQuestionsText}
    Based on these mistakes, provide a concise, specific improvement tip.
    Focus on the knowledge gaps revealed by these wrong answers.
    Keep the response under 2 sentences and make it encouraging.
    Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    Also mention a short brief highlighting the strong areas of the student & encourage to carry on the same way as he/she has been doing
  `;
  try {
    const tipResult=await model.generateContent(improvementPrompt)
    improvementTip=tipResult.response.text().trim()
    console.log(improvementTip)
  } catch (error) {
    console.error("Error generating improvement tip",error)
  }
}
try {
    const assesment=await db.assesment.create({
        data:{
            userId:user.id,
            quizScore:score,
            questions:questionResults,
            category:"Technical",
            improvementTip,
        }
    })
    return assesment
} catch (error) {
    console.error("Error saving quiz result",error)
    throw new Error("Failed to save quiz result")
}
}
export async function getAssesments() {
    const {userId}=await auth()
    if(!userId) throw new Error("Unauthorized")
    const user=await db.user.findUnique({
        where:{clerkUserId:userId},
    })
    if(!user) throw new Error("User not found")
    try {
        const assesments=await db.assesment.findMany({
            where:{
                userId:user.id,
            },
            orderBy:{
                createdAt:"asc",
            }
        })
        return assesments
    } catch (error) {
        console.error("Error fetching assesments:",error)
        throw new Error("Failed to fetch assesments")
    }
}
