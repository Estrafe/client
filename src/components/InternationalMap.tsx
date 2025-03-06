"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";

// Custom train station icon
const customIcon = new L.Icon({
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Example station data
const stations = [
    { name: "Zurich", lat: 47.3769, lng: 8.5417 },
    { name: "Rome", lat: 41.9028, lng: 12.4964 },
    { name: "Munich", lat: 48.1351, lng: 11.5820 },
    { name: "Berlin", lat: 52.5200, lng: 13.4050 },
    { name: "Paris", lat: 48.8566, lng: 2.3522 },
    { name: "Lyon", lat: 45.7640, lng: 4.8357 },
    { name: "Milan", lat: 45.4642, lng: 9.1900 },
    { name: "Vienna", lat: 48.2082, lng: 16.3738 },
];

// Define connections between stations (pairs)
const routes: [string, string][] = [
    ["Zurich", "Munich"],
    ["Zurich", "Milan"],
    ["Zurich", "Paris"],
    ["Milan", "Rome"],
    ["Paris", "Lyon"],
    ["Lyon", "Zurich"],
    ["Munich", "Berlin"],
    ["Munich", "Vienna"],
];

// Helper function to find station coordinates and return as LatLngTuple
const getCoordinates = (stationName: string): LatLngTuple | null => {
    const station = stations.find(s => s.name === stationName);
    return station ? [station.lat, station.lng] as LatLngTuple : null;
};

// Generate polylines from route pairs
const polylines: LatLngTuple[][] = routes
    .map(([from, to]) => {
        const fromCoords = getCoordinates(from);
        const toCoords = getCoordinates(to);
        return fromCoords && toCoords ? [fromCoords, toCoords] : null;
    })
    .filter((line): line is LatLngTuple[] => line !== null); // Ensure valid tuples

export default function InternationalMap() {
    return (
        <div className="w-full h-full">
            <MapContainer
                center={[47.0, 8.0]} // Center around Zurich
                zoom={5}
                scrollWheelZoom={true}
                style={{ width: "100%", height: "100%" }}
            >
                {/* OpenStreetMap Tiles */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Render markers for each station */}
                {stations.map((station) => (
                    <Marker
                        key={station.name}
                        position={[station.lat, station.lng]}
                        icon={customIcon}
                    >
                        <Popup>
                            <strong>{station.name}</strong>
                        </Popup>
                    </Marker>
                ))}

                {/* Render polylines for the routes */}
                {polylines.map((polyline, index) => (
                    <Polyline
                        key={index}
                        positions={polyline}
                        color="blue" // Color of the rail line
                        weight={4} // Line thickness
                        opacity={0.7} // Transparency
                    />
                ))}
            </MapContainer>
        </div>
    );
}
