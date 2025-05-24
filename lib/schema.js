import { z } from "zod";
export const onboardingSchema=z.object({
    industry:z.string({
        required_error:"Please select an Industry",
    }),
    subIndustry:z.string({
        required_error:"Please select a specialization",
    }),
    bio:z.string().max(600).optional(),
    experiece:z.string().transform((val)=>parseInt(val,10)).pipe(
        z.number().min(0,"Minimum experience should be 0 years").max(50,"Maximum experience should be 50 years"),
    ),
    skills:z.string().transform((val)=>
    val?val.split(',').map((skill)=>skill.trim()).filter(Boolean)
    :undefined
    ),
})
export const contactSchema=z.object({
    email:z.string().email("Invalid email address"),
    mobile:z.string().optional(),
    linkedin:z.string().optional(),
    twitter:z.string().optional(),
})
export const entrySchema=z.object({
    title:z.string().min(1,"Title is required"),
    organisation:z.string().min(1,"Organisation is required"),
    startDate:z.string().min(1,"Start Date is required"),
    endDate:z.string().optional(),
    description:z.string().min(1,"description is required"),
    current:z.boolean().default(false)
}).refine((data)=>{
if(!data.current && !data.endDate)return false
else return true
},{
   message:"End date is required unless this is your current position",
   path:["endDate"] 
})
export const resumeSchema=z.object({
    contactInfo:contactSchema,
    summary:z.string().min(1,"Summary is required"),
    skills:z.string().min(1,"Skills are required"),
    experiece:z.array(entrySchema),
    education:z.array(entrySchema),
    projects:z.array(entrySchema)
})