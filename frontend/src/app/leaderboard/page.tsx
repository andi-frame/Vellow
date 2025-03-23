"use client"

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

type PlayerData = {
  rank: number;
  name: string;
  score: number;
  tier?: string; 
};

const leaderboardData: {
  location: Record<string, PlayerData[]>;
  tier: Record<string, PlayerData[]>;
  clan: Record<string, PlayerData[]>;
} = {
  location: {
    province: [
      { rank: 1, name: "Andi Farhan", score: 3500, tier: "Ruby" },
      { rank: 2, name: "Raihaan", score: 2773, tier: "Diamond" },
    ],
    national: [
      { rank: 1, name: "Andi Farhan", score: 3500, tier: "Ruby" },
      { rank: 2, name: "Nathanael", score: 3328, tier: "Ruby" },
      { rank: 3, name: "Raihaan", score: 2773, tier: "Diamond" },
    ],
    worldwide: [
      { rank: 1, name: "Global Player", score: 5000, tier: "Ruby" },
      { rank: 2, name: "Nathanael", score: 3328, tier: "Ruby" },
    ],
  },
  tier: {
    Ruby: [
      { rank: 1, name: "Rafael", score: 1558, tier: "Ruby" },
      { rank: 2, name: "Nathanael", score: 3328, tier: "Ruby" },
    ],
    Diamond: [
      { rank: 1, name: "Raihaan", score: 2773, tier: "Diamond" },
      { rank: 2, name: "Naufarrel", score: 2555, tier: "Diamond" },
      { rank: 3, name: "A. Syafiq", score: 2029, tier: "Diamond" },
    ],
    Gold: [
      { rank: 1, name: "Rafael", score: 1558, tier: "Gold" },
      { rank: 2, name: "You", score: 1201, tier: "Gold" },
      { rank: 3, name: "Lana G", score: 1112, tier: "Gold" },
      { rank: 4, name: "Dinda", score: 990, tier: "Gold" },
      { rank: 5, name: "Name 5", score: 874, tier: "Gold" },
      { rank: 6, name: "Name 6", score: 865, tier: "Gold" },
      { rank: 7, name: "Name 7", score: 831, tier: "Gold" },
      { rank: 8, name: "Name 8", score: 809, tier: "Gold" },
    ],
    Silver: [
      { rank: 1, name: "Alex", score: 900, tier: "Silver" },
      { rank: 2, name: "Bella", score: 850, tier: "Silver" },
    ],
    Bronze: [
      { rank: 1, name: "Charlie", score: 700, tier: "Bronze" },
      { rank: 2, name: "Diana", score: 650, tier: "Bronze" },
    ],
    Iron: [
      { rank: 1, name: "Evan", score: 500, tier: "Iron" },
      { rank: 2, name: "Fiona", score: 450, tier: "Iron" },
    ],
    Newbie: [
      { rank: 1, name: "Gabriel", score: 200, tier: "Newbie" },
      { rank: 2, name: "Hannah", score: 150, tier: "Newbie" },
    ],
  },
  clan: {
    province: [
      { rank: 1, name: "Clan Name 1", score: 3500 },
      { rank: 2, name: "Clan Name 2", score: 3328 },
      { rank: 3, name: "Clan Name 3", score: 2773 },
      { rank: 4, name: "Clan Name 4", score: 2555 },
      { rank: 5, name: "Clan Name 5", score: 2029 },
      { rank: 6, name: "Clan Name 6", score: 1558 },
      { rank: 7, name: "Your Clan", score: 1201 },
      { rank: 8, name: "Clan Name 8", score: 1112 },
    ],
    national: [
      { rank: 1, name: "Clan X", score: 20000 },
      { rank: 2, name: "Clan Y", score: 18000 },
    ],
    worldwide: [
      { rank: 1, name: "Global Clan", score: 30000 },
      { rank: 2, name: "International Clan", score: 25000 },
    ],
  },
};

