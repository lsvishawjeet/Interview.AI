export const metadata = {
  title: 'IntervueAI',
  description: 'Welcome to IntervueAI, the ultimate AI-powered platform designed to help you excel in your job interviews. Whether you are a recent graduate, a seasoned professional, or someone looking to pivot careers, our intelligent system is tailored to meet your unique needs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
