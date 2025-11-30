'use client'
import { useState } from 'react'

export default function LinkLensLanding() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [status,setStatus]=useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
      if (!scriptURL) {
        setStatus('Form not configured. Add Google Script URL to .env.local')
        return
      }
      const res = await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      })
      if (res.ok) {
        setStatus('Thanks — you are on the waitlist!')
        setName(''); setEmail('')
      } else {
        const text = await res.text()
        setStatus('Error: ' + res.status + ' ' + text)
      }
    } catch (err) {
      setStatus('Network error: ' + err.message)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full rounded-2xl border p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">LinkLens — Join the waitlist</h1>
        <p className="mt-2 text-black/70">Enter your name and email to get early access.</p>
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input className="md:col-span-1 p-3 rounded-md border" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} required />
          <input className="md:col-span-1 p-3 rounded-md border" placeholder="you@example.com" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <div className="md:col-span-1">
            <button className="w-full p-3 bg-black text-white rounded-md">Join Waitlist</button>
          </div>
        </form>
        <div className="mt-4 text-sm text-black/70">{status}</div>

        <hr className="my-6" />
        <div>
          <h2 className="font-semibold">Preview & info</h2>
          <p className="text-sm text-black/70 mt-2">This site is configured to POST JSON to a Google Apps Script Web App. See <code>.env.local</code> to set <code>NEXT_PUBLIC_GOOGLE_SCRIPT_URL</code>.</p>
        </div>
      </div>
    </main>
  )
}
