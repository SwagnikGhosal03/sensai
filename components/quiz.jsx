"use client"
import { generateQuiz, saveQuizResult } from '@/actions/interview'
import useFetch from '@/hooks/use-fetch'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { BarLoader } from 'react-spinners'
import { toast } from 'sonner'
import QuizResult from './quiz-result'

const Quiz = () => {
    const [CurrentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState([])
    const [showExplanation, setshowExplanation] = useState(false)
    const{
        loading:generatingQuiz,
        fn:generateQuizFn,
        data:quizData,
    }=useFetch(generateQuiz)

    const{
        loading:savingResult,
        fn:saveQuizResultFn,
        data:resultData,
        setData:setResultData,
    }=useFetch(saveQuizResult)
    useEffect(() => {
      if(quizData){
        setAnswers(new Array(quizData.length).fill(null))
      }
    }, [quizData])
    const handleAnswer=(answer)=>{
        const newAnswers=[...answers]
        newAnswers[CurrentQuestion]=answer
        setAnswers(newAnswers)
    }
    const handleNext=()=>{
        if(CurrentQuestion<quizData.length-1){
            setCurrentQuestion(CurrentQuestion+1)
            setshowExplanation(false)
        }
        else finishQuiz()
    }
    const calculateScore=()=>{
      let correct=0;
      answers.forEach((answer,index)=>{
        if(answer===quizData[index].correctAnswer){
         correct++
        }
      })
      return (correct/quizData.length)*100
    }
    const finishQuiz=async()=>{
      const score=calculateScore()
      try {
        await saveQuizResultFn(quizData,answers,score)
        toast.success("Quiz Completed")
      } catch (error) {
        toast.error(error)
      }
    }
    const startNewQuiz=()=>{
      setCurrentQuestion(0)
      setAnswers([])
      setshowExplanation(false)
      generateQuizFn()
      setResultData(null)
    }
    if(generatingQuiz){
      return <BarLoader className='mt-4' width={"100%"} color='gray' />
    }
    if(resultData){
      return(
      <div>
        <QuizResult result={resultData} onStartNew={startNewQuiz}/>
      </div>
      )
    }
    if(!quizData){
        return (
        <Card className="mx-2">
  <CardHeader>
    <CardTitle>Ready to test your knowledge</CardTitle>
  </CardHeader>
  <CardContent>
<p className='text-muted-foreground'>This quiz contains 10 questions specific to your industry and
skills. Take your time and choose the best answer for each question.</p>
  </CardContent>
  <CardFooter>
   <Button onClick={generateQuizFn} className="w-full">Start Quiz</Button>
  </CardFooter>
</Card>
        )
    }
    const question=quizData[CurrentQuestion]
  return (
    <Card className="mx-2">
    <CardHeader>
<CardTitle>Question {CurrentQuestion+1} of {quizData.length}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className='text-lg font-medium'>{question.question}</p>
      <RadioGroup
      onValueChange={handleAnswer}
      value={answers[CurrentQuestion]}
      className="space-y-2"
      >{question.options.map((option,index)=>(
        <div key={index} className='flex items-center space-x-2'>
            <RadioGroupItem value={option} id={`option-${index}`}/>
            <Label htmlFor={`option-${index}`}>{option}</Label>
        </div>
      ))}</RadioGroup>
      {showExplanation &&(
        <div className='mt-4 p-4 bg-muted rounded-lg'>
        <p className='font-medium'>Explanation:</p>
        <p className='text-muted-foreground'>{question.explanation}</p>
        </div>
      )}
    </CardContent>
    <CardFooter className="flex justify-between">
      <div className='space-x-4'>
       <Button
    onClick={() => {
      if (CurrentQuestion > 0) {
        setCurrentQuestion(CurrentQuestion - 1)
        setshowExplanation(false)
      }
    }}
    disabled={CurrentQuestion === 0}
    variant="outline"
  >
    Previous
  </Button>
     {!showExplanation &&(
      <Button onClick={()=>setshowExplanation(true)}
      variant="outline"
      disabled={!answers[CurrentQuestion]}
      >Show Explanation</Button>
     )}
     </div>
     <Button onClick={handleNext}
     disabled={!answers[CurrentQuestion] || savingResult}
     className="ml-auto"
     >
      {savingResult &&(
        <BarLoader className='mt-4' width={"100%"} color='gray'/>
      )}
      {CurrentQuestion<quizData.length-1?"Next Question":"Finish Quiz"}
     </Button>
    </CardFooter>
  </Card>
  )
}

export default Quiz
