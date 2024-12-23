import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

interface Book {
  id:number
  name:string
  type:string
  available:boolean
}

async function getBooks(): Promise <Book[]> {
  const res = await fetch("https://simple-books-api.glitch.me/books/")
  if(!res.ok){
    throw new Error("Failed to fetch books")
  }
  return res.json()
}


async function page(){

  const books = await getBooks()

  return (
    <div className='min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-12'>Simple Books Library</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {books.map((book)=>(
            <Card className='flex flex-col' key={book.id}>
              <CardHeader>
                <CardTitle className='line-clamp-1'>{book.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant={book.type === "fiction" ? "default":"secondary"} className='mb-2'>
                  {book.type}
                </Badge>
                <p className='text-muted-foreground'>
                  {book.available?"Available":"Not Available"}
                </p>
              </CardContent>
              <CardFooter className='flex justify-between mt-auto'>
                <span className='text-sm text-muted-foreground'>ID:{book.id}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page