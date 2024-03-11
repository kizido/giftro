import type { Metadata } from "next";
import { Montserrat, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/lib/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SideNavbar from "@/lib/components/SideNavbar";

const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Gift App",
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
        <div className="flex pt-20">
          {!!session && <SideNavbar />}
          <div className={`w-full ${!!session ? 'ml-64' : ''}`}>{children}</div>
        </div>
      </body>
    </html>
  );
}
