import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jophin Babu | Portfolio",
  description: "Minimalist portfolio of Jophin Babu, Software Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CustomCursor />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
