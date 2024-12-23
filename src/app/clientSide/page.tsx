"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface product {
    id:number
    title:string
    price:number
    description:string
    category:string
    image:string
}

const ClientSide = () => {

    const [products,setProducts]=useState<product[]>([])
    const [loading,setLoading]=useState<boolean>(true)
    const [error,setError]=useState<string | null>(null)

    useEffect(()=>{
        const fetchProducts=async()=>{
            try{
                const response=await fetch("https://fakestoreapi.com/products")
                if (!response.ok){
                    throw new Error('failed to fetch products')
                }
                const data = await response.json()
                setProducts(data)
            } catch (err){
                setError("An error occured while fetching data products")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    },[])

    if (loading){
        return <div className='h-[549px] flex items-center justify-center'>
            <span className="loading loading-dots loading-lg text-[#087679]"></span>
        </div>
    }

    if (error){
        return <div className='flex justify-center items-center h-screen text-red-500'>{error}</div>
    }

  return (
    <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6 text-center text-[#087679]'>Fake Store Products</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {products.map((product)=>(
                <div key={product.id} className='bg-[#087679] rounded-lg shadow-md overflow-hidden relative'>
                     <div className="relative w-full h-48 mb-4 bg-white">
                  <Image 
                    src={product.image} 
                    alt={product.title} 
                    layout="fill" 
                    objectFit="contain"
                  />
                </div>
                   
                    <div className='p-4 text-[#def2e8]'>
                        <h2 className='text-lg font-semibold mb-2 truncate'>{product.title}</h2>
                        <p className=' mb-2 truncate'>{product.category}</p>
                        <p className=' font-bold'>{product.price.toFixed(2)}$</p>
                    </div>
                    <Button className='absolute bottom-2 right-2 bg-[#4d9686] text-[#def2e8] hover:bg-[#1d3742] hover:border-2'>Buy Now</Button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ClientSide