import { getResume } from '@/actions/resume'
import ResumeBuilder from '@/components/resumebuilder'
import React from 'react'

const ResumePage = async() => {
  const resume=await getResume()
  return (
    <div className='contsiner mx-auto py-6'>
      <ResumeBuilder initialContent={resume?.content}/>
    </div>
  )
}

export default ResumePage
