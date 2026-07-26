import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AHMED CH - Portfolio",
  description: "AI Automation & n8n Specialist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black`}>
        
        {/* NAVBAR - Yahan z-50 add kiya hai */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur px-8 py-4">
          <div className="flex justify-end gap-8 text-white font-semibold">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <Link href="/projects" className="hover:text-cyan-400">Projects</Link>
            <Link href="/contact" className="hover:text-cyan-400">Contact</Link>
          </div>
        </nav>

        {children}
        
      </body>
    </html>
  );
}