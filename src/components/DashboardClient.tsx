'use client'
import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { useRouter } from 'next/navigation'
import axios from 'axios'

function DashboardClient({ ownerId }: { ownerId: string }) {

  const router = useRouter()

  const [businessName, setBusinessName] = useState("")
  const [supportEmail, setSupportEmail] = useState("")
  const [knowledge, setKnowledge] = useState("")
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSettings = async () => {
    try {
      setLoading(true)

      const result = await axios.post("/api/userStorage", {
        ownerId,
        businessName,
        supportEmail,
        knowledge
      })

      console.log(result.data)

    } catch (error) {
      console.log("Save error:", error)
    } finally {
      setLoading(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  useEffect(() => {

    if (!ownerId) return

    const handleGetDetails = async () => {
      try {

        const result = await axios.get(`/api/userStorage/get?ownerId=${ownerId}`)

        const data = result.data

        if (data) {
          setBusinessName(data.businessName || "")
          setSupportEmail(data.supportEmail || "")
          setKnowledge(data.knowledge || "")
        }

      } catch (error) {
        console.log("Fetch error:", error)
      }
    }

    handleGetDetails()

  }, [ownerId])


  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900'>

      <motion.div
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
      >
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>

          <div
            className='text-lg font-semibold tracking-tight cursor-pointer'
            onClick={() => router.push("/")}
          >
            embedly<span className='text-zinc-400'>AI</span>
          </div>

          <button
            onClick={() => router.push("/embed")}
            className='px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition'
          >
            Embed Your Chatbot
          </button>

        </div>
      </motion.div>


      <div className='flex justify-center px-4 pt-32 pb-20'>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10'
        >

          <div className='mb-10'>
            <h1 className='text-2xl font-semibold'>AI Chatbot Configuration</h1>
            <p className='text-zinc-500 mt-2'>
              Configure your chatbot’s knowledge base and business information to deliver accurate responses to your users.
            </p>
          </div>


          <div className='mb-10'>
            <h1 className='text-lg font-medium mb-4'>Business Information</h1>

            <div className='space-y-4'>

              <input
                type="text"
                placeholder='Enter your business name'
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80'
              />

              <input
                type="email"
                placeholder='Customer support email address'
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80'
              />

            </div>
          </div>


          <div className='mb-10'>
            <h1 className='text-lg font-medium mb-4'>Knowledge Base</h1>

            <textarea
              rows={6}
              placeholder='Provide information about your business, services, policies, or FAQs that your chatbot should use to assist customers.'
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
              className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80'
            />

          </div>


          <div className='flex items-center gap-5'>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              onClick={handleSettings}
              className='px-7 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60'
            >
              {loading ? "Saving..." : "Save Configuration"}
            </motion.button>

            {saved && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-sm font-medium text-emerald-600'
              >
                Your chatbot configuration has been successfully saved.
              </motion.span>
            )}

          </div>

        </motion.div>

      </div>
    </div>
  )
}

export default DashboardClient