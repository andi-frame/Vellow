"use client";

import { useState } from "react";
import { loginWithProvider, logout, fetchUser } from "@/lib/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import Image from "next/image";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const {
    data: user,
    refetch,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  if (error) {
    console.error("Failed to fetch user:", error);
  }

  if (user) {
    //redirect
  }

  const loginMutation = useMutation({
    mutationFn: async (provider: string) => {
      setLoading(true);
      await loginWithProvider(provider);
      refetch();
      setLoading(false);
    },
  });

  // const logoutMutation = useMutation({
  //   mutationFn: async (provider: string) => {
  //     setLoading(true);
  //     await logout(provider);
  //     refetch();
  //     setLoading(false);
  //   },
  // });

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white gap-12 w-sm">
      <div className="flex flex-col items-center justify-center w-5/6">
        <Image width={150} height={150} src={"/vellow-text.svg"} alt="vellow-text"></Image>
        <Image className="py-3" width={200} height={200} src={"/vellow-logo.svg"} alt="vellow-logo"></Image>
        <p className="text-2xl text-center font-bold">Energize Your Self</p>
        <p className="text-center text-sm font-light">
          Wake up with enthusiasm, power through your day with maximum energy! Let positivity fuel every step, every challenge,
          and every achievement.
        </p>
      </div>

      <div className="w-5/6 bg-[#A467EE] ring-1 ring-[#C69EF6] rounded-3xl flex flex-col justify-center items-center text-center p-5">
        <p className="text-2xl font-bold">Welcome To Vellow</p>
        <p className="text-sm font-light">Get fit together with your friends and family</p>
        <div className="flex flex-col py-5 w-2/3">
          <button
            className="rounded-2xl bg-[#1E1E1E]/20 px-4 py-3"
            onClick={() => loginMutation.mutate("google")}
            disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-xs font-semibold py-1">or</p>
          <button
            className="rounded-2xl bg-[#1E1E1E]/20 px-4 
          py-3"
            onClick={() => loginMutation.mutate("google")}
            disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p className="text-xs font-light pt-1">
            Authenticate with <span className="font-semibold">Google</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
