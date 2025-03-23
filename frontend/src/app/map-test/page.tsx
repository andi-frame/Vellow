"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const GpxMap = dynamic(() => import("../../components/viewMap"), {
  ssr: false,
});

const Page = () => {
  const [gpxData, setGpxData] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setGpxData(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-screen">
      <h1>Upload GPX File</h1>
      <input type="file" accept=".gpx" onChange={handleFileUpload} />
      <div className="h-10/12">
        {gpxData ? (
          <GpxMap gpxData={gpxData} />
        ) : (
          <p>Please upload a GPX file.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
