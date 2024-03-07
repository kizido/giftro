import type { Metadata } from "next";
import {  Montserrat, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/lib/components/Navbar";

const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Gift App",
  description: "The future of gift-giving",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
