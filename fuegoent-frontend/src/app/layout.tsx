import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FUEGO ENTERTAINMENT",
  description: "21+ Weekly Events in Sacramento — Archive Fridays, Traviesa Saturdays, Deseo Sundays",
  openGraph: {
    title: "FUEGO ENTERTAINMENT",
    description: "21+ Weekly Events in Sacramento",
    siteName: "FUEGO ENTERTAINMENT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
