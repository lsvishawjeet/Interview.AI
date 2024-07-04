import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IntervueAI",
  description: "Welcome to IntervueAI, the ultimate AI-powered platform designed to help you excel in your job interviews. Whether you are a recent graduate, a seasoned professional, or someone looking to pivot careers, our intelligent system is tailored to meet your unique needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className}`}>
          {children}
          <Toaster />
          <Analytics/>
          {/* <div className="fixed bottom-0 right-0 p-1"><span>Link</span></div> */}
        </body>
      </AuthProvider>
    </html>
  );
}
