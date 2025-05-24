"use client"
import Link from 'next/link'
import React, { useRef ,useEffect} from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {
    const imageRef=useRef(null)
    useEffect(() => {
        const imageElement=imageRef.current
        const handleScroll=()=>{
            const scrollPosition=window.scrollY
            const scrollThreshold=200
            if(scrollPosition>scrollThreshold){
                imageElement.classList.add("scrolled")
            }
            else imageElement.classList.remove("scrolled")
        }
        window.addEventListener("scroll",handleScroll)
        return()=>window.removeEventListener("scroll",handleScroll)
    }, []);
  return (
   <section className='w-full pt-36 md:pt-40 pb-10'>
    <div className='space-y-6 text-center'>
        <div className='space-y-6 mx-auto'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold gradient-title animate-gradient'> Your AI Career Coach for <br />
            Professional Success
            </h1>
            <p className='mx-auto max-w-[600px] md:text-xl text-muted-foreground'>
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
            </p>
        </div>
        <div>
            <Link href={'/dashboard'}>
            <Button size="lg" className="px-8 font-bold" >Get Started</Button>
            </Link>
        </div>
        <div className='hero-image-wrapper mt-5 md:mt-0'>
            <div className='hero-image' ref={imageRef}>
                <Image
                src={'/banner3.jpeg'}
                width={1080}
                height={720}
                alt='banner preview'
                className='rounded-lg shadow-2xl border mx-auto'
                priority
                />
            </div>
        </div>
    </div>
   </section>

  )
}

export default HeroSection