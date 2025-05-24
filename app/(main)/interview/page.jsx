import React from 'react'
import { getAssesments } from '@/actions/interview'
import StatsCards from '@/components/stats-chat'
import PerformanceChat from '@/components/performance-chart'
import QuizList from '@/components/quiz-list'
const InterviewPage = async() => {
  const assesments=await getAssesments()
  return (
    <div>
<div className='flex items-center justify-between mb-5'>
       <h1 className='text-6xl font-bold gradient-title'>
        Interview Preparation
       </h1>
      </div>
      <div className='space-y-6'>
        <StatsCards assesments={assesments}/>
        <PerformanceChat assesments={assesments}/>
        <QuizList assesments={assesments}/>
      </div>
    </div>
  )
}

export default InterviewPage
