'use client'
import React, { useState } from 'react'
import {AnimatePresence, motion} from "motion/react"
function HomeClient({email} : {email:string}) {
  const handleLogin=() => {
    window.location.href="/api/auth/login"
  }
  const firstLetter = email?.[0]?.toUpperCase() || ''

  const [open, setOpen] = useState(false)
  return (
    <div className='min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden'>
        <motion.div 
        initial = {{y:-60}}
        animate = {{y:0}}
        transition={{duration:0.7}}
        className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
            <div className='text-lg font-semibold tracking-tight'>embedly<span className='text-zinc-400'>AI</span></div>
            {email?<div className='relative'>
             <button className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold text-lg hover:scale-105 transition' onClick={() => setOpen(!open)}>{firstLetter}</button>
             <AnimatePresence>
             {open && (
              <motion.div 
              initial={{opacity:0,y:-3}}
              animate={{opacity:1,y:0}}
              exit={{opacity:0,y:-3}}

              className='absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden'>
              <button className='w-full text-left px-4 py-3 text-sm hover:bg-zinc-100'>Dashboard</button>
              <button className='w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-zinc-100'>Logout</button>

             </motion.div>)}
             </AnimatePresence>
              </div>:
            <motion.button className='px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 flex items-baseline-last gap-2' onClick={handleLogin}>Login</motion.button>}
        </div>

        </motion.div>
        
    </div>
  )
}

export default HomeClient