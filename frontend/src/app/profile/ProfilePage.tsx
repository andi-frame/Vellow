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

const ProfilePage = () => {
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
        <Link href="/">
          <Button className="bg-transparent h-[50px] w-[50px] mr-3">
            <ChevronLeft style={{ width: "40px", height: "40px" }} />
          </Button>
        </Link>
        <h1 className="text-white font-bold text-[40px]">Profile</h1>
      </div>
      <div className="p-4">
        <Card className="bg-transparent border-2 border-purple-400 rounded-4xl mb-3">
          <CardContent className="flex justify-between items-center">
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
              <Button className="bg-purple-500 mb-3 hover:bg-purple-400">
                Edit <Pencil></Pencil>
              </Button>
              <br />
              <Button
                variant={"ghost"}
                className="w-full text-white border-1 border-purple-400 hover:text-white hover:bg-purple-400"
              >
                <Share2 className=""></Share2>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Tabs defaultValue="matches">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="matches"
              className="text-white text-[15px] p-[10px] h-[34px] w-fit rounded-full mr-2 border-1 border-purple-400 data-[state=active]:bg-purple-500"
            >
              Matches
            </TabsTrigger>
            <TabsTrigger
              value="statistics"
              className="text-white text-[15px] p-[10px] h-[34px] w-fit rounded-full border-1 border-purple-400 data-[state=active]:bg-purple-500"
            >
              Statistics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="matches">
            <div className="bg-transparent border-2 border-purple-400 rounded-4xl overflow-hidden relative">
              <div className="flex flex-col justify-end ">
                <div className="h-[191px] w-full bg-gray-500 ">
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
                    <span className="text-4xl font-extrabold text-white">
                      VS
                    </span>
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
                  <div className="absolute flex flex-col justify-start top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
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
                <Button
                  onClick={() => router.push("/profile/history")}
                  className="text-[15px] hover:bg-purple-600 flex-none w-full bg-purple-500 h-[51px] rounded-none border-t-2 border-purple-400"
                >
                  See more
                </Button>
              </div>
            </div>
            <div className="flex p-2 items-center">
              <h2 className="text-[32px] text-white font-bold p-0 m-0">
                Stats
              </h2>
              <Image
                src="/chart.svg"
                alt="Stats"
                width={20}
                height={20}
                className="ml-3 mt-2 text-white"
              />
            </div>
            <Card className="bg-transparent border-2 border-purple-400 rounded-4xl mb-3">
              <CardContent className="flex flex-col justify-evenly text-white">
                <div className="flex justify-between p-2">
                  <div className="flex">
                    <Image
                      src="/endurance.svg"
                      alt="Total Distance"
                      width={19}
                      height={19}
                      className="mr-2 text-white"
                    />{" "}
                    Total Distance
                  </div>
                  <div>data</div>
                </div>
                <div className="flex justify-between p-2">
                  <div className="flex">
                    <Image
                      src="/fast.svg"
                      alt="Average Pace"
                      width={19}
                      height={19}
                      className="mr-2 text-white"
                    />{" "}
                    Average Pace
                  </div>
                  <div>data</div>
                </div>
                <div className="flex justify-between p-2">
                  <div className="flex">
                    <Image
                      src="/trailing.svg"
                      alt="Average Elevation"
                      width={19}
                      height={19}
                      className="mr-2 text-white"
                    />{" "}
                    Average Elevation
                  </div>
                  <div>data</div>
                </div>
                <div className="flex justify-between p-2">
                  <div className="flex">
                    <div className="h-[19px] w-[19px] mr-2 flex items-center justify-center">
                      <Image
                        src="/rank.svg"
                        alt="Highest Rank"
                        width={14}
                        height={14}
                        className=" text-white"
                      />
                    </div>
                    Highest Rank
                  </div>
                  <div>data</div>
                </div>
                <div className="flex justify-between p-2">
                  <div className="flex">
                    <Image
                      src="/flag.svg"
                      alt="Total Battle"
                      width={19}
                      height={19}
                      className="mr-2 text-white"
                    />{" "}
                    Total Battle
                  </div>
                  <div>data</div>
                </div>
                <div className="flex justify-between p-2">
                  <div className="flex">
                    <Image
                      src="/book.svg"
                      alt="Win Rate"
                      width={19}
                      height={19}
                      className="mr-2 text-white"
                    />{" "}
                    Win Rate
                  </div>
                  <div>data</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="statistics">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
