import React, { useEffect, useRef, ReactElement, useState } from "react";
import { Wrapper } from "./Demo";
import "./App.css";

export const Input = {
  position: 7,
  template: "/template-files/6977424f-fa9c-40d1-bd05-6178644b1216/fish.jpg",
  dimensions: "0, 0, 0, 0",
  wide: false,
  config: {
    url: "",
    lat: 41.88,
    long: 12.49,
    fov: 90,
    heading: 75.22,
    pitch: "",
    credits: "",
  },
  hotspots: [],
  popups: [],
  id: "7cbbfb89-2cc2-47db-bc52-3a559baeaace",
  created_At: "0001-01-01T00:00:00",
  updated_At: "0001-01-01T00:00:00",
  name: null,
};

const { config: InputParams } = Input;

function MyMapComponent({
  center,
  zoom,
  setHeading,
  setMap,
  heading,
}: {
  center: any;
  zoom: number;
  setHeading: Function;
  heading: any;
  map: any;
  setMap: Function;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const google: any = (window as any).google;

  useEffect(() => {
    const panorama = new google.maps.StreetViewPanorama(ref.current, {
      position: { lat: InputParams?.lat, lng: InputParams?.long },
      pov: {
        heading: heading,
        pitch: InputParams?.pitch ? InputParams?.pitch : 0,
      },
    });
    const maps = new google.maps.Map(ref.current, {
      center,
      zoom,
      heading,
    });
    if (panorama) {
      maps.setStreetView(panorama);
    }
    if (maps) {
      setMap(maps);
    }
  }, [heading, setHeading]);

  return <div ref={ref} id="map" className="position"></div>;
}

export function App() {
  const center = { lat: InputParams?.lat, lng: InputParams?.long };
  const zoom = 16;
  const [headings, setHeadings] = useState(InputParams?.heading);

  const [map, setMap] = useState();
  return (
    <div id="map">
      <Wrapper
        apiKey="AIzaSyDyxmpEzGQ7rDT9xrPd3jnvxR-QevoLD_g"
        children={
          <MyMapComponent
            center={center}
            zoom={zoom}
            heading={headings}
            setHeading={setHeadings}
            map={map}
            setMap={setMap}
          />
        }
      />
      <div className="center">
        <button
          onClick={() => {
            if (map) {
              setHeadings((map as any).streetView.pov.heading - 90);
            }
          }}
          style={{ width: "160px", height: "80px" }}
        >
          rotate left
        </button>
        <button
          onClick={() => {
            if (map) {
              setHeadings((map as any).streetView.pov.heading + 90);
            }
          }}
          style={{ width: "160px", height: "80px" }}
        >
          rotate right
        </button>
      </div>
    </div>
  );
}
