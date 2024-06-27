import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/myComponents/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IntervueAI",
  description: "Prepare for interviews with AI, prepare for your dream company, package and role free. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="dark:bg-white">
          <Navbar/>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
