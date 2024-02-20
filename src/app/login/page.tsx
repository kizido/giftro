import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="w-full pt-24 flex justify-center gap-8">
      <div className="w-96 p-2 flex flex-col gap-2">
        <h1 className="mb-4 text-3xl font-semibold">Log in</h1>
        <hr className="border border-slate-300"></hr>
        <h3 className="text-lg">Username</h3>
        <input type="text" className="p-4 h-10 rounded"></input>

        <div className="flex justify-between">
          <h3 className="text-lg">Password</h3>
          <Link href="/forgotpassword" className="text-blue-700 underline">
            Forgot password?
          </Link>
        </div>
        <input type="text" className="p-4 mb-4 h-10 rounded"></input>

        <div className="flex items-center">
          <input type="checkbox" className="mr-2 h-6 w-6 rounded-lg" />
          <h4 className="inline">Remember my login</h4>
        </div>

        <div className="flex justify-end">
          <button className="w-28 h-12 bg-blue-400 font-bold">Log In</button>
        </div>
      </div>
      <div className="w-96 p-2 flex flex-col   gap-2">
        <h1 className="mb-4 text-3xl font-semibold">Sign Up</h1>

        <hr className="border border-slate-300"></hr>

        <h3 className="font-semibold">
          New to Gift App? Sign up now to start finding perfect gifts for your
          loved ones!
        </h3>

        <div className="flex justify-end">
          <Link href="/signup" className="w-28 h-12 bg-blue-400 font-bold flex items-center justify-center">Join Now
          </Link>
        </div>
      </div>
    </div>
  );
}
