import type { Metadata } from "next";
import { Montserrat, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/lib/components/Navbar";
import { getServerSession } from "next-auth";
import SideNavbar from "@/lib/components/SideNavbar";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Giftro",
  description: "The future of gift-giving",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Navbar />
        <div className='pt-20 w-full h-screen box-border'>{children}</div>
      </body>
    </html>
  );
}
