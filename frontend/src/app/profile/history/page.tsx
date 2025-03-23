"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { ChevronLeft, Pencil, Share2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

type User = {
  avatarUrl: string;
  username: string;
  tier: string;
  runningPoint: number;
  subscribed: boolean;
  clan: { name: string };
};

type BattleStat = {
  pace: string;
  distance: string;
  elevation: string;
  createdAt: string;
  opponentAvatarUrl: string;
  isWinner: boolean;
};

type ProfileStats = {
  totalDistance: string;
  averagePace: string;
  averageElevation: string;
  highestRank: string;
  totalBattle: number;
  winRate: string;
};

type ProfileData = {
  user: User;
  latestBattle: BattleStat | null;
  history: BattleStat[];
  stats: ProfileStats;
};

// Dummy data fetcher
const fetchProfileData = async (): Promise<ProfileData> => {
  // Simulate DB calls
  return {
    user: {
      avatarUrl: "/vercel.svg",
      username: "Bagas Noor",
      tier: "Gold",
      runningPoint: 1201,
      subscribed: false,
      clan: { name: "KOICA" },
    },
    latestBattle: {
      pace: "7:10 /km",
      distance: "10.91 km",
      elevation: "150 m",
      createdAt: "23 March 2025",
      opponentAvatarUrl: "/next.svg",
      isWinner: true,
    },
    history: [
      {
        pace: "8:23/km",
        distance: "7.49 km",
        elevation: "150 m",
        createdAt: "19 November 2025",
        opponentAvatarUrl: "/next.svg",
        isWinner: true,
      },
      {
        pace: "8:23/km",
        distance: "7.49 km",
        elevation: "150 m",
        createdAt: "12 November 2025",
        opponentAvatarUrl: "/next.svg",
        isWinner: true,
      },
      {
        pace: "8:23/km",
        distance: "7.49 km",
        elevation: "150 m",
        createdAt: "1 November 2025",
        opponentAvatarUrl: "/next.svg",
        isWinner: false,
      },
    ],
    stats: {
      totalDistance: "65 km",
      averagePace: "7:12 /km",
      averageElevation: "200 m",
      highestRank: "Gold III",
      totalBattle: 20,
      winRate: "47.2%",
    },
  };
};

