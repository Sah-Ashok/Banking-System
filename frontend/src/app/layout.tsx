import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banking System",
  description: "Banking System built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-950 text-white min-h-screen`}>
        <Navbar />
        <main className="container mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}