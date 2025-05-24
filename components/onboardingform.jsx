"use client"
import  { useState } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { onboardingSchema } from '@/lib/schema'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import useFetch from '@/hooks/use-fetch'
import { updateUserdata } from '@/actions/user'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
const Onboardingform = ({industries}) => {
  const [selectedIndustry, setselectedIndustry] = useState(null);
  const router=useRouter()
   const{
    loading:updateLoading,
    fn: updateUserFn,
    data: updateResult,
   }=useFetch(updateUserdata)
  const{register,handleSubmit,setValue,watch,formState:{errors},}= useForm({
    resolver:zodResolver(onboardingSchema),
  })
  const watchIndustry=watch("industry")
  const onsubmit=async(values)=>{
    try {
      const formattedIndustry =`${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g,"-")}`
      await updateUserFn({
        ...values,
        industry:formattedIndustry
      })
    } catch (error) {
      console.log("Onboarding error",error)
    }
  }
  useEffect(() => {
   if(updateResult?.success && !updateLoading){
      toast.success("Profile Completed Successfully!")
      router.push("/dashboard")
      router.refresh()
   }
  }, [updateLoading,updateResult]);
  return (
    <div className='flex items-center justify-center bg-background'>
      <Card className="w-full max-w-lg lg:mt-32 mx-2">
  <CardHeader>
    <CardTitle className="gradient-title text-4xl">Complete Your Profile</CardTitle>
    <CardDescription>Select your industry to get personalized career insights and recommendations</CardDescription>
  </CardHeader>
  <CardContent>
   <form className='space-y-6' onSubmit={handleSubmit(onsubmit)}>
    <div className='space-y-2'>
      <Label htmlFor="industry">Industry</Label>
    <Select
    onValueChange={(value)=>{
      setValue("industry",value)
      setselectedIndustry(
        industries.find((ind)=>ind.id===value)
      )
      setValue("subIndustry","")
    }}
    >
  <SelectTrigger id="industry">
    <SelectValue placeholder="Select an Industry" />
  </SelectTrigger>
  <SelectContent>
    {industries.map((ind)=>{
      return(
        <SelectItem value={ind.id} key={ind.id}>{ind.name}</SelectItem>
      )
    })}
  </SelectContent>
</Select>
{errors.industry &&(
  <p className='text-sm text-red-500'>{errors.industry.message}</p>
)}
    </div>
   { watchIndustry && (<div className='space-y-2'>
      <Label htmlFor="subIndustry">Specialization</Label>
    <Select
    onValueChange={(value)=>{
     setValue("subIndustry",value)  
    }}
    >
  <SelectTrigger id="subIndustry">
    <SelectValue placeholder="Select a SubIndustry" />
  </SelectTrigger>
  <SelectContent>
    {selectedIndustry?.subIndustries.map((ind)=>{
      return(
        <SelectItem value={ind} key={ind}>{ind}</SelectItem>
      )
    })}
  </SelectContent>
</Select>
{errors.subIndustry &&(
  <p className='text-sm text-red-500'>{errors.subIndustry.message}</p>
)}
    </div>)}
    <div className='space-y-2'>
      <Label htmlFor="experience">Years Of Experience</Label>
      <Input
      id="experience"
      type="number"
      min="0"
      max="50"
      placeholder="Enter Years Of Experience"
      {...register("experiece")}
      />
{errors.experiece &&(
  <p className='text-sm text-red-500'>{errors.experiece.message}</p>
)}
    </div>
    <div className='space-y-2'>
      <Label htmlFor="skills">Skills</Label>
      <Input
      id="skills"
      placeholder="e.g Python,Javascript,React.js"
      {...register("skills")}
      />
      <p className='text-muted-foreground text-sm'>Seperate Multiple Skills With Commas</p>
{errors.skills &&(
  <p className='text-sm text-red-500'>{errors.skills.message}</p>
)}
    </div>
    <div className='space-y-2'>
      <Label htmlFor="bio">Professional Bio</Label>
      <Input
      id="bio"
      placeholder="Tell Us About Yourself"
      className="h-32"
      {...register("bio")}
      />
      <p className='text-muted-foreground text-sm'>Seperate Multiple Skills With Commas</p>
{errors.bio &&(
  <p className='text-sm text-red-500'>{errors.bio.message}</p>
)}
    </div>
   <Button className="w-full" type="submit" disabled={updateLoading}>
    {updateLoading?(
      <>
      <Loader2 className='mr-2 w-4 animate-spin'/>
      </>
    ):(
      "Complete Profile"
    )}
   </Button>
   </form>
  </CardContent>
</Card>
    </div>
  )
}

export default Onboardingform