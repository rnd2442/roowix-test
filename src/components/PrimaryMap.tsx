import React, { useState } from "react";
import {
  Map,
  ImageOverlay,
  ZoomControl,
  Marker,
  Popup,
  LayersControl,
  TileLayer,
} from "react-leaflet";

type TState = {
  lat: number;
  lng: number;
  zoom: number;
};

export const PrimaryMap: React.FC = () => {
  const [state, setState] = useState<TState>({
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  });

  const a = 1648;
  const b = 1165;

  const position: [number, number] = [state.lat, state.lng];

  return (
    <Map center={position} zoom={state.zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  );

  //   return (
  //     <Map
  //       // bounds={[
  //       //   [0, 0],
  //       //   [b, a],
  //       // ]}
  //       center={position}
  //       // zoom={state.zoom}
  //       //   center={[a / 2, b / 2]}
  //       zoom={1}
  //       maxZoom={10}
  //       // style={{ width: "100vw", height: "100vw" }}

  //       //   style={{ position: "static", top: 0, right: 0, bottom: 0, left: 0 }}
  //     >
  //       <ImageOverlay
  //         url="https://static.tildacdn.com/tild3965-6139-4564-b262-303737393665/_8.jpg"
  //         // bounds={[
  //         //   [0, 0],
  //         //   [a, b],
  //         // ]}
  //         bounds={[
  //           [32, -130],
  //           [13, -100],
  //         ]}
  //       />
  //     </Map>
  //   );
};
