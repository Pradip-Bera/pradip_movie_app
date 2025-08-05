import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className='text-center bg-black text-gray-300 bg-opacity-50  py-2'>
        <div className='flex items-center justify-center gap-4'>
          <Link to="/" className='no-underline text-neutral-300'>About</Link>
          <Link to="/" className='no-underline text-neutral-300'>Contact</Link>
        </div>
        <p className='text-sm'>Created By Dynamic Coding with Amit</p>
    </footer>
  )
}

export default Footer
