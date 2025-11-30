import './globals.css'

export const metadata = {
  title: 'LinkLens',
  description: 'Where creators and collaborators connect.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
