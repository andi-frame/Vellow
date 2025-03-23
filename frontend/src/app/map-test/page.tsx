"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const GpxMap = dynamic(() => import("../../../components/map/viewMap"), {
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
    <div>
      <h1>Upload GPX File</h1>
      <input type="file" accept=".gpx" onChange={handleFileUpload} />
      <div style={{ height: "500px", marginTop: "1rem" }}>
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
