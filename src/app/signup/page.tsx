import { redirect } from "next/navigation";
import Form from "./form";
import { getServerSession } from "next-auth";

export default async function SignUp() {
  const session = await getServerSession();
  if(session) {
    redirect('/dashboard' );
  }
  return (
    <Form />
  );
}
