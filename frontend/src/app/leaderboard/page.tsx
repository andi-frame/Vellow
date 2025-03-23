"use client"

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { fetchLeaderboard, LeaderboardEntry } from "@/services/leaderboardService";

export default function Leaderboard() {
  const [selectedCategory, setSelectedCategory] = useState<"location" | "tier">("location");
  const [selectedSubCategory, setSelectedSubCategory] = useState<"province" | "national" | "worldwide" | "Ruby" | "Diamond" | "Gold" | "Silver" | "Bronze" | "Iron" | "Newbie">("national");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch leaderboard data whenever category, subcategory, or search query changes
  useEffect(() => {
    const getLeaderboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const leaderboardData = await fetchLeaderboard(
          selectedCategory, 
          selectedSubCategory, 
          searchQuery
        );
        setData(leaderboardData);
      } catch (err) {
        setError("Failed to load leaderboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getLeaderboardData();
  }, [selectedCategory, selectedSubCategory, searchQuery]);
  
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
          {["location", "tier"].map((category) => (
            <button
              key={category}
              className={`flex-1 py-2 px-4 rounded-full text-center transition-colors duration-200 ${
                selectedCategory === category ? "bg-white text-black font-semibold" : "text-gray-300"
              }`}
              onClick={() => {
                setSelectedCategory(category as "location" | "tier");
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
  
      {/* Location sub-tabs */}
      {selectedCategory === "location" && (
        <div className="flex justify-center mb-4 space-x-2">
          <div className="flex bg-gray-800 rounded-full p-1 w-full">
            {["province", "national", "worldwide"].map((subCategory) => (
              <button
                key={subCategory}
                className={`flex-1 py-1 px-4 rounded-full text-center transition-colors duration-200 ${
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
  
      <div className="w-full max-w-[375px] mx-auto space-y-2 px-2">
        {loading ? (
          <div className="text-center py-6">
            <p>Loading leaderboard data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-6 text-red-400">
            <p>{error}</p>
          </div>
        ) : data && data.length > 0 ? (
          data.map((player) => (
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
                  👤
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