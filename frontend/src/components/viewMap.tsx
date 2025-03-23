"use client";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";
import GpxParser from "gpxparser";
import L from "leaflet";

interface GpxMapProps {
  gpxData: string;
}

const DEFAULT_CENTER: [number, number] = [0, 0];
const DEFAULT_BOUNDS = L.latLngBounds([
  [0, 0],
  [0.001, 0.001],
]);

const FitBounds = ({ positions }: { positions: [number, number][] }) => {
  const map = useMap();

  useEffect(() => {
    let bounds: L.LatLngBounds;

    if (positions.length > 0) {
      bounds = L.latLngBounds(positions);
    } else {
      bounds = DEFAULT_BOUNDS;
    }

    map.fitBounds(bounds, { padding: [20, 20] });
    map.setMinZoom(map.getZoom() - 1);
    map.setMaxBounds(bounds.pad(0.2));
  }, [positions, map]);

  return null;
};

const GpxMap: React.FC<GpxMapProps> = ({ gpxData }) => {
  const [positions, setPositions] = useState<[number, number][]>([]);

  useEffect(() => {
    const parseGpx = () => {
      try {
        const parser = new GpxParser();
        parser.parse(gpxData);

        const track = parser.tracks?.[0];
        const points =
          track?.points?.map(
            (p: { lat: number; lon: number }) =>
              [p.lat, p.lon] as [number, number]
          ) ?? [];

        setPositions(points);
      } catch (err) {
        console.error("Failed to parse GPX:", err);
      }
    };

    parseGpx();
  }, [gpxData]);

  return (
    <MapContainer
      center={positions[0] ?? DEFAULT_CENTER}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {positions.length > 0 && (
        <Polyline pathOptions={{ color: "blue" }} positions={positions} />
      )}
      <FitBounds positions={positions} />
    </MapContainer>
  );
};

export default GpxMap;
