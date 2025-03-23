import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronLeft, Pencil, Share2, Star } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

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

const page = async () => {
  const profileData = await fetchProfileData();
  return (
    <div className="py-3">
      <div className="flex items-center">
        <Link href="/">
          <Button className="bg-transparent h-[50px] w-[50px] mr-3">
            <ChevronLeft style={{ width: "40px", height: "40px" }} />
          </Button>
        </Link>
        <h1 className="text-white font-bold text-[40px]">Profile</h1>
      </div>
      <div className="p-4">
        <Card className="bg-transparent border-2 border-purple-300 rounded-4xl">
          <CardContent className="flex justify-between items-center">
            <Avatar className="flex-none h-[80px] w-[80px] bg-purple-300 rounded-full ">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-full"
              />
              <AvatarFallback className="flex h-full justify-center items-center font-semibold text-white text-3xl">
                CN
              </AvatarFallback>
            </Avatar>
            <div className="px-2 grow text-left">
              <p className="text-white font-bold">Bagas Noor</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-[#fefce8] to-[#facc15] bg-clip-text text-transparent">
                Gold
              </p>
              <div className="flex items-center">
                <Image
                  src="/star.svg"
                  alt="Star"
                  width={19}
                  height={19}
                  className="mr-2"
                />
                <p className="text-white font-bold">1201</p>
              </div>
              <div className="flex items-center">
                <Image
                  src="/security.svg"
                  alt="guard"
                  width={19}
                  height={19}
                  className="mr-2 text-white"
                />
                <p className="text-white font-bold">KOICA</p>
              </div>
            </div>
            <div className="flex-none">
              <Button className="bg-purple-400 mb-3 hover:bg-purple-300">
                Edit <Pencil></Pencil>
              </Button>
              <br />
              <Button
                variant={"ghost"}
                className="w-full text-white border-1 border-purple-300 hover:text-white hover:bg-purple-300"
              >
                <Share2 className=""></Share2>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
