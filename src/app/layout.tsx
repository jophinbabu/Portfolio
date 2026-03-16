import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Jophin Babu | Portfolio",
  description: "Minimalist portfolio of Jophin Babu, Software Developer.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navigation />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
