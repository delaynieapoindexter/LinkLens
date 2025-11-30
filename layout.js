import './globals.css'

export const metadata = {
  title: 'LinkLens',
  description: 'LinkLens - connect creators and collaborators',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
