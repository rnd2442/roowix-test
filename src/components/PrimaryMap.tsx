import React, { useState } from "react";
import { Map, ImageOverlay, Marker, Popup, LayersControl } from "react-leaflet";

type TState = {
  lat: number;
  lng: number;
  zoom: number;
};

export const PrimaryMap: React.FC = () => {
  const [state, setState] = useState<TState>({
    lat: 0,
    lng: 0,
    zoom: 1,
  });

  const a = 1648;
  const b = 1165;

  const position: [number, number] = [state.lat, state.lng];

  return (
    <div id="mapid">
      <Map
        bounds={[
          [0, 0],
          [b, a],
        ]}
        // center={position}
        // zoom={state.zoom}
        center={[a / 2, b / 2]}
        zoom={0}
        maxZoom={10}
        // style={{ width: "100vw", height: "100vw" }}
      >
        <ImageOverlay
          url="https://static.tildacdn.com/tild3965-6139-4564-b262-303737393665/_8.jpg"
          bounds={[
            [0, 0],
            [a, b],
          ]}
        />
      </Map>
    </div>
  );
};
