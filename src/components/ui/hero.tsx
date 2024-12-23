"use client"
import React from 'react'
import { Button } from './button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router=useRouter();
    const navigate=(route:string)=>{
        router.push(route)
    }
  return (
    <div className='h-[546px] flex items-center justify-center gap-4 bg-[#1d3742]'>
        <Button className='bg-[#4d9686] text-[#def2e8] hover:bg-[#1d3742] hover:border-2' onClick={()=>navigate("/serverSide")}>
            Server Side Data Fetching
        </Button>
        <Button className='bg-[#4d9686] text-[#def2e8] hover:bg-[#1d3742] hover:border-2' onClick={()=>navigate("/clientSide")}>
        <Link href="/clientSide">Client Side Data Fetching</Link>
        </Button>
    </div>
  )
}

export default Hero