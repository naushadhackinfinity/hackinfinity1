import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatbotButton } from "@/components/chatbot/ChatbotButton";

// Use Inter font from Google Fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CareerPathFinder - Discover Your Ideal Career Path",
  description: "Personalized career guidance platform to help you find your ideal career path based on your skills, interests, and goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ChatbotButton />
        </AuthProvider>
      </body>
    </html>
  );
}
