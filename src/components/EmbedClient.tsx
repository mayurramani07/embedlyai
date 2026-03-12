'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from "motion/react"

function EmbedClient({ ownerId }: { ownerId: string }) {

  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const embedCode =
`<script src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js"
data-owner-id="${ownerId}">
</script>`

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">

      <div className="sticky top-0 z-40 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          <div
            className="text-lg font-semibold tracking-tight cursor-pointer"
            onClick={() => router.push("/")}>
            embedly<span className="text-zinc-400">AI</span>
          </div>

          <button
            className="px-3 sm:px-4 py-2 rounded-lg border border-zinc-300 text-xs sm:text-sm hover:bg-zinc-100 transition"
            onClick={() => router.push("/dashboard")}>
            Back To Dashboard
          </button>

        </div>
      </div>

      <div className="flex justify-center px-4 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 sm:p-10">

          <h1 className="text-xl sm:text-2xl font-semibold mb-2">Embed Chatbot</h1>

          <p className="text-zinc-600 text-sm sm:text-base mb-6">
            Copy and paste this code before <code>&lt;/body&gt;</code> on your website
          </p>

          <div className="relative bg-zinc-900 text-zinc-100 rounded-xl p-4 sm:p-5 text-xs sm:text-sm font-mono mb-8 overflow-x-auto">
            <pre>{embedCode}</pre>

            <button
              onClick={copyCode}
              className="absolute top-3 right-3 bg-white text-zinc-900 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-zinc-200 transition">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <ol className="space-y-2 sm:space-y-3 text-sm text-zinc-600 list-decimal list-inside mb-10">
            <li>Copy the embed script</li>
            <li>Paste it before the closing body tag</li>
            <li>Reload your website</li>
          </ol>

          <div>

            <h1 className="text-base sm:text-lg font-medium mb-2">Live Preview</h1>

            <p className="text-sm text-zinc-500 mb-6">
              This is how the chatbot will appear on your business website
            </p>

            <div className="relative rounded-xl border border-zinc-300 bg-white shadow-md overflow-hidden">

              <div className="flex items-center gap-2 px-4 h-9 bg-zinc-100 border-b border-zinc-200">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                <span className="ml-4 text-xs text-zinc-500">Your-Website.com</span>
              </div>

              <div className="h-64 sm:h-72 p-6 text-zinc-400 text-sm">
                Your website content goes here
              </div>

              <div className="absolute bottom-4 sm:bottom-6 right-3 sm:right-6 w-[230px] sm:w-72 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden">

                <div className="bg-black text-white text-sm px-4 py-2 flex justify-between items-center">
                  <div className="text-xs tracking-tight">
                    embedly<span className="text-zinc-400">AI</span>
                  </div>
                  <span className="cursor-pointer text-zinc-300 hover:text-white">✕</span>
                </div>

                <div className="p-3 space-y-3 bg-zinc-50 text-xs sm:text-sm">

                  <div className="flex justify-end">
                    <div className="bg-black text-white px-3 py-2 rounded-lg max-w-[85%]">
                      How can I help you?
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-zinc-200 text-zinc-800 px-3 py-2 rounded-lg max-w-[85%]">
                      Hi 👋 I'm your AI assistant. I can help answer questions about your business, services, pricing, or anything visitors need.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}

export default EmbedClient