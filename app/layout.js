import './globals.css'

export const metadata = {
  title: 'BattlePlan Dashboard',
  description: 'AI Receptionist Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
