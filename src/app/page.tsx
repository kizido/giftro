import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/options";
import receivingGift from "@/images/guy_receiving_gift_blue.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  IconListDetails,
  IconGift,
  IconShoppingCart,
} from "@tabler/icons-react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!!session) {
    redirect("/dashboard");
  }
  return (
    <main className="">
      <div className="w-full flex justify-center mb-8">
        <div className="max-w-6xl flex-col md:flex-row flex items-center justify-center px-8 md:px-16 py-8">
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col justify-center items-start gap-4 max-w-xl">
              <h1 className="text-4xl md:text-6xl font-semibold">
                Make Every Gift the Perfect Gift
              </h1>
              <h2 className="text-base md:text-xl">
                Easily share your wishes and discover theirs – no more guessing.
              </h2>
              <Link href="/signup" className="self-center">
                <button className="font-semibold text-base md:text-lg text-secondary-foregrund border border-secondary-foregrund px-6 py-3 rounded-full bg-secondary">
                  Get me shopping!
                </button>
              </Link>
              {/* <button className="font-semibold text-base md:text-lg text-secondary-foregrund self-center border border-secondary-foregrund px-4 py-2 rounded-full bg-secondary">
                <Link href="/signup">Get me shopping!</Link>
              </button> */}
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <Image
              src={receivingGift}
              className="w-64 md:w-[32rem]"
              alt="Picture of guy receiving gift"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="max-w-6xl flex justify-evenly px-8 md:px-16 gap-4 md:gap-8">
          <div className="flex flex-col gap-2 md:gap-4 flex-1">
            <div className="flex items-center gap-2">
              <IconListDetails className="hidden md:block" />
              <h3 className="text-base md:text-xl font-semibold">
                Wish Lists, Reinvented
              </h3>
            </div>
            <p className="text-sm md:text-base">
              Build and share lists that turn thoughtful gifting into an art
              form.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4 flex-1">
            <div className="flex items-center gap-2">
              <IconGift className="hidden md:block" />
              <h3 className="text-base md:text-xl font-semibold">
                Effortless Gifting
              </h3>
            </div>
            <p className="text-sm md:text-base">
              Say goodbye to awkward guesswork—find exactly what your friends
              want, every time.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4 flex-1">
            <div className="flex items-center gap-2">
              <IconShoppingCart className="hidden md:block" />
              <h3 className="text-base md:text-xl font-semibold">
                Shop Together
              </h3>
            </div>
            <p className="text-sm md:text-base">
              Discover, share, and shop gifts seamlessly in one connected
              platform.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
