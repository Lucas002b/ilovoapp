import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NextAuth.js Example",
  description:
    "This is an example site to demonstrate how to use NextAuth.js for authentication",
}

export default function RootLayout({ children, session }: React.PropsWithChildren<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-col justify-between w-full h-full min-h-screen">
            <Header />
            <main className="flex-auto w-full max-w-3xl px-4 py-4 mx-auto sm:px-6 md:py-6">
              {children}
            </main>
          </div>
        </body>
      </html>
    </SessionProvider>
  )
}
