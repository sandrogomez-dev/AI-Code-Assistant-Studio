import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import NotificationToast from "@/components/Notifications/NotificationToast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono'
});

export const metadata: Metadata = {
  title: "AI Code Assistant Studio",
  description: "An AI-powered code generation and analysis platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <NotificationToast />
      </body>
    </html>
  );
}