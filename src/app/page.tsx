import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/options";
import receivingGift from "@/images/guy_receiving_gift_blue.png";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!!session) {
    redirect("/dashboard");
  }
  return (
    <main className="">
      <div className="w-full flex justify-center">
        <div className="max-w-6xl flex-col md:flex-row flex items-center justify-center px-16 py-8">
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col justify-center items-start gap-4 max-w-xl">
              <h1 className="text-4xl md:text-6xl font-semibold">
                Make Every Gift the Perfect Gift
              </h1>
              <h2 className="text-md md:text-xl">
                Easily share your wishes and discover theirs – no more guessing.
              </h2>
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
    </main>

    /* <h1 className="text-6xl">Hello, welcome to Gift App</h1>
        <h1 className="text-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          interdum velit non condimentum sollicitudin. Morbi id ante ipsum.
          Fusce in iaculis justo, sit amet aliquet lorem. Donec at pretium
          dolor. Sed convallis, arcu vitae eleifend tristique, ex purus gravida
          augue, at varius erat augue et est. Aliquam pretium neque mi,
          malesuada pulvinar tellus elementum eu. Duis fringilla laoreet odio
          lobortis aliquam. Suspendisse in diam felis. Nunc porta vestibulum
          faucibus. Mauris ut lorem vitae quam lobortis pretium et id ante. In
          ipsum nulla, pellentesque lobortis ipsum sed, porttitor sagittis nunc.
          Donec et felis eget nulla imperdiet aliquam sed id ligula. Donec vitae
          leo ut eros convallis dictum eget ut mauris. Suspendisse ex neque,
          suscipit quis lacus faucibus, volutpat convallis ante. Nulla ex
          tellus, hendrerit at ligula eget, faucibus vulputate risus. Fusce
          semper molestie sem ut venenatis.
        </h1> */
    /* <div className="w-full px-16 py-16 flex items-center justify-center bg-primary gap-12">
        <h1 className="w-1/3 text-8xl text-primary-foreground">
          Duis fringilla laoreet odio lobortis aliquam
        </h1>
        <h1 className="w-2/3 text-4xl text-primary-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          interdum velit non condimentum sollicitudin. Morbi id ante ipsum.
          Fusce in iaculis justo, sit amet aliquet lorem. Donec at pretium
          dolor. Sed convallis, arcu vitae eleifend tristique, ex purus gravida
          augue, at varius erat augue et est. Aliquam pretium neque mi,
          malesuada pulvinar tellus elementum eu. Duis fringilla laoreet odio
          lobortis aliquam. Suspendisse in diam felis. Nunc porta vestibulum
          faucibus. Mauris ut lorem vitae quam lobortis pretium et id ante. In
          ipsum nulla, pellentesque lobortis ipsum sed, porttitor sagittis nunc.
          Donec et felis eget nulla imperdiet aliquam sed id ligula. Donec vitae
          leo ut eros convallis dictum eget ut mauris. Suspendisse ex neque,
          suscipit quis lacus faucibus, volutpat convallis ante. Nulla ex
          tellus, hendrerit at ligula eget, faucibus vulputate risus. Fusce
          semper molestie sem ut venenatis.
        </h1>
      </div> */
  );
}
