"use client";

import MeasurementCard from "@/components/MeasurementCard";
import NavBar from "@/components/navbar";
import Image from "next/image"; 
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const measurementTypes = [
  { title: "Fast", description: "Pace based measurement", icon: "/fast.svg" },
  { title: "Endurance", description: "Distance based measurement", icon: "/endurance.svg" },
  { title: "Trailing", description: "Elevation based measurement", icon: "/trailing.svg" },
  { title: "All Rounded", description: "Evenly measured", icon: "/allrounded.svg" },
];

const winningConditions = ["Duration", "Game Point (GP)"];
const durations = ["1 Day", "2 Days", "3 Days", "4 Days"];

const BattlePage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [code, setCode] = useState(""); // Input kode untuk join
  const [selectedType, setSelectedType] = useState<string | null>(null); // Pilihan tipe pengukuran
  const [selectedMode, setSelectedMode] = useState<"Ranked" | "Unranked">("Ranked"); // Pilihan mode

  const [winningCondition, setWinningCondition] = useState(0);
  const [durationIndex, setDurationIndex] = useState(0);
  const [gamePoint, setGamePoint] = useState(100); // Default game point
  const [opponentMode, setOpponentMode] = useState("Invite");
  const [location, setLocation] = useState("Local");

  const handleSelectType = (type: string) => setSelectedType(type);
  const handleSelectMode = (mode: "Ranked" | "Unranked") => setSelectedMode(mode);

  const handleNextWinningCondition = () =>
    setWinningCondition((prev) => (prev + 1) % winningConditions.length);
  const handlePrevWinningCondition = () =>
    setWinningCondition((prev) => (prev - 1 + winningConditions.length) % winningConditions.length);

  const handleNextDuration = () =>
    setDurationIndex((prev) => (prev + 1) % durations.length);
  const handlePrevDuration = () =>
    setDurationIndex((prev) => (prev - 1 + durations.length) % durations.length);

  const handleOpponentModeChange = () =>
    setOpponentMode(opponentMode === "Invite" ? "Random" : "Invite");

  const handleLocationChange = () =>
    setLocation(location === "Local" ? "Worldwide" : "Local");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <div className="w-full max-w-md mx-auto p-4 flex flex-col items-center">
        <div className="mb-6 text-center w-full">
          <h1 className="text-3xl font-bold mb-2">Battle</h1>

          <input
            ref={inputRef}
            type="text"
            placeholder="Join with Code"
            className="w-[128px] h-[23px] text-white text-center p-1 rounded-md border-[#A467EE] border-2 bg-transparent"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          
          <div className="flex justify-end">
            <h1 className="text-3xl font-bold animate-pulse">
              Z <span className="animate-pulse">z</span>{" "}
              <span className="animate-pulse">z</span>{" "}
              <span className="animate-pulse">z</span>
            </h1>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute w-[170px] h-[170px] bg-no-repeat bg-cover bg-center rounded-full" 
              style={{ backgroundImage: "url('/noise.png')" }}>
            </div>
        
            <Image
              src="/peluit.svg"
              alt="Battle"
              width={145}
              height={87}
              priority
              className="relative z-10"
            />
          </div>
        </div>

        {/* Pilihan Mode Battle (Ranked & Unranked) */}
        <div className="flex bg-[#A467EE] rounded-full p-1 w-[200px] my-4">
          <button
            className={`flex-1 py-2 text-white font-semibold rounded-full transition ${
              selectedMode === "Ranked" ? "bg-[#7E4FB7] text-[#A467EE]" : ""
            }`}
            onClick={() => handleSelectMode("Ranked")}
          >
            Ranked
          </button>
          <button
            className={`flex-1 py-2 text-white font-semibold rounded-full transition ${
              selectedMode === "Unranked" ? "bg-[#7E4FB7] text-[#A467EE]" : ""
            }`}
            onClick={() => handleSelectMode("Unranked")}
          >
            Unranked
          </button>
        </div>

        {/* Pilihan Measurement Type */}
        <Image
              src="/gpvalue.svg"
              alt="gpvalue"
              width={14}
              height={14}
              priority
          />
        <h2 className="text-md font-semibold mb-2">Gamepoint Value</h2>
        <div className="w-full flex flex-col gap-3">
          {measurementTypes.map((item) => (
            <MeasurementCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              isActive={selectedType === item.title}
              onClick={() => handleSelectType(item.title)}
            />
          ))}
        </div>

        {/* Winning Condition Selection */}
        <div className="w-full flex flex-col items-center text-center mb-6 mt-6">
          <Image
              src="/winning.svg"
              alt="winning"
              width={14}
              height={14}
              priority
          />
          <h2 className="text-md font-semibold mb-2">Winning Condition</h2>
          <div className="flex items-center space-x-2">
            <button onClick={handlePrevWinningCondition}>{"<"}</button>
            <div className="border border-[#96A05B] px-4 py-2 rounded-md">
              {winningConditions[winningCondition]}
            </div>
            <button onClick={handleNextWinningCondition}>{">"}</button>
          </div>

          {winningConditions[winningCondition] === "Duration" ? (
            <div className="flex items-center space-x-2 mt-2">
              <button onClick={handlePrevDuration}>{"<"}</button>
              <div className="bg-[#C5D664] px-4 py-2 rounded-md">
                {durations[durationIndex]}
              </div>
              <button onClick={handleNextDuration}>{">"}</button>
            </div>
          ) : (
            <div className="mt-2">
              <input
                type="number"
                value={gamePoint}
                onChange={(e) => setGamePoint(Number(e.target.value))}
                className="w-20 text-center p-1 rounded-md border border-[#96A05B] bg-transparent"
              />
              <span className="ml-2">GP</span>
            </div>
          )}
        </div>

        {/* Opponent Selection */}
        <div className="w-full flex flex-col items-center text-center mb-6 mt-3">
          <Image
              src="/opponent.svg"
              alt="opponent"
              width={14}
              height={14}
              priority
          />
          <h2 className="text-md font-semibold mb-2">Opponent</h2>
          <div className="flex items-center space-x-2">
            <button onClick={handleOpponentModeChange}>{"<"}</button>
            <div className="border border-[#96A05B] px-4 py-2 rounded-md">
              {opponentMode}
            </div>
            <button onClick={handleOpponentModeChange}>{">"}</button>
          </div>
        </div>

        {/* Location Selection */}
        <div className="w-full flex flex-col items-center text-center mb-6 mt-3">
          <Image
              src="/location.svg"
              alt="location"
              width={14}
              height={14}
              priority
          />
          <h2 className="text-md font-semibold mb-2">Location</h2>
          <div className="flex items-center space-x-2">
            <button onClick={handleLocationChange}>{"<"}</button>
            <div className="border border-[#96A05B] px-4 py-2 rounded-md">
              {location}
            </div>
            <button onClick={handleLocationChange}>{">"}</button>
          </div>
        </div>

        <Button
          className={`w-full max-w-[258px] h-[49px] py-4 mt-4 rounded-xl font-semibold transition mb-18 ${
            code.trim() !== "" && selectedType
              ? "bg-[#A467EE] hover:bg-purple-950"
              : "bg-gray-600 cursor-not-allowed"
          }`}
          disabled={code.trim() === "" || !selectedType || !selectedMode}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default BattlePage;
