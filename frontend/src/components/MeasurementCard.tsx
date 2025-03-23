import React from "react";
import { cn } from "@/lib/utils"; 
import Image from "next/image";

interface MeasurementCardProps {
  title: string;
  description: string;
  icon: string;
  isActive?: boolean;
  onClick: () => void;
}

const MeasurementCard: React.FC<MeasurementCardProps> = ({
  title,
  description,
  icon,
  isActive = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex justify-between items-center p-4 rounded-2xl text-white cursor-pointer transition",
        isActive ? "bg-black border-2 border-white" : "bg-[#A467EE] hover:bg-purple-700"
      )}
    >
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm opacity-80">{description}</p>
      </div>
      <Image src={icon} alt={title} width={20} height={20} />
    </div>
  );
};

export default MeasurementCard;