const page = () => {
  const [data, setData] = useState<ProfileData | null>(null);
  const router = useRouter();
  useEffect(() => {
    const load = async () => {
      const result = await fetchProfileData();
      setData(result);
    };
    load();
  }, []);

  if (!data) return <p>Loading...</p>;
  return (
    <div className="py-3">
      <div className="flex items-center">
        <Link href="/profile">
          <Button className="bg-transparent h-[50px] w-[50px] mr-3">
            <ChevronLeft style={{ width: "40px", height: "40px" }} />
          </Button>
        </Link>
        <h1 className="text-white font-bold text-[40px]">History</h1>
      </div>
      <div className="p-4">
        <div className="bg-transparent border-2 border-[#858874] rounded-4xl overflow-hidden relative my-2">
          <div className="flex flex-col justify-end ">
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center text-[11px] text-white font-light">
              19 November 2025
            </div>

            <div className="h-[191px] w-full  ">
              <div className="w-full h-fit p-4 flex justify-evenly items-center">
                <Avatar className="flex-none h-[80px] w-[80px] bg-purple-400 rounded-full ">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                  <AvatarFallback className="flex h-full justify-center items-center font-semibold text-white text-3xl">
                    CN
                  </AvatarFallback>
                </Avatar>
                <span className="text-4xl font-extrabold text-white">VS</span>
                <Avatar className="flex-none h-[80px] w-[80px] bg-purple-400 rounded-full ">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                  <AvatarFallback className="flex h-full justify-center items-center font-semibold text-white text-3xl">
                    CN
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute flex flex-col justify-start top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 text-center">
                <br></br>
                <div className="flex justify-center">
                  <span className="text-[11px] p-0 m-0 text-white font-bold">
                    Pace
                  </span>
                  <Image
                    src="/pace.svg"
                    alt="Pace"
                    width={19}
                    height={19}
                    className="ml-1 text-white"
                  />
                </div>
                <span className="text-[11px] p-0 m-0 text-white font-light">
                  7:10 /km
                </span>
                <div className="flex justify-center">
                  <span className="text-[11px] p-0 m-0 text-white font-bold">
                    Elevation
                  </span>
                  <Image
                    src="/trailing.svg"
                    alt="Elevation"
                    width={19}
                    height={19}
                    className="ml-1 text-white"
                  />
                </div>
                <span className="text-[11px] p-0 m-0 text-white font-light">
                  150 m
                </span>
                <div className="flex justify-center">
                  <span className="text-[11px] p-0 m-0 text-white font-bold">
                    Distance
                  </span>
                  <Image
                    src="/endurance.svg"
                    alt="Distance"
                    width={19}
                    height={19}
                    className="ml-1 text-white"
                  />
                </div>
                <span className="text-[11px] p-0 m-0 text-white font-light">
                  10.91 km
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-transparent border-2 border-[#858874] rounded-4xl overflow-hidden relative my-2">
          <div className="flex flex-col justify-end ">
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center text-[11px] text-white font-light">
              19 November 2025
            </div>

            <div className="h-[191px] w-full  ">
              <div className="w-full h-fit p-4 flex justify-evenly items-center">
                <Avatar className="flex-none h-[80px] w-[80px] bg-purple-400 rounded-full ">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                  <AvatarFallback className="flex h-full justify-center items-center font-semibold text-white text-3xl">
                    CN
                  </AvatarFallback>
                </Avatar>
                <span className="text-4xl font-extrabold text-white">VS</span>
                <Avatar className="flex-none h-[80px] w-[80px] bg-purple-400 rounded-full ">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                  <AvatarFallback className="flex h-full justify-center items-center font-semibold text-white text-3xl">
                    CN
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute flex flex-col justify-start top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 text-center">
                <br></br>
                <div className="flex justify-center">
                  <span className="text-[11px] p-0 m-0 text-white font-bold">
                    Pace
                  </span>
                  <Image
                    src="/pace.svg"
                    alt="Pace"
                    width={19}
                    height={19}
                    className="ml-1 text-white"
                  />
                </div>
                <span className="text-[11px] p-0 m-0 text-white font-light">
                  7:10 /km
                </span>
                <div className="flex justify-center">
                  <span className="text-[11px] p-0 m-0 text-white font-bold">
                    Elevation
                  </span>
                  <Image
                    src="/trailing.svg"
                    alt="Elevation"
                    width={19}
                    height={19}
                    className="ml-1 text-white"
                  />
                </div>
                <span className="text-[11px] p-0 m-0 text-white font-light">
                  150 m
                </span>
                <div className="flex justify-center">
                  <span className="text-[11px] p-0 m-0 text-white font-bold">
                    Distance
                  </span>
                  <Image
                    src="/endurance.svg"
                    alt="Distance"
                    width={19}
                    height={19}
                    className="ml-1 text-white"
                  />
                </div>
                <span className="text-[11px] p-0 m-0 text-white font-light">
                  10.91 km
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-transparent border-2 border-[#858874] rounded-4xl overflow-hidden relative my-2">
          <div className="flex flex-col justify-end ">
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center text-[11px] text-white font-light">
              19 November 2025
            </div>

            <div className="h-[191px] w-full  ">
              <div className="w-full h-fit p-4 flex justify-evenly items-center">
                <Avatar className="flex-none h-[80px] w-[80px] bg-purple-400 rounded-full ">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                  <AvatarFallback className="flex h-full justify-center items-center font-semibold text-white text-3xl">
                    CN
                  </AvatarFallback>
                </Avatar>
                <span className="text-4xl font-extrabold text-white">VS</span>
                <Avatar className="flex-none h-[80px] w-[80px] bg-purple-400 rounded-full ">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                  <AvatarFallback className="flex h-full justify-center items-center font-semibold text-white text-3xl">
                    CN
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute flex flex-col justify-start top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 text-center">
                <br></br>
                <div className="flex justify-center">
                  <span className="text-[11px] p-0 m-0 text-white font-bold">
                    Pace
                  </span>
                  <Image
                    src="/pace.svg"
                    alt="Pace"
                    width={19}
                    height={19}
                    className="ml-1 text-white"
                  />
                </div>
                <span className="text-[11px] p-0 m-0 text-white font-light">
                  7:10 /km
                </span>
                <div className="flex justify-center">
                  <span className="text-[11px] p-0 m-0 text-white font-bold">
                    Elevation
                  </span>
                  <Image
                    src="/trailing.svg"
                    alt="Elevation"
                    width={19}
                    height={19}
                    className="ml-1 text-white"
                  />
                </div>
                <span className="text-[11px] p-0 m-0 text-white font-light">
                  150 m
                </span>
                <div className="flex justify-center">
                  <span className="text-[11px] p-0 m-0 text-white font-bold">
                    Distance
                  </span>
                  <Image
                    src="/endurance.svg"
                    alt="Distance"
                    width={19}
                    height={19}
                    className="ml-1 text-white"
                  />
                </div>
                <span className="text-[11px] p-0 m-0 text-white font-light">
                  10.91 km
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