export default function Leaderboard() {
  const [selectedCategory, setSelectedCategory] = useState<"location" | "tier" | "clan">("location");
  const [selectedSubCategory, setSelectedSubCategory] = useState<"province" | "national" | "worldwide" | "Ruby" | "Diamond" | "Gold" | "Silver" | "Bronze" | "Iron" | "Newbie">("national");
  const [searchQuery, setSearchQuery] = useState("");
  
  const getData = (): PlayerData[] => {
    if (selectedCategory === "tier") {
      return leaderboardData.tier[selectedSubCategory as keyof typeof leaderboardData.tier] || [];
    } else if (selectedCategory === "location") {
      return leaderboardData.location[selectedSubCategory as keyof typeof leaderboardData.location] || [];
    } else {
      return leaderboardData.clan[selectedSubCategory as keyof typeof leaderboardData.clan] || [];
    }
  };
  
  const filteredData = getData().filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleTierChange = (value: string) => {
    setSelectedSubCategory(value as any);
  };

  // Get tier colors
  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Ruby": return "text-red-400";
      case "Diamond": return "text-blue-300";
      case "Gold": return "text-yellow-300";
      case "Silver": return "text-gray-300";
      case "Bronze": return "text-amber-600";
      case "Iron": return "text-gray-500";
      case "Newbie": return "text-green-400";
      default: return "text-white";
    }
  };

  const getTierIconPath = (tier: string) => {
    switch (tier) {
      case "Ruby": return "/ruby.svg";
      case "Diamond": return "/diamond.svg";
      case "Gold": return "/gold.svg";
      case "Silver": return "/silver.svg";
      case "Bronze": return "/bronze.svg";
      case "Iron": return "/iron.svg";
      case "Newbie": return "/newbie.svg";
      default: return "";
    }
  };

  return (
    <div className="p-4 bg-black min-h-screen text-white w-full max-w-[375px] mx-auto left-0 right-0">
      <h1 className="text-4xl font-bold text-center mb-6">Leaderboard</h1>
  
      {/* Tabs */}
      <div className="flex justify-center mb-4">
        <div className="flex bg-gray-800 rounded-full p-1 w-full">
          {["location", "tier", "clan"].map((category) => (
            <button
              key={category}
              className={`flex-1 py-2 px-4 rounded-full text-center transition-colors duration-200 ${
                selectedCategory === category ? "bg-white text-black font-semibold" : "text-gray-300"
              }`}
              onClick={() => {
                setSelectedCategory(category as "location" | "tier" | "clan");
                setSelectedSubCategory(category === "tier" ? "Gold" : "national");
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
  
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search name"
            className="w-full py-2 pl-10 pr-4 bg-gray-100 text-gray-800 rounded-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
  
      {/* Sub-tabs (location, clan) */}
      {selectedCategory !== "tier" && (
        <div className="flex justify-center mb-4 space-x-2">
          <div className="flex bg-gray-800 rounded-full p-1 w-full">
            {["province", "national", "worldwide"].map((subCategory) => (
              <button
                key={subCategory}
                className={`py-1 px-4 rounded-full text-center transition-colors duration-200 ${
                  selectedSubCategory === subCategory ? "bg-white text-black font-semibold" : "text-gray-300"
                }`}
                onClick={() => setSelectedSubCategory(subCategory as "province" | "national" | "worldwide")}
              >
                {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tier dropdown */}
      {selectedCategory === "tier" && (
        <div className="flex justify-end mb-4">
          <div className="w-32">
            <Select value={selectedSubCategory as string} onValueChange={handleTierChange}>
              <SelectTrigger className="bg-gray-100 text-black border-0 rounded-full focus:ring-0">
                <SelectValue placeholder="Select tier" />
              </SelectTrigger>
              <SelectContent className="bg-gray-100 text-black border-0 rounded-lg">
                {["Ruby", "Diamond", "Gold", "Silver", "Bronze", "Iron", "Newbie"].map((tier) => (
                  <SelectItem key={tier} value={tier} className="focus:bg-gray-200">
                    <div className="flex items-center">
                      <span className="mr-2">
                        <img 
                          src={getTierIconPath(tier)} 
                          alt={`${tier} icon`} 
                          className="w-5 h-5 object-contain"
                        />
                      </span>
                      {tier}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
  
      {/* Leaderboard List */}
      <div className="w-full max-w-[375px] mx-auto space-y-2 px-2">
        {filteredData.length > 0 ? (
          filteredData.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm ${
                player.name === "You" || player.name === "Your Clan"
                  ? "bg-[#C7D66E] text-black border border-[#CDA4FF]"
                  : "bg-[#6B21A866] border border-[#CDA4FF]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">#{player.rank}</span>
                <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-medium">
                  {selectedCategory === "clan" ? "👥" : "👤"}
                </div>
                <span className="text-sm">{player.name}</span>
              </div>
              <div className="flex items-center text-sm">
                <img src="/star.svg" alt="score icon" className="w-4 h-4 mr-1" />
                <span className="font-semibold">{player.score}</span>
              
                {player.tier && (
                  <div className="ml-2 flex items-center">
                    <img
                      src={getTierIconPath(player.tier)}
                      alt={`${player.tier} icon`}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs ml-1">{player.tier}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-400 text-xs">
            <p>No data available for this selection</p>
          </div>
        )}
      </div>
    </div>
  );  
}