import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
  
  // return (
  //   <div className="flex justify-center items-center w-full h-full">
  //     <div className="bg-white p-5">Test</div>
  //   </div>
  // );
}
