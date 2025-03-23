"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react';

const Footer = () => {
    const pathname = usePathname();

    const isActive = (path: string): boolean => {
        return pathname === path;
    };

    const getItemStyle = (path: string): string => {
        if (isActive(path)) {
            return "flex flex-col items-center justify-center relative";
        }
        return "flex flex-col items-center justify-center";
    };

    return (
        <div className="fixed bottom-0 w-full max-w-[375px] mx-auto left-0 right-0 bg-[#A467EE] text-white flex justify-around items-center py-3 border-[#CDA4FF] border-2 rounded-2xl">
            <div className={`relative ${isActive("/leaderboard") ? "z-10" : ""}`}>
                {isActive("/leaderboard") && (
                    <div className="absolute -z-10 w-12 h-12 bg-[#8A4FCC] rounded-full opacity-70 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
                <Link href="/leaderboard" className={getItemStyle("/leaderboard")}>
                    <Image src="/trophy.svg" alt="Trophy Icon" className="w-5 h-5" />
                    {isActive("/leaderboard")}
                </Link>
            </div>

            <div className={`relative ${isActive("/battle") ? "z-10" : ""}`}>
                {isActive("/battle") && (
                    <div className="absolute -z-10 w-12 h-12 bg-[#8A4FCC] rounded-full opacity-70 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
                <Link href="/battle" className={getItemStyle("/battle")}>
                    <Image src="/battle.svg" alt="Battle Icon" className="w-5 h-5" />
                    <span className="text-sm text-purple-950">vs</span>
                </Link>
            </div>

            <div className={`relative ${isActive("/clan") ? "z-10" : ""}`}>
                {isActive("/clan") && (
                    <div className="absolute -z-10 w-12 h-12 bg-[#8A4FCC] rounded-full opacity-70 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
                <Link href="/clan" className={getItemStyle("/clan")}>
                    <Image src="/guard.svg" alt="Clan Icon" className="w-5 h-5" />
                    {isActive("/clan")}
                </Link>
            </div>
        </div>
    );
};

export default Footer;