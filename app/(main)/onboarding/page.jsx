import React from 'react'
import OnboardingForm from "@/components/onboardingform";
import { industries } from '@/data/industries';
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
const onboardingpage = async() => {
  const {isOnboarded}=await getUserOnboardingStatus()
  if(isOnboarded){
    redirect("/dashboard")
  }
  return (
<main>
<OnboardingForm industries={industries}/>
</main>
  )
}

export default onboardingpage