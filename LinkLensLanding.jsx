'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function LinkLensLanding() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
      if (!scriptURL) {
        setStatus('Form not configured yet. Add NEXT_PUBLIC_GOOGLE_SCRIPT_URL in Vercel settings.')
        return
      }
      const res = await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      if (res.ok) {
        setStatus('You are on the waitlist! 🎉')
        setName('')
        setEmail('')
      } else {
        const text = await res.text()
        setStatus('Error: ' + res.status + ' ' + text)
      }
    } catch (err) {
      setStatus('Network error: ' + err.message)
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className="w-full border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src="/logo-linklens.png"
              alt="LinkLens logo"
              fill
              sizes="40px"
              className="rounded-xl object-contain"
            />
          </div>
          <div>
            <div className="font-semibold text-lg">LinkLens</div>
            <div className="text-xs text-black/60">Where creators and collaborators connect</div>
          </div>
        </div>
      </header>

      <section className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Join the LinkLens waitlist
          </h1>
          <p className="mt-3 text-black/70 max-w-xl">
            Be the first to know when we launch. Drop your name and email and we&apos;ll keep you in the loop.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              className="p-3 rounded-md border text-sm"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="p-3 rounded-md border text-sm"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="p-3 rounded-md bg-black text-white text-sm font-medium hover:bg-black/90 transition"
            >
              Join waitlist
            </button>
          </form>

          <div className="mt-3 text-sm text-black/70 min-h-[1.5rem]">
            {status}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-xl border p-4">
              <div className="font-medium">Built for creatives</div>
              <p className="mt-1 text-black/70">
                Photographers, videographers, models and brands all in one place.
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <div className="font-medium">Location-based discovery</div>
              <p className="mt-1 text-black/70">
                Find collaborators where you live—or where you&apos;re traveling next.
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <div className="font-medium">Direct bookings</div>
              <p className="mt-1 text-black/70">
                Streamlined messaging and booking instead of chaotic DMs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="max-w-4xl mx-auto px-4 py-4 text-xs text-black/60 flex items-center justify-between gap-3 flex-wrap">
          <span>© {new Date().getFullYear()} LinkLens</span>
          <span>Pre-launch concept page</span>
        </div>
      </footer>
    </main>
  )
}
