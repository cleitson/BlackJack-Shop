import Link from 'next/link';
import React from 'react'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-6'>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className='text-green-500'>Go back to Home</Link>
    </div>
  )
}

