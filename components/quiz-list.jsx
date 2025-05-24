"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { format } from 'date-fns'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import QuizResult from './quiz-result'
const QuizList = ({assesments}) => {
  const router=useRouter()
  const [selectedquiz, setSelectedquiz] = useState(null)
  return (
    <>
    <Card>
  <CardHeader>
    <div className='flex items-center justify-between'>
       <CardTitle className='gradient-title text-3xl md:text-4xl'>Recent Quizzes</CardTitle>
    <CardDescription>Review your past quiz performance</CardDescription>
    <Button onClick={()=>router.push("/interview/mock")}>
      Start New Quiz
    </Button>
    </div>
  </CardHeader>
  <CardContent>
    <div className='space-y-4'>
      {assesments?.map((assesment,i)=>(
        <Card key={assesment.id}
        className='cursor-pointer hover:bg-muted/50 transition-colors'
        onClick={()=>setSelectedquiz(assesment)}>
          <CardHeader>
            <CardTitle className="gradient-title text-2xl">
              Quiz {i+1}
            </CardTitle>
            <CardDescription>
              <div>Score: {assesment.quizScore.toFixed(1)}% </div>
              <div>
                {format(
                  new Date(assesment.createdAt),
                  "MMMM dd, yyyy HH:mm"
                )}
              </div>
            </CardDescription>
          </CardHeader>
          {assesment.improvementTip &&(
            <CardContent>
              <p className='text-sm text-muted-foreground'>{assesment.improvementTip}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  </CardContent>
</Card>
 <Dialog open={!!selectedquiz} onOpenChange={()=>setSelectedquiz(null)}>
  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle></DialogTitle>
    </DialogHeader>
    <QuizResult
    result={selectedquiz}
    hideStartNew
    onStartNew={()=>router.push("/interview/mock")}
    />
  </DialogContent>
</Dialog>
    </>
  )
}
export default QuizList